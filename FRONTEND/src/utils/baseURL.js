const getBaseURL = () => {
  // Check if the app is running in production (Vercel)
  if (process.env.NODE_ENV === 'production') {
    return "https://book-store-backend-olive.vercel.app/"; // Vercel backend URL
  }
  
  // Default to localhost in development
  return "http://localhost:3000";
};

export default getBaseURL;
