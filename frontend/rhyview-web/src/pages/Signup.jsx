import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { signupUser } from "../api/usersApi"; // API 함수 임포트

const Container = styled.div`
  max-width: 480px;
  margin: 40px auto;
  padding: 0 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #ffffff;
  padding: 32px;
  border-radius: 16px;
  border: 1px solid var(--line);
  box-shadow: var(--card-shadow);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  font-size: 14px;
  background: #f9fafb;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: var(--brand);
    background: #fff;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
`;

const Button = styled.button`
  background: var(--brand);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s;

  &:hover { background: #1d4ed8; }
  &:disabled { background: #9ca3af; cursor: not-allowed; }
`;

const ErrorMsg = styled.div`
  color: #ef4444;
  font-size: 13px;
  text-align: center;
  background: #fef2f2;
  padding: 10px;
  border-radius: 8px;
`;

export default function Signup() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 1. 유효성 검사
    if (!formData.name || !formData.email || !formData.password) {
      setError("모든 정보를 입력해주세요.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (formData.password.length < 4) {
        setError("비밀번호는 4자리 이상이어야 합니다.");
        return;
    }

    // 2. API 호출
    try {
      setLoading(true);
      await signupUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      alert("회원가입이 완료되었습니다! 로그인해주세요.");
      navigate("/"); // 홈으로 이동 (또는 로그인 모달을 띄우게 할 수도 있음)

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="회원가입" desc="Rhyview의 회원이 되어 다양한 혜택을 누려보세요." />
      
      <Container>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>이름 (닉네임)</Label>
            <Input 
              name="name" 
              placeholder="예: 홍길동" 
              value={formData.name} 
              onChange={handleChange} 
            />
          </InputGroup>

          <InputGroup>
            <Label>이메일</Label>
            <Input 
              type="email" 
              name="email" 
              placeholder="user@example.com" 
              value={formData.email} 
              onChange={handleChange} 
            />
          </InputGroup>

          <InputGroup>
            <Label>비밀번호</Label>
            <Input 
              type="password" 
              name="password" 
              placeholder="4자리 이상 입력" 
              value={formData.password} 
              onChange={handleChange} 
            />
          </InputGroup>

          <InputGroup>
            <Label>비밀번호 확인</Label>
            <Input 
              type="password" 
              name="confirmPassword" 
              placeholder="비밀번호를 다시 입력하세요" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
            />
          </InputGroup>

          {error && <ErrorMsg>{error}</ErrorMsg>}

          <Button type="submit" disabled={loading}>
            {loading ? "가입 중..." : "회원가입 완료"}
          </Button>
        </Form>
      </Container>
    </>
  );
}