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

  const tabs = ["전체", "뮤지컬", "콘서트", "연극", "클래식", "경기장", "소극장"];
  const [activeTab, setActiveTab] = useState("전체");
  const [search, setSearch] = useState("");

  // ✅ 1. DB 데이터를 담을 state 생성
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ 2. 컴포넌트 실행 시 백엔드에서 데이터 가져오기 (getVenues)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getVenues(); // 전체 조회 API 호출
      if (data) {
        setVenues(data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // ✅ 3. 필터링 로직 (DB에서 가져온 venues 데이터 사용)
  const filtered = venues.filter((v) => {
    // DB에 category가 없으면 기본값 '전체'로 취급하거나 '공연장' 등으로 처리
    const vCategory = v.category || "기타";

    const matchTab = activeTab === "전체" || vCategory === activeTab;

    // DB 컬럼이 name, address 이므로 이에 맞춰 검색 로직 수정
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
          {filtered.map((v) => (
            <Card
              key={v.id}
              id={v.id}

              // 1. 이미지가 없으므로 기본 이미지 사용
              image={"https://via.placeholder.com/300?text=Venue"}

              // 2. DB의 name -> Card의 title
              title={v.name}

              // 3. DB의 address -> Card의 subtitle
              subtitle={v.address}

              // 4. 카테고리가 없으면 '공연장' 표시
              badge={v.category || "공연장"}
              badgeColor={getBadgeColor(v.category)}

              // 5. 평점이 없으면 0.0 표시
              period={`⭐ ${v.rating || "0.0"} (${v.reviewCount || 0}개 리뷰)`}

              // 6. [핵심] 클릭 시 상세 페이지로 이동!
              // 여기서 이동하면 VenueDetail.jsx가 실행되면서 'getVenueById(단건 조회)'를 호출합니다.
              onClick={() => navigate(`/venues/${v.id}`)}

              isFavorite={favorites.includes(`venue-${v.id}`)}
              onToggleFavorite={() => onToggleFavorite(v.id, 'venue')}
            />
          ))}
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