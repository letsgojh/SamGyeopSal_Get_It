import React, { useState } from "react";
import styled from "styled-components";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";
import { Send } from "lucide-react"; // Send 아이콘 사용

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
  width: 32px; height: 32px; border-radius: 999px; background:#e5e7eb;
  display:flex; align-items:center; justify-content:center; font-size:16px;
`;
const ArtistInfo = styled.div` display:flex; flex-direction:column; gap:2px; `;
const ArtistName = styled.span` font-size:13px; font-weight:700; `;
const ArtistMeta = styled.span` font-size:11px; color:#9ca3af; `;
const FeedTitle = styled.div` font-size:15px; font-weight:700; margin:6px 0; `;
const FeedBody = styled.p` margin:0; font-size:13px; color:#4b5563; `;
const FeedFooter = styled.div` margin-top:10px; font-size:12px; color:#9ca3af; display:flex; gap:12px; `;

const ScheduleCard = styled.div` border-radius:16px; border:1px solid var(--line); background:#fff; padding:16px 18px; `;
const ScheduleItem = styled.div`
  padding: 10px 0; border-bottom: 1px solid #f3f4f6; display:flex; flex-direction:column; gap:2px;
  &:last-child{ border-bottom:none; }
`;
const ScheduleTitle = styled.div` font-size:14px; font-weight:700; `;
const ScheduleMeta = styled.div` font-size:12px; color:#6b7280; `;
const ScheduleTag = styled.span` display:inline-block; margin-top:4px; font-size:11px; padding:4px 8px; border-radius:999px; background:#eef2ff; color:#4f46e5; `;

const CommentList = styled.div` display:flex; flex-direction:column; gap:10px; margin-top:12px; `;
const CommentCard = styled.div` border-radius:12px; border:1px solid #e5e7eb; background:#f9fafb; padding:8px 10px; `;
const CommentMeta = styled.div` font-size:11px; color:#9ca3af; margin-bottom:4px; `;
const CommentText = styled.div` font-size:13px; color:#374151; `;

// 👇 [추가됨] 댓글 입력 폼 스타일
const CommentForm = styled.form`
  display: flex; gap: 8px; margin-top: 16px; padding-top: 16px; border-top: 1px solid #f3f4f6;
`;
const CommentInput = styled.input`
  flex: 1; padding: 10px 12px; border-radius: 99px; border: 1px solid var(--line);
  font-size: 13px; background: #fff;
  &:focus { outline: 2px solid var(--brand); border-color: transparent; }
`;
const SubmitBtn = styled.button`
  background: var(--brand); color: white; border: none; border-radius: 50%;
  width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; &:hover { opacity: 0.9; }
`;

const artistPosts = [
  { id: 1, artist: "달빛요정역전만루홈런", role: "인디밴드", title: "12월 단독 공연 셋리스트 공개 ✨", time: "1시간 전",
    preview: "12월 단독 공연 준비 중! 셋리스트 조금만 공개해요. 어떤 곡 기대하세요?", likes: 128, comments: 42 },
  { id: 2, artist: "우리들의 이야기", role: "연극 배우", title: "오늘도 연습", time: "3시간 전",
    preview: "연습 막바지! 무대에서 만나요. 여러분은 어느 좌석에서 보시나요?", likes: 89, comments: 27 },
];

const schedule = [
  { id: 1, title:"달빛요정역전만루홈런 연말 단독 공연", date:"2024.12.21 (토) 19:00", venue:"롤링홀", tag:"콘서트" },
  { id: 2, title:"연극 <우리들의 이야기>", date:"2024.12.03 (화) ~ 12.30 (월)", venue:"샤롯데씨어터", tag:"연극" },
];

const initialComments = {
  1: [
    { user:"daisy", time:"10분 전", text:"오프닝으로 <은하수 아래서> 듣고 싶어요!" },
    { user:"moonchild", time:"25분 전", text:"이번에도 응원봉 들고 갑니다 ✨" },
  ],
  2: [ { user:"theaterlover", time:"1시간 전", text:"첫 공연 1층 B구역에서 볼게요 :)" } ],
  3: [ { user:"classicfan", time:"어제", text:"2층 중앙 예매 완료! 기대됩니다." } ],
};

