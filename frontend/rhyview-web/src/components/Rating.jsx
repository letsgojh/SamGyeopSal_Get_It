import React from "react";
import styled from "styled-components";

const Box = styled.div`
  display:flex; align-items:center; gap:6px;
  font-size:12px; color:#6b7280;
`;

export default function Rating({value, count}){
  return (
    <Box>
      <span style={{color:"#f59e0b"}}>★</span>
      <span>{value}</span>
      {typeof count !== "undefined" && <span>({count})</span>}
    </Box>
  );
}

