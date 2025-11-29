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
import Signup from "./pages/Signup";

import { getUserInfo, getUserFavorites, addFavorite, removeFavorite } from "./api/usersApi";

export default function App() {
  // ✅ favorites 상태: 이제 ["show-1", "venue-2"] 같은 문자열 배열로 관리합니다.
  const [favorites, setFavorites] = useState([]); 
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
    // ⚠️ 백엔드가 숫자만 준다면, 일단 전부 'show-'를 붙여서 복구하는 수밖에 없습니다.
    // (백엔드에 type 필드가 없다면 공연장 찜은 저장이 안 될 수도 있습니다.)
    const ids = data.map(item => `show-${item.id || item}`); 
    setFavorites(ids);
  };

  // ✅ [핵심 수정] id뿐만 아니라 type도 받아서 처리
  // type이 없으면 기본값 'show'
  const handleToggleFavorite = async (id, type = 'show') => {
    if (!user) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    // 1. 프론트엔드용 ID 생성 (예: "show-1", "venue-5")
    const uniqueId = `${type}-${id}`;

    // 2. 낙관적 업데이트 (UI 먼저 변경)
    setFavorites((prev) => 
      prev.includes(uniqueId) 
        ? prev.filter(item => item !== uniqueId) 
        : [...prev, uniqueId]
    );

    // 3. API 호출 (백엔드에는 숫자 ID만 보냄)
    // 주의: 백엔드가 '공연' 찜하기만 지원한다면, '공연장' 찜하기는 에러가 나거나 공연 테이블에 잘못 저장될 수 있습니다.
    try {
      const isAlreadyFavorite = favorites.includes(uniqueId);
      if (isAlreadyFavorite) {
        await removeFavorite(id, user.token);
      } else {
        await addFavorite(id, user.token);
      }
    } catch (err) {
      console.error("찜 변경 실패");
      refreshFavorites(user.token); // 실패 시 원상복구
    }
  };

  const handleLogin = async (userData) => {
    console.log("로그인 성공:", userData);
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
            <Route path="/favorites" element={<Favorites user={user} onToggleFavorite={handleToggleFavorite} />} />
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