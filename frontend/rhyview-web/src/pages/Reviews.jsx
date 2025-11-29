import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";

// ✅ API 함수 임포트
import { getVenues } from "../api/venuesApi";
import { getShows } from "../api/showApi";

const Section = styled.section`
  padding: 24px 32px;
  @media (max-width: 768px){ padding: 20px 16px; }
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

  // ✅ 데이터 병합 로직 (그대로 유지: 카테고리 뱃지를 위해 필요)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. 공연장과 공연 데이터를 동시에 가져옵니다.
        const [venuesData, showsData] = await Promise.all([
          getVenues(),
          getShows()
        ]);

        // 2. 각 공연장에 해당하는 공연들의 카테고리를 찾아서 합칩니다.
        const mergedVenues = (venuesData || []).map(venue => {
          const relatedShows = (showsData || []).filter(show => show.venue_id === venue.id);
          const categories = [...new Set(relatedShows.map(show => show.category).filter(Boolean))];

          return {
            ...venue,
            categories: categories.length > 0 ? categories : ["공연장"]
          };
        });

        setVenues(mergedVenues);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Section><div>데이터를 불러오는 중입니다...</div></Section>;

  return (
    <>
      <PageHeader title="공연장 리뷰" desc="공연장별 좌석 리뷰를 확인하세요" />
      <Section>
        {/* 검색창 및 탭 버튼 제거됨 */}

        <Grid2>
          {venues.map((v) => {
            // 뱃지에 표시할 대표 카테고리 선정
            const mainCategory = v.categories && v.categories.length > 0 ? v.categories[0] : (v.category || "공연장");

            return (
              <Card
                key={v.id}
                id={v.id}
                image={v.image_url?.startsWith("/") 
                  ? `http://localhost:3000${v.image_url}`
                  : v.image_url || "https://via.placeholder.com/300?text=Venue"}
                title={v.name}
                subtitle={v.address}
                
                // ✅ show 데이터를 참조해 만든 카테고리 표시
                badge={mainCategory}
                badgeColor={getBadgeColor(mainCategory)}

                period={`⭐ ${v.review_rating || "0.0"} (${v.review_count || 0}개 리뷰)`}
                onClick={() => navigate(`/venues/${v.id}`)}
                isFavorite={favorites.includes(`venue-${v.id}`)}
                onToggleFavorite={() => onToggleFavorite(v.id, 'venue')}
              />
            );
          })}
          
          {venues.length === 0 && (
            <div style={{ fontSize: 13, color: "#9ca3af", gridColumn: "1 / -1", textAlign: "center", padding: "40px 0" }}>
              등록된 공연장이 없습니다.
            </div>
          )}
        </Grid2>
      </Section>
    </>
  );
}
