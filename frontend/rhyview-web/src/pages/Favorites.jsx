import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { venues, hotDeals } from "../data/venues";

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

const getBadgeColor = (category) => {
    switch (category) {
        case '뮤지컬': return 'var(--badge-blue)';
        case '연극': return '#6366f1';
        case '콘서트': return '#10b981';
        case '클래식': return '#f59e0b';
        case '경기장': return '#af0abeff';
        case '소극장': return '#f59e0b';
        default: return 'var(--badge-rose)'; // hotDeals의 기본색 등
    }
};

export default function Favorites({ favorites, onToggleFavorite }) {
    const navigate = useNavigate();

    const allItems = [...hotDeals, ...venues];
    const favoriteVenues = allItems.filter((v) => favorites.includes(v.id));

    // 아이템이 공연장인지 확인하는 헬퍼 함수 (category가 있으면 공연장)
    const isVenue = (item) => !!item.category;

    // 팝업 상태 관리
    const [selectedAd, setSelectedAd] = useState(null);

    return (
        <>
            <PageHeader title="찜 목록" desc="내가 찜한 공연장을 모아보세요" />
            <Section>
                {favoriteVenues.length > 0 ? (
                    <Grid3>
                        {favoriteVenues.map((v) => (
                            <Card
                                key={v.id}
                                id={v.id}
                                image={v.image}
                                title={v.title || v.name} // hotDeals는 title, venues는 name을 쓸 수 있으므로 둘 다 체크
                                subtitle={v.subtitle || v.location} // 마찬가지로 subtitle 또는 location
                                badge={v.badge || v.category} // badge 또는 category
                                badgeColor={v.badgeColor || getBadgeColor(v.category)}
                                period={v.period || `⭐ ${v.rating} (${v.reviewCount}개 리뷰)`}

                                // hotDeals인지 venues인지에 따라 클릭 동작 분기 (선택 사항)
                                // 여기서는 간단히 venues인 경우만 상세 페이지로 가도록 예시 작성
                                // 실제로는 hotDeals 클릭 시 팝업을 띄우거나 할 수 있지만, 
                                // 찜 목록에서는 보통 상세 페이지로 이동하거나 아무 동작 안 하게 할 수도 있습니다.
                                as={v.category ? Link : "div"}
                                to={v.category ? `/venues/${v.id}` : undefined}

                                onClick={isVenue(v) ? undefined : () => setSelectedAd(v)}

                                isFavorite={true}
                                onToggleFavorite={onToggleFavorite}
                            />
                        ))}
                    </Grid3>
                ) : (
                    <EmptyState>
                        <div>아직 찜한 공연장이 없습니다.</div>
                        <Button onClick={() => navigate("/reviews")}>공연장 둘러보기</Button>
                    </EmptyState>
                )}
            </Section>
            <Modal
                open={!!selectedAd}
                onClose={() => setSelectedAd(null)}
                title={selectedAd?.title || "광고"}
            >
                {selectedAd && (
                    <a href={selectedAd.adLink} target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
                        <img
                            src={selectedAd.adImage}
                            alt={selectedAd.title}
                            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                        />
                    </a>
                )}
            </Modal>
        </>
    );
}