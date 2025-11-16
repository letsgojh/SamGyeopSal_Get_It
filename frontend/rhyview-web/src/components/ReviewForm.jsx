// src/components/ReviewForm.jsx

import React, { useState } from "react"; // 👈 useEffect 제거
import styled from "styled-components";

// 1. 폼의 스타일을 수정합니다. (테두리, 그림자 등 제거)
const FormWrapper = styled.form`
  background: #fff;
  border-bottom: 1px solid var(--line); /* 👈 목록과 구분을 위한 상단 선 */
  padding: 0 20px 20px;
//   리뷰 작성하는 부분이 밑에 가있는게 나으면 :padding: 20px;
//   그리고 border-botton -> border-top 으로 바꾸고
//   22번째 줄을 지운다.

  /* _Remove_: border, border-radius, margin-bottom */
`;

const Title = styled.h4`
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 16px;
  padding-top: 10px;
`;

// 👈 2. FieldGrid 컴포넌트는 이제 필요 없습니다. (삭제)

// 폼 입력 필드 (공통 스타일)
const BaseInput = `
  width: 100%;
  border: 1px solid #d1d5db;
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

// 👈 3. Input 컴포넌트는 이제 필요 없습니다. (삭제)
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

// 👈 4. props로 seatId를 받습니다.
export default function ReviewForm({ seatId, onSubmit }) {
  // 👈 5. seat, title state 제거
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  // 👈 6. useEffect 제거

  const handleSubmit = (e) => {
    e.preventDefault();
    // 👈 7. 유효성 검사에서 seat, title 제거
    if (!text) {
      alert("내용을 입력해주세요.");
      return;
    }

    // 👈 8. onSubmit으로 seatId를 prop에서 바로 넘깁니다. title은 빈 문자열로.
    onSubmit({
      id: Date.now(),
      seat: seatId, // prop으로 받은 seatId 사용
      rating: Number(rating),
      title: "", // 제목 필드 제거됨
      text,
      user: "Rhyview ю저",
      time: "방금 전",
    });

    // 👈 9. 폼 초기화
    setRating(5);
    setText("");
  };

  return (
    // 👈 10. FormCard -> FormWrapper로 변경
    <FormWrapper onSubmit={handleSubmit}>
      <Title>리뷰 남기기</Title>
      
      {/* 👈 11. 좌석, 제목 입력란 제거. 별점 Select만 남김 */}
      <Select 
        value={rating} 
        onChange={(e) => setRating(e.target.value)}
        style={{ marginBottom: 12 }} // width: 100%는 BaseInput에 이미 있음
      >
        <option value={5}>★ 5 (최고)</option>
        <option value={4}>★ 4 (좋음)</option>
        <option value={3}>★ 3 (보통)</option>
        <option value={2}>★ 2 (별로)</option>
        <option value={1}>★ 1 (나쁨)</option>
      </Select>
      
      <Textarea
        placeholder="리뷰 내용"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      
      <PrimaryButton type="submit">등록</PrimaryButton>
    </FormWrapper>
  );
}