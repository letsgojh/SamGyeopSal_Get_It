import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import { venues } from "../data/venues";

const Section = styled.section`
  padding: 24px 32px;
  @media (max-width: 768px){ padding: 20px 16px; }
`;

const Grid3 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  @media (max-width: 960px){ grid-template-columns: 1fr; }
`;

const getBadgeColor = (category) => {
  switch (category) {
    case '뮤지컬': return 'var(--badge-blue)';
    case '연극': return '#6366f1';
    case '콘서트': return '#10b981';
    case '클래식': return '#f59e0b';
    case '경기장': return '#af0abeff';
    case '소극장': return '#f59e0b';
    default: return '#6b7280';
  }
};

export default function Home({ favorites = [], onToggleFavorite }) {
  const navigate = useNavigate();

  const hot = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
      title: "밤하늘 아래 어쿠스틱",
      subtitle: "카페 뮤직홀 (홍대)",
      period: "2024.11.08 - 2024.11.10",
      badge: "30% 할인",
      badgeColor: "var(--badge-rose)",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1515165562835-c3b8c2e0b4ad",
      title: "소극장 연극 <우리들의 이야기>",
      subtitle: "아르코예술극장 소극장",
      period: "2024.11.05 - 2024.11.25",
      badge: "잔여 45석",
      badgeColor: "var(--badge-amber)",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
      title: "인디밴드 <달빛요정역전만루홈런>",
      subtitle: "롤링홀",
      period: "2024.11.12",
      badge: "25% 할인 · 잔여 30석",
      badgeColor: "var(--badge-rose)",
    },
  ];

  return (
    <>
      <PageHeader title="환영합니다" desc="공연장 좌석 리뷰를 확인하고 공유하세요" />

      <Section>
        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 12 }}>놓치지 마세요</h3>
        <Grid3>
          {hot.map((c) => (
            <Card key={c.id} {...c} onClick={() => console.log("hot:", c.title)} isFavorite={favorites.includes(c.id)}
              onToggleFavorite={onToggleFavorite} />
          ))}
        </Grid3>
      </Section>

      <hr style={{ border: 0, borderTop: "1px solid var(--line)" }} />

      <Section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800 }}>인기 공연장</h3>
          <button
            style={{ background: "transparent", border: "none", color: "#6b7280", cursor: "pointer", fontSize: 13 }}
            onClick={() => navigate("/reviews")}
          >
            전체 리뷰 보기
          </button>
        </div>
        <Grid3>
          {venues.map((v) => (
            <Card
              key={v.id}
              id={v.id}
              image={v.image}
              title={v.name}
              subtitle={v.location}
              badge={v.category}
              badgeColor={getBadgeColor(v.category)}
              period={`⭐ ${v.rating} (${v.reviewCount}개 리뷰)`}
              onClick={() => navigate(`/venues/${v.id}`)}
              isFavorite={favorites.includes(v.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </Grid3>
      </Section>
    </>
  );
}