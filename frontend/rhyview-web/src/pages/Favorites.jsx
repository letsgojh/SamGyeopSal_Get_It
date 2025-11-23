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

    // venues, hotDeals를 묶은 리스트
    const allItems = [...hotDeals, ...venues];
    const favoriteVenues = allItems.filter((v) => favorites.includes(v.id));    // id

    // 아이템이 공연장인지 확인하는 함수 (category가 있으면 공연장)
    const isVenue = (item) => !!item.category;

    // 팝업 상태 관리
    const [selectedAd, setSelectedAd] = useState(null);

    // 클릭 핸들러 통합 (여기서 분기 처리)
    const handleCardClick = (item) => {
        if (item.category) {
            // 카테고리가 있으면 공연장 -> 상세 페이지 이동
            navigate(`/venues/${item.id}`);
        } else {
            // 카테고리가 없으면 핫딜(광고) -> 모달 오픈
            setSelectedAd(item);
        }
    };

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
                                title={v.title || v.name} // hotDeals는 title, venues는 name
                                subtitle={v.subtitle || v.location} // hotDeals는 subtitle, venues는 location
                                badge={v.badge || v.category} // hotDeals는 badge, venues는 category
                                badgeColor={v.badgeColor || getBadgeColor(v.category)}  // hotDeals는 색깔을 변수로 가짐. venues는 카테고리에 따라 색깔 다르게 가짐
                                period={v.period || `⭐ ${v.rating} (${v.reviewCount}개 리뷰)`}

                                // hotDeals인지 venues인지에 따라, 클릭 시 다르게 작동
                                onClick={() => handleCardClick(v)}
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