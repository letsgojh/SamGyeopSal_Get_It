// src/components/SeatingChart.jsx

import React from "react";
import styled from "styled-components";

// 무대 스타일
const Stage = styled.div`
  text-align: center;
  font-weight: 600;
  padding: 8px; /* 크기 축소 */
  background: #4b5563;
  color: white;
  border-radius: 4px;
  margin-bottom: 8px; /* 크기 축소 */
  font-size: 11px; /* 크기 축소 */
  letter-spacing: 1px;
`;

// 반응형 그리드 컨테이너
const Grid = styled.div`
  display: grid;
  /* grid-template-columns: 
    레이아웃의 1번째 줄(0번째는 STAGE)의 '열 개수'만큼 
    'minmax(0, 1fr)' (최소 0, 최대 1fr)로 컬럼을 나눕니다.
    => 모든 열이 동일한 너비를 가지며 컨테이너에 꽉 참
  */
  grid-template-columns: ${({ cols }) => `repeat(${cols}, minmax(0, 1fr))`};
  gap: 3px; /* 좌석 사이의 최소 간격 */
  width: 100%;
`;

// 복도 (빈 공간)
const EmptySpace = styled.div`
  aspect-ratio: 1 / 1;
`;

// 좌석 버튼
// 👈 2. SeatButton 스타일 수정
const SeatButton = styled.button`
  /* 1:1 비율을 유지 (정사각형) */
  aspect-ratio: 1 / 1;
  font-size: clamp(6px, 1.5vw, 10px);
  border-radius: 4px;
  cursor: pointer;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 500;
  transition: all 0.1s ease;

  /* 기본 (리뷰 없음) 스타일 */
  background: #eef2ff;
  color: var(--brand);
  border: 1px solid var(--brand);

  /* 👈 3. 'colors' prop이 있으면 스타일 덮어쓰기 */
  ${({ colors }) =>
        colors &&
        `
    background: ${colors.bg};
    color: ${colors.text};
    border: 1px solid ${colors.border};
    font-weight: 600;
  `}

  &:hover {
    opacity: 0.85;
    /* 기본 스타일일 때만 hover 시 색상 변경 */
    ${({ colors }) =>
        !colors &&
        `
      background: var(--brand);
      color: white;
    `}
  }
`;

// 👈 1. 좌석별 평점 색상을 반환하는 헬퍼 함수
// (Tailwind CSS 색상 팔레트 기준)
const getSeatColors = (rating) => {
    if (rating === 0) return null; // 리뷰 없음 (기본값)

    // { 배경색, 글자색, 테두리색 }
    if (rating > 4.0) return { bg: "#22c55e", text: "white", border: "#16a34a" }; // 초록
    if (rating > 3.0) return { bg: "#84cc16", text: "#333", border: "#65a30d" }; // 연두
    if (rating > 2.0) return { bg: "#eab308", text: "#333", border: "#ca8a04" }; // 노랑
    if (rating >= 1.0) return { bg: "#ef4444", text: "white", border: "#dc2626" }; // 빨강

    return null;
};

export default function SeatingChart({ layout, onSeatClick, reviews }) {
    // 0번째 줄은 STAGE
    const stageRow = layout[0];
    // 1번째 줄부터가 실제 좌석
    const seatRows = layout.slice(1);
    // 1번째 줄의 길이를 기준으로 컬럼 개수 계산
    const columnCount = layout[1]?.length || 1;

    return (
        <div>
            {/* 0번째 줄의 첫번째 요소가 'STAGE'이면 무대 렌더링 */}
            {stageRow[0] === 'STAGE' && <Stage>STAGE</Stage>}

            <Grid cols={columnCount}>
                {/* 1번째 줄부터 map 실행 */}
                {seatRows.map((row, rowIndex) => (
                    // 각 row의 좌석들을 map 실행
                    row.map((seatId, seatIndex) => {
                        const key = `${rowIndex}-${seatIndex}`;

                        // seatId가 null이면 (복도)
                        if (seatId === null) {
                            return <EmptySpace key={key} />;
                        }

                        // --- 👈 5. 평균 평점 계산 로직 ---

                        // (1) 이 좌석(seatId)에 해당하는 리뷰만 필터링
                        const reviewsForThisSeat = reviews.filter(r => r.seat === seatId);

                        // (2) 평균 계산
                        let averageRating = 0;
                        if (reviewsForThisSeat.length > 0) {
                            const totalRating = reviewsForThisSeat.reduce(
                                (acc, r) => acc + Number(r.rating), // r.rating이 문자열일 수 있으므로 Number()
                                0
                            );
                            averageRating = totalRating / reviewsForThisSeat.length;
                        }

                        // (3) 평균값으로 색상 객체 가져오기
                        const seatColors = getSeatColors(averageRating);
                        // ---

                        // seatId가 있으면 (좌석)
                        return (
                            <SeatButton
                                key={key}
                                onClick={() => onSeatClick(seatId)}
                                colors={seatColors}
                            >
                                {seatId}
                            </SeatButton>
                        );
                    })
                ))}
            </Grid>
        </div>
    );
}