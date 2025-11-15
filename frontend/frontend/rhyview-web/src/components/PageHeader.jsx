import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  padding:24px 32px 8px;
  border-bottom:1px solid var(--line);
  background:#fff;
`;

const Title = styled.h1`
  font-size:22px; margin:0; font-weight:700;
`;
const Desc = styled.p`
  margin:6px 0 0; color:#6b7280; font-size:13px;
`;

export default function PageHeader({title, desc}){
  return (
    <Wrap>
      <Title>{title}</Title>
      {desc && <Desc>{desc}</Desc>}
    </Wrap>
  );
}
