import React from "react";
import styled from "styled-components";

const Stage = styled.div`
  text-align: center;
  font-weight: 600;
  padding: 8px;
  background: #4b5563;
  color: white;
  border-radius: 4px;
  margin-bottom: 8px;
  font-size: 11px;
  letter-spacing: 1px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${({ cols }) => `repeat(${cols}, minmax(0, 1fr))`};
  gap: 3px;
  width: 100%;
`;

const EmptySpace = styled.div`
  aspect-ratio: 1 / 1;
`;

const SeatButton = styled.button`
  aspect-ratio: 1 / 1;
  font-size: clamp(6px, 1.5vw, 10px);
  border-radius: 4px;
  cursor: pointer;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 500;
  transition: all 0.1s ease;

  background: #eef2ff;
  color: var(--brand);
  border: 1px solid var(--brand);

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
    ${({ colors }) =>
      !colors &&
      `
      background: var(--brand);
      color: white;
    `}
  }
`;

const getSeatColors = (rating) => {
  if (rating === 0) return null;

  if (rating > 4.0) return { bg: "#22c55e", text: "white", border: "#16a34a" };
  if (rating > 3.0) return { bg: "#84cc16", text: "#333", border: "#65a30d" };
  if (rating > 2.0) return { bg: "#eab308", text: "#333", border: "#ca8a04" };
  if (rating >= 1.0) return { bg: "#ef4444", text: "white", border: "#dc2626" };

  return null;
};

export default function SeatingChart({ layout, onSeatClick, reviews }) {
  const stageRow = layout[0];
  const seatRows = layout.slice(1);
  const columnCount = layout[1]?.length || 1;

  return (
    <div>
      {stageRow[0] === "STAGE" && <Stage>STAGE</Stage>}

      <Grid cols={columnCount}>
        {seatRows.map((row, rowIndex) =>
          row.map((seatId, seatIndex) => {
            const key = `${rowIndex}-${seatIndex}`;

            if (seatId === null) {
              return <EmptySpace key={key} />;
            }

            const reviewsForThisSeat = reviews.filter((r) => r.seat === seatId);

            let averageRating = 0;
            if (reviewsForThisSeat.length > 0) {
              const totalRating = reviewsForThisSeat.reduce(
                (acc, r) => acc + Number(r.rating),
                0
              );
              averageRating = totalRating / reviewsForThisSeat.length;
            }

            const seatColors = getSeatColors(averageRating);

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
        )}
      </Grid>
    </div>
  );
}
