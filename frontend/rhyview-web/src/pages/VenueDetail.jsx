import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../components/PageHeader";
// import { venues } from "../data/venues"; // ❌ 가짜 데이터 삭제
import SeatingChart from "../components/SeatingChart";
import Modal from "../components/Modal";
import ReviewForm from "../components/ReviewForm";
import { getVenueById } from "../api/venuesApi";

// --- 스타일 컴포넌트 (기존 코드 그대로 유지) ---
const Wrapper = styled.div`
  padding: 24px 32px 32px;
  @media (max-width: 768px){ padding: 20px 16px 24px; }
`;

const TopLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 24px; margin-bottom: 32px;
  @media (max-width: 960px){ grid-template-columns: 1fr; }
`;

const SeatMapBox = styled.div`
  border-radius: 18px; border: 1px dashed var(--line); background: #f9fafb;
  padding: 18px; min-height: 260px; display: flex; flex-direction: column; gap: 12px;
  @media (max-width: 768px){ min-height: 200px; }
`;
const SeatMapHeader = styled.div` font-weight: 700; font-size: 15px; margin-bottom: 4px; `;

const InfoBox = styled.div`
  border-radius: 18px; border: 1px solid var(--line); background:#fff; padding:18px;
  display:flex; flex-direction:column; gap:10px;
`;

const Tag = styled.span`
  display:inline-block; font-size:12px; padding:6px 10px; border-radius:999px;
  background:#eef2ff; color:#4f46e5;
`;

const RatingRow = styled.div` font-size:14px; color:#6b7280; .star{ color:#f59e0b; margin-right:4px; } `;
const ButtonRow = styled.div` display:flex; gap:8px; margin-top:8px; flex-wrap:wrap; `;
const GhostButton = styled.button`
  border-radius: 999px; border: 1px solid var(--line); background:#fff; padding: 6px 12px; font-size:12px; color:#6b7280; cursor:pointer;
  &:hover{ background:#f9fafb; }
`;
const PrimaryButton = styled.button`
  border-radius: 999px; border:none; background:#2563eb; padding: 7px 14px; font-size:12px; color:#fff; cursor:pointer;
  &:hover{ background:#1d4ed8; }
`;

const ReviewSection = styled.section` margin-top:8px; `;
const ReviewHeaderRow = styled.div`
  display:flex; justify-content:space-between; align-items:baseline; gap:12px; margin-bottom:10px; flex-wrap:wrap;
`;
const ReviewTitle = styled.h3` font-size:16px; font-weight:800; margin:0; `;
const ReviewHint = styled.span` font-size:12px; color:#9ca3af; `;
const ReviewList = styled.div` display:grid; grid-template-columns: minmax(0,1fr); gap:12px; `;
const ReviewCard = styled.div` border-radius:14px; border:1px solid var(--line); background:#fff; padding:14px 16px; font-size:13px; color:#374151; `;
const ReviewMetaRow = styled.div` display:flex; flex-wrap:wrap; gap:8px; font-size:12px; color:#6b7280; margin-bottom:6px; `;
const SeatTag = styled.span` padding:4px 8px; border-radius:999px; background:#f3f4f6; `;
const SmallRating = styled.span` color:#f59e0b; `;
const ReviewText = styled.p` margin:0; line-height:1.5; `;

const ModalListWrapper = styled.div`
  padding: 0 20px 16px;
  .empty-message {
    color: #9ca3af; font-size: 13px; text-align: center; padding: 24px 0 8px;
  }
  ${ReviewList} {
    margin-top: 10px; max-height: 250px; overflow-y: auto; padding-right: 8px;
  }
  ${ReviewCard} { padding: 12px 14px; }
  .review-info {
    font-size: 11px; color: #6b7280; margin-left: auto;
  }
`;

