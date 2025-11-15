import React, { useMemo, useState } from "react";
import styled from "styled-components";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Modal from "../components/Modal";

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
  min-width: 200px;
  max-width: 360px;
  border-radius: 9999px;
  border: 1px solid var(--line);
  padding: 8px 12px;
  font-size: 13px;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 1px #2563eb20;
  }

  @media (max-width: 768px) { max-width: 100%; }
`;

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 960px) { grid-template-columns: 1fr; }
`;

// 더미 데이터
const allReviews = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1527356926125-2e5fdc851644",
    title: "샤롯데씨어터",
    subtitle: "서울 송파구",
    category: "뮤지컬",
    badge: "뮤지컬",
    badgeColor: "var(--badge-blue)",
    period: "⭐ 4.5 (328개 리뷰)",
    detail:
      "1층 중간열과 2층 중앙 추천.\n잡기는 힘들어도 시야가 진짜 ㄹㅈㄷ",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1515165562835-c3b8c2e0b4ad",
    title: "세종문화회관 대극장",
    subtitle: "서울 종로구",
    category: "연극",
    badge: "연극",
    badgeColor: "#6366f1",
    period: "⭐ 4.7 (512개 리뷰)",
    detail:
      "무대가 넓고 객석 경사가 완만합니다.\n1층 중앙 12열 이후, 2층 중앙 앞열 ㅊㅊ",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    title: "예술의전당 콘서트홀",
    subtitle: "서울 서초구",
    category: "콘서트",
    badge: "콘서트",
    badgeColor: "#10b981",
    period: "⭐ 4.8 (892개 리뷰)",
    detail:
      "클래식 음향 최적화. 발코니도 균일한 음향이어서 좋았습니다.\n1층 8~15열 강추.",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    title: "KSPO DOME",
    subtitle: "서울 송파구",
    category: "콘서트",
    badge: "콘서트",
    badgeColor: "#10b981",
    period: "⭐ 4.3 (1204개 리뷰)",
    detail:
      "스탠딩은 입장 번호 중요, 지정석 양끝 시야 가림...",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14",
    title: "블루스퀘어",
    subtitle: "서울 용산구",
    category: "뮤지컬",
    badge: "뮤지컬",
    badgeColor: "var(--badge-blue)",
    period: "⭐ 4.6 (645개 리뷰)",
    detail:
      "좌석 경사가 있어 뒤쪽도 시야 양호.\n3층 측면은 구조물 있어서 잘 안 보임.",
  },
];

const tabs = ["전체", "뮤지컬", "콘서트", "연극"];

export default function Reviews() {
  const [activeTab, setActiveTab] = useState("전체");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allReviews.filter((r) => {
      const matchCategory = activeTab === "전체" ? true : r.category === activeTab;
      const matchSearch =
        q === ""
          ? true
          : (r.title + r.subtitle + r.detail).toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [activeTab, search]);

  return (
    <>
      <PageHeader title="공연장 리뷰" desc="카테고리/검색으로 빠르게 찾아보세요." />

      <Section>
        <ControlsRow>
          <Tabs>
            {tabs.map((t) => (
              <Tab key={t} active={activeTab === t} onClick={() => setActiveTab(t)}>{t}</Tab>
            ))}
          </Tabs>
          <SearchInput
            placeholder="공연장명, 지역, 키워드 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </ControlsRow>

        <Grid2>
          {filtered.map((c) => (
            <Card
              key={c.id}
              image={c.image}
              title={c.title}
              subtitle={c.subtitle}
              badge={c.badge}
              badgeColor={c.badgeColor}
              period={c.period}
              onClick={() => setSelected(c)}
            />
          ))}
          {filtered.length === 0 && (
            <div style={{ fontSize: 13, color: "#9ca3af" }}>조건에 맞는 리뷰가 없습니다.</div>
          )}
        </Grid2>
      </Section>

      <Modal open={!!selected} title={selected?.title || ""} onClose={() => setSelected(null)}>
        {selected && (
          <>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
              {selected.subtitle} · {selected.category}
            </div>
            <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 14 }}>
              {selected.period}
            </div>
            <div style={{ whiteSpace: "pre-line" }}>{selected.detail}</div>
          </>
        )}
      </Modal>
    </>
  );
}
