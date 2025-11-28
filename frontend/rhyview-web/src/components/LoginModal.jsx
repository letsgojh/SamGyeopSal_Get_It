import React, { useState } from "react";
import styled from "styled-components";
import { loginUser, getUserInfo } from "../api/usersApi"; 

// ... (스타일 컴포넌트 생략 - 기존 유지) ...
const Form = styled.form` padding: 24px; display: flex; flex-direction: column; gap: 16px; `;
const Input = styled.input` width: 100%; padding: 12px; border: 1px solid var(--line); border-radius: 8px; background: #f9fafb; `;
const Button = styled.button` background: var(--brand); color: white; border: none; padding: 14px; border-radius: 8px; font-weight: 700; cursor: pointer; margin-top: 8px; `;
const ErrorMsg = styled.div` color: #ef4444; font-size: 13px; text-align: center; margin-top: -8px; `;

export default function LoginModal({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      console.log("🚀 1. 로그인 시도...");
      
      // 1. 로그인 요청
      const loginData = await loginUser(email, password);
      console.log("✅ 2. 로그인 성공:", loginData);
      
      const token = loginData.token;
      if (!token) throw new Error("토큰이 없습니다.");

      // 2. 내 정보 요청
      let userInfo = await getUserInfo(token);
      console.log("✅ 3. 내 정보 조회 결과:", userInfo);

      // 백업 로직
      if (!userInfo && loginData.user) {
         userInfo = loginData.user;
      }
      
      // 🚨 안전장치: userInfo가 없으면 빈 객체라도 사용
      const safeUserInfo = userInfo || { id: 0, name: "알 수 없음", email: "" };

      // 3. 최종 데이터 조합
      const userToSave = {
        ...safeUserInfo, 
        token: token,
        avatar: "https://cdn-icons-png.flaticon.com/512/847/847969.png"
      };

      console.log("🚀 4. 부모 컴포넌트(App.jsx)로 데이터 전달 직전:", userToSave);

      // ⭐️ 여기가 핵심! onLogin 실행 중 에러가 나는지 확인
      if (typeof onLogin === 'function') {
          try {
              onLogin(userToSave);
              console.log("✅ 5. onLogin 실행 완료 (모달 닫혀야 함)");
          } catch (innerErr) {
              console.error("🚨 onLogin 함수 내부에서 에러 발생:", innerErr);
              // 여기서 에러가 나도 이미 setUser는 되었을 수 있음.
              // 이 에러는 무시하거나, 별도로 처리해야 함.
          }
      } else {
          console.error("🚨 onLogin prop이 함수가 아닙니다!", onLogin);
          throw new Error("로그인 처리 함수가 연결되지 않았습니다.");
      }

    } catch (err) {
      console.error("❌ 로그인 프로세스 전체 에러:", err);
      const msg = err.response?.data?.message || err.message || "로그인 실패";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <Button type="submit" disabled={loading}>{loading ? "로그인 중..." : "로그인"}</Button>
    </Form>
  );
}