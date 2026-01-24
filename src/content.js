import React from 'react';
import { useLocation } from 'react-router-dom';

const ContentPage = () => {
  const location = useLocation();
  const recommendedContent = location.state?.recommendedContent;

  const styles = {
    body: {
      backgroundColor: '#0a0a20',
      color: 'white',
      fontFamily: "'Orbitron', sans-serif",
      minHeight: '100vh',
      padding: '40px'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    imageContainer: {
      width: '100%',
      maxWidth: '600px',
      marginBottom: '30px',
      borderRadius: '15px',
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '400px',
      objectFit: 'cover'
    },
    title: {
      fontSize: '2.5em',
      color: '#ff1493',
      marginBottom: '20px',
      textAlign: 'center'
    },
    description: {
      fontSize: '1.2em',
      textAlign: 'center',
      maxWidth: '800px',
      lineHeight: 1.6,
      marginBottom: '30px'
    },
    button: {
      backgroundColor: '#ff1493',
      color: 'white',
      padding: '15px 30px',
      borderRadius: '25px',
      textDecoration: 'none',
      fontSize: '1.1em',
      margin: '10px',
      transition: 'transform 0.3s ease'
    },
    linkContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px'
    }
  };

  return (
    <div style={styles.body}>
      {recommendedContent ? (
        <div style={styles.container}>
          <div style={styles.imageContainer}>
            <img 
              src={recommendedContent.imageSrc} 
              alt={recommendedContent.imageAlt} 
              style={styles.image}
            />
          </div>
          
          <h2 style={styles.title}>
            {recommendedContent.title}
          </h2>
          
          <p style={styles.description}>
            {recommendedContent.description}
          </p>

          {recommendedContent.links && (
            <div style={styles.linkContainer}>
              {recommendedContent.links.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={styles.button}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div style={styles.container}>
          <h2 style={styles.title}>
            NO CONTENT FOUND
          </h2>
        </div>
      )}
    </div>
  );
};

export default ContentPage;
