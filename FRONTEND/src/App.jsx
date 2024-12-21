import { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import "./App.css";
import OfferCarousel from "./components/OfferCarousel";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, useThemeContext } from "./context/ThemeContext";
import ScrollToTop from './components/ScrollToTop';

const offers = [
  { title: "🔥 Upto 50% off on your 1st order! 🔥" },
  { title: "💸 Get rewards on every order! 💸" },
  { title: "🎁 Buy 2 Get 1 Free sitewide! 🎁" },
  { title: "⭐ Flat 20% discount from 4th order! ⭐" },
];

function AppContent() {
  const { isDarkMode } = useThemeContext();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="w-full min-h-screen">
      <ScrollToTop/>
      <OfferCarousel offers={offers} />
      <Navbar />
      <main className="max-w-screen mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
