import axios from 'axios';

export const API_BASE = "http://localhost:3000";

// 1. 공연장별 좌석 목록 조회 (seatController.showSeatByShow)
// 백엔드 라우터가 GET /seats/venue/:venueId 라고 가정
export const getSeats = async (venueId) => {
  try {
    const res = await axios.get(`${API_BASE}/seats/venue/${venueId}`);
    // controller가 { data: rows } 형태로 응답한다고 가정
    if (res.data && res.data.data) {
        return res.data.data;
    }
    return [];
  } catch (error) {
    console.error("좌석 데이터 조회 실패:", error);
    return [];
  }
};

// 2. 좌석별 리뷰 조회 (seatController.showReviewBySeat)
// 백엔드 라우터가 GET /seats/shows/:showId/seats/:seatId/reviews 라고 가정
export const getSeatReviews = async (showId, seatId) => {
  try {
    const res = await axios.get(`${API_BASE}/seats/shows/${showId}/seats/${seatId}/reviews`);
    if (res.data && res.data.data) {
        return res.data.data;
    }
    return [];
  } catch (error) {
    console.error("좌석 리뷰 조회 실패:", error);
    return [];
  }
};

// 3. 좌석 리뷰 작성 (seatController.postReview)
// 백엔드 라우터가 POST /seats/shows/:showId/reviews 라고 가정
export const createReview = async (showId, reviewData, token) => {
  try {
    const res = await axios.post(
      `${API_BASE}/seats/shows/${showId}/reviews`, 
      reviewData,
      {
        headers: { Authorization: `Bearer ${token}` } // 로그인 토큰 필수
      }
    );
    return res.data;
  } catch (error) {
    console.error("리뷰 작성 실패:", error);
    throw error;
  }
};