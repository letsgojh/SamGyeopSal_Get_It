// src/components/ReviewForm.jsx

import React, { useState } from "react";
import styled from "styled-components";

const FormCard = styled.form`
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
`;

const Title = styled.h4`
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 16px;
`;

// 폼 요소들을 감싸는 그리드
const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2열 그리드 */
  gap: 12px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* 모바일에선 1열 */
  }
`;

// 폼 입력 필드 (공통 스타일)
const BaseInput = `
  width: 100%;
  border: 1px solid #d1d5db; /* --line 보다 조금 더 진하게 */
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 13px;
  background: #f9fafb;
  color: var(--text);
  font-family: inherit;

  &::placeholder { color: #9ca3af; }
  &:focus {
    outline: none;
    border-color: var(--brand);
    background: #fff;
  }
`;

const Input = styled.input`
  ${BaseInput}
`;

const Select = styled.select`
  ${BaseInput}
`;

const Textarea = styled.textarea`
  ${BaseInput}
  height: 80px;
  resize: vertical;
  margin-bottom: 12px;
`;

const PrimaryButton = styled.button`
  border: none;
  background: var(--brand);
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  width: 100px;
  
  &:hover { opacity: 0.9; }
`;

export default function ReviewForm({ onSubmit }) {
  const [seat, setSeat] = useState("");
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!seat || !title || !text) {
      alert("좌석, 제목, 내용을 모두 입력해주세요.");
      return;
    }

    // 부모 컴포넌트(VenueDetail)에서 받은 onSubmit 함수를 실행
    onSubmit({
      id: Date.now(), // 임시로 현재 시간을 ID로 사용
      seat,
      rating: Number(rating),
      title,
      text,
      user: "Rhyview ю저", // (임시)
      time: "방금 전",
    });

    // 폼 초기화
    setSeat("");
    setRating(5);
    setTitle("");
    setText("");
  };

  return (
    <FormCard onSubmit={handleSubmit}>
      <Title>리뷰 남기기</Title>
      
      <FieldGrid>
        <Input
          placeholder="좌석 (예: 1층 C구역 4열 12번)"
          value={seat}
          onChange={(e) => setSeat(e.target.value)}
        />
        <Select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value={5}>★ 5 (최고)</option>
          <option value={4}>★ 4 (좋음)</option>
          <option value={3}>★ 3 (보통)</option>
          <option value={2}>★ 2 (별로)</option>
          <option value={1}>★ 1 (나쁨)</option>
        </Select>
      </FieldGrid>
      
      <Input
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: 12 }}
      />
      
      <Textarea
        placeholder="리뷰 내용"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      
      <PrimaryButton type="submit">등록</PrimaryButton>
    </FormCard>
  );
}