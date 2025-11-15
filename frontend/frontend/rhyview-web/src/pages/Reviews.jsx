import React from "react";
import styled from "styled-components";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";

const Section = styled.section` padding:24px 32px; `;
const Tabs = styled.div` display:flex; gap:8px; margin:8px 0 16px; `;
const Tab = styled.button`
  font-size:13px; border:1px solid var(--line); background:#fff; color:#6b7280;
  border-radius:9999px; padding:8px 12px; cursor:pointer;
  &:hover{ background:#f4f4f5; }
  &.active{ background:#2563eb; color:#fff; border-color:#2563eb; }
`;
const Grid2 = styled.div`
  display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:18px;
  @media (max-width: 960px){ grid-template-columns: 1fr; }
`;

export default function Reviews(){
  const tabs = ["전체","뮤지컬","콘서트","연극","클래식"];

  const list = [
    {
      image:"https://images.unsplash.com/photo-1527356926125-2e5fdc851644",
      title:"샤롯데씨어터", subtitle:"서울 송파구",
      badge:"뮤지컬", badgeColor:"var(--badge-blue)",
      period:"⭐ 4.5 (328개 리뷰)"
    },
    {
      image:"https://images.unsplash.com/photo-1515165562835-c3b8c2e0b4ad",
      title:"세종문화회관 대극장", subtitle:"서울 종로구",
      badge:"연극", badgeColor:"#6366f1",
      period:"⭐ 4.7 (512개 리뷰)"
    },
    {
      image:"https://images.unsplash.com/photo-1501854140801-50d01698950b",
      title:"예술의전당 콘서트홀", subtitle:"서울 서초구",
      badge:"콘서트", badgeColor:"#10b981",
      period:"⭐ 4.8 (892개 리뷰)"
    },
    {
      image:"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
      title:"KSPO DOME", subtitle:"서울 송파구",
      badge:"콘서트", badgeColor:"#10b981",
      period:"⭐ 4.3 (1204개 리뷰)"
    },
    {
      image:"https://images.unsplash.com/photo-1540039155733-5bb30b53aa14",
      title:"블루스퀘어", subtitle:"서울 용산구",
      badge:"뮤지컬", badgeColor:"var(--badge-blue)",
      period:"⭐ 4.6 (645개 리뷰)"
    },
  ];

  return (
    <>
      <PageHeader title="공연장 리뷰" desc="공연장별 좌석 리뷰를 확인하세요" />
      <Section>
        <Tabs>
          {tabs.map((t,i)=>(
            <Tab key={t} className={i===0 ? "active" : ""}>{t}</Tab>
          ))}
        </Tabs>
        <Grid2>
          {list.map((c,i)=>(
            <Card key={i} {...c} onClick={()=>console.log("review click:", c.title)} />
          ))}
        </Grid2>
      </Section>
    </>
  );
}
