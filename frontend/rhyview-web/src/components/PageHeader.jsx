import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  padding: 24px 32px 10px;
  border-bottom: 1px solid var(--line);
  background:#fff;

  @media (max-width: 768px) { padding: 18px 16px 8px; }
`;

const Title = styled.h1`
  font-size: 22px; margin:0; font-weight: 800; letter-spacing: .2px;
  @media (max-width: 768px){ font-size: 20px; }
`;
const Desc = styled.p`
  margin:6px 0 0; color:#6b7280; font-size:13px; line-height:1.5;
`;

export default function PageHeader({title, desc}){
  return (
    <Wrap>
      <Title>{title}</Title>
      {desc && <Desc>{desc}</Desc>}
    </Wrap>
  );
}
