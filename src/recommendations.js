import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecommendationData from './recommendation-data';

const RecommendationsPage = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const mood = localStorage.getItem('selectedMood');
    const activity = localStorage.getItem('selectedActivity');
    const theme = localStorage.getItem('currentTheme');

    // Generate multiple recommendations based on user choices
    const generateRecommendations = () => {
      const allContent = RecommendationData.contentSections;
      const moodProfile = RecommendationData.recommendationMatrix.mood[mood];
      const themeRecommendations = RecommendationData.recommendationMatrix.theme[theme];

      // Filter and prioritize content based on mood and theme
      const filteredRecommendations = allContent
        .filter(section => 
          themeRecommendations.includes(section.id) || 
          section.tags.some(tag => moodProfile.preference.includes(tag))
        )
        .slice(0, 3);  // Limit to 3 recommendations

      return filteredRecommendations;
    };

    const generatedRecs = generateRecommendations();
    setRecommendations(generatedRecs);
  }, []);

  const handleSelectRecommendation = (recommendation) => {
    localStorage.setItem('selectedRecommendation', JSON.stringify(recommendation));
    navigate('/results');
  };

  const styles = {
    container: {
      backgroundColor: '#0a0a20',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    },
    title: {
      color: 'white',
      fontSize: '2.5em',
      marginBottom: '30px',
      textAlign: 'center'
    },
    recommendationGrid: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      flexWrap: 'wrap'
    },
    recommendationCard: {
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderRadius: '15px',
      width: '250px',
      padding: '20px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'transform 0.3s ease'
    },
    cardImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '10px',
      marginBottom: '15px'
    },
    cardTitle: {
      color: '#ff1493',
      fontSize: '1.5em',
      marginBottom: '10px'
    },
    cardDescription: {
      color: 'white',
      fontSize: '1em'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>CHOOSE YOUR ADVENTURE</h1>
      
      <div style={styles.recommendationGrid}>
        {recommendations.map((rec) => (
          <div 
            key={rec.id} 
            style={styles.recommendationCard}
            onClick={() => handleSelectRecommendation(rec)}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img 
              src={rec.imageSrc} 
              alt={rec.imageAlt} 
              style={styles.cardImage}
            />
            <h2 style={styles.cardTitle}>{rec.title}</h2>
            <p style={styles.cardDescription}>{rec.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsPage;