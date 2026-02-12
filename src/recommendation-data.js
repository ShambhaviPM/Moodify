const RecommendationData = {
    contentSections: [
      // ===== MEMORY GAMES (ACTIVE) =====
      {
        id: 'memory-tech',
        title: 'CYBER MEMORY - TECH EDITION',
        description: 'Match tech-themed cards to train your memory and focus! Race against the clock with coding emojis.',
        imageSrc: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
        imageAlt: 'Memory Game Tech',
        tags: ['TECH', 'LEARNING SOMETHING NEW'],
        energy: 'ACTIVE',
        type: 'game',
        mood_fit: { 'HAPPY': 1.3, 'NEUTRAL': 1.2, 'NOT SO GREAT': 1.0 },
        inApp: { route: '/play/memory' },
        links: []
      },
      {
        id: 'memory-art',
        title: 'CYBER MEMORY - ART EDITION',
        description: 'Flip and match art-themed cards! Train your visual memory with creative symbols.',
        imageSrc: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop',
        imageAlt: 'Memory Game Art',
        tags: ['ART & DESIGN', 'LEARNING SOMETHING NEW'],
        energy: 'ACTIVE',
        type: 'game',
        mood_fit: { 'HAPPY': 1.2, 'NEUTRAL': 1.2, 'NOT SO GREAT': 1.1 },
        inApp: { route: '/play/memory' },
        links: []
      },
      {
        id: 'memory-fitness',
        title: 'CYBER MEMORY - FITNESS EDITION',
        description: 'Match fitness emojis while training your brain! A fun mind-body connection exercise.',
        imageSrc: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
        imageAlt: 'Memory Game Fitness',
        tags: ['FITNESS', 'LEARNING SOMETHING NEW'],
        energy: 'ACTIVE',
        type: 'game',
        mood_fit: { 'HAPPY': 1.2, 'NEUTRAL': 1.3, 'NOT SO GREAT': 1.1 },
        inApp: { route: '/play/memory' },
        links: []
      },
      {
        id: 'memory-travel',
        title: 'CYBER MEMORY - WORLD EDITION',
        description: 'Explore the world through memory! Match travel and culture symbols from around the globe.',
        imageSrc: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop',
        imageAlt: 'Memory Game Travel',
        tags: ['TRAVEL AND CULTURE', 'LEARNING SOMETHING NEW'],
        energy: 'ACTIVE',
        type: 'game',
        mood_fit: { 'HAPPY': 1.3, 'NEUTRAL': 1.2, 'NOT SO GREAT': 1.0 },
        inApp: { route: '/play/memory' },
        links: []
      },

      // ===== TRIVIA GAMES (ACTIVE) =====
      {
        id: 'trivia-tech',
        title: 'KNOWLEDGE ARENA - TECH',
        description: 'Test your tech knowledge! 10 rapid-fire questions about programming, AI, and computer science.',
        imageSrc: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
        imageAlt: 'Tech Trivia',
        tags: ['TECH', 'LEARNING SOMETHING NEW'],
        energy: 'ACTIVE',
        type: 'game',
        mood_fit: { 'HAPPY': 1.4, 'NEUTRAL': 1.2, 'NOT SO GREAT': 0.9 },
        inApp: { route: '/play/trivia' },
        links: []
      },
      {
        id: 'trivia-art',
        title: 'KNOWLEDGE ARENA - ART & DESIGN',
        description: 'How well do you know art history and design principles? Challenge yourself with creative trivia!',
        imageSrc: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
        imageAlt: 'Art Trivia',
        tags: ['ART & DESIGN', 'LEARNING SOMETHING NEW'],
        energy: 'ACTIVE',
        type: 'game',
        mood_fit: { 'HAPPY': 1.3, 'NEUTRAL': 1.2, 'NOT SO GREAT': 0.9 },
        inApp: { route: '/play/trivia' },
        links: []
      },
      {
        id: 'trivia-fitness',
        title: 'KNOWLEDGE ARENA - FITNESS',
        description: 'Test your wellness IQ! Questions about nutrition, exercise science, and healthy living.',
        imageSrc: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600&h=400&fit=crop',
        imageAlt: 'Fitness Trivia',
        tags: ['FITNESS', 'LEARNING SOMETHING NEW'],
        energy: 'ACTIVE',
        type: 'game',
        mood_fit: { 'HAPPY': 1.3, 'NEUTRAL': 1.3, 'NOT SO GREAT': 1.0 },
        inApp: { route: '/play/trivia' },
        links: []
      },
      {
        id: 'trivia-travel',
        title: 'KNOWLEDGE ARENA - WORLD CULTURE',
        description: 'Journey around the world with trivia! Geography, history, and cultural questions await.',
        imageSrc: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&fit=crop',
        imageAlt: 'Travel Trivia',
        tags: ['TRAVEL AND CULTURE', 'LEARNING SOMETHING NEW'],
        energy: 'ACTIVE',
        type: 'game',
        mood_fit: { 'HAPPY': 1.4, 'NEUTRAL': 1.2, 'NOT SO GREAT': 0.9 },
        inApp: { route: '/play/trivia' },
        links: []
      },

      // ===== TYPING GAMES (ACTIVE) =====
      {
        id: 'typing-tech',
        title: 'SPEED TYPER - CODE MODE',
        description: 'Type coding keywords at lightning speed! Train your programming muscle memory in 60 seconds.',
        imageSrc: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop',
        imageAlt: 'Typing Game Tech',
        tags: ['TECH', 'GETTING CREATIVE'],
        energy: 'ACTIVE',
        type: 'game',
        mood_fit: { 'HAPPY': 1.4, 'NEUTRAL': 1.1, 'NOT SO GREAT': 0.8 },
        inApp: { route: '/play/typing' },
        links: []
      },
      {
        id: 'typing-art',
        title: 'SPEED TYPER - DESIGN MODE',
        description: 'Race through art and design terminology! How fast can you type creative vocabulary?',
        imageSrc: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop',
        imageAlt: 'Typing Game Art',
        tags: ['ART & DESIGN', 'GETTING CREATIVE'],
        energy: 'ACTIVE',
        type: 'game',
        mood_fit: { 'HAPPY': 1.3, 'NEUTRAL': 1.1, 'NOT SO GREAT': 0.9 },
        inApp: { route: '/play/typing' },
        links: []
      },
      {
        id: 'typing-fitness',
        title: 'SPEED TYPER - FITNESS MODE',
        description: 'Type fitness terms at top speed! A fun way to learn workout vocabulary while training reflexes.',
        imageSrc: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
        imageAlt: 'Typing Game Fitness',
        tags: ['FITNESS', 'GETTING CREATIVE'],
        energy: 'ACTIVE',
        type: 'game',
        mood_fit: { 'HAPPY': 1.3, 'NEUTRAL': 1.2, 'NOT SO GREAT': 0.9 },
        inApp: { route: '/play/typing' },
        links: []
      },
      {
        id: 'typing-travel',
        title: 'SPEED TYPER - WORLD MODE',
        description: 'Race through world capitals and cultural terms! How many can you type in 60 seconds?',
        imageSrc: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=400&fit=crop',
        imageAlt: 'Typing Game Travel',
        tags: ['TRAVEL AND CULTURE', 'GETTING CREATIVE'],
        energy: 'ACTIVE',
        type: 'game',
        mood_fit: { 'HAPPY': 1.4, 'NEUTRAL': 1.1, 'NOT SO GREAT': 0.8 },
        inApp: { route: '/play/typing' },
        links: []
      },

      // ===== REACTION GAMES (ACTIVE) =====
      {
        id: 'reaction-general',
        title: 'REFLEX MATRIX',
        description: 'Test your reaction speed! Click the target as fast as you can across 10 intense rounds.',
        imageSrc: 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=600&h=400&fit=crop',
        imageAlt: 'Reaction Game',
        tags: ['TECH', 'GETTING CREATIVE'],
        energy: 'ACTIVE',
        type: 'game',
        mood_fit: { 'HAPPY': 1.5, 'NEUTRAL': 1.1, 'NOT SO GREAT': 0.7 },
        inApp: { route: '/play/reaction' },
        links: []
      },
      {
        id: 'reaction-fitness',
        title: 'REFLEX TRAINING - FITNESS',
        description: 'Sharpen your reflexes like an athlete! Quick reaction drills to boost hand-eye coordination.',
        imageSrc: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=600&h=400&fit=crop',
        imageAlt: 'Reaction Fitness',
        tags: ['FITNESS', 'GETTING CREATIVE'],
        energy: 'ACTIVE',
        type: 'game',
        mood_fit: { 'HAPPY': 1.4, 'NEUTRAL': 1.2, 'NOT SO GREAT': 0.8 },
        inApp: { route: '/play/reaction' },
        links: []
      },

      // ===== PATTERN GAMES (ACTIVE) =====
      {
        id: 'pattern-general',
        title: 'SEQUENCE HACK - EXPLORER',
        description: 'Memorize and repeat color sequences! A brain-training pattern game that gets progressively harder.',
        imageSrc: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=600&h=400&fit=crop',
        imageAlt: 'Pattern Game',
        tags: ['TRAVEL AND CULTURE', 'GETTING CREATIVE'],
        energy: 'ACTIVE',
        type: 'game',
        mood_fit: { 'HAPPY': 1.3, 'NEUTRAL': 1.2, 'NOT SO GREAT': 1.0 },
        inApp: { route: '/play/pattern' },
        links: []
      },
      {
        id: 'pattern-music',
        title: 'SEQUENCE HACK - RHYTHM',
        description: 'Follow the musical tones and repeat the pattern! Train your ear and memory together.',
        imageSrc: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop',
        imageAlt: 'Pattern Music',
        tags: ['ART & DESIGN', 'GETTING CREATIVE'],
        energy: 'ACTIVE',
        type: 'game',
        mood_fit: { 'HAPPY': 1.2, 'NEUTRAL': 1.3, 'NOT SO GREAT': 1.1 },
        inApp: { route: '/play/pattern' },
        links: []
      },

      // ===== MEDITATION (CHILL) =====
      {
        id: 'meditation-breathing',
        title: 'ZEN MODE - GUIDED BREATHING',
        description: 'Follow the breathing circle: inhale, hold, exhale. Calm your mind with rhythmic breathing exercises.',
        imageSrc: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
        imageAlt: 'Guided Breathing',
        tags: ['FITNESS', 'UNWINDING AND RELAXING'],
        energy: 'CHILL',
        type: 'meditation',
        mood_fit: { 'HAPPY': 0.9, 'NEUTRAL': 1.2, 'NOT SO GREAT': 1.6 },
        inApp: { route: '/experience/meditation' },
        links: []
      },
      {
        id: 'meditation-focus',
        title: 'ZEN MODE - DEEP FOCUS',
        description: 'A focused meditation session with ambient drone sounds. Perfect before a coding or study session.',
        imageSrc: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
        imageAlt: 'Focus Meditation',
        tags: ['TECH', 'UNWINDING AND RELAXING'],
        energy: 'CHILL',
        type: 'meditation',
        mood_fit: { 'HAPPY': 0.8, 'NEUTRAL': 1.3, 'NOT SO GREAT': 1.4 },
        inApp: { route: '/experience/meditation' },
        links: []
      },
      {
        id: 'meditation-bodyscan',
        title: 'ZEN MODE - BODY SCAN',
        description: 'Relax through creative visualization. A calming body scan meditation for artists and dreamers.',
        imageSrc: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&h=400&fit=crop',
        imageAlt: 'Body Scan',
        tags: ['ART & DESIGN', 'UNWINDING AND RELAXING'],
        energy: 'CHILL',
        type: 'meditation',
        mood_fit: { 'HAPPY': 0.8, 'NEUTRAL': 1.1, 'NOT SO GREAT': 1.5 },
        inApp: { route: '/experience/meditation' },
        links: []
      },

      // ===== AMBIENT MIXER (CHILL) =====
      {
        id: 'ambient-lofi',
        title: 'SOUND STUDIO - LOFI VIBES',
        description: 'Mix your perfect study atmosphere. Layer rain, lo-fi beats, and ambient sounds for ultimate focus.',
        imageSrc: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop',
        imageAlt: 'Lofi Ambient',
        tags: ['TECH', 'UNWINDING AND RELAXING'],
        energy: 'CHILL',
        type: 'ambient',
        mood_fit: { 'HAPPY': 1.0, 'NEUTRAL': 1.3, 'NOT SO GREAT': 1.3 },
        inApp: { route: '/experience/ambient' },
        links: []
      },
      {
        id: 'ambient-nature',
        title: 'SOUND STUDIO - NATURE ESCAPE',
        description: 'Transport yourself to nature. Mix rain, birds, wind, and ocean waves for a virtual escape.',
        imageSrc: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
        imageAlt: 'Nature Sounds',
        tags: ['TRAVEL AND CULTURE', 'UNWINDING AND RELAXING'],
        energy: 'CHILL',
        type: 'ambient',
        mood_fit: { 'HAPPY': 1.0, 'NEUTRAL': 1.2, 'NOT SO GREAT': 1.5 },
        inApp: { route: '/experience/ambient' },
        links: []
      },
      {
        id: 'ambient-sleep',
        title: 'SOUND STUDIO - SLEEP MODE',
        description: 'Drift off with soothing soundscapes. Fire crackles, gentle rain, and soft wind to help you relax.',
        imageSrc: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&h=400&fit=crop',
        imageAlt: 'Sleep Sounds',
        tags: ['FITNESS', 'UNWINDING AND RELAXING'],
        energy: 'CHILL',
        type: 'ambient',
        mood_fit: { 'HAPPY': 0.7, 'NEUTRAL': 1.1, 'NOT SO GREAT': 1.6 },
        inApp: { route: '/experience/ambient' },
        links: []
      },

      // ===== VIDEO PLAYER (CHILL) =====
      {
        id: 'video-tech',
        title: 'WATCH PARTY - TECH TALKS',
        description: 'Watch amazing tech talks from Google, case studies, and coding courses. Learn from the best minds in tech!',
        imageSrc: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop',
        imageAlt: 'Tech Videos',
        tags: ['TECH', 'LEARNING SOMETHING NEW'],
        energy: 'CHILL',
        type: 'video',
        mood_fit: { 'HAPPY': 1.1, 'NEUTRAL': 1.3, 'NOT SO GREAT': 1.1 },
        inApp: { route: '/experience/video', props: { videos: [
          { id: '6avJHaC3C2U', title: 'The Art of Code - Dylan Beattie (NDC Conference)' },
          { id: 'SzJ46YA_RaA', title: 'Map of Computer Science - Domain of Science' },
          { id: 'rfscVS0vtbw', title: 'Python Full Course - freeCodeCamp' },
          { id: 'pEfrdAtAmqk', title: 'God-Tier Developer Roadmap - Fireship' },
        ] } },
        links: []
      },
      {
        id: 'video-art',
        title: 'WATCH PARTY - CREATIVE PROCESS',
        description: 'Watch artists create amazing work. Get inspired by creative processes and design breakdowns.',
        imageSrc: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&h=400&fit=crop',
        imageAlt: 'Art Videos',
        tags: ['ART & DESIGN', 'LEARNING SOMETHING NEW'],
        energy: 'CHILL',
        type: 'video',
        mood_fit: { 'HAPPY': 1.2, 'NEUTRAL': 1.2, 'NOT SO GREAT': 1.2 },
        inApp: { route: '/experience/video', props: { videos: [
          { id: 'lLWEXRAnQd0', title: 'Bob Ross - Island in the Wilderness (S29E1)' },
          { id: 'oh5p5f5_-7A', title: 'Bob Ross - A Walk in the Woods (S1E1)' },
          { id: 'L5bXkI0-pEg', title: 'Bob Ross - Campfire (S3E10)' },
          { id: 'q_k8fVNzbGU', title: 'Abstract: The Art of Design - Christoph Niemann (Netflix)' },
        ] } },
        links: []
      },
      {
        id: 'video-fitness',
        title: 'WATCH PARTY - WELLNESS & YOGA',
        description: 'Relax with guided yoga sessions and wellness content. Perfect for winding down.',
        imageSrc: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
        imageAlt: 'Fitness Videos',
        tags: ['FITNESS', 'UNWINDING AND RELAXING'],
        energy: 'CHILL',
        type: 'video',
        mood_fit: { 'HAPPY': 0.9, 'NEUTRAL': 1.2, 'NOT SO GREAT': 1.4 },
        inApp: { route: '/experience/video', props: { videos: [
          { id: 'v7AYKMP6rOE', title: 'Yoga For Complete Beginners - Yoga With Adriene' },
          { id: '2pLT-olgUJs', title: 'Get Abs in 2 WEEKS - Chloe Ting' },
          { id: 'v7SN-d4qXx0', title: 'Bedtime Yoga - Yoga With Adriene' },
        ] } },
        links: []
      },
      {
        id: 'video-travel',
        title: 'WATCH PARTY - VIRTUAL TRAVEL',
        description: 'Explore beautiful destinations from your couch. Stunning drone footage and travel vlogs.',
        imageSrc: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop',
        imageAlt: 'Travel Videos',
        tags: ['TRAVEL AND CULTURE', 'UNWINDING AND RELAXING'],
        energy: 'CHILL',
        type: 'video',
        mood_fit: { 'HAPPY': 1.1, 'NEUTRAL': 1.3, 'NOT SO GREAT': 1.4 },
        inApp: { route: '/experience/video', props: { videos: [
          { id: '0GCuvcTI090', title: '12 Things NOT to do in Japan - Abroad in Japan' },
          { id: 'LXb3EKWsInQ', title: 'Costa Rica in 4K 60fps HDR' },
          { id: '1Z5D1Hvm6sM', title: '100 Most Beautiful Natural Places on Planet Earth' },
        ] } },
        links: []
      },

      // ===== WORKOUTS (ACTIVE) =====
      {
        id: 'workout-hiit',
        title: 'POWER MODE - HIIT BLAST',
        description: 'High-intensity interval training! 6 exercises, 30s work, 15s rest. Get your heart pumping!',
        imageSrc: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
        imageAlt: 'HIIT Workout',
        tags: ['FITNESS', 'GETTING CREATIVE'],
        energy: 'ACTIVE',
        type: 'workout',
        mood_fit: { 'HAPPY': 1.5, 'NEUTRAL': 1.2, 'NOT SO GREAT': 0.8 },
        inApp: { route: '/experience/workout' },
        links: []
      },
      {
        id: 'workout-yoga',
        title: 'POWER MODE - MINDFUL FLOW',
        description: 'A gentle movement flow combining stretching and bodyweight exercises. Move at your own pace.',
        imageSrc: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop',
        imageAlt: 'Yoga Flow',
        tags: ['TRAVEL AND CULTURE', 'UNWINDING AND RELAXING'],
        energy: 'ACTIVE',
        type: 'workout',
        mood_fit: { 'HAPPY': 1.0, 'NEUTRAL': 1.3, 'NOT SO GREAT': 1.3 },
        inApp: { route: '/experience/workout' },
        links: []
      },
      {
        id: 'workout-stretch',
        title: 'POWER MODE - GENTLE STRETCH',
        description: 'Gentle stretching routine for when you need to move but want to stay calm. Perfect for decompressing.',
        imageSrc: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
        imageAlt: 'Stretching',
        tags: ['FITNESS', 'UNWINDING AND RELAXING'],
        energy: 'ACTIVE',
        type: 'workout',
        mood_fit: { 'HAPPY': 0.8, 'NEUTRAL': 1.2, 'NOT SO GREAT': 1.5 },
        inApp: { route: '/experience/workout' },
        links: []
      },
    ],

    // Recommendation algorithm: HARD energy filter + scoring + variety tracking
    findRecommendations(mood, activity, theme, energy, count = 3) {
      if (!mood || !activity || !theme) {
        return this.contentSections.slice(0, count);
      }

      // STEP 1: HARD filter by energy level - CHILL and ACTIVE always show different content
      let pool = this.contentSections;
      if (energy) {
        const energyPool = pool.filter(s => s.energy === energy);
        if (energyPool.length > 0) {
          pool = energyPool;
        }
      }

      // STEP 2: Score every item - activity and theme match are the strongest signals
      const scored = pool.map(content => {
        let score = content.mood_fit[mood] || 1.0;
        if (content.tags.includes(activity)) score += 1.5; // Strong activity boost
        if (content.tags.includes(theme)) score += 0.8;    // Theme boost
        return { content, score };
      });

      // STEP 3: Variety - penalize seen items (small enough that activity match always wins)
      const seenKey = 'moodify_seen_' + (energy || 'all');
      let seen = [];
      try { seen = JSON.parse(sessionStorage.getItem(seenKey) || '[]'); } catch(e) {}

      scored.forEach(s => {
        if (seen.includes(s.content.id)) {
          s.score -= 0.2; // Small penalty - activity match (+1.5) still dominates
        }
      });

      scored.sort((a, b) => b.score - a.score);

      // STEP 4: Shuffle top-tier items for variety within same score band
      const topScore = scored[0]?.score || 0;
      const topTier = scored.filter(s => s.score >= topScore - 0.3);

      for (let i = topTier.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [topTier[i], topTier[j]] = [topTier[j], topTier[i]];
      }

      // Build final results
      const results = [];
      const usedIds = new Set();

      for (const item of [...topTier, ...scored]) {
        if (results.length >= count) break;
        if (!usedIds.has(item.content.id)) {
          results.push(item.content);
          usedIds.add(item.content.id);
        }
      }

      // Track shown items - reset when all items in pool have been seen
      const newSeen = [...seen, ...results.map(r => r.id)];
      sessionStorage.setItem(seenKey, JSON.stringify(
        newSeen.length >= pool.length ? results.map(r => r.id) : newSeen
      ));

      return results;
    },

    // Single recommendation (backward compat)
    findRecommendation(mood, activity, theme, energy) {
      const results = this.findRecommendations(mood, activity, theme, energy, 1);
      return results[0] || this.contentSections[0];
    }
};

export default RecommendationData;
