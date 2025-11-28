import axios from 'axios';

// ✅ 브라우저에서 잘 나왔던 주소(localhost:3000)와 똑같이 맞춥니다.
export const API_BASE = "http://localhost:3000"; 

export const getShows = async () => {
  try {
    const res = await axios.get(`${API_BASE}/shows`);
    console.log("📦 데이터 도착:", res.data); // 여기에 로그가 찍혀야 성공!

    // 데이터 구조에 따라 꺼내기
    if (res.data && Array.isArray(res.data.data)) {
        return res.data.data; 
    }
    if (Array.isArray(res.data)) return res.data;

    return []; 
  } catch (error) {
    // 👇 에러 내용을 자세히 보기 위해 error 객체 전체를 출력합니다.
    console.error("API 에러 상세:", error); 
    return [];
  }
};

export const getShowById = async (showId) => {
  try {
    const res = await axios.get(`${API_BASE}/shows/${showId}`);
    console.log(`📦 상세 조회(ID:${showId}) 응답:`, res.data);

    // CASE 1: { "data": { ... } } 형태로 객체가 바로 오는 경우 (가장 이상적)
    if (res.data && res.data.data && !Array.isArray(res.data.data)) {
        return res.data.data;
    }

    // CASE 2: { "data": [ { ... } ] } 형태로 배열에 담겨 오는 경우 (DB 쿼리 결과)
    if (res.data && Array.isArray(res.data.data)) {
        return res.data.data[0]; // 배열의 첫 번째 꺼내기
    }

    // CASE 3: 그냥 바로 객체가 온 경우
    return res.data;

  } catch (error) {
    console.error(`🚨 상세 조회 에러 (ID:${showId}):`, error);
    return null; 
  }
};