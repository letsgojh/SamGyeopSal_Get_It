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

  &:hover {
    background: ${({ active }) => (active ? "#2563eb" : "#f4f4f5")};
  }
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
    case '경기장': return '#af0abeff';
    case '소극장': return '#f59e0b';
    default: return '#6b7280';
  }
};

export default function Reviews( {favorites = [], onToggleFavorite} ) {
  const navigate = useNavigate();

  const tabs = ["전체", "뮤지컬", "콘서트", "연극", "클래식", "경기장", "소극장"];
  const [activeTab, setActiveTab] = useState("전체");
  const [search, setSearch] = useState("");

  const filtered = venues.filter((v) => {
    const matchTab = activeTab === "전체" || v.category === activeTab;
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

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