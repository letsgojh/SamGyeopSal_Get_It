import React, { useState } from "react";
import styled from "styled-components";

const FormWrapper = styled.form`
  background: #fff;
  border-bottom: 1px solid var(--line);
  padding: 0 20px 20px;
`;

const Title = styled.h4`
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 16px;
  padding-top: 10px;
`;

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

  &:hover {
    opacity: 0.9;
  }
`;

export default function ReviewForm({ seatId, onSubmit }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("내용을 입력해주세요.");
      return;
    }

    onSubmit({
      id: Date.now(),
      seat: seatId,
      rating: Number(rating),
      title: "",
      text,
      user: "Rhyview User",
      time: "방금 전",
    });

    setRating(5);
    setText("");
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Title>리뷰 남기기</Title>

      <Select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        style={{ marginBottom: 12 }}
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
