import React from "react";
import styled from "styled-components";
import PageHeader from "../components/PageHeader";
import TicketCard from "../components/TicketCard";
import { tickets } from "../data/tickets";

const PageWrapper = styled.div`
  padding: 24px 32px 32px;

  @media (max-width: 768px) {
    padding: 20px 16px 24px;
  }
`;

const Grid = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export default function Tickets() {
  return (
    <PageWrapper>
      <PageHeader
        title="티켓 양도"
        description="원하는 티켓을 구매하거나 내 티켓을 판매하세요"
      />
      <Grid>
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </Grid>
    </PageWrapper>
  );
}