// 👇 user prop 추가
export default function Community({ user }) {
  const [selectedPost, setSelectedPost] = useState(null);
  
  // 👇 댓글 상태 관리 (기존 데이터를 초기값으로 사용)
  const [allComments, setAllComments] = useState(initialComments);
  const [inputText, setInputText] = useState("");

  // 현재 선택된 포스트의 댓글 가져오기
  const comments = (selectedPost && allComments[selectedPost.id]) || [];

  // 👇 댓글 등록 핸들러
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // 로그인 체크
    if (!user) {
      alert("로그인 후 댓글을 작성할 수 있습니다.");
      return;
    }

    const newComment = {
      user: user.name, // 로그인한 유저 이름
      time: "방금 전",
      text: inputText
    };

    // 상태 업데이트
    setAllComments(prev => ({
      ...prev,
      [selectedPost.id]: [...(prev[selectedPost.id] || []), newComment]
    }));

    setInputText(""); // 입력창 초기화
  };

  return (
    <>
      <PageHeader title="커뮤니티" desc="아티스트 소식과 공연 일정을 확인하고, 팬들과 이야기해요." />
      <Section>
        <Grid2>
          <div>
            <h3 style={{fontSize:16, fontWeight:800, margin:"0 0 12px"}}>아티스트 피드</h3>
            {artistPosts.map(post=>(
              <FeedCard key={post.id} onClick={()=>setSelectedPost(post)}>
                <FeedHeader>
                  <ArtistAvatar>{post.artist[0]}</ArtistAvatar>
                  <ArtistInfo>
                    <ArtistName>{post.artist}</ArtistName>
                    <ArtistMeta>{post.role} · {post.time}</ArtistMeta>
                  </ArtistInfo>
                </FeedHeader>
                <FeedTitle>{post.title}</FeedTitle>
                <FeedBody>{post.preview}</FeedBody>
                <FeedFooter>
                  <span>❤️ {post.likes}</span>
                  {/* 👇 실시간 댓글 개수 반영 */}
                  <span>💬 {allComments[post.id] ? allComments[post.id].length : post.comments}</span>
                </FeedFooter>
              </FeedCard>
            ))}
          </div>

          <div>
            <h3 style={{fontSize:16, fontWeight:800, margin:"0 0 12px"}}>공연 일정</h3>
            <ScheduleCard>
              {schedule.map(item=>(
                <ScheduleItem key={item.id}>
                  <ScheduleTitle>{item.title}</ScheduleTitle>
                  <ScheduleMeta>{item.date} · {item.venue}</ScheduleMeta>
                  <ScheduleTag>{item.tag}</ScheduleTag>
                </ScheduleItem>
              ))}
            </ScheduleCard>
          </div>
        </Grid2>
      </Section>

      <Modal open={!!selectedPost} title={selectedPost?.title || ""} onClose={()=>setSelectedPost(null)}>
        {selectedPost && (
          <>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
              {selectedPost.artist} · {selectedPost.role} · {selectedPost.time}
            </div>
            <div style={{ fontSize: 13, color: "#4b5563", marginBottom: 12, whiteSpace:"pre-line" }}>
              {selectedPost.preview}
            </div>

            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>팬 댓글</div>
            
            <CommentList>
              {comments.length === 0
                ? <div style={{ fontSize: 12, color: "#9ca3af", padding: "10px 0" }}>아직 댓글이 없습니다.</div>
                : comments.map((c, i)=>(
                    <CommentCard key={i}>
                      <CommentMeta>{c.user} · {c.time}</CommentMeta>
                      <CommentText>{c.text}</CommentText>
                    </CommentCard>
                  ))
              }
            </CommentList>

            {/* 👇 댓글 입력 폼 추가 */}
            <CommentForm onSubmit={handleAddComment}>
              <CommentInput 
                placeholder={user ? "댓글을 남겨보세요..." : "로그인 후 댓글을 남길 수 있습니다."}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={!user} // 비로그인 시 입력 막기 (선택사항, UX따라 풀어둬도 됨)
              />
              <SubmitBtn type="submit">
                <Send size={16} />
              </SubmitBtn>
            </CommentForm>
          </>
        )}
      </Modal>
    </>
  );
}