import React, { useState } from "react";
import styled from "styled-components";
import { MessageSquare, Heart, MoreHorizontal, Send } from "lucide-react"; // 아이콘 추가
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";

// --- 스타일 정의 ---
const Section = styled.section`
  padding: 24px 32px 32px;
  @media (max-width: 768px){ padding: 20px 16px 24px; }
`;

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.9fr);
  gap: 24px;
  @media (max-width: 960px){ grid-template-columns: 1fr; }
`;

const FeedCard = styled.div`
  border-radius: 16px; border:1px solid var(--line); background:#fff;
  padding: 16px 18px; margin-bottom: 12px; cursor: pointer;
  transition: box-shadow .15s ease, transform .1s ease;
  &:hover{ box-shadow: 0 10px 26px rgba(0,0,0,.12); transform: translateY(-1px); }
`;

const FeedHeader = styled.div` display:flex; align-items:center; gap:10px; margin-bottom:6px; `;
const ArtistAvatar = styled.div`
  width: 32px; height: 32px; border-radius: 50%; background: #eee; overflow: hidden;
  img { width: 100%; height: 100%; object-fit: cover; }
`;
const FeedMeta = styled.div` display: flex; flex-direction: column; `;
const ArtistName = styled.div` font-size: 14px; font-weight: 700; color: #111827; `;
const Time = styled.div` font-size: 11px; color: #9ca3af; margin-top: 1px; `;

const FeedContent = styled.div`
  font-size: 14px; line-height: 1.5; color: #374151; margin: 8px 0 12px;
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
`;

const FeedAction = styled.div`
  display: flex; gap: 16px; border-top: 1px solid #f3f4f6; padding-top: 10px;
  font-size: 12px; color: #6b7280;
  div { display: flex; align-items: center; gap: 5px; }
`;

// 우측 스케줄 리스트 스타일
const ScheduleCard = styled.div`
  background: #f9fafb; border-radius: 16px; padding: 20px;
`;
const ScheduleItem = styled.div`
  margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px dashed #e5e7eb;
  &:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
`;
const ScheduleDate = styled.div` font-size:12px; font-weight:700; color:var(--brand); margin-bottom:4px; `;
const ScheduleTitle = styled.div` font-size:14px; font-weight:600; color:#1f2937; margin-bottom:2px; `;
const ScheduleMeta = styled.div` font-size:12px; color:#6b7280; `;

// --- 댓글 관련 스타일 (모달 내부) ---
const CommentSection = styled.div`
  margin-top: 20px; border-top: 1px solid var(--line); padding-top: 16px;
`;
const CommentList = styled.div`
  display: flex; flex-direction: column; gap: 12px; max-height: 300px; overflow-y: auto; margin-bottom: 16px;
`;
const CommentItem = styled.div`
  display: flex; gap: 10px; font-size: 13px;
`;
const CommentBubble = styled.div`
  background: #f3f4f6; padding: 8px 12px; border-radius: 0 12px 12px 12px;
  color: #374151; line-height: 1.4;
`;
const CommentForm = styled.form`
  display: flex; gap: 8px;
`;
const CommentInput = styled.input`
  flex: 1; padding: 10px 12px; border-radius: 99px; border: 1px solid var(--line);
  font-size: 13px; background: #f9fafb;
  &:focus { outline: 2px solid var(--brand); border-color: transparent; }
`;
const SubmitBtn = styled.button`
  background: var(--brand); color: white; border: none; border-radius: 50%;
  width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; &:hover { opacity: 0.9; }
`;

// --- Mock Data ---
const feedData = [
  { id: 1, artist: "박효신", avatar: "https://i.namu.wiki/i/GJM1-T2GfGaeM1fRkS9F0ZqWjKx4xW9Xn3qYj3XgqQ1xQ2X3.webp", role: "Artist", time: "2시간 전", content: "오늘 공연 와주신 분들 너무 감사합니다! 🍀 날씨가 많이 추우니 조심히 들어가세요.", like: 1204, comment: 45 },
  { id: 2, artist: "조승우", avatar: "https://img.marieclairekorea.com/2023/03/mck_641029c21b0b5.jpg", role: "Actor", time: "5시간 전", content: "헤드윅 첫공 무사히 마쳤습니다. 새로운 시도를 많이 해봤는데 어떻게 보셨을지 궁금하네요. 내일도 달립니다! 🎸", like: 892, comment: 32 },
  { id: 3, artist: "조성진", avatar: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Seong-Jin_Cho_2017.jpg", role: "Pianist", time: "1일 전", content: "예술의 전당 리사이틀, 잊지 못할 밤이었습니다. 쇼팽의 선율을 함께 느껴주셔서 감사합니다.", like: 2300, comment: 112 },
];

const scheduleData = [
  { id: 1, date: "11.15 (금)", title: "웃는 남자 티켓 오픈", venue: "인터파크 티켓", tag: "티켓팅" },
  { id: 2, date: "11.20 (수)", title: "오페라의 유령 내한", venue: "드림씨어터", tag: "공연시작" },
  { id: 3, date: "12.01 (일)", title: "조성진 리사이틀", venue: "예술의전당", tag: "클래식" },
];

// 초기 댓글 데이터 (게시글 ID와 연결)
const initialComments = [
  { id: 101, postId: 1, user: "대장나무", text: "오늘 공연 진짜 최고였어요ㅠㅠ 목소리 보물..", time: "10분 전" },
  { id: 102, postId: 1, user: "쿄릭", text: "퇴근길 기다리고 있습니다!!", time: "5분 전" },
];

export default function Community({ user }) {
  const [posts] = useState(feedData);
  const [selectedPost, setSelectedPost] = useState(null); // 모달 열기용
  
  // 댓글 상태 관리
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  // 현재 선택된 포스트의 댓글만 필터링
  const currentPostComments = comments.filter(c => c.postId === selectedPost?.id);

  // 댓글 작성 함수
  const handleAddComment = (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    // 로그인 체크
    if (!user) {
      alert("로그인 후 댓글을 작성할 수 있습니다.");
      return;
    }

    const newObj = {
      id: Date.now(),
      postId: selectedPost.id,
      user: user.name, // 로그인된 유저 이름 사용
      text: newComment,
      time: "방금 전"
    };

    setComments([...comments, newObj]);
    setNewComment("");
  };

  return (
    <>
      <PageHeader title="커뮤니티" desc="아티스트와 팬들이 소통하는 공간" />
      <Section>
        <Grid2>
          {/* 왼쪽 피드 영역 */}
          <div>
            {posts.map((post) => (
              <FeedCard key={post.id} onClick={() => setSelectedPost(post)}>
                <FeedHeader>
                  <ArtistAvatar><img src={post.avatar} alt="avatar" /></ArtistAvatar>
                  <FeedMeta>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <ArtistName>{post.artist}</ArtistName>
                      <span style={{ fontSize: 10, background: "#f3f4f6", padding: "2px 6px", borderRadius: 4, color: "#6b7280" }}>{post.role}</span>
                    </div>
                    <Time>{post.time}</Time>
                  </FeedMeta>
                  <MoreHorizontal size={16} color="#9ca3af" style={{ marginLeft: "auto" }} />
                </FeedHeader>
                <FeedContent>{post.content}</FeedContent>
                <FeedAction>
                  <div><Heart size={16} /> {post.like}</div>
                  {/* 실제 댓글 개수 반영 (기본 + 추가된 것) */}
                  <div>
                    <MessageSquare size={16} /> 
                    {post.comment + comments.filter(c => c.postId === post.id && c.id > 1000).length}
                  </div>
                </FeedAction>
              </FeedCard>
            ))}
          </div>

          {/* 오른쪽 스케줄 영역 */}
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>이번 주 주요 일정</div>
            <ScheduleCard>
              {scheduleData.map((item) => (
                <ScheduleItem key={item.id}>
                  <ScheduleDate>{item.date}</ScheduleDate>
                  <ScheduleTitle>{item.title}</ScheduleTitle>
                  <ScheduleMeta>{item.venue} · {item.tag}</ScheduleMeta>
                </ScheduleItem>
              ))}
            </ScheduleCard>
          </div>
        </Grid2>
      </Section>

      {/* 게시글 상세 모달 */}
      <Modal 
        open={!!selectedPost} 
        onClose={() => setSelectedPost(null)} 
        title={selectedPost ? `${selectedPost.artist}님의 게시글` : ""}
      >
        {selectedPost && (
          <div style={{ padding: "0 4px" }}>
            {/* 게시글 내용 */}
            <FeedHeader>
              <ArtistAvatar><img src={selectedPost.avatar} alt="" /></ArtistAvatar>
              <FeedMeta>
                <ArtistName>{selectedPost.artist}</ArtistName>
                <Time>{selectedPost.time}</Time>
              </FeedMeta>
            </FeedHeader>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: "#374151", margin: "12px 0 20px", whiteSpace: "pre-line" }}>
              {selectedPost.content}
            </div>

            {/* 댓글 영역 */}
            <CommentSection>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>
                댓글 {postCount(selectedPost.comment, currentPostComments)}
              </div>
              
              <CommentList>
                {currentPostComments.length === 0 ? (
                  <div style={{ padding: "20px 0", textAlign: "center", fontSize: 13, color: "#9ca3af" }}>
                    가장 먼저 댓글을 남겨보세요!
                  </div>
                ) : (
                  currentPostComments.map((c) => (
                    <CommentItem key={c.id}>
                      <div style={{ fontWeight: 600, minWidth: 40, fontSize: 12, marginTop: 4 }}>{c.user}</div>
                      <div>
                        <CommentBubble>{c.text}</CommentBubble>
                        <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 4, marginLeft: 2 }}>{c.time}</div>
                      </div>
                    </CommentItem>
                  ))
                )}
              </CommentList>

              {/* 댓글 입력 폼 */}
              <CommentForm onSubmit={handleAddComment}>
                <CommentInput 
                  placeholder={user ? "댓글을 입력하세요..." : "로그인 후 댓글을 남길 수 있습니다."}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  disabled={!user} // 로그인 안 하면 입력 불가
                />
                <SubmitBtn type="submit" disabled={!user}>
                  <Send size={16} />
                </SubmitBtn>
              </CommentForm>
            </CommentSection>
          </div>
        )}
      </Modal>
    </>
  );
}

// 헬퍼 함수: 댓글 수 계산 (초기값 + 추가된 댓글 중 내가 쓴 거 id가 큰 거 대충 계산해서 보여주기 위함)
function postCount(base, currentList) {
    // 실제로는 서버 데이터가 기준이겠지만, 여기선 단순히 UI용으로 보여줍니다.
    return currentList.length;
}