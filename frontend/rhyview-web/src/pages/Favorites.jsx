import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import { venues } from "../data/venues";

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

export default function Favorites({ favorites, onToggleFavorite }) {
    const navigate = useNavigate();

    // ❗ 찜한 ID 목록(favorites)에 포함된 공연장만 필터링
    // 주의: Home.jsx의 'hot' 데이터(id 1,2,3)가 venues.js에 없다면 여기서는 안 보일 수 있습니다.
    // 완벽하게 하려면 hot 데이터도 venues와 같은 데이터 소스를 사용하거나 별도 처리가 필요합니다.
    const favoriteVenues = venues.filter((v) => favorites.includes(v.id));

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
                                title={v.name}
                                subtitle={v.location}
                                badge={v.category}
                                badgeColor={v.badgeColor}
                                period={`⭐ ${v.rating} (${v.reviewCount}개 리뷰)`}
                                as={Link}
                                to={`/venues/${v.id}`}
                                // 찜 페이지에서도 하트 눌러서 삭제 가능
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
        </>
    );
}