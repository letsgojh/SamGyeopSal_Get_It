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

// 좌석 버튼
const SeatButton = styled.button`
  /* 1:1 비율을 유지 (정사각형) */
  aspect-ratio: 1 / 1; 
  
  /* 폰트 크기를 매우 작게 하고, 너비에 따라 조절 */
  font-size: clamp(6px, 1.5vw, 10px); 
  
  border: 1px solid var(--brand);
  background: #eef2ff;
  color: var(--brand);
  border-radius: 4px; /* 크기 축소 */
  cursor: pointer;
  padding: 0; /* 패딩 제거 */
  
  /* 좌석 번호가 넘칠 경우 숨김 */
  overflow: hidden; 
  white-space: nowrap;
  
  &:hover {
    background: var(--brand);
    color: white;
  }
`;

// 복도 (빈 공간)
const EmptySpace = styled.div`
  aspect-ratio: 1 / 1;
`;

export default function SeatingChart({ layout, onSeatClick }) {
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
            
            // seatId가 있으면 (좌석)
            return (
              <SeatButton 
                key={key} 
                onClick={() => onSeatClick(seatId)}
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