import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Home, Star, MessageSquare, Heart, Ticket, LogIn, LogOut } from "lucide-react";

const ProfileArea = styled.div`
  margin-top: auto; 
  padding-top: 10px;
  border-top: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ProfileBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #374151;
  padding: 10px 12px;
  border-radius: 12px;
  border: none;
  background: transparent;
  width: 100%;
  cursor: pointer;
  text-align: left;

  &:hover { background: #f4f4f5; }

  /* 반응형: 아이콘만 보이기 */
  @media (max-width: 768px) {
    justify-content: center;
    padding: 10px 0;
    span { display: none; }
    .user-info { display: none; }
  }
`;

const UserAvatar = styled.img`
  width: 24px; height: 24px; border-radius: 50%;
  background: #eee;
`;

const Aside = styled.aside`
  width: 240px;
  border-right: 1px solid var(--line);
  padding: 16px 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 768px) {
    width: 76px;
    padding: 12px 8px;
  }
`;

const BrandLink = styled(NavLink)`
  height: 52px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  font-weight: 800;
  letter-spacing: .2px;
  margin-bottom: 8px;
  cursor: pointer;

  span { margin-left: 8px; }

  &:hover { opacity: .9; }
  &.active { color: var(--brand); }

  @media (max-width: 768px) {
    justify-content: center;
    span { display: none; }
  }
`;

const LogoImg = styled.img`
  width: 28px;
  height: 28px;
  object-fit: contain;
  border-radius: 8px;
`;

const Item = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #374151;
  padding: 10px 12px;
  border-radius: 12px;
  margin: 4px 0;

  &.active { background: #eef2ff; color: #1d4ed8; }
  &:hover { background: #f4f4f5; }

  @media (max-width: 768px) {
    justify-content: center;
    padding: 10px 0;
    span { display: none; }
  }
`;

export default function Sidebar({ user, onLoginClick, onLogoutClick }) {
  return (
    <Aside>
      <BrandLink to="/" end>
        <LogoImg src="/posters/logo.png" alt="Rhyview 로고" />
        <span>Rhyview</span>
      </BrandLink>

      <div style={{ flex: 1 }}>
        <Item to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          <Home size={16} />
          <span>홈</span>
        </Item>
        <Item to="/reviews" className={({ isActive }) => (isActive ? "active" : "")}>
          <Star size={16} />
          <span>리뷰</span>
        </Item>
        <Item to="/community" className={({ isActive }) => (isActive ? "active" : "")}>
          <MessageSquare size={16} />
          <span>커뮤니티</span>
        </Item>
        <Item to="/favorites" className={({ isActive }) => (isActive ? "active" : "")}>
          <Heart size={16} />
          <span>팬</span>
        </Item>
        <Item to="/ticket"><Ticket size={16} /><span>티켓</span></Item>
      </div>

      {/* 로그인 부분 */}
      <ProfileArea>
        {user ? (
          <ProfileBtn onClick={onLogoutClick}>
            <UserAvatar src={user.avatar} alt="user" />
            <div className="user-info" style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span style={{ fontWeight: 600 }}>{user.name}</span>
              <span style={{ fontSize: 11, color: "#9ca3af" }}>로그아웃</span>
            </div>
            {/* 모바일에서는 로그아웃 아이콘만 보임 */}
            <LogOut size={20} className="mobile-only" style={{ display: "none" }} />
          </ProfileBtn>
        ) : (
          <ProfileBtn onClick={onLoginClick}>
            <LogIn size={20} />
            <span>로그인</span>
          </ProfileBtn>
        )}
      </ProfileArea>
    </Aside>
  );
}