import React from "react";
import { Routes, Route } from "react-router-dom";
import { GlobalStyle, AppShell, Main } from "./styles/global";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Reviews from "./pages/Reviews";
import Community from "./pages/Community";
import VenueDetail from "./pages/VenueDetail";

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
            <Route path="/community" element={<Community />} />
            <Route path="/venues/:id" element={<VenueDetail />} />
          </Routes>
        </Main>
      </AppShell>
    </>
  );
}
