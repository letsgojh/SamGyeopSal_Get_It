import React from "react";
import styled from "styled-components";

const Pill = styled.span`
  display:inline-block;
  font-size:12px;
  line-height:1;
  color:#fff;
  background:${({color})=>color || "var(--badge-blue)"};
  padding:6px 10px;
  border-radius:9999px;
`;

export default function Tag({children, color}){
  return <Pill color={color}>{children}</Pill>;
}