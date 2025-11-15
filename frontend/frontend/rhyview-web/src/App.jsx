import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Reviews from "./pages/Reviews";
import { GlobalStyle, AppShell, Main } from "./styles/global";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <AppShell>
        <Sidebar />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reviews" element={<Reviews />} />
            {/* 나머지 메뉴는 추후 추가 */}
          </Routes>
        </Main>
      </AppShell>
    </>
  );
}
