import React, { useState, useEffect } from "react";
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

import Signup from "./pages/Signup";

import { getUserInfo, getUserFavorites, addFavorite, removeFavorite } from "./api/usersApi";


export default function App() {
  // ["show-1", "venue-2"] 형태로 저장됨
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // 1. 초기 데이터 로드
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserInfo(token).then((userData) => {
        if (userData) {
          setUser({ ...userData, token });
          refreshFavorites(token);
        } else {
          localStorage.removeItem("token");
        }
      });
    }
  }, []);

  const refreshFavorites = async (token) => {
    const data = await getUserFavorites(token);
    setFavorites(data);
  };

  const handleToggleFavorite = async (id, type) => {
    if (!user) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    const uniqueId = `${type}-${id}`;
    const isAlreadyFavorite = favorites.includes(uniqueId);

    setFavorites((prev) =>
      isAlreadyFavorite
        ? prev.filter(item => item !== uniqueId) // 삭제
        : [...prev, uniqueId]                    // 추가
    );

    // (2) API 호출
    try {
      if (isAlreadyFavorite) {
        await removeFavorite(id, type, user.token);
      } else {
        await addFavorite(id, type, user.token);
      }
    } catch (err) {
      console.error("찜 변경 실패 (롤백)", err);
      // 실패 시 원래대로 되돌리기 (목록 다시 불러오기)
      refreshFavorites(user.token);
    }
  };

  const handleLogin = async (userData) => {
    setUser(userData);
    if (userData.token) {
      localStorage.setItem("token", userData.token);
      refreshFavorites(userData.token);
    }
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      setUser(null);
      setFavorites([]);
      localStorage.removeItem("token");
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
            <Route path="/" element={<Home favorites={favorites} onToggleFavorite={handleToggleFavorite} />} />
            <Route path="/reviews" element={<Reviews favorites={favorites} onToggleFavorite={handleToggleFavorite} />} />
            <Route path="/community" element={<Community user={user} />} />
            <Route path="/favorites" element={<Favorites user={user} favorites={favorites} onToggleFavorite={handleToggleFavorite} />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/venues/:id" element={<VenueDetail />} />
            <Route path="/signup" element={<Signup />} />
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