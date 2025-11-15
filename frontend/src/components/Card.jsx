import React from "react";
import styled from "styled-components";
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
  aspect-ratio: 16 / 10; /* 반응형 이미지 높이 */
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

export default function Card({ image, title, subtitle, badge, badgeColor, period, onClick }){
  return (
    <Pressable onClick={onClick}>
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
      </Shell>
    </Pressable>
  );
}
