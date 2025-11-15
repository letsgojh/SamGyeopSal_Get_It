import React from "react";
import styled from "styled-components";
import { X } from "lucide-react";

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 40;
`;

const Dialog = styled.div`
  background: #ffffff;
  border-radius: 18px;
  max-width: 640px;
  width: 92%;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 14px 18px;
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  padding: 4px;
  border-radius: 999px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background: #f3f4f6;
  }
`;

const Body = styled.div`
  padding: 16px 18px 20px;
  overflow-y: auto;
  font-size: 14px;
  color: #374151;
`;

export default function Modal({ open, title, onClose, children }) {
  if (!open) return null;
  const stop = (e) => e.stopPropagation();

  return (
    <Backdrop onClick={onClose}>
      <Dialog onClick={stop}>
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={onClose} aria-label="close">
            <X size={16} />
          </CloseButton>
        </Header>
        <Body>{children}</Body>
      </Dialog>
    </Backdrop>
  );
}
