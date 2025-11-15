import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root{
    --bg:#f7f8fb;
    --text:#111827;
    --muted:#6b7280;
    --soft:#9ca3af;
    --line:#e5e7eb;
    --brand:#2563eb;
    --badge-rose:#f43f5e;
    --badge-amber:#f59e0b;
    --badge-blue:#3b82f6;
    --card-shadow: 0 10px 24px rgba(0,0,0,.08);
  }
  *{ box-sizing:border-box; }
  html,body,#root{ height:100%; }
  body{
    margin:0;
    color:var(--text);
    background:var(--bg);
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial,
      "Apple SD Gothic Neo","Noto Sans KR","Malgun Gothic", sans-serif;
  }
  a{text-decoration:none; color:inherit}
  img{ display:block; max-width:100%; }
`;

export const AppShell = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  background:#fff;
  min-height:100dvh;
  display:flex;
  border-left:1px solid var(--line);
  border-right:1px solid var(--line);

  @media (max-width: 960px) {
    max-width: 100%;
    border-left:none;
    border-right:none;
  }
`;

export const Main = styled.main`
  flex:1;
  background:#fff;
  min-width:0; /* flex 컨테이너에서 내용 넘침 방지 */
`;
