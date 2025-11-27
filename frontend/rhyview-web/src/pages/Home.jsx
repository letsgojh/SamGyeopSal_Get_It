import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
// import { hotDeals } from "../data/venues"; // ❌ 더미 데이터 삭제 (이제 안 씀)
import Modal from "../components/Modal";
// ✅ API 함수와 주소 가져오기
import { API_BASE, getShows } from "../api/showApi";   // 공연 API (상단용)
import { getVenues } from "../api/venuesApi";

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
  const [shows, setShows] = useState([]); // 전체 공연 데이터
  const [venues, setVenues] = useState([]);

  // ✅ 백엔드 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getShows();
        console.log("Home 데이터 로드 완료:", data);
        setShows(data);
      } catch (err) {
        console.error("데이터 로드 실패:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getVenues();
        console.log("Home 데이터 로드 완료:", data);
        setVenues(data);
      } catch (err) {
        console.error("데이터 로드 실패:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <PageHeader title="환영합니다" desc="공연장 좌석 리뷰를 확인하고 공유하세요" />

      {/* 🟢 1. 상단 섹션: "놓치지 마세요" (DB 데이터 중 앞의 3개만 보여줌) */}
      <Section>
        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 12 }}>놓치지 마세요</h3>
        <Grid3>
          {/* shows.slice(0, 3) -> 데이터 3개만 잘라서 보여주기 */}
          {shows.slice(0, 3).map((show) => (
            <Card
              key={show.id}
              id={show.id}

              // ✅ 이미지 주소 연결 (DB 경로 앞에 서버 주소 붙이기)
              image={show.poster_url
                ? `${API_BASE}${show.poster_url}`
                : "https://via.placeholder.com/300"}

              title={show.title}

              // 장소 정보가 없으면 설명으로 대체
              subtitle={show.description || "공연장 정보 없음"}

              // 날짜 포맷 (YYYY-MM-DD)
              period={`${show.start_date?.slice(0, 10)} ~ ${show.end_date?.slice(0, 10)}`}

              badge={show.category}
              badgeColor={getBadgeColor(show.category)}

              onClick={() => navigate(`/venues/${show.id}`)}
              isFavorite={favorites.includes(show.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
          {/* 데이터가 로딩 중이거나 없을 때 안내 */}
          {shows.length === 0 && <p>로딩 중이거나 등록된 공연이 없습니다.</p>}
        </Grid3>
      </Section>

      <hr style={{ border: 0, borderTop: "1px solid var(--line)" }} />

      {/* 🔵 2. 하단 섹션: "인기 공연장" (전체 리스트 보여주기) */}
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
          {/* 전체 데이터 맵핑 (여기도 똑같이 DB 컬럼 연결) */}
          {venues.map((venue) => (
            <Card
              // ✅ Venue 테이블 컬럼 매핑 (id, name, address)
              key={venue.id}
              id={venue.id}

              // 1. 이미지가 없으므로 기본 이미지 사용 (또는 DB에 image_url 추가 필요)
              image={"https://via.placeholder.com/300?text=Venue"}

              // 2. 공연장 이름 (name -> title)
              title={venue.name}

              // 3. 주소 (address -> subtitle)
              subtitle={venue.address}

              // 4. 공연장은 날짜가 없으므로 생략하거나 '상시 개방' 등 표시
              period={"공연장"}

              // 5. 뱃지
              badge={"Venue"}
              badgeColor={"#6b7280"}
              onClick={() => navigate(`/venues/${venue.id}`)}
              isFavorite={favorites.includes(venue.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </Grid3>
      </Section>

      {/* 광고 모달 (Card 클릭 시 나오는 기능용 - 필요 없다면 삭제 가능) */}
      <Modal
        open={!!selectedAd}
        onClose={() => setSelectedAd(null)}
        title={selectedAd?.title || "광고"}
      >
        {selectedAd && (
          <div style={{ textAlign: 'center' }}>
            <h3>{selectedAd.title}</h3>
            <p>이 기능은 현재 준비 중입니다.</p>
          </div>
        )}
      </Modal>
    </>
  );
}