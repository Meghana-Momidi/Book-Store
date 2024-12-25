const getBaseURL = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000"; // Local development URL
  } else {
    return "https://book-store-backend-ouepyd5kx-meghana-momidis-projects.vercel.app"; // Deployed backend URL on Vercel
  }
};

export default getBaseURL;
