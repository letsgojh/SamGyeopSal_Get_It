import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import { venues, hotDeals } from "../data/venues";
import Modal from "../components/Modal";

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
  const [selectedAd, setSelectedAd] = useState(null);

  return (
    <>
      <PageHeader title="환영합니다" desc="공연장 좌석 리뷰를 확인하고 공유하세요" />

      <Section>
        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 12 }}>놓치지 마세요</h3>
        <Grid3>
          {hotDeals.map((c) => (
            <Card
              key={c.id}
              {...c}
              onClick={() => setSelectedAd(c)}
              isFavorite={favorites.includes(c.id)}
              onToggleFavorite={onToggleFavorite}
            />
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

      <Modal
        open={!!selectedAd}
        onClose={() => setSelectedAd(null)}
        title={selectedAd?.title || "광고"}
      >
        {selectedAd && (
          <a href={selectedAd.adLink} target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
            <img
              src={selectedAd.adImage}
              alt={selectedAd.title}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          </a>
        )}
      </Modal>
    </>
  );
}