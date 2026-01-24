const RecommendationData = {
    contentSections: [
        {
          id: 'rpg',
          title: 'ROLE-PLAYING GAMES',
          description: 'Level up your knowledge with games that make you think, laugh, and learn—it\'s fun, but practical!',
          imageSrc: '/game.webp',
          imageAlt: 'Role Playing Games',
          tags: ['TECH', 'LEARNING SOMETHING NEW'],
          links: [
            { label: 'Play Skyrim Online', url: 'https://elderscrollsonline.com' },
            { label: 'Try Dungeons & Dragons', url: 'https://dndbeyond.com' }
          ]
        },
        {
          id: 'music',
          title: 'MUSIC EXPLORATION',
          description: "Discover rhythms tailored to your style—whether you're working, chilling, or creating pure musical magic!",
          imageSrc: '/music.jpeg',
          imageAlt: 'Music Genres',
          tags: ['ART & DESIGN', 'UNWINDING AND RELAXING'],
          links: [
            { label: 'Spotify Relaxing Playlist', url: 'https://open.spotify.com/playlist/6NH9fMwCF0H9Nu0ZgHG5CB?si=e4d80e0b603b4b08' },
            { label: 'Top Music Genres on YouTube', url: 'https://youtu.be/26y4z18I61c?si=9PQTy_sG7S8AcIYy' }
          ]
        },
        {
          id: 'fitness-podcast',
          title: 'FITNESS PODCAST',
          description: 'Energize your day with motivational fitness stories and expert insights to keep you moving!',
          imageSrc: '/fitness.jpg',
          imageAlt: 'Fitness Podcast',
          tags: ['FITNESS', 'GETTING CREATIVE'],
          links: [
            { label: 'Listen to The Fitness Guru Podcast', url: 'https://podcasts.apple.com/us/podcast/the-fitness-guru/id1234567890' },
            { label: 'Watch Fitness Motivational Videos', url: 'https://www.youtube.com/results?search_query=fitness+motivation' }
          ]
        },
        {
          id: 'travel-documentaries',
          title: 'TRAVEL DOCUMENTARIES',
          description: 'Explore the world from your screen with captivating stories of culture, adventure, and human connection.',
          imageSrc: '/travel.jpeg',
          imageAlt: 'Travel Documentaries',
          tags: ['TRAVEL AND CULTURE', 'LEARNING SOMETHING NEW'],
          links: [
            { label: 'Watch Travel Diaries on Netflix', url: 'https://www.netflix.com/browse/genre/genre_id' },
            { label: 'Explore National Geographic Stories', url: 'https://www.nationalgeographic.com/travel/' }
          ]
        }
      ],
      
    recommendationMatrix: {
      mood: {
        'HAPPY': {
          preference: ['TECH', 'ART & DESIGN'],
          boost: 1.2
        },
        'NEUTRAL': {
          preference: ['FITNESS', 'TRAVEL AND CULTURE'],
          boost: 1.0
        },
        'NOT SO GREAT': {
          preference: ['UNWINDING AND RELAXING', 'ART & DESIGN'],
          boost: 0.9
        }
      },
      theme: {
        'LEARNING SOMETHING NEW': ['rpg','travel-documentaries'],
        'UNWINDING AND RELAXING': [ 'fitness-podcast','music'],
        'GETTING CREATIVE': ['rpg',]
      }
    },

    findRecommendation(mood, activity, theme) {
  // Validate inputs
  if (!mood || !activity || !theme) {
    console.warn('Missing required parameters. Returning default content.');
    return this.contentSections[0]; // Default to the first content section
  }

  const moodProfile = this.recommendationMatrix.mood[mood];
  const themeRecommendations = this.recommendationMatrix.theme[theme];

  // Ensure moodProfile and themeRecommendations exist
  if (!moodProfile || !themeRecommendations) {
    console.warn('Invalid mood or theme. Returning default content.');
    return this.contentSections[0];
  }

  // Filter content based on theme recommendations
  const filteredContent = this.contentSections.filter(section =>
    themeRecommendations.includes(section.id)
  );

  if (filteredContent.length === 0) {
    console.warn('No match found for theme. Returning default content.');
    return this.contentSections[0];
  }

  // Add weighted randomness based on mood boost
  const weightedContent = filteredContent.map(content => ({
    content,
    weight: moodProfile.preference.includes(content.tags[0]) ? moodProfile.boost : 1
  }));

  // Randomly pick a content item based on weight
  const totalWeight = weightedContent.reduce((sum, item) => sum + item.weight, 0);
  const randomValue = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (const { content, weight } of weightedContent) {
    cumulativeWeight += weight;
    if (randomValue <= cumulativeWeight) {
      return content;
    }
  }

  // Fallback (this should rarely trigger)
  console.warn('Random selection failed. Returning default content.');
  return this.contentSections[0];
}

}
      
  export default RecommendationData;