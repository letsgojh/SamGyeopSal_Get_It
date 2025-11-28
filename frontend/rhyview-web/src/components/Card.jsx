import React from "react";
import styled from "styled-components";
import { Heart } from "lucide-react";
import Pressable from "./Pressable";
import Tag from "./Tag";

const Shell = styled.div`
  background:#fff;
  border:1px solid var(--line);
  border-radius:16px;
  overflow:hidden;
`;

const ImgBox = styled.div`
  position:relative;
  width:100%;
  aspect-ratio: 16 / 10; 
  background:#eee;
  img{ width:100%; height:100%; object-fit:cover; display:block; }
  .badge{ position:absolute; top:12px; left:12px; }
`;

const Body = styled.div` padding:16px; color:#374151; `;
const Subtitle = styled.div` font-size:13px; color:#6b7280; `;
const Title = styled.div`
  font-size:16px; font-weight:700; margin-top:6px; color:#111827;
  letter-spacing:.2px;
`;
const Foot = styled.div` margin-top:10px; font-size:12px; color:#9ca3af; `;

const HeartBtn = styled.button`
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background: rgba(255, 255, 255, 0.9); 
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10; 
  transition: transform 0.2s, background 0.2s;

  &:hover {
    background: #fff;
    transform: scale(1.1);
  }
  
  /* 눌렸을 때 효과 */
  &:active {
    transform: scale(0.95);
  }
`;

export default function Card({ id, image, title, subtitle, badge, badgeColor, period, onClick, isFavorite, onToggleFavorite, ...props }) {
  // 하트 클릭 핸들러
  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
  };

  return (
    <Pressable onClick={onClick} {...props}>
      <Shell>
        <ImgBox>
          <img src={image} alt="" />
          {!!badge && (
            <div className="badge">
              <Tag color={badgeColor}>{badge}</Tag>
            </div>
          )}
        </ImgBox>
        <Body>
          {!!subtitle && <Subtitle>{subtitle}</Subtitle>}
          <Title>{title}</Title>
          {!!period && <Foot>{period}</Foot>}
        </Body>
        <HeartBtn onClick={handleHeartClick}>
          <Heart
            size={18}
            color="black"
            fill={isFavorite ? "#f43f5e" : "white"}
            strokeWidth={2}
          />
        </HeartBtn>
      </Shell>
    </Pressable>
  );
}