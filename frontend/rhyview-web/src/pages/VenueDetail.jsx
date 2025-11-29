import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import SeatingChart from "../components/SeatingChart";
import Modal from "../components/Modal";
import ReviewForm from "../components/ReviewForm";

// API 함수들
import { getVenueById } from "../api/venuesApi"; // (파일명 주의)
import { getSeats, getSeatReviews, createReview } from "../api/seatsApi";

// =============================================================================
// [스타일 유지] 기존 디자인 코드를 100% 그대로 사용합니다.
// =============================================================================
const Wrapper = styled.div`
  padding: 24px 32px 32px;
  @media (max-width: 768px) { padding: 20px 16px 24px; }
`;

const TopLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 24px; margin-bottom: 32px;
  @media (max-width: 960px) { grid-template-columns: 1fr; }
`;

const SeatMapBox = styled.div`
  border-radius: 18px; border: 1px dashed var(--line); background: #f9fafb;
  padding: 18px; min-height: 260px; display: flex; flex-direction: column; gap: 12px;
  @media (max-width: 768px) { min-height: 200px; }
`;
const SeatMapHeader = styled.div` font-weight: 700; font-size: 15px; margin-bottom: 4px; `;

const InfoBox = styled.div`
  border-radius: 18px; border: 1px solid var(--line); background: #fff;
  padding: 18px; display: flex; flex-direction: column; gap: 10px;
`;

const Tag = styled.span`
  display: inline-block; font-size: 12px; padding: 6px 10px;
  border-radius: 999px; background: #eef2ff; color: #4f46e5;
`;

const RatingRow = styled.div`
  font-size: 14px; color: #6b7280; .star { color: #f59e0b; margin-right: 4px; }
