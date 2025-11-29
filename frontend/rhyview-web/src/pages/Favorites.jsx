import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Modal from "../components/Modal";

// ✅ API 및 데이터 임포트
import { getUserFavorites } from "../api/usersApi"; 
import { API_BASE } from "../api/showApi"; // 이미지 경로용
import { fundings } from "../data/fundings"; // 펀딩 더미 데이터

// --- 스타일 컴포넌트 ---
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

// ✅ [수정] active -> $active (DOM 경고 방지)
const Tab = styled.button`
  background: transparent;
  border: none;
  padding: 14px 4px;
  font-size: 15px;
  font-weight: ${({ $active }) => ($active ? "700" : "500")};
  color: ${({ $active }) => ($active ? "#111" : "#9ca3af")};
  border-bottom: 2px solid ${({ $active }) => ($active ? "#111" : "transparent")};
  cursor: pointer;
  transition: all 0.2s;
  &:hover { color: #111; }
`;

/* 펀딩 스타일 */
const FundingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  @media (max-width: 768px){ grid-template-columns: 1fr; }
`;
const FundingCard = styled.div`
  border-radius: 16px; border: 1px solid var(--line); background: #fff; overflow: hidden; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
  &:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.08); }
`;
const FundingImg = styled.div` width: 100%; height: 160px; background-color: #eee; background-size: cover; background-position: center; `;
const FundingBody = styled.div` padding: 16px; `;
const FundingCategory = styled.div` font-size: 12px; color: var(--brand); font-weight: 700; margin-bottom: 6px; `;
const FundingProjectTitle = styled.div` font-size: 16px; font-weight: 700; color: #1f2937; margin-bottom: 6px; line-height: 1.4; `;
const FundingProjectDesc = styled.div` font-size: 13px; color: #6b7280; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; `;
const FundingStatRow = styled.div` display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 8px; `;
const FundingProgressText = styled.span` font-size: 18px; font-weight: 800; color: var(--brand); `;
const FundingAmount = styled.span` font-size: 13px; color: #374151; font-weight: 600; `;
const FundingDDay = styled.span` font-size: 12px; color: #ef4444; font-weight: 700; background: #fef2f2; padding: 2px 6px; border-radius: 4px; `;
const FundingBarWrapper = styled.div` width: 100%; height: 6px; background: #f3f4f6; border-radius: 99px; overflow: hidden; `;
const FundingBarFill = styled.div` height: 100%; background: var(--brand); border-radius: 99px; `;

const getBadgeColor = (category) => {
  switch (category) {
    case '뮤지컬': return 'var(--badge-blue)';
    case '연극': return '#6366f1';
    case '콘서트': return '#10b981';
    default: return '#6b7280';
  }
};

