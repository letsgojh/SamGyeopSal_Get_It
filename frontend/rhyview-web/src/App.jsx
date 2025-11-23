import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { GlobalStyle, AppShell, Main } from "./styles/global";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Reviews from "./pages/Reviews";
import Community from "./pages/Community";
import VenueDetail from "./pages/VenueDetail";
import Favorites from "./pages/Favorites";

export default function App() {
  const [favorites, setFavorites] = useState([]);

  //❗ 3. 찜 토글 함수 (있으면 삭제, 없으면 추가)
  const handleToggleFavorite = (id) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id); // 삭제
      } else {
        return [...prev, id]; // 추가
      }
    });
  };

  return (
    <>
      <GlobalStyle />
      <AppShell>
        <Sidebar />
        <Main>
          <Routes>
            <Route path="/" element={<Home
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />} />
            <Route
              path="/reviews"
              element={
                <Reviews
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              } />
            <Route path="/community" element={<Community />} />
            <Route
              path="/favorites"
              element={
                <Favorites
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              }
            />
            <Route path="/venues/:id" element={<VenueDetail />} />
          </Routes>
        </Main>
      </AppShell>
    </>
  );
}