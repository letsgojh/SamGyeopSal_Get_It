import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Modal from "../components/Modal";

// ✅ API 함수 및 주소 임포트
import { getUserFavorites, getUserInfo } from "../api/usersApi"; 
import { API_BASE } from "../api/showApi"; // 이미지 경로용

// 펀딩 데이터는 아직 DB가 없다면 유지 (추후 API로 교체)
import { fundings } from "../data/fundings";

// --- 스타일 컴포넌트 (기존 유지) ---
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

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  color: #6b7280;
  font-size: 14px;
  gap: 16px;
`;

const Button = styled.button`
  background: var(--brand);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  &:hover { opacity: 0.9; }
`;

const Tabs = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 32px;
  margin-top: 10px;
  border-bottom: 1px solid var(--line);
  @media (max-width: 768px) { padding: 0 16px; gap: 16px; }
`;

const Tab = styled.button`
  background: transparent;
  border: none;
  padding: 14px 4px;
  font-size: 15px;
  font-weight: ${({ active }) => (active ? "700" : "500")};
  color: ${({ active }) => (active ? "#111" : "#9ca3af")};
  border-bottom: 2px solid ${({ active }) => (active ? "#111" : "transparent")};
  cursor: pointer;
  transition: all 0.2s;
  &:hover { color: #111; }
`;

/* 펀딩 카드 스타일 */
const FundingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  @media (max-width: 768px){ grid-template-columns: 1fr; }
`;

const FundingCard = styled.div`
  border-radius: 16px;
  border: 1px solid var(--line);
  background: #fff;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.08);
  }
`;

const FundingImg = styled.div`
  width: 100%;
  height: 160px;
  background-color: #eee;
  background-size: cover;
  background-position: center;
`;

const FundingBody = styled.div`
  padding: 16px;
`;

const FundingCategory = styled.div`
  font-size: 12px;
  color: var(--brand);
  font-weight: 700;
  margin-bottom: 6px;
`;

const FundingProjectTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 6px;
  line-height: 1.4;
`;

const FundingProjectDesc = styled.div`
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const FundingStatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 8px;
`;

const FundingProgressText = styled.span`
  font-size: 18px;
  font-weight: 800;
  color: var(--brand);
`;

const FundingAmount = styled.span`
  font-size: 13px;
  color: #374151;
  font-weight: 600;
`;

const FundingDDay = styled.span`
  font-size: 12px;
  color: #ef4444;
  font-weight: 700;
  background: #fef2f2;
  padding: 2px 6px;
  border-radius: 4px;
`;

const FundingBarWrapper = styled.div`
  width: 100%;
  height: 6px;
  background: #f3f4f6;
  border-radius: 99px;
  overflow: hidden;
`;

const FundingBarFill = styled.div`
  height: 100%;
  background: var(--brand);
  border-radius: 99px;
`;

// 뱃지 색상 헬퍼
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

export default function Favorites({ user, onToggleFavorite }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("favorites");
  const [favoriteList, setFavoriteList] = useState([]); // DB에서 가져온 찜 목록
  const [loading, setLoading] = useState(true);

  // 1. 찜 목록 가져오기
  useEffect(() => {
    const fetchMyFavorites = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await getUserFavorites(token);
        console.log("찜 목록 데이터:", data);
        setFavoriteList(data); // 백엔드에서 show 정보를 다 채워서(JOIN) 준다고 가정
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyFavorites();
  }, [user]);

  // 2. 찜 해제 핸들러
  const handleUnfavorite = (id) => {
    // UI에서 즉시 제거
    setFavoriteList(prev => prev.filter(item => item.id !== id));
    // 부모 토글 함수 호출 (API 요청)
    onToggleFavorite(id);
  };

  if (loading) return <Section>로딩 중...</Section>;

  return (
    <>
      <PageHeader title="마이 페이지" desc="찜한 목록과 후원 현황" />
      <Tabs>
        <Tab active={activeTab === "favorites"} onClick={() => setActiveTab("favorites")}>찜 목록</Tab>
        <Tab active={activeTab === "fan"} onClick={() => setActiveTab("fan")}>팬 (후원)</Tab>
      </Tabs>

      {/* 탭 1: 찜 목록 */}
      {activeTab === "favorites" && (
        <Section>
          <h3 style={{fontSize: 18, fontWeight: 700, marginBottom: 16}}>찜한 공연</h3>
          {favoriteList.length > 0 ? (
            <Grid3>
              {favoriteList.map(item => (
                <Card
                  key={item.id}
                  id={item.id}
                  // DB 데이터 매핑
                  image={item.poster_url 
                    ? (item.poster_url.startsWith('http') ? item.poster_url : `${API_BASE}${item.poster_url}`)
                    : "https://via.placeholder.com/300"}
                  title={item.title || item.name} // show 테이블이면 title, venue면 name
                  subtitle={item.description || item.address || "정보 없음"}
                  badge={item.category || "공연"}
                  badgeColor={getBadgeColor(item.category)}
                  
                  // 클릭 시 이동 (공연/공연장 구분 로직 필요하지만 일단 공연으로 가정)
                  onClick={() => navigate(`/venues/${item.id}`)} // 혹은 shows/:id
                  
                  isFavorite={true}
                  onToggleFavorite={() => handleUnfavorite(item.id)}
                />
              ))}
            </Grid3>
          ) : (
            <EmptyState>
              <div>아직 찜한 공연이 없습니다.</div>
              <Button onClick={() => navigate("/")}>공연 둘러보기</Button>
            </EmptyState>
          )}
        </Section>
      )}

      {/* 탭 2: 펀딩 (기존 코드 유지) */}
      {activeTab === "fan" && (
        <Section>
          <h3 style={{fontSize: 18, fontWeight: 700, marginBottom: 16}}>진행 중인 펀딩</h3>
          <FundingGrid>
            {fundings.map((item) => (
              <FundingCard key={item.id} onClick={() => alert("준비 중")}>
                <FundingImg style={{ backgroundImage: `url(${item.image || ""})` }} />
                <FundingBody>
                  <FundingCategory>{item.category}</FundingCategory>
                  <FundingProjectTitle>{item.title}</FundingProjectTitle>
                  <FundingProjectDesc>{item.description}</FundingProjectDesc>
                  <FundingStatRow>
                    <FundingProgressText>{item.progress}%</FundingProgressText>
                    <FundingAmount>{item.amount}</FundingAmount>
                    <FundingDDay>{item.dday}</FundingDDay>
                  </FundingStatRow>
                  <FundingBarWrapper>
                    <FundingBarFill style={{ width: `${Math.min(item.progress, 100)}%` }} />
                  </FundingBarWrapper>
                </FundingBody>
              </FundingCard>
            ))}
          </FundingGrid>
        </Section>
      )}
    </>
  );
}