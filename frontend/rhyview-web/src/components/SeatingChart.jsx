import React from "react";
import styled from "styled-components";

// 좌우 스크롤을 위한 래퍼
const ScrollWrapper = styled.div`
  overflow-x: auto; /* 좌우 스크롤 활성화 */
  padding: 16px;
  background: #f9fafb;
`;

// 스크롤이 되려면 내부에 이 컴포넌트가 display: inline-block이어야 함
const ChartGrid = styled.div`
  display: inline-block; /* 내용물 크기만큼만 너비 차지 */
  padding: 10px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
`;

// 무대 스타일
const Stage = styled.div`
  text-align: center;
  font-weight: 600;
  padding: 10px;
  background: #4b5563;
  color: white;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 13px;
  letter-spacing: 2px;
`;

// 좌석 한 줄(row)
const Row = styled.div`
  display: flex; /* 좌석들을 가로로 나열 */
  justify-content: center;
  margin-bottom: 4px; /* 줄 간격 */
`;

// 좌석 버튼
const SeatButton = styled.button`
  width: 32px;
  height: 32px;
  margin: 0 2px;
  font-size: 10px;
  border: 1px solid var(--brand);
  background: #eef2ff;
  color: var(--brand);
  border-radius: 6px;
  cursor: pointer;
  
  &:hover {
    background: var(--brand);
    color: white;
  }
`;

// 복도 (빈 공간)
const EmptySpace = styled.div`
  width: 32px;
  height: 32px;
  margin: 0 2px;
`;

export default function SeatingChart({ layout }) {

  // 좌석 클릭 시 실행될 함수 (지금은 alert만)
  const handleSeatClick = (seatId) => {
    alert(`좌석 ${seatId} 클릭됨!`);
    // TODO: 나중에 이 좌석의 리뷰를 보여주거나 다른 상호작용 추가
  };

  return (
    <ScrollWrapper>
      <ChartGrid>
        {/* layout 배열을 map으로 돌면서 렌더링 */}
        {layout.map((row, rowIndex) => {
          // 0번째 줄은 STAGE로 렌더링
          if (rowIndex === 0) {
            return <Stage key={rowIndex}>STAGE</Stage>;
          }
          
          // 나머지 줄은 좌석으로 렌더링
          return (
            <Row key={rowIndex}>
              {row.map((seatId, seatIndex) => {
                // seatId가 null이면 (복도)
                if (seatId === null) {
                  return <EmptySpace key={seatIndex} />;
                }
                
                // seatId가 있으면 (좌석)
                return (
                  <SeatButton 
                    key={seatIndex} 
                    onClick={() => handleSeatClick(seatId)}
                  >
                    {seatId}
                  </SeatButton>
                );
              })}
            </Row>
          );
        })}
      </ChartGrid>
    </ScrollWrapper>
  );
}