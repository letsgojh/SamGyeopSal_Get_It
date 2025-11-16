import React, { useMemo } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import { venues } from "../data/venues";
import SeatingChart from "../components/SeatingChart";

const Wrapper = styled.div`
  padding: 24px 32px 32px;
  @media (max-width: 768px){ padding: 20px 16px 24px; }
`;

const TopLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 24px; margin-bottom: 32px;

  @media (max-width: 960px){ grid-template-columns: 1fr; }
`;

const SeatMapBox = styled.div`
  border-radius: 18px; border: 1px dashed var(--line); background: #f9fafb;
  padding: 18px; min-height: 260px; display: flex; flex-direction: column; gap: 12px;
  @media (max-width: 768px){ min-height: 200px; }
`;
const SeatMapHeader = styled.div` font-weight: 700; font-size: 15px; margin-bottom: 4px; `;
const SeatMapBody = styled.div`
  flex: 1; border-radius: 14px; border: 1px solid #e5e7eb;
  background: repeating-linear-gradient(0deg,#f3f4f6,#f3f4f6 1px,transparent 1px,transparent 22px),
              repeating-linear-gradient(90deg,#f3f4f6,#f3f4f6 1px,transparent 1px,transparent 32px);
  display:flex; align-items:center; justify-content:center; color:#9ca3af; font-size:13px; text-align:center; padding:12px;
`;

const InfoBox = styled.div`
  border-radius: 18px; border: 1px solid var(--line); background:#fff; padding:18px;
  display:flex; flex-direction:column; gap:10px;
`;

const Tag = styled.span`
  display:inline-block; font-size:12px; padding:6px 10px; border-radius:999px;
  background:#eef2ff; color:#4f46e5;
`;

const RatingRow = styled.div` font-size:14px; color:#6b7280; .star{ color:#f59e0b; margin-right:4px; } `;
const ButtonRow = styled.div` display:flex; gap:8px; margin-top:8px; flex-wrap:wrap; `;
const GhostButton = styled.button`
  border-radius: 999px; border: 1px solid var(--line); background:#fff; padding: 6px 12px; font-size:12px; color:#6b7280; cursor:pointer;
  &:hover{ background:#f9fafb; }
`;
const PrimaryButton = styled.button`
  border-radius: 999px; border:none; background:#2563eb; padding: 7px 14px; font-size:12px; color:#fff; cursor:pointer;
  &:hover{ background:#1d4ed8; }
`;

const ReviewSection = styled.section` margin-top:8px; `;
const ReviewHeaderRow = styled.div`
  display:flex; justify-content:space-between; align-items:baseline; gap:12px; margin-bottom:10px; flex-wrap:wrap;
`;
const ReviewTitle = styled.h3` font-size:16px; font-weight:800; margin:0; `;
const ReviewHint = styled.span` font-size:12px; color:#9ca3af; `;
const ReviewList = styled.div` display:grid; grid-template-columns: minmax(0,1fr); gap:12px; `;
const ReviewCard = styled.div` border-radius:14px; border:1px solid var(--line); background:#fff; padding:14px 16px; font-size:13px; color:#374151; `;
const ReviewMetaRow = styled.div` display:flex; flex-wrap:wrap; gap:8px; font-size:12px; color:#6b7280; margin-bottom:6px; `;
const SeatTag = styled.span` padding:4px 8px; border-radius:999px; background:#f3f4f6; `;
const SmallRating = styled.span` color:#f59e0b; `;
const ReviewText = styled.p` margin:0; line-height:1.5; `;

export default function VenueDetail(){
  const { id } = useParams();
  const navigate = useNavigate();
  const venue = useMemo(()=> venues.find(v=>v.id===id), [id]);

  const reviews = useMemo(()=>{
    if(!venue) return [];
    return [
      { id:1, seat:"1층 B구역 12열 8번", rating:"4.5", title:"시야/음향 모두 만족", text:`${venue.name}에서 관람. 무대 전체가 잘 보이면서 배우 표정도 적당히 보입니다.` },
      { id:2, seat:"2층 중앙 C구역 3열 5번", rating:"4.0", title:"무대 구도 보기 좋음", text:"전체 그림 보기에 좋지만 표정은 다소 멀게 느껴질 수 있어요." },
      { id:3, seat:"1층 측면 D구역 5열 2번", rating:"3.8", title:"일부 시야 방해", text:"연출에 따라 한쪽이 살짝 가려질 때가 있으나 몰입감은 좋습니다." },
    ];
  }, [venue]);

  if(!venue){
    return (
      <Wrapper>
        <PageHeader title="공연장 정보를 찾을 수 없어요" />
        <p style={{fontSize:14, color:"#6b7280"}}>잘못된 주소이거나 아직 등록되지 않은 공연장입니다.</p>
        <GhostButton onClick={()=>navigate("/")}>← 홈으로</GhostButton>
      </Wrapper>
    );
  }

  return (
    <>
      <PageHeader title={venue.name} desc={`${venue.location} · ${venue.category}`} />
      <Wrapper>
        <TopLayout>
          <SeatMapBox>
            <SeatMapHeader>좌석 배치도</SeatMapHeader>
            <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>
              실제 좌석 배치도는 추후 연동 예정입니다.
            </div>
            <SeatMapBody>
              좌석 배치도 영역입니다.
              <br/>(나중에 이미지/뷰어로 대체)
            </SeatMapBody>
          </SeatMapBox>

          <InfoBox>
            <Tag>{venue.category}</Tag>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{venue.name}</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 4 }}>{venue.location}</div>
            <RatingRow><span className="star">★</span><span>{venue.rating} ({venue.reviewCount}개 리뷰)</span></RatingRow>
            <div style={{ fontSize: 13, color: "#4b5563", marginTop: 6 }}>{venue.shortDesc}</div>
            <ButtonRow>
              <PrimaryButton onClick={()=>navigate("/reviews")}>이 공연장 리뷰 더 보기</PrimaryButton>
              <GhostButton onClick={()=>navigate(-1)}>← 이전</GhostButton>
              <GhostButton onClick={()=>navigate("/")}>홈으로</GhostButton>
            </ButtonRow>
          </InfoBox>
        </TopLayout>

        <ReviewSection>
          <ReviewHeaderRow>
            <ReviewTitle>좌석 리뷰</ReviewTitle>
            <ReviewHint>실제 서비스에서는 관람객 리뷰가 노출됩니다.</ReviewHint>
          </ReviewHeaderRow>
          <ReviewList>
            {reviews.map(r=>(
              <ReviewCard key={r.id}>
                <ReviewMetaRow>
                  <SeatTag>{r.seat}</SeatTag>
                  <SmallRating>★ {r.rating}</SmallRating>
                </ReviewMetaRow>
                <ReviewText style={{ fontWeight: 700, marginBottom: 4 }}>{r.title}</ReviewText>
                <ReviewText>{r.text}</ReviewText>
              </ReviewCard>
            ))}
          </ReviewList>
        </ReviewSection>
      </Wrapper>
    </>
  );
}
