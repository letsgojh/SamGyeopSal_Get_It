import axios from 'axios';

export const API_BASE = "http://localhost:3000";

// 1. 좌석 목록 조회
export const getSeats = async (venueId) => {
  try {
    // app.js에서 /seats 로 연결했으므로 전체 주소는 /seats/shows/:id/seats
    const res = await axios.get(`${API_BASE}/seats/shows/${venueId}/seats`);
    if (res.data && res.data.data) return res.data.data;
    return [];
  } catch (error) {
    console.error("좌석 조회 실패:", error);
    return [];
  }
};

// 2. 좌석 리뷰 조회 (수정됨)
export const getSeatReviews = async (showId, seatId) => {
  try {
    // ✅ 라우터와 주소 통일: /seats/shows/:id/seats/:seatId/reviews
    const res = await axios.get(`${API_BASE}/seats/shows/${showId}/seats/${seatId}/reviews`);
    if (res.data && res.data.data) return res.data.data;
    return [];
  } catch (error) {
    // 404가 뜨더라도 데이터가 없다는 뜻일 수 있으므로 빈 배열 반환
    return [];
  }
};

// 3. 좌석 리뷰 작성 (수정됨)
export const createReview = async (showId, reviewData, token) => {
  try {
    // ✅ 라우터와 주소 통일
    // reviewData에는 { rating, content }가 들어있어야 함
    const res = await axios.post(
      `${API_BASE}/seats/shows/${showId}/seats/${reviewData.seat_id}/reviews`,
      reviewData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.reviewData;
  } catch (error) {
    console.error("리뷰 작성 실패:", error);
    throw error;
  }
};