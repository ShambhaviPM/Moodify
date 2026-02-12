const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const MLRecommendationEngine = require('./ml-engine');
const contentPool = require('./content-data');

// Load environment variables
dotenv.config();

const app = express();

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('MongoDB URI is not defined in the environment variables.');
  process.exit(1); // Exit the process with a failure code
}

mongoose
  .connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Middleware
const allowedOrigins = [
  'http://localhost:3000',  // React frontend (development)
  'http://localhost:3001',  // React frontend (development - alternate port)
  'http://127.0.0.1:3000',  // Alternative localhost address
  'http://127.0.0.1:3001',  // Alternative localhost address (alternate port)
];

// Add production frontend URL if provided
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// User Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);

// User Interaction Schema for tracking recommendations
const UserInteractionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mood: {
    type: String,
    enum: ['HAPPY', 'NEUTRAL', 'NOT SO GREAT'],
    required: true
  },
  activity: {
    type: String,
    enum: ['ART & DESIGN', 'FITNESS', 'TECH', 'TRAVEL AND CULTURE'],
    required: true
  },
  theme: {
    type: String,
    enum: ['LEARNING SOMETHING NEW', 'UNWINDING AND RELAXING', 'GETTING CREATIVE'],
    required: true
  },
  recommendationId: {
    type: String,
    required: true
  },
  recommendationTitle: String,
  feedback: {
    type: String,
    enum: ['liked', 'disliked', 'neutral', 'not-set'],
    default: 'not-set'
  },
  clicked: {
    type: Boolean,
    default: false
  },
  timeSpent: {
    type: Number,
    default: 0  // in seconds
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const UserInteraction = mongoose.model('UserInteraction', UserInteractionSchema);

// Signup Route
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email or username already exists' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ 
      message: 'User registered successfully',
      user: { 
        id: newUser._id, 
        username: newUser.username, 
        email: newUser.email 
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      message: 'Server error during signup',
      error: error.message 
    });
  }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Generate JWT
    const token = jwt.sign(
      { 
        id: user._id, 
        username: user.username 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Server error during login',
      error: error.message 
    });
  }
});

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// ========== TRACKING ENDPOINTS ==========

// Track recommendation interaction
app.post('/api/interactions/track', authMiddleware, async (req, res) => {
  try {
    const { mood, activity, theme, recommendationId, recommendationTitle, feedback, clicked, timeSpent } = req.body;
    
    const interaction = new UserInteraction({
      userId: req.user.id,
      mood,
      activity,
      theme,
      recommendationId,
      recommendationTitle,
      feedback: feedback || 'not-set',
      clicked: clicked || false,
      timeSpent: timeSpent || 0
    });
    
    await interaction.save();
    
    res.json({
      message: 'Interaction tracked successfully',
      interaction
    });
  } catch (error) {
    console.error('Tracking error:', error);
    res.status(500).json({
      message: 'Error tracking interaction',
      error: error.message
    });
  }
});

// Get user's interaction history
app.get('/api/interactions/history', authMiddleware, async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    
    const history = await UserInteraction.find({ userId: req.user.id })
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset));
    
    const total = await UserInteraction.countDocuments({ userId: req.user.id });
    
    res.json({
      total,
      history,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({
      message: 'Error fetching history',
      error: error.message
    });
  }
});

// Update feedback for a recommendation
app.put('/api/interactions/feedback', authMiddleware, async (req, res) => {
  try {
    const { recommendationId, feedback } = req.body;
    
    const interaction = await UserInteraction.findOneAndUpdate(
      { userId: req.user.id, recommendationId },
      { feedback, timestamp: new Date() },
      { new: true }
    );
    
    if (!interaction) {
      return res.status(404).json({ message: 'Interaction not found' });
    }
    
    res.json({
      message: 'Feedback updated',
      interaction
    });
  } catch (error) {
    console.error('Feedback update error:', error);
    res.status(500).json({
      message: 'Error updating feedback',
      error: error.message
    });
  }
});

// Get user's preferences based on history (for ML)
app.get('/api/user/preferences', authMiddleware, async (req, res) => {
  try {
    const interactions = await UserInteraction.find({ userId: req.user.id });
    
    // Calculate preference scores
    const preferences = {
      moods: {},
      activities: {},
      themes: {},
      likedRecommendations: []
    };
    
    interactions.forEach(interaction => {
      // Count moods
      preferences.moods[interaction.mood] = (preferences.moods[interaction.mood] || 0) + 1;
      
      // Count activities
      preferences.activities[interaction.activity] = (preferences.activities[interaction.activity] || 0) + 1;
      
      // Count themes
      preferences.themes[interaction.theme] = (preferences.themes[interaction.theme] || 0) + 1;
      
      // Track liked recommendations
      if (interaction.feedback === 'liked') {
        preferences.likedRecommendations.push({
          id: interaction.recommendationId,
          title: interaction.recommendationTitle,
          mood: interaction.mood,
          activity: interaction.activity,
          theme: interaction.theme
        });
      }
    });
    
    res.json(preferences);
  } catch (error) {
    console.error('Preferences fetch error:', error);
    res.status(500).json({
      message: 'Error fetching preferences',
      error: error.message
    });
  }
});

// ML-based recommendations endpoint
app.post('/api/recommendations/ml', authMiddleware, async (req, res) => {
  try {
    const { mood, activity, theme } = req.body;
    
    if (!mood || !activity || !theme) {
      return res.status(400).json({
        message: 'Missing required fields: mood, activity, theme'
      });
    }

    // Get user's interaction history
    const interactions = await UserInteraction.find({ userId: req.user.id });
    
    // Initialize ML engine
    const mlEngine = new MLRecommendationEngine();
    mlEngine.trainFromHistory(interactions);

    // Pre-filter content pool by activity and theme for relevance
    let filteredPool = contentPool.filter(c => c.tags.includes(activity));
    const themeMatched = filteredPool.filter(c => c.tags.includes(theme));
    if (themeMatched.length > 0) {
      filteredPool = themeMatched;
    }

    // Get ML recommendation
    let recommendation;
    if (interactions.length > 0) {
      recommendation = mlEngine.getRecommendationWithConfidence(mood, activity, theme, interactions, filteredPool);
    } else {
      // Cold start: use mood-based fallback with filtered pool
      const fallback = mlEngine.handleColdStart(mood, activity, theme, filteredPool);
      recommendation = {
        content: fallback[0],
        confidence: 75,
        reason: 'curated based on your mood and interests'
      };
    }

    if (!recommendation) {
      return res.status(500).json({
        message: 'Could not generate recommendation',
        fallback: true
      });
    }

    res.json({
      success: true,
      recommendation: recommendation.content,
      confidence: recommendation.confidence,
      reason: recommendation.reason,
      isML: interactions.length > 0
    });
  } catch (error) {
    console.error('ML recommendation error:', error);
    res.status(500).json({
      message: 'Error generating ML recommendation',
      error: error.message
    });
  }
});

// Example protected route
app.get('/api/dashboard', authMiddleware, (req, res) => {
  res.json({ 
    message: 'Access granted to protected route', 
    user: req.user 
  });
});

// Server configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});