import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { GlobalStyle, AppShell, Main } from "./styles/global";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Reviews from "./pages/Reviews";
import Community from "./pages/Community";
import VenueDetail from "./pages/VenueDetail";
import Favorites from "./pages/Favorites";
import Modal from "./components/Modal";
import LoginModal from "./components/LoginModal";
import Tickets from "./pages/Tickets";


export default function App() {
  const [favorites, setFavorites] = useState([]);

  const handleToggleFavorite = (id) => {
    if (!user) {
      alert("로그인 후 이용해주세요.");
      return;
    }
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // 로그인 상태 및 모달 관리
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // 로그인 처리 함수
  const handleLogin = (userData) => {
    console.log("로그인 성공:", userData);
    setUser(userData);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      setUser(null);
    }
  };

  return (
    <>
      <GlobalStyle />
      <AppShell>
        <Sidebar
          user={user}
          onLoginClick={() => setIsLoginModalOpen(true)}
          onLogoutClick={handleLogout}
        />
        <Main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              }
            />
            <Route
              path="/reviews"
              element={
                <Reviews
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              }
            />
            <Route path="/community" element={<Community user={user} />} />
            <Route
              path="/favorites"
              element={
                <Favorites
                  user={user}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              }
            />
            <Route path="/venues/:id" element={<VenueDetail />} />
            <Route path="/tickets" element={<Tickets />} />
          </Routes>
        </Main>
      </AppShell>
      <Modal
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        title="로그인"
      >
        <LoginModal onLogin={handleLogin} />
      </Modal>
    </>
  );
}
