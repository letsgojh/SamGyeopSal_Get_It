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

export default function App() {
  // 찜 상태 관리
  const [favorites, setFavorites] = useState([]);

  // 찜 누를 때 작동하는 함수
  const handleToggleFavorite = (id) => {
    if (!user) {  // 로그인 확인
      alert("로그인 후 이용해주세요.");
      return;
    }
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id); // 찜 삭제
      } else {
        return [...prev, id]; // 찜 추가
      }
    });
  };

  // 로그인 상태 및 모달 관리
  const [user, setUser] = useState(null); // null이면 비로그인
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // 로그인 처리 함수
  const handleLogin = (userData) => {
    console.log("로그인 성공:", userData);
    setUser(userData);
    setIsLoginModalOpen(false);
  };

  // 로그아웃 처리
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