`;

const ButtonRow = styled.div` display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap; `;
const GhostButton = styled.button`
  border-radius: 999px; border: 1px solid var(--line); background: #fff;
  padding: 6px 12px; font-size: 12px; color: #6b7280; cursor: pointer;
  &:hover { background: #f9fafb; }
`;
const PrimaryButton = styled.button`
  border-radius: 999px; border: none; background: #2563eb;
  padding: 7px 14px; font-size: 12px; color: #fff; cursor: pointer;
  &:hover { background: #1d4ed8; }
`;

const ReviewSection = styled.section` margin-top: 8px; `;
const ReviewHeaderRow = styled.div`
  display: flex; justify-content: space-between; align-items: baseline;
  gap: 12px; margin-bottom: 10px; flex-wrap: wrap;
`;
const ReviewTitle = styled.h3` font-size: 16px; font-weight: 800; margin: 0; `;
const ReviewHint = styled.span` font-size: 12px; color: #9ca3af; `;
const ReviewList = styled.div` display: grid; grid-template-columns: minmax(0, 1fr); gap: 12px; `;
const ReviewCard = styled.div`
  border-radius: 14px; border: 1px solid var(--line); background: #fff;
  padding: 14px 16px; font-size: 13px; color: #374151;
`;
const ReviewMetaRow = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px; font-size: 12px;
  color: #6b7280; margin-bottom: 6px;
`;
const SeatTag = styled.span` padding: 4px 8px; border-radius: 999px; background: #f3f4f6; `;
const SmallRating = styled.span` color: #f59e0b; `;
const ReviewText = styled.p` margin: 0; line-height: 1.5; `;

const ModalListWrapper = styled.div`
  padding: 0 20px 16px;
  .empty-message { color: #9ca3af; font-size: 13px; text-align: center; padding: 24px 0 8px; }
  ${ReviewList} { margin-top: 10px; max-height: 250px; overflow-y: auto; padding-right: 8px; }
  ${ReviewCard} { padding: 12px 14px; }
  .review-info { font-size: 11px; color: #6b7280; margin-left: auto; }
`;

// [요청하신 레이아웃] 화면에 그릴 좌석 배치도
const VENUE_LAYOUT = [
  ['STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE'],
  [null, null, null, 'A1', 'A2', 'A3', null, 'A4', 'A5', 'A6', 'A7', null, 'A8', 'A9', 'A10', null, null, null],
  [null, null, 'B1', 'B2', 'B3', 'B4', null, 'B5', 'B6', 'B7', 'B8', null, 'B9', 'B10', 'B11', 'B12', null, null],
  [null, 'C1', 'C2', 'C3', 'C4', 'C5', null, 'C6', 'C7', 'C8', 'C9', null, 'C10', 'C11', 'C12', 'C13', 'C14', null],
  ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', null, 'D7', 'D8', 'D9', 'D10', null, 'D11', 'D12', 'D13', 'D14', 'D15', 'D16'],
  ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', null, 'E7', 'E8', 'E9', 'E10', null, 'E11', 'E12', 'E13', 'E14', 'E15', 'E16'],
  ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', null, 'F7', 'F8', 'F9', 'F10', null, 'F11', 'F12', 'F13', 'F14', 'F15', 'F16'],
  ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', null, 'G7', 'G8', 'G9', 'G10', null, 'G11', 'G12', 'G13', 'G14', 'G15', 'G16'],
];

export default function VenueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  // DB 데이터 상태
  const [dbSeats, setDbSeats] = useState([]);
  const [selectedSeatId, setSelectedSeatId] = useState(null);

  // 화면 UI 상태
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [reviews, setReviews] = useState([]); 

  // 1. 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const venueData = await getVenueById(id);
        if (venueData) {
            setVenue({
                ...venueData,
                name: venueData.name,
                location: venueData.address,
                category: "공연장", 
                rating: "0.0", 
                reviewCount: 0, 
                shortDesc: "좌석 배치도와 리뷰를 확인하세요."
            });
        }

        const seatsData = await getSeats(id);
        console.log("💺 DB에서 가져온 전체 좌석:", seatsData);
        setDbSeats(seatsData);

      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  // ✅ [수정된 핵심 로직] 클릭한 좌석을 DB 데이터와 매칭
  const handleSeatClick = async (seatLabel) => {
    // 1. "A1" -> Row:"A", Num:1 로 분리
    const match = seatLabel.match(/([A-Z]+)(\d+)/);
    if (!match) return;

    const rowChar = match[1]; // "A"
    const seatNum = parseInt(match[2], 10); // 1 (숫자로 변환)

    console.log(`🖱️ 클릭: [${rowChar}구역/행, ${seatNum}번]`);

    // 2. DB에서 찾기 (DB의 section이 'A'이고 number가 1인 데이터를 찾음)
    // *주의: DB에 section='A', number=1 인 데이터가 여러 개(1열, 2열 등)라면 첫 번째 것을 가져옵니다.
    // 만약 정확히 '몇 열'인지 구분하려면 VENUE_LAYOUT을 수정해야 하지만, 
    // 요청하신 대로 배열을 유지하려면 이 방식(구역+번호 매칭)이 최선입니다.
    const targetSeat = dbSeats.find(s => {
        return s.section === rowChar && Number(s.number) === seatNum;
    });

    if (targetSeat) {
        console.log("✅ 매칭 성공:", targetSeat);
        
        setSelectedSeat(seatLabel);
        setSelectedSeatId(targetSeat.id);
        
        // 리뷰 불러오기
        try {
            const realReviews = await getSeatReviews(id, targetSeat.id);
            setReviews(realReviews); 
        } catch (e) {
            setReviews([]); 
        }

        setReviewModalOpen(true);
    } else {
        console.error("❌ 매칭 실패. 해당 좌석 데이터가 DB에 없습니다.");
        alert("등록되지 않은 좌석입니다.");
    }
  };

  // 3. 리뷰 작성
  const handleAddReview = async (newReview) => {
    try {
        const token = localStorage.getItem("token") || ""; 
        await createReview(id, {
            seat_id: selectedSeatId,
            rating: newReview.rating,
            content: newReview.text
        }, token);

        const updatedReviews = await getSeatReviews(id, selectedSeatId);
        setReviews(updatedReviews);
        
    } catch (err) {
        alert("리뷰 등록 실패 (로그인이 필요합니다)");
    }
  };

  if (loading) return <Wrapper><PageHeader title="로딩중..." /></Wrapper>;
  if (!venue) return <Wrapper><PageHeader title="정보 없음" /></Wrapper>;

  return (
    <>
      <PageHeader title={venue.name} desc={`${venue.location} · ${venue.category}`} />
      <Wrapper>
        <TopLayout>
          <SeatMapBox>
            <SeatMapHeader>좌석 배치도</SeatMapHeader>
            <SeatingChart
              layout={VENUE_LAYOUT}
              onSeatClick={handleSeatClick}
              reviews={[]} 
            />
          </SeatMapBox>

          <InfoBox>
            <Tag>{venue.category}</Tag>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{venue.name}</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 4 }}>
              {venue.location}
            </div>
            <RatingRow>
              <span className="star">★</span>
              <span>{venue.rating} ({venue.reviewCount}개 리뷰)</span>
            </RatingRow>
            <div style={{ fontSize: 13, color: "#4b5563", marginTop: 6 }}>
              {venue.shortDesc}
            </div>
            <ButtonRow>
              <PrimaryButton onClick={() => navigate("/reviews")}>
                이 공연장 리뷰 더 보기
              </PrimaryButton>
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
             <div style={{color:'#999', fontSize:13, padding:'10px 0'}}>
                좌석을 선택하면 해당 좌석의 리뷰를 볼 수 있습니다.
             </div>
          </ReviewList>
        </ReviewSection>
      </Wrapper>

      <Modal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        title={selectedSeat ? `${selectedSeat} 리뷰` : "리뷰"}
      >
        {reviewModalOpen && (
          <ReviewForm seatId={selectedSeat} onSubmit={handleAddReview} />
        )}
        <br />
        <ModalListWrapper>
          {reviews.length === 0 ? (
            <div className="empty-message">이 좌석의 첫 리뷰를 남겨주세요!</div>
          ) : (
            <>
              <ReviewTitle style={{ fontSize: "15px", marginBottom: "10px" }}>
                이 좌석의 리뷰 ({reviews.length}개)
              </ReviewTitle>
              <ReviewList>
                {reviews.map((r) => (
                  <ReviewCard key={r.id}>
                    <ReviewMetaRow>
                      <SmallRating>★ {r.rating}</SmallRating>
                      <span className="review-info">
                        {r.created_at ? r.created_at.slice(0, 10) : "날짜 없음"}
                      </span>
                    </ReviewMetaRow>
                    <ReviewText>{r.content}</ReviewText>
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