export default function VenueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ 1. DB 데이터를 담을 state 생성
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ 2. 초기 리뷰 데이터 (아직 리뷰 API가 없으므로 임시 빈 배열 또는 예시)
  const [reviews, setReviews] = useState([]);

  // ✅ 3. 백엔드에서 공연 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // 👇 getShowById가 아니라 getVenueById를 호출합니다!
      const data = await getVenueById(id);

      if (data) {
        setVenue({
          ...data,
          // DB 컬럼 매핑
          name: data.name,           // 공연장 이름
          location: data.address,    // 주소
          category: "공연장",         // 카테고리 고정
          rating: "0.0",             // 평점 (추후 구현)
          reviewCount: 0,
          shortDesc: "좌석 배치도와 리뷰를 확인하세요.",
          seatingLayout: [[]]        // 배치도 데이터 (추후 구현)
        });
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);


  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatClick = (seatId) => {
    setSelectedSeat(seatId);
    setReviewModalOpen(true);
  };

  const handleAddReview = (newReview) => {
    setReviews([newReview, ...reviews]);
    setReviewModalOpen(false);
    setSelectedSeat(null);
  };

  const reviewsForSeat = reviews.filter(r => r.seat === selectedSeat);

  // ✅ 로딩 중일 때 처리
  if (loading) {
    return <Wrapper><PageHeader title="데이터 불러오는 중..." /></Wrapper>;
  }

  // ✅ 데이터가 없을 때 (에러) 처리
  if (!venue) {
    return (
      <Wrapper>
        <PageHeader title="공연장 정보를 찾을 수 없어요" />
        <p style={{ fontSize: 14, color: "#6b7280" }}>잘못된 주소이거나 아직 등록되지 않은 공연장입니다.</p>
        <GhostButton onClick={() => navigate("/")}>← 홈으로</GhostButton>
      </Wrapper>
    );
  }

  return (
    <>
      <PageHeader title={venue.name} desc={`${venue.location} · ${venue.category}`} />
      <Wrapper>
        <TopLayout>
          <SeatMapBox>
            <SeatMapHeader>좌석 배치도</SeatMapHeader>
            <SeatingChart
              layout={venue.seatingLayout}
              onSeatClick={handleSeatClick}
              reviews={reviews}
            />
          </SeatMapBox>

          <InfoBox>
            <Tag>{venue.category}</Tag>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{venue.name}</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 4 }}>{venue.location}</div>

            {/* 이미지 추가 (필요하다면 주석 해제해서 사용) */}
            {/* <img src={venue.image} alt={venue.name} style={{width:'100%', borderRadius:8, marginTop: 10}} /> */}

            <RatingRow><span className="star">★</span><span>{venue.rating} ({venue.reviewCount}개 리뷰)</span></RatingRow>
            <div style={{ fontSize: 13, color: "#4b5563", marginTop: 6 }}>{venue.shortDesc}</div>
            <ButtonRow>
              <PrimaryButton onClick={() => navigate("/reviews")}>이 공연장 리뷰 더 보기</PrimaryButton>
              <GhostButton onClick={() => navigate(-1)}>← 이전</GhostButton>
              <GhostButton onClick={() => navigate("/")}>홈으로</GhostButton>
            </ButtonRow>
          </InfoBox>
        </TopLayout>

        <ReviewSection>
          <ReviewHeaderRow>
            <ReviewTitle>모든 좌석 리뷰</ReviewTitle>
            <ReviewHint>좌석 배치도에서 좌석을 클릭해 리뷰를 남겨보세요.</ReviewHint>
          </ReviewHeaderRow>
          <ReviewList>
            {reviews.map(r => (
              <ReviewCard key={r.id}>
                <ReviewMetaRow>
                  <SeatTag>{r.seat}</SeatTag>
                  <SmallRating>★ {r.rating}</SmallRating>
                </ReviewMetaRow>
                <ReviewText>{r.text}</ReviewText>
              </ReviewCard>
            ))}
            {reviews.length === 0 && (
              <ReviewText style={{ color: "#9ca3af", fontSize: 13 }}>아직 등록된 리뷰가 없습니다.</ReviewText>
            )}
          </ReviewList>
        </ReviewSection>
      </Wrapper>

      <Modal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        title={selectedSeat ? `${selectedSeat} 좌석 리뷰 작성` : "리뷰"}
      >
        {reviewModalOpen && (
          <ReviewForm
            seatId={selectedSeat}
            onSubmit={handleAddReview}
          />
        )}
        <br></br>
        <ModalListWrapper>
          {reviewsForSeat.length === 0 ? (
            <div className="empty-message">
              이 좌석의 첫 리뷰를 남겨주세요!
            </div>
          ) : (
            <>
              <ReviewTitle style={{ fontSize: '15px' }}>
                이 좌석의 리뷰 ({reviewsForSeat.length}개)
              </ReviewTitle>
              <ReviewList>
                {reviewsForSeat.map(r => (
                  <ReviewCard key={r.id}>
                    <ReviewMetaRow>
                      <SmallRating>★ {r.rating}</SmallRating>
                      <span className="review-info">{r.user} · {r.time}</span>
                    </ReviewMetaRow>
                    {r.title && (
                      <ReviewText style={{ fontWeight: 700, marginBottom: 4 }}>
                        {r.title}
                      </ReviewText>
                    )}
                    <ReviewText>{r.text}</ReviewText>
                  </ReviewCard>
                ))}
              </ReviewList>
            </>
          )}
        </ModalListWrapper>
      </Modal>
    </>
  );
}