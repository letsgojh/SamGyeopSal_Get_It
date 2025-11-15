import React, { useEffect, useState } from 'react';
import { mockApi } from '../api/mockApi';
import Header from '../components/layout/header';
import VenueCard from '../components/performance/venuecard';
import ReviewList from '../components/review/reviewlist';
import CommunityBoard from '../components/communityboard';
import VenueManager from '../components/performance/venuemanager';
import ReviewForm from '../components/form/reviewform';
import VenueDetailModal from '../components/performance/venuedetailmodal'; // 상세 모달 추가

export default function Home(){
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    mockApi.getVenues().then(setVenues);
    mockApi.getReviews().then(setReviews);
  }, []);

  // 디버깅 로그: selectedVenue 변경 확인
  useEffect(() => {
    console.log('selectedVenue ->', selectedVenue);
  }, [selectedVenue]);

  const handleSavedReview = (r) => setReviews(prev => [r, ...prev]);

  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto px-4 grid grid-cols-3 gap-6">
        <section className="col-span-2">
          <h2 className="font-semibold mb-3">공연장 목록</h2>
          <div className="space-y-3">
            {venues.map(v => (
              // 안전하게 래핑해서 현재 venue를 인자로 넘깁니다
              <VenueCard
                key={v.id}
                venue={v}
                onOpen={() => setSelectedVenue(v)}
              />
            ))}
          </div>

          <div className="mt-6">
            <h2 className="font-semibold">리뷰 리스트</h2>
            <div className="mt-3"><ReviewList reviews={reviews} /></div>
          </div>

          <div className="mt-6">
            <ReviewForm venueId={venues[0]?.id ?? null} onSaved={handleSavedReview} />
          </div>
        </section>

        <aside className="col-span-1 space-y-4 sticky top-6">
          <div><CommunityBoard /></div>
          <div><VenueManager onChange={(v) => console.log('venues updated', v)} /></div>
        </aside>
      </main>

      {/* 선택된 venue가 있으면 모달 렌더 */}
      {selectedVenue && (
        <VenueDetailModal venue={selectedVenue} onClose={() => setSelectedVenue(null)} />
      )}
    </div>
  );
}