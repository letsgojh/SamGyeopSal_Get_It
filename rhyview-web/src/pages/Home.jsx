import React from "react";
import styled from "styled-components";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";

const Section = styled.section`
  padding:24px 32px;
`;
const Grid3 = styled.div`
  display:grid;
  grid-template-columns: repeat(3, minmax(0,1fr));
  gap:20px;
  @media (max-width: 960px){ grid-template-columns:1fr; }
`;
const Row3 = Grid3;

export default function Home(){
  const hot = [
    {
      image:"https://images.unsplash.com/photo-1511379938547-c1f69419868d",
      title:"밤하늘 아래 어쿠스틱",
      subtitle:"카페 뮤직홀 (홍대)",
      period:"2024.11.08 - 2024.11.10",
      badge:"30% 할인", badgeColor:"var(--badge-rose)"
    },
    {
      image:"https://images.unsplash.com/photo-1515165562835-c3b8c2e0b4ad",
      title:"소극장 연극 <오필리움 이야기>",
      subtitle:"아르코예술극장 소극장",
      period:"2024.11.05 - 2024.11.25",
      badge:"잔여 45석", badgeColor:"var(--badge-amber)"
    },
    {
      image:"https://images.unsplash.com/photo-1483985988355-763728e1935b",
      title:"인디밴드 <달빛오정(엽전밴루출현)>",
      subtitle:"클럽풍류",
      period:"2024.11.12",
      badge:"25% 할인 · 잔여 30석", badgeColor:"var(--badge-rose)"
    },
  ];

  const venues = [
    {
      image:"https://images.unsplash.com/photo-1527356926125-2e5fdc851644",
      title:"샤롯데씨어터",
      subtitle:"서울 송파구",
      tag:"뮤지컬", rating:"⭐ 4.5 (328)"
    },
    {
      image:"https://images.unsplash.com/photo-1555949963-ff9fe0c870eb",
      title:"세종문화회관 대극장",
      subtitle:"서울 종로구",
      tag:"연극", rating:"⭐ 4.7 (512)"
    },
    {
      image:"https://images.unsplash.com/photo-1501854140801-50d01698950b",
      title:"예술의전당 콘서트홀",
      subtitle:"서울 서초구",
      tag:"콘서트", rating:"⭐ 4.8 (892)"
    },
  ];

  return (
    <>
      <PageHeader title="환영합니다" desc="공연장 좌석 리뷰를 확인하고 공유하세요" />

      <Section>
        <h3 style={{fontSize:18, fontWeight:700, marginBottom:12}}>놓치지 마세요</h3>
        <Grid3>
          {hot.map((c,i)=>(
            <Card key={i} {...c} onClick={()=>console.log("card click:", c.title)} />
          ))}
        </Grid3>
      </Section>

      <hr style={{border:0, borderTop:"1px solid var(--line)"}} />

      <Section>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
          <h3 style={{fontSize:18, fontWeight:700}}>인기 공연장</h3>
          <button style={{background:"transparent", border:"none", color:"#6b7280", cursor:"pointer"}}>전체보기</button>
        </div>
        <Row3>
          {venues.map((v,i)=>(
            <Card key={i}
              image={v.image}
              title={v.title}
              subtitle={v.subtitle}
              badge={v.tag}
              badgeColor="var(--badge-blue)"
              period={v.rating}
              onClick={()=>console.log("venue click:", v.title)}
            />
          ))}
        </Row3>
      </Section>
    </>
  );
}
