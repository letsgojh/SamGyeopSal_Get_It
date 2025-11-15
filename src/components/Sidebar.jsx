import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Home, Star, MessageSquare, Heart, Ticket } from "lucide-react";

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

const Footer = styled.div`
  position: absolute;
  bottom: 16px;
  left: 12px;
  right: 12px;
  font-size: 11px;
  color: #9ca3af;

  @media (max-width: 768px) { display:none; }
`;

export default function Sidebar() {
  return (
    <Aside>
      <BrandLink to="/" end>
        <span role="img" aria-label="ticket">🎟️</span>
        <span>Rhyview</span>
      </BrandLink>

      <Item to="/" end><Home size={16}/><span>홈</span></Item>
      <Item to="/reviews"><Star size={16}/><span>리뷰</span></Item>
      <Item to="/community"><MessageSquare size={16}/><span>커뮤니티</span></Item>
      <Item to="/favorites"><Heart size={16}/><span>찜</span></Item>
      <Item to="/ticket"><Ticket size={16}/><span>티켓</span></Item>

      <Footer>김** · 1,250 뷰</Footer>
    </Aside>
  );
}
