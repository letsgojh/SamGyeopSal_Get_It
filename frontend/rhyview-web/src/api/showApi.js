import axios from "axios";

const API_BASE = "http://localhost:5173/api";

// 1. 공연 전체 목록 조회 (GET /api/shows)
export const getShows = async () => {
  const res = await axios.get(`${API_BASE}/shows`);
  return res.data;
};

// 2. 공연 상세 정보 조회 (GET /api/shows/:id)
// 클릭한 공연의 id를 받아와서 URL 뒤에 붙입니다.
export const getShowDetail = async (id) => {
  const res = await axios.get(`${API_BASE}/shows/${id}`);
  return res.data;
};

// 3. 공연 카테고리별 조회 (GET /api/shows/:category)
// 예: "musical", "concert" 같은 카테고리명을 받습니다.
export const getShowsByCategory = async (category) => {
  const res = await axios.get(`${API_BASE}/shows/${category}`);
  return res.data;
};

// 4. 추천 공연 조회 (GET /api/operations/recommend?limit=)
// 몇 개를 추천받을지 limit 숫자를 넘겨줍니다.
// 주소가 /shows가 아니라 /operations 로 시작하는 점 주의하세요!
export const getRecommendedShows = async (limit) => {
  const res = await axios.get(`${API_BASE}/operations/recommend`, {
    params: { limit: limit } // 이렇게 하면 주소 뒤에 ?limit=3 처럼 붙습니다.
  });
  return res.data;
};

// 5. 공연 검색 (POST /api/shows/search?keyword=)
// ★주의: 검색인데 특이하게 POST 방식을 쓰고 있습니다.
export const searchShows = async (keyword) => {
  // POST 요청이지만 데이터(body)가 아니라 쿼리 스트링(?keyword=)을 쓰는 경우입니다.
  const res = await axios.post(`${API_BASE}/shows/search`, null, {
    params: { keyword: keyword }
  });
  return res.data;
};

getShows();
getShowDetail();
getShowsByCategory();
getRecommendedShows();
searchShows();