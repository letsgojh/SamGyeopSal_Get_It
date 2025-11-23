import React, { useState } from "react";
import styled from "styled-components";

const Wrap = styled.div`
  transition: transform .1s ease-out, box-shadow .2s ease;
  transform: ${({pressed}) => pressed ? "scale(0.985)" : "scale(1)"};
  box-shadow: ${({pressed}) => pressed ? "0 6px 16px rgba(0,0,0,.10)" : "var(--card-shadow)"};
  border-radius: 16px;
  cursor: pointer;
`;

export default function Pressable({children, onClick, as="div"}){
  const [pressed,setPressed] = useState(false);
  const Comp = as;
  return (
    <Comp
      onMouseDown={()=>setPressed(true)}
      onMouseUp={()=>setPressed(false)}
      onMouseLeave={()=>setPressed(false)}
      onClick={onClick}
      style={{display:"block"}}
    >
      <Wrap pressed={pressed}>{children}</Wrap>
    </Comp>
  );
}