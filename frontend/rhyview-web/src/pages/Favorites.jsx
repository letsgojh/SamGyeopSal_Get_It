import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { venues, hotDeals } from "../data/venues";
import { fundings } from "../data/fundings";

const Section = styled.section`
  padding: 24px 32px;
  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const Grid3 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
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
  &:hover {
    opacity: 0.9;
  }
`;

const FundingHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 8px;
`;

const FundingTitle = styled.h2`
  font-size: 20px;
  font-weight: 800;
  margin: 0;
`;

const FundingSubtitle = styled.p`
  font-size: 13px;
  color: #6b7280;
  margin: 4px 0 0;
`;

const FundingFilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`;

const FundingChip = styled.button`
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 12px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  color: #374151;
  cursor: pointer;
`;

const FundingCount = styled.p`
  margin: 4px 0 20px;
  font-size: 13px;
  color: #ef4444;
`;

const FundingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const FundingCard = styled.article`
  background: #ffffff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
  display: flex;
  flex-direction: column;
`;

const FundingThumb = styled.div`
  width: 100%;
  padding-top: 85%;
  background-position: center 35%;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #e5e7eb;
`;

const FundingBody = styled.div`
  padding: 14px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FundingCategory = styled.span`
  display: inline-block;
  font-size: 11px;
  color: #6b7280;
`;

const FundingProjectTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  margin: 0;
`;

const FundingProjectDesc = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
`;

const FundingStatRow = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 12px;
`;

const FundingProgressText = styled.span`
  font-weight: 700;
  color: #ef4444;
`;

const FundingAmount = styled.span`
  color: #111827;
`;

const FundingDDay = styled.span`
  color: #6b7280;
`;

const FundingBarWrapper = styled.div`
  margin-top: 8px;
  width: 100%;
  height: 4px;
  border-radius: 999px;
  background: #e5e7eb;
  overflow: hidden;
`;

const FundingBarFill = styled.div`
  height: 100%;
  border-radius: 999px;
  background: var(--brand);
`;

const getBadgeColor = (category) => {
  switch (category) {
    case "뮤지컬":
      return "var(--badge-blue)";
    case "연극":
      return "#6366f1";
    case "콘서트":
      return "#10b981";
    case "클래식":
      return "#f59e0b";
    case "경기장":
      return "#af0abeff";
    case "소극장":
      return "#f59e0b";
    default:
      return "var(--badge-rose)";
  }
};

export default function Favorites({ favorites, onToggleFavorite, user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
      alert("로그인 후 이용해주세요.");
    }
  }, [user, navigate]);

  if (!user) return null;

  const allItems = [...hotDeals, ...venues];
  const favoriteVenues = allItems.filter((v) => favorites.includes(v.id));

  const [selectedAd, setSelectedAd] = useState(null);

  const handleCardClick = (item) => {
    if (item.category) {
      navigate(`/venues/${item.id}`);
    } else {
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
                title={v.title || v.name}
                subtitle={v.subtitle || v.location}
                badge={v.badge || v.category}
                badgeColor={v.badgeColor || getBadgeColor(v.category)}
                period={v.period || `⭐ ${v.rating} (${v.reviewCount}개 리뷰)`}
                onClick={() => handleCardClick(v)}
                isFavorite={true}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </Grid3>
        ) : (
          <EmptyState>
            <div>아직 찜한 공연장이 없습니다.</div>
            <Button onClick={() => navigate("/reviews")}>
              공연장 둘러보기
            </Button>
          </EmptyState>
        )}
      </Section>

      <Section>
        <FundingHeaderRow>
          <div>
            <FundingTitle>펀딩</FundingTitle>
            <FundingSubtitle>
              팬의 힘으로 만드는 공연 프로젝트를 만나보세요
            </FundingSubtitle>
          </div>
        </FundingHeaderRow>

        <FundingFilterBar>
          <FundingChip>좋은창작자</FundingChip>
          <FundingChip>상태</FundingChip>
          <FundingChip>세부 카테고리</FundingChip>
          <FundingChip>달성률</FundingChip>
          <FundingChip>에디터 추천</FundingChip>
        </FundingFilterBar>

        <FundingCount>
          {fundings.length.toLocaleString()}개의 프로젝트가 있습니다.
        </FundingCount>

        <FundingGrid>
          {fundings.map((item) => (
            <FundingCard key={item.id}>
              <FundingThumb
                style={{ backgroundImage: `url(${item.image || ""})` }}
              />
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
                  <FundingBarFill
                    style={{ width: `${Math.min(item.progress, 100)}%` }}
                  />
                </FundingBarWrapper>
              </FundingBody>
            </FundingCard>
          ))}
        </FundingGrid>
      </Section>

      <Modal
        open={!!selectedAd}
        onClose={() => setSelectedAd(null)}
        title={selectedAd?.title || "광고"}
      >
        {selectedAd && (
          <a
            href={selectedAd.adLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block" }}
          >
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
