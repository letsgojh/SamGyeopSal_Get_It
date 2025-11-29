import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import SeatingChart from "../components/SeatingChart";
import Modal from "../components/Modal";
import ReviewForm from "../components/ReviewForm";

// API 함수
import { getVenueById } from "../api/venuesApi";
import { getSeats, getSeatReviews, createReview } from "../api/seatsApi";

// =============================================================================
// [스타일 유지] 사용자님의 원본 스타일 코드를 그대로 사용합니다.
// =============================================================================
const Wrapper = styled.div`
  padding: 24px 32px 32px;
  @media (max-width: 768px) {
    padding: 20px 16px 24px;
  }
`;

const TopLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 24px;
  margin-bottom: 32px;
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const SeatMapBox = styled.div`
  border-radius: 18px;
  border: 1px dashed var(--line);
  background: #f9fafb;
  padding: 18px;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 768px) {
    min-height: 200px;
  }
`;

const SeatMapHeader = styled.div`
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 4px;
`;

const InfoBox = styled.div`
  border-radius: 18px;
  border: 1px solid var(--line);
  background: #fff;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Tag = styled.span`
  display: inline-block;
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  background: #eef2ff;
  color: #4f46e5;
`;

const RatingRow = styled.div`
  font-size: 14px;
  color: #6b7280;
  .star {
    color: #f59e0b;
    margin-right: 4px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
`;

const GhostButton = styled.button`
  border-radius: 999px;
  border: 1px solid var(--line);
  background: #fff;
  padding: 6px 12px;
  font-size: 12px;
  color: #6b7280;
  cursor: pointer;
  &:hover {
    background: #f9fafb;
  }
`;

const PrimaryButton = styled.button`
  border-radius: 999px;
  border: none;
  background: #2563eb;
  padding: 7px 14px;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
  &:hover {
    background: #1d4ed8;
  }
`;

const ReviewSection = styled.section`
  margin-top: 8px;
`;

const ReviewHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

const ReviewTitle = styled.h3`
  font-size: 16px;
  font-weight: 800;
  margin: 0;
`;

const ReviewHint = styled.span`
  font-size: 12px;
  color: #9ca3af;
`;

const ReviewList = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;
`;

const ReviewCard = styled.div`
  border-radius: 14px;
  border: 1px solid var(--line);
  background: #fff;
  padding: 14px 16px;
  font-size: 13px;
  color: #374151;
`;

const ReviewMetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 6px;
`;

const SeatTag = styled.span`
  padding: 4px 8px;
  border-radius: 999px;
  background: #f3f4f6;
`;

const SmallRating = styled.span`
  color: #f59e0b;
`;

const ReviewText = styled.p`
  margin: 0;
  line-height: 1.5;
`;

const ModalListWrapper = styled.div`
  padding: 0 20px 16px;
  
  .empty-message {
    color: #9ca3af;
    font-size: 13px;
    text-align: center;
    padding: 24px 0 8px;
  }

  ${ReviewList} {
    margin-top: 10px;
    max-height: 250px;
    overflow-y: auto;
    padding-right: 8px;
  }
  ${ReviewCard} {
    padding: 12px 14px;
  }
  .review-info {
    font-size: 11px;
    color: #6b7280;
    margin-left: auto;
  }
`;

// ✅ [좌석 배치도] DB 데이터 구조(구역_열_번호)에 맞춰 생성
const VENUE_LAYOUT = [
  ['STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE', 'STAGE'],
  ['A_1_1', 'A_1_2', 'A_1_3', 'A_1_4', 'A_1_5', null, 'B_1_1', 'B_1_2', 'B_1_3', 'B_1_4', 'B_1_5'],
  ['A_2_1', 'A_2_2', 'A_2_3', 'A_2_4', 'A_2_5', null, 'B_2_1', 'B_2_2', 'B_2_3', 'B_2_4', 'B_2_5'],
  [null, null, null, null, null, null, null, null, null, null, null],
  ['B_3_1', 'B_3_2', 'B_3_3', 'B_3_4', 'B_3_5', null, 'C_3_1', 'C_3_2', 'C_3_3', 'C_3_4', 'C_3_5'],
  ['B_4_1', 'B_4_2', 'B_4_3', 'B_4_4', 'B_4_5', null, 'C_4_1', 'C_4_2', 'C_4_3', 'C_4_4', 'C_4_5'],
  [null, null, null, null, null, null, null, null, null, null, null],
  ['C_5_1', 'C_5_2', 'C_5_3', 'C_5_4', 'C_5_5', null, 'D_5_1', 'D_5_2', 'D_5_3', 'D_5_4', 'D_5_5'],
  ['C_6_1', 'C_6_2', 'C_6_3', 'C_6_4', 'C_6_5', null, 'D_6_1', 'D_6_2', 'D_6_3', 'D_6_4', 'D_6_5'],
  [null, null, null, null, null, null, null, null, null, null, null],
  ['D_7_1', 'D_7_2', 'D_7_3', 'D_7_4', 'D_7_5', null, null, null, null, null, null],
  ['D_8_1', 'D_8_2', 'D_8_3', 'D_8_4', 'D_8_5', null, null, null, null, null, null],
  // 추가 좌석
  [null, null, null, null, null, null, 'A_9_1', 'A_9_2', 'A_9_3', 'A_9_4', 'A_9_5'],
  [null, null, null, null, null, null, 'A_10_1', 'A_10_2', 'A_10_3', 'A_10_4', 'A_10_5'],
];

export default function VenueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  // DB 데이터
  const [dbSeats, setDbSeats] = useState([]);
  const [selectedSeatId, setSelectedSeatId] = useState(null); // DB PK

  // 화면 UI
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null); // 화면용 이름 ("A구역 1열 1번")
  const [reviews, setReviews] = useState([]);

  // 1. 초기 데이터 로드
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
            shortDesc: "좌석 배치도와 리뷰를 확인하세요.",
            seatingLayout: [[]],
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

  // ✅ [수정] 좌석 클릭 핸들러 (매칭 로직)
  const handleSeatClick = async (seatLabel) => {
    // 1. 문자열 분해: "A_1_1" -> A, 1, 1
    const parts = seatLabel.split('_');
    if (parts.length !== 3) return;

    const sec = parts[0]; 
    const row = parts[1]; 
    const num = parts[2]; 

    console.log(`🖱️ 클릭: [${sec}구역 ${row}열 ${num}번]`);

    // 2. DB에서 찾기
    const targetSeat = dbSeats.find(s => {
      // DB 데이터 타입(숫자/문자) 무시하고 비교
      return String(s.section) === sec && 
             String(s.seat_row) === row && 
             String(s.number) === num;
    });

    if (targetSeat) {
      console.log("✅ 매칭 성공:", targetSeat);
      
      setSelectedSeat(`${sec}구역 ${row}열 ${num}번`);
      setSelectedSeatId(targetSeat.id);
      
      // 리뷰 가져오기
      try {
        const realReviews = await getSeatReviews(id, targetSeat.id);
        setReviews(realReviews);
      } catch (e) {
        setReviews([]);
      }

      setReviewModalOpen(true);
    } else {
      console.error("❌ 매칭 실패. DB 데이터:", dbSeats);
      alert("등록되지 않은 좌석입니다.");
    }
  };

  // 3. 리뷰 작성 핸들러
  const handleAddReview = async (newReview) => {
    try {
      const token = localStorage.getItem("token") || ""; 
      // API 호출 (seat_id 포함)
      await createReview(id, {
        seat_id: selectedSeatId,
        rating: newReview.rating,
        content: newReview.text
      }, token);

      // 목록 갱신
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
      <PageHeader
        title={venue.name}
        desc={`${venue.location} · ${venue.category}`}
      />
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
            <ReviewHint>
              좌석 배치도에서 좌석을 클릭해 리뷰를 남겨보세요.
            </ReviewHint>
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
            <div className="empty-message">
              이 좌석의 첫 리뷰를 남겨주세요!
            </div>
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
                        {r.created_at?.slice(0, 10) || "날짜 없음"}
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