import React from "react";
import styled from "styled-components";

const Card = styled.article`
  background: #ffffff;
  border-radius: 16px;
  padding: 20px 20px 18px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
`;

const TicketIcon = styled.span`
  width: 28px;
  height: 28px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: #6b7280;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const MetaIcon = styled.span`
  font-size: 13px;
`;

const PriceBox = styled.div`
  margin-top: 6px;
  background: #f9fafb;
  border-radius: 12px;
  padding: 16px 18px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 13px;
  color: #6b7280;
`;

const Label = styled.span``;

const SeatValue = styled.span`
  font-weight: 600;
  color: #374151;
`;

const PriceValue = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const OriginalPrice = styled.span`
  font-size: 12px;
  color: #d1d5db;
  text-decoration: line-through;
`;

const Discount = styled.span`
  font-size: 12px;
  color: #ef4444;
`;

const FinalPrice = styled.div`
  margin-top: 2px;
  text-align: right;
  font-size: 18px;
  font-weight: 800;
  color: #2563eb;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
  font-size: 12px;
  color: #9ca3af;
`;

const Seller = styled.span``;

const Time = styled.span``;

const BuyButton = styled.button`
  margin-top: 10px;
  width: 100%;
  height: 44px;
  border: none;
  border-radius: 10px;
  background: #4f46e5;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

export default function TicketCard({ ticket }) {
  const {
    title,
    venue,
    date,
    seatDetail,
    originalPrice,
    discountRate,
    price,
    seller,
    timeAgo,
  } = ticket;

  return (
    <Card>
      <Header>
        <div>
          <Title>{title}</Title>
          <Meta>
            <MetaRow>
              <MetaIcon>📍</MetaIcon>
              <span>{venue}</span>
            </MetaRow>
            <MetaRow>
              <MetaIcon>🕒</MetaIcon>
              <span>{date}</span>
            </MetaRow>
          </Meta>
        </div>
        <TicketIcon>🎫</TicketIcon>
      </Header>

      <PriceBox>
        <PriceRow>
          <Label>좌석</Label>
          <SeatValue>{seatDetail}</SeatValue>
        </PriceRow>
        <PriceRow>
          <Label>판매가</Label>
          <PriceValue>
            <OriginalPrice>
              {originalPrice.toLocaleString("ko-KR")}원
            </OriginalPrice>
            <Discount>{discountRate}%</Discount>
          </PriceValue>
        </PriceRow>
        <FinalPrice>{price.toLocaleString("ko-KR")}원</FinalPrice>
      </PriceBox>

      <Footer>
        <Seller>판매자: {seller}</Seller>
        <Time>{timeAgo}</Time>
      </Footer>

      <BuyButton type="button">구매하기</BuyButton>
    </Card>
  );
}