export default function Favorites({ user, onToggleFavorite }) {
  const navigate = useNavigate();
  const [selectedAd, setSelectedAd] = useState(null);
  const [activeTab, setActiveTab] = useState("favorites"); 

  const [favoriteShows, setFavoriteShows] = useState([]);
  const [favoriteVenues, setFavoriteVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. 찜 목록 가져오기
  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
          setLoading(false);
          return;
      }

      try {
        setLoading(true);
        const data = await getUserFavorites(token);
        
        // 🔍 데이터 구조 확인용 로그
        console.log("🔥 찜 목록 원본 데이터:", data);

        // id가 유효한 데이터만 필터링
        const validData = data.filter(item => item && (item.id || item.show_id || item.venue_id));

        const venues = validData.filter(item => {
            // 공연장 구분: category가 '공연장'이거나 name만 있고 title/show_name이 없는 경우
            return item.category === '공연장' || (!item.title && !item.show_name && item.name);
        });

        const shows = validData.filter(item => {
            // 이미 Venue로 분류된 애들은 제외
            return !venues.includes(item);
        });

        console.log("✅ Shows:", shows);
        console.log("✅ Venues:", venues);

        setFavoriteShows(shows);
        setFavoriteVenues(venues);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]); 

  // 2. 카드 클릭 핸들러
  const handleCardClick = (item, type) => {
    // id가 없으면 이동 불가
    if (!item.id) return;

    if (type === 'ad') {
        setSelectedAd(item);
    } else if (type === 'venue') {
        navigate(`/venues/${item.id}`);
    } else if (type === 'show') {
        // 공연 상세 페이지 경로 (없으면 venues로 임시 연결)
        navigate(`/venues/${item.id}`); 
    }
  };

  // 3. 찜 해제 핸들러
  const handleUnfavorite = (id, type) => {
      if (!id) return;

      if (type === 'show') {
          setFavoriteShows(prev => prev.filter(s => s.id !== id));
      } else {
          setFavoriteVenues(prev => prev.filter(v => v.id !== id));
      }
      const uniqueId = `${type}-${id}`; 
      onToggleFavorite(uniqueId);
  };

  if (loading) return <Section>로딩 중...</Section>;

  return (
    <>
      <PageHeader title="마이 페이지" desc="찜한 목록과 후원 현황" />
      
      <Tabs>
        {/* ✅ [수정] $active로 변경하여 DOM 경고 해결 */}
        <Tab $active={activeTab === "favorites"} onClick={() => setActiveTab("favorites")}>
          찜 목록
        </Tab>
        <Tab $active={activeTab === "fan"} onClick={() => setActiveTab("fan")}>
          팬 (후원)
        </Tab>
      </Tabs>

      {/* 🟢 탭 1: 찜 목록 */}
      {activeTab === "favorites" && (
        <>
          {/* 공연 섹션 */}
          <Section>
            <h3 style={{fontSize: 18, fontWeight: 700, marginBottom: 16}}>찜한 공연</h3>
            {favoriteShows.length > 0 ? (
                <Grid3>
                    {favoriteShows.map((show, index) => {
                        // id 안전장치
                        const safeId = show.id || `temp-show-${index}`;
                        
                        // 이미지 경로 처리 (API_BASE 연결)
                        let imageUrl = "https://dummyimage.com/300x400/e5e7eb/000000&text=No+Image";
                        if (show.poster_url) {
                            imageUrl = show.poster_url.startsWith('http') 
                                ? show.poster_url 
                                : `${API_BASE}${show.poster_url}`;
                        }

                        return (
                            <Card
                                key={`show-${safeId}`} // 🔥 Key 중복 방지
                                id={safeId}
                                
                                image={imageUrl}
                                
                                // ✅ [수정] 데이터 매핑 강화 (title, show_name, name 모두 체크)
                                title={show.title || show.show_name || show.name || "제목 없음"} 
                                subtitle={show.description || show.venue_name || "공연 정보"}
                                badge={show.category || "공연"}
                                badgeColor={getBadgeColor(show.category)}
                                
                                onClick={() => handleCardClick(show, 'show')}
                                
                                isFavorite={true}
                                onToggleFavorite={() => handleUnfavorite(safeId, 'show')}
                            />
                        );
                    })}
                </Grid3>
            ) : (
                <div style={{color: '#9ca3af', fontSize: 14, padding: '20px 0', textAlign:'center'}}>
                    찜한 공연이 없습니다.
                </div>
            )}
          </Section>

          <hr style={{ border: 0, borderTop: "1px solid var(--line)", margin: 0 }} />

          {/* 공연장 섹션 */}
          <Section>
            <h3 style={{fontSize: 18, fontWeight: 700, marginBottom: 16}}>찜한 공연장</h3>
            {favoriteVenues.length > 0 ? (
                <Grid3>
                    {favoriteVenues.map((venue, index) => {
                        const safeId = venue.id || `temp-venue-${index}`;
                        return (
                            <Card
                                key={`venue-${safeId}`} // 🔥 Key 중복 방지
                                id={safeId}
                                image={"https://dummyimage.com/300x200/e5e7eb/000000&text=Venue"}
                                title={venue.name || venue.title || "이름 없음"}
                                subtitle={venue.address || venue.location || "주소 정보 없음"}
                                badge={venue.category || "공연장"}
                                badgeColor={getBadgeColor(venue.category)}
                                period={"공연장"}
                                
                                onClick={() => handleCardClick(venue, 'venue')}
                                
                                isFavorite={true}
                                onToggleFavorite={() => handleUnfavorite(safeId, 'venue')}
                            />
                        );
                    })}
                </Grid3>
            ) : (
                <EmptyState>
                    <div>아직 찜한 공연장이 없습니다.</div>
                    <Button onClick={() => navigate("/reviews")}>공연장 둘러보기</Button>
                </EmptyState>
            )}
          </Section>
        </>
      )}

      {/* 🔵 탭 2: 팬 (펀딩) */}
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

      <Modal
        open={!!selectedAd}
        onClose={() => setSelectedAd(null)}
        title={selectedAd?.title || "광고"}
      >
        {selectedAd && <div>광고 내용</div>}
      </Modal>
    </>
  );
}