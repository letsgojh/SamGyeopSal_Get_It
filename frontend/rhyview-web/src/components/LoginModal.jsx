import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  font-size: 14px;
  background: #f9fafb;
  &:focus { outline: 2px solid var(--brand); border-color: transparent; }
`;

const Button = styled.button`
  background: var(--brand);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 8px;
  &:hover { opacity: 0.9; }
`;

export default function LoginModal({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    // 간단한 데이터 전송 (실제로는 여기서 API 호출)
    onLogin(email, password);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <div style={{fontSize:13, fontWeight:600, marginBottom:6, color:"#374151"}}>이메일</div>
        <Input 
          type="email" 
          placeholder="user@rhyview.com" 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
      </div>
      <div>
        <div style={{fontSize:13, fontWeight:600, marginBottom:6, color:"#374151"}}>비밀번호</div>
        <Input 
          type="password" 
          placeholder="********" 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
      </div>
      <Button type="submit">로그인하기</Button>
    </Form>
  );
}