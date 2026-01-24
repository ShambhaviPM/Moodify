import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RecommendationData from './recommendation-data';

const PersonalizedContentPage = () => {
  const navigate = useNavigate();
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const mood = localStorage.getItem('selectedMood');
    const activity = localStorage.getItem('selectedActivity');
    const theme = localStorage.getItem('currentTheme');

    if (mood && activity && theme) {
      const recommendedContent = RecommendationData.findRecommendation(mood, activity, theme);
      setRecommendation(recommendedContent);
    }
  }, []);

  const styles = {
    body: {
      backgroundColor: '#0a0a20',
      color: 'white',
      fontFamily: "'Orbitron', sans-serif",
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    },
    container: {
      textAlign: 'center',
      maxWidth: '800px',
      margin: 'auto',
      padding: '20px'
    },
    title: {
      fontSize: '3.5em',
      lineHeight: 1.2,
      color: 'white',
      marginBottom: '50px',
      textAlign: 'center'
    },
    nextSection: {
      backgroundColor: '#ff1493',
      color: 'white',
      padding: '15px 30px',
      borderRadius: '25px',
      textDecoration: 'none',
      fontSize: '1.2em',
      transition: 'transform 0.3s ease'
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.title}>
          {recommendation 
            ? 'YOUR PERSONALIZED CONTENT IS READY!' 
            : 'GENERATING YOUR UNIQUE EXPERIENCE...'}
        </h1>
        
        {recommendation && (
          <Link 
            to="/content" 
            state={{ recommendedContent: recommendation }}
            style={styles.nextSection}
          >
            DISCOVER YOUR CONTENT
          </Link>
        )}
      </div>
    </div>
  );
};

export default PersonalizedContentPage;