import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import { venues } from "../data/venues";
import SeatingChart from "../components/SeatingChart";
import Modal from "../components/Modal";
import ReviewForm from "../components/ReviewForm";

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
const SeatMapBody = styled.div`
  flex: 1; border-radius: 14px; border: 1px solid #e5e7eb;
  background: repeating-linear-gradient(0deg,#f3f4f6,#f3f4f6 1px,transparent 1px,transparent 22px),
              repeating-linear-gradient(90deg,#f3f4f6,#f3f4f6 1px,transparent 1px,transparent 32px);
  display:flex; align-items:center; justify-content:center; color:#9ca3af; font-size:13px; text-align:center; padding:12px;
`;

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
  padding: 0 20px 16px; /* 폼과 좌우 패딩 맞춤 */
  
  /* 리뷰가 없을 때 메시지 */
  .empty-message {
    color: #9ca3af;
    font-size: 13px;
    text-align: center;
    padding: 24px 0 8px;
  }

  /* 모달 내의 리뷰 목록은 스크롤되도록 */
  ${ReviewList} {
    margin-top: 10px;
    max-height: 250px; /* 최대 높이 지정 */
    overflow-y: auto; /* 스크롤 */
    padding-right: 8px; /* 스크롤바 공간 */
  }

  /* 모달 내의 리뷰 카드 스타일 약간 조정 */
  ${ReviewCard} {
    padding: 12px 14px;
  }

  /* 유저/시간 정보 스타일 */
  .review-info {
    font-size: 11px;
    color: #6b7280;
    margin-left: auto; /* 오른쪽 끝으로 */
  }
`;

export default function VenueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const venue = useMemo(() => venues.find(v => v.id === id), [id]);

  const initialReviews = useMemo(() => {
    if (!venue) return [];
    return [
      { id: 1, seat: "B5", rating: "4.5", text: `${venue.name}에서 관람. 무대 전체가 잘 보이면서 배우 표정도 적당히 보입니다.`, user: "뮤지컬광", time: "3일 전" },
      { id: 2, seat: "C8", rating: "4.0", text: "전체 그림 보기에 좋지만 표정은 다소 멀게 느껴질 수 있어요.", user: "Rhyview", time: "5일 전" },
      { id: 3, seat: "A6", rating: "5.0", text: "배우들 표정, 무대 전체 다 좋았어요. 강추!", user: "공연매니아", time: "1주 전" },
      { id: 4, seat: "B5", rating: "3.8", text: "앞사람 머리가 좀 걸렸지만 볼만했습니다.", user: "초보관람객", time: "2주 전" },
    ];
  }, [venue]);

  // 👈 4. 리뷰 목록을 useMemo가 아닌 useState로 관리
  const [reviews, setReviews] = useState([]);

  // venue가 로드되면 initialReviews를 state에 설정
  React.useEffect(() => {
    setReviews(initialReviews);
  }, [initialReviews]);


  // 👈 5. 모달 상태 및 선택된 좌석 state 추가
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);

  // 👈 6. 좌석 클릭 시 실행될 함수
  const handleSeatClick = (seatId) => {
    setSelectedSeat(seatId);  // (1) 선택한 좌석 ID 저장
    setReviewModalOpen(true); // (2) 리뷰 작성 모달 열기
  };

  // 👈 7. 리뷰 폼 제출 시 실행될 함수
  const handleAddReview = (newReview) => {
    setReviews([newReview, ...reviews]); // (1) 리뷰 목록에 추가
    setReviewModalOpen(false); // (2) 리뷰 작성 모달 닫기
    setSelectedSeat(null); // (3) 선택한 좌석 초기화
  };

  // 👈 +2. 선택된 좌석의 리뷰만 필터링합니다.
  const reviewsForSeat = reviews.filter(r => r.seat === selectedSeat);

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
            {/* placeholder 텍스트와 <SeatMapBody> 대신 
              SeatingChart 컴포넌트를 렌더링합니다.
            */}
            <SeatingChart
              layout={venue.seatingLayout || [[]]} // layout이 없을 경우 에러 방지
              onSeatClick={handleSeatClick}
              reviews={reviews}
            />
          </SeatMapBox>

          <InfoBox>
            <Tag>{venue.category}</Tag>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{venue.name}</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 4 }}>{venue.location}</div>
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

      {/* 👈 10. 리뷰 작성 모달 렌더링 */}
      <Modal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        title={selectedSeat ? `${selectedSeat} 좌석 리뷰 작성` : "리뷰"}
      >
        {/* (1) 이 좌석의 리뷰 목록 */}
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
