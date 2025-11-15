import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Home, Star, MessageSquare, Heart, Ticket } from "lucide-react";

const Aside = styled.aside`
  width: 220px;
  border-right: 1px solid var(--line);
  padding: 16px 12px;
`;

const Brand = styled.div`
  height: 48px;
  display:flex;
  align-items:center;
  padding: 0 8px;
  font-weight: 700;
`;

const Item = styled(NavLink)`
  display:flex; align-items:center; gap:10px;
  font-size:14px;
  color:#374151;
  padding:10px 12px;
  border-radius:12px;
  margin:4px 0;
  &.active{
    background:#eef2ff;
    color:#1d4ed8;
  }
  &:hover{ background:#f4f4f5; }
`;

export default function Sidebar(){
  return (
    <Aside>
      <Brand>🎟️ Rhyview</Brand>
      <Item to="/" end><Home size={16}/>홈</Item>
      <Item to="/reviews"><Star size={16}/>리뷰</Item>
      <Item to="/community"><MessageSquare size={16}/>커뮤니티</Item>
      <Item to="/favorites"><Heart size={16}/>찜</Item>
      <Item to="/ticket"><Ticket size={16}/>티켓</Item>
      <div style={{position:"absolute", bottom:16, left:12, fontSize:12, color:"#9ca3af"}}>
        김** · 1,250 뷰
      </div>
    </Aside>
  );
}
