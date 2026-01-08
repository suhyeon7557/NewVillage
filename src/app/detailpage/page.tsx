'use client';

import { useState } from 'react';
import SubPageLayout from '../components/SubPageLayout';

// 댓글 데이터 (실제로는 서버에서 받아옴)
const commentsData = [
  { id: 1, author: '달봉맘', date: '2025-10-11 09:32:15', text: '안심 산책길을 조성하면 늦은 밤에도 산책할 수 있어서 좋을 것 같습니다 ^^', type: 'basic' },
  { id: 2, author: '새싹별이콩께', date: '2025-10-12 11:23:04', text: '독거노인분들의 일상과 안전을 함께 살피는 좋은 정책이라고 생각합니다. 가족들도 안심할 수 있을 것 같아요.', type: 'master' },
  { id: 3, author: '마을지기', date: '2025-10-12 14:15:30', text: '좋은 의견 감사합니다! 주민 여러분의 많은 참여 부탁드립니다.', type: 'master' },
  { id: 4, author: '햇살맘', date: '2025-10-13 09:00:00', text: '아이들과 함께 영화 보러 가고 싶네요!', type: 'basic' },
  { id: 5, author: '진월동주민', date: '2025-10-13 10:30:00', text: '작년에도 정말 좋았는데 올해도 기대됩니다.', type: 'basic' },
  { id: 6, author: '별빛아빠', date: '2025-10-13 15:20:00', text: '가족 단위로 참여하기 정말 좋은 행사인 것 같습니다.', type: 'basic' },
  { id: 7, author: '꽃길만걷자', date: '2025-10-14 08:45:00', text: '이런 마을 행사가 많아졌으면 좋겠어요!', type: 'basic' },
];

const COMMENTS_TO_SHOW = 4; // 기본으로 보여줄 댓글 수

export default function DetailPage() {
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showAllComments, setShowAllComments] = useState(false);

  // 댓글 입력 핸들러
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  // 좋아요 토글 핸들러
  const handleLikeToggle = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  // 표시할 댓글
  const visibleComments = showAllComments 
    ? commentsData 
    : commentsData.slice(0, COMMENTS_TO_SHOW);
  
  // 더보기 버튼 표시 여부
  const hasMoreComments = commentsData.length > COMMENTS_TO_SHOW;

  return (
    <SubPageLayout
      defaultFirstDepth="마을이야기"
      defaultSecondDepth="마을의제"
    >
      <div className="detail-page">
        
        {/* 상세 헤더 */}
        <div className="detail-header">
          <h1 className="detail-title">진월동 달빛 모기장 영화제</h1>
          <div className="detail-meta">
            <span className="detail-meta-item">
              <span className="detail-meta-label">작성자</span>
              <span className="detail-meta-value">마을e척척</span>
            </span>
            <span className="detail-meta-item">
              <span className="detail-meta-label">일시</span>
              <span className="detail-meta-value">2025-10-15 14:41:39</span>
            </span>
            <span className="detail-meta-item">
              <span className="detail-meta-label">조회수</span>
              <span className="detail-meta-value">231</span>
            </span>
            <span className="detail-meta-item">
              <span className="detail-meta-label">마을명</span>
              <span className="detail-meta-value">진월마을</span>
            </span>
          </div>
        </div>

        {/* 상세 본문 */}
        <div className="detail-content">
          <p>2026년 진월동 주민총회 마을의제 상정</p>
          <p>
            달빛 모기장 영화제 -<br />
            관내 학교 운동장, 테니스장 등을 활용하여 주민 모두가 함께 즐기는 야외 영화제 개최
          </p>
          
          {/* 본문 이미지 */}
          <div className="detail-image">
            <img src="https://picsum.photos/800/500?random=10" alt="달빛 모기장 영화제" />
          </div>
        </div>

        {/* 좋아요/공유 버튼 */}
        <div className="action-box detail-actions">
          <button 
            type="button" 
            className={`action-box-btn ${isLiked ? 'active' : ''}`}
            onClick={handleLikeToggle}
          >
            <img src="/images/ic_good_orange.svg" alt="좋아요" />
            <span>좋아요 {likeCount > 0 && likeCount}</span>
          </button>
          <span className="action-box-divider">|</span>
          <button type="button" className="action-box-btn">
            <img src="/images/ic_share.svg" alt="공유하기" />
            <span>공유하기</span>
          </button>
        </div>

        {/* 댓글 영역 */}
        <div className="comment-section">
          <h2 className="comment-title">댓글 <span className="comment-count">{commentsData.length}</span></h2>
          
          {/* 댓글 입력 */}
          <div className="comment-form">
            <textarea 
              className="comment-input" 
              placeholder="댓글을 입력하세요."
              rows={3}
              value={commentText}
              onChange={handleCommentChange}
            ></textarea>
            <button 
              type="button" 
              className={`comment-submit-btn ${commentText.trim() ? 'active' : ''}`}
              disabled={!commentText.trim()}
            >등록</button>
          </div>

          {/* 댓글 목록 */}
          <div className="comment-list">
            {visibleComments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-profile">
                  <div className={`profile-image ${comment.type}`}></div>
                </div>
                <div className="comment-body">
                  <div className="comment-info">
                    <span className="comment-author">{comment.author}</span>
                    <span className="comment-date">{comment.date}</span>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 더보기/접기 버튼 */}
          {hasMoreComments && (
            <button 
              type="button" 
              className="comment-more-btn"
              onClick={() => setShowAllComments(!showAllComments)}
            >
              {showAllComments 
                ? '접기' 
                : `더보기 (${commentsData.length - COMMENTS_TO_SHOW}개)`
              }
            </button>
          )}
        </div>

      </div>
    </SubPageLayout>
  );
}

