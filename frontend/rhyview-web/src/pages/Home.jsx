import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Modal from "../components/Modal";

import { API_BASE, getShows } from "../api/showApi";   // 공연 API (상단용)
import { getVenues } from "../api/venuesApi";           // 공연장 API (하단용)

const Section = styled.section`
  padding: 24px 32px;
  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const Grid3 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const getBadgeColor = (category) => {
  switch (category) {
    case "뮤지컬":
      return "var(--badge-blue)";
    case "연극":
      return "#6366f1";
    case "콘서트":
      return "#10b981";
    case "클래식":
      return "#f59e0b";
    case "경기장":
      return "#af0abeff";
    case "소극장":
      return "#f59e0b";
    default:
      return "#6b7280";
  }
};

export default function Home({ favorites = [], onToggleFavorite }) {
  const navigate = useNavigate();
  const [selectedAd, setSelectedAd] = useState(null);
  const [shows, setShows] = useState([]); // 상단 (공연)
  const [venues, setVenues] = useState([]); // 하단 (공연장)


  useEffect(() => {
    const fetchShows = async () => {
      try {
        const data = await getShows();
        console.log("Home 공연 데이터 로드 완료:", data);
        setShows(data);
      } catch (err) {
        console.error("공연 데이터 로드 실패:", err);
      }
    };
    fetchShows();
  }, []);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const data = await getVenues();
        console.log("Home 공연장 데이터 로드 완료:", data);
        setVenues(data);
      } catch (err) {
        console.error("공연장 데이터 로드 실패:", err);
      }
    };
    fetchVenues();
  }, []);

  return (
    <>
      <PageHeader
        title="환영합니다"
        desc="공연장 좌석 리뷰를 확인하고 공유하세요"
      />

      <Section>
        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 12 }}>
          놓치지 마세요
        </h3>
        <Grid3>
          {shows.slice(0, 3).map((show) => (
            <Card
              key={show.id}
              id={show.id}
              image={
                show.poster_url
                  ? `${API_BASE}${show.poster_url}`
                  : "https://via.placeholder.com/300"
              }
              title={show.title}
              subtitle={show.description || "공연장 정보 없음"}
              period={`${show.start_date?.slice(0, 10)} ~ ${show.end_date?.slice(
                0,
                10
              )}`}
              badge={show.category}
              badgeColor={getBadgeColor(show.category)}

              onClick={() => setSelectedAd(show)}
              isFavorite={favorites.includes(show.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
          {shows.length === 0 && (
            <p>로딩 중이거나 등록된 공연이 없습니다.</p>
          )}
        </Grid3>
      </Section>

      <hr style={{ border: 0, borderTop: "1px solid var(--line)" }} />

      <Section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <h3 style={{ fontSize: 18, fontWeight: 800 }}>인기 공연장</h3>
          <button
            style={{
              background: "transparent",
              border: "none",
              color: "#6b7280",
              cursor: "pointer",
              fontSize: 13,
            }}
            onClick={() => navigate("/reviews")}
          >
            전체 리뷰 보기
          </button>
        </div>

        <Grid3>
          {/* 전체 데이터 맵핑 (여기도 똑같이 DB 컬럼 연결) */}
          {venues.slice(0,3).map((venue) => (
            <Card
              key={venue.id}
              id={venue.id}
              image={"https://via.placeholder.com/300?text=Venue"}
              title={venue.name}
              subtitle={venue.address}
              period={"공연장"}
              badge={"Venue"}
              badgeColor={"#6b7280"}
              onClick={() => navigate(`/venues/${venue.id}`)}
              isFavorite={favorites.includes(venue.id)}
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
          <div style={{ textAlign: "center" }}>
            <h3>{selectedAd.title}</h3>
            <p>이 기능은 현재 준비 중입니다.</p>
          </div>
        )}
      </Modal>
    </>
  );
}
