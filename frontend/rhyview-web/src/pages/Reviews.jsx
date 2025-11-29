import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";

// ✅ API 함수 임포트 (getShows 추가)
import { getVenues, API_BASE } from "../api/venuesApi"; 
import { getShows } from "../api/showApi"; // 👈 이 함수가 필요합니다!

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

  const tabs = ["전체", "뮤지컬", "콘서트", "연극", "클래식", "경기장", "소극장"];
  const [activeTab, setActiveTab] = useState("전체");
  const [search, setSearch] = useState("");

  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ 데이터 병합 로직
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. 공연장과 공연 데이터를 동시에 가져옵니다.
        const [venuesData, showsData] = await Promise.all([
          getVenues(),
          getShows() // 모든 공연 목록을 가져와야 함
        ]);

        // 2. 각 공연장에 해당하는 공연들의 카테고리를 찾아서 합칩니다.
        const mergedVenues = (venuesData || []).map(venue => {
          // 이 공연장에서 열리는 공연들 찾기 (venue_id 기준)
          const relatedShows = (showsData || []).filter(show => show.venue_id === venue.id);

          // 중복 제거된 카테고리 목록 추출 (예: ["뮤지컬", "콘서트"])
          const categories = [...new Set(relatedShows.map(show => show.category).filter(Boolean))];

          // 공연장 객체에 categories 속성 추가
          return {
            ...venue,
            categories: categories.length > 0 ? categories : ["공연장"] // 없으면 기본값
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

  // ✅ 필터링 로직 수정 (병합된 categories 활용)
  const filtered = venues.filter((v) => {
    // 1. 탭 필터: 해당 공연장이 가진 카테고리 중에 탭 이름이 포함되어 있는지 확인
    const vCategories = v.categories || [];
    
    // "전체"이거나, 공연장의 카테고리 목록에 현재 탭이 포함되어 있으면 통과
    // 또는 '경기장', '소극장' 같은 원래 카테고리가 DB에 있었다면 그것도 체크
    const matchTab = activeTab === "전체" || 
                     vCategories.includes(activeTab) || 
                     v.category === activeTab;

    // 2. 검색 필터
    const vName = v.name || "";
    const vLocation = v.address || "";
    const matchSearch = vName.toLowerCase().includes(search.toLowerCase()) ||
      vLocation.toLowerCase().includes(search.toLowerCase());

    return matchTab && matchSearch;
  });

  if (loading) return <Section><div>데이터를 불러오는 중입니다...</div></Section>;

  return (
    <>
      <PageHeader title="공연장 리뷰" desc="공연장별 좌석 리뷰를 확인하세요" />
      <Section>
        <ControlsRow>
          <Tabs>
            {tabs.map((t) => (
              <Tab key={t} active={activeTab === t} onClick={() => setActiveTab(t)}>{t}</Tab>
            ))}
          </Tabs>
          <SearchInput
            placeholder="공연장명, 지역 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </ControlsRow>

        <Grid2>
          {filtered.map((v) => {
            // 뱃지에 표시할 대표 카테고리 선정 (첫 번째 것 사용)
            const mainCategory = v.categories && v.categories.length > 0 ? v.categories[0] : (v.category || "공연장");
            
            return (
              <Card
                key={v.id}
                id={v.id}
                image={"https://via.placeholder.com/300?text=Venue"}
                title={v.name}
                subtitle={v.address}
                
                // ✅ show 데이터를 참조해 만든 카테고리 표시
                badge={mainCategory}
                badgeColor={getBadgeColor(mainCategory)}

                period={`⭐ ${v.rating || "0.0"} (${v.reviewCount || 0}개 리뷰)`}
                onClick={() => navigate(`/venues/${v.id}`)}
                isFavorite={favorites.includes(`venue-${v.id}`)}
                onToggleFavorite={() => onToggleFavorite(v.id, 'venue')}
              />
            );
          })}
          {filtered.length === 0 && (
            <div style={{ fontSize: 13, color: "#9ca3af", gridColumn: "1 / -1", textAlign: "center", padding: "40px 0" }}>
              조건에 맞는 공연장이 없습니다.
            </div>
          )}
        </Grid2>
      </Section>
    </>
  );
}