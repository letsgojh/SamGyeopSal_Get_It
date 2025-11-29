import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import { getVenues, API_BASE } from "../api/venuesApi"; // ✅ API 함수 임포트


const Section = styled.section`
  padding: 24px 32px;
  @media (max-width: 768px){ padding: 20px 16px; }
`;

const ControlsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 8px 0 16px;
  @media (max-width: 768px) { flex-direction: column; }
`;

const Tabs = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px;
`;

const Tab = styled.button`
  font-size: 13px;
  border: 1px solid ${({ active }) => (active ? "#2563eb" : "var(--line)")};
  background: ${({ active }) => (active ? "#2563eb" : "#ffffff")};
  color: ${({ active }) => (active ? "#ffffff" : "#6b7280")};
  border-radius: 9999px;
  padding: 8px 12px;
  cursor: pointer;
  white-space: nowrap;
  &:hover { background: ${({ active }) => (active ? "#2563eb" : "#f4f4f5")}; }
`;

const SearchInput = styled.input`
  flex: 1;
  border: 1px solid var(--line);
  border-radius: 9999px;
  padding: 8px 16px;
  font-size: 13px;
  outline: none;
  min-width: 200px;
  &:focus { border-color: #2563eb; }
`;

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  @media (max-width: 960px){ grid-template-columns: 1fr; }
`;

const getBadgeColor = (category) => {
  switch (category) {
    case '뮤지컬': return 'var(--badge-blue)';
    case '연극': return '#6366f1';
    case '콘서트': return '#10b981';
    case '클래식': return '#f59e0b';
    default: return '#6b7280';
  }
};

export default function Reviews({ favorites = [], onToggleFavorite }) {
  const navigate = useNavigate();

  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 데이터 로딩 useEffect (1개만!)
  useEffect(() => {
    const fetchData = async () => {
      console.log("🔥 getVenues 함수:", getVenues);

      const data = await getVenues();
      console.log("🔥 API 응답:", data);

      setVenues(data);
      setLoading(false);
    };
    fetchData();
  }, []);


  if (loading) {
    return (
      <Section>
        <div>데이터를 불러오는 중입니다...</div>
      </Section>
    );
  }

  return (
    <>
      <PageHeader title="공연장 리뷰" desc="공연장별 좌석 리뷰를 확인하세요" />
      <Section>
        <Grid2>
          {venues.map((v) => (
            <Card
              key={v.id}
              id={v.id}
              image={`http://localhost:3000${v.image_url.replace(".jpg", ".png")}`}
              title={v.name}
              subtitle={v.address}
              badge={"공연장"}
              badgeColor={"#6b7280"}
              period={`⭐ ${v.review_rating || "0.0"} (${v.review_count || 0}개 리뷰)`}  
              onClick={() => navigate(`/venues/${v.id}`)}
              isFavorite={favorites.includes(`venue-${v.id}`)}
              onToggleFavorite={() => onToggleFavorite(v.id, 'venue')}
            />
          ))}

          {venues.length === 0 && (
            <div style={{
              fontSize: 13,
              color: "#9ca3af",
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "40px 0"
            }}>
              공연장이 없습니다.
            </div>
          )}
        </Grid2>
      </Section>
    </>
  );
}
