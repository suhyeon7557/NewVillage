'use client';

import { useState, useEffect, useRef } from 'react';
import SubPageLayout from '../components/SubPageLayout';

/* 투표 항목 데이터 */
const voteItems = [
  { id: 1, title: '푸른길 공원 안심산책길 조성', online: 147, offline: 0, percent: 48.5, votes: 147 },
  { id: 2, title: '독거노인지킴이, 스마트 돌봄 마을', online: 108, offline: 0, percent: 35.6, votes: 108 },
  { id: 3, title: '분리배출 및 재활용 캠페인', online: 107, offline: 0, percent: 35.3, votes: 107 },
  { id: 4, title: '(구)변전소 한전부지 공원화', online: 105, offline: 0, percent: 34.7, votes: 105 },
];

/* 추가 의제 투표 데이터 */
const additionalVoteItems = [
  { id: 1, title: '주민 편의시설 확충', online: 89, offline: 0, percent: 65, votes: 89 },
  { id: 2, title: '마을 축제 개최', online: 48, offline: 0, percent: 35, votes: 48 },
];

/* 이미지 투표 항목 데이터 */
const imageVoteItems = [
  { id: 1, title: '자연과 함께하는 마을', percent: 45, votes: 62, image: '/images/sample_vote_01.svg' },
  { id: 2, title: '행복한 우리 마을', percent: 32, votes: 44, image: '/images/sample_vote_02.svg' },
  { id: 3, title: '함께 성장하는 마을', percent: 23, votes: 32, image: '/images/sample_vote_03.svg' },
];

/* 별점 항목 데이터 */
const ratingItems = [
  { id: 1, title: '행사 프로그램 만족도', score: 4.2 },
  { id: 2, title: '행사 진행 만족도', score: 3.8 },
  { id: 3, title: '시설 및 환경 만족도', score: 4.8 },
];

/* 댓글 데이터 */
const commentsData = [
  { id: 1, author: '달봉맘', date: '2025-10-11 09:32:15', text: '안심 산책길을 조성하면 늦은 밤에도 산책할 수 있어서 좋을 것 같습니다 ^^', type: 'basic' },
  { id: 2, author: '새싹별이콩께', date: '2025-10-12 11:23:04', text: '독거노인분들의 일상과 안전을 함께 살피는 좋은 정책이라고 생각합니다. 가족들도 안심할 수 있을 것 같아요.', type: 'master' },
];

const COMMENTS_TO_SHOW = 4;

export default function DetailVotePage() {
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showAllComments, setShowAllComments] = useState(false);
  const [selectedVote, setSelectedVote] = useState<number | null>(null);
  const [selectedAdditionalVote, setSelectedAdditionalVote] = useState<number | null>(null);
  const [selectedImageVote, setSelectedImageVote] = useState<number | null>(null);
  const [ratings, setRatings] = useState<{[key: number]: number}>({
    1: 4,
    2: 3,
    3: 5,
  });
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  /* 외부 클릭 시 더보기 메뉴 닫기 */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setShowMoreMenu(false);
      }
    };

    if (showMoreMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMoreMenu]);

  /* 댓글 입력 핸들러 */
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  /* 좋아요 토글 핸들러 */
  const handleLikeToggle = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  /* 투표 선택 핸들러 */
  const handleVoteSelect = (id: number) => {
    setSelectedVote(selectedVote === id ? null : id);
  };

  /* 추가 의제 투표 선택 핸들러 */
  const handleAdditionalVoteSelect = (id: number) => {
    setSelectedAdditionalVote(selectedAdditionalVote === id ? null : id);
  };

  /* 이미지 투표 선택 핸들러 */
  const handleImageVoteSelect = (id: number) => {
    setSelectedImageVote(selectedImageVote === id ? null : id);
  };

  /* 별점 설정 핸들러 */
  const handleRatingChange = (itemId: number, rating: number) => {
    setRatings(prev => ({ ...prev, [itemId]: rating }));
  };

  /* 표시할 댓글 */
  const visibleComments = showAllComments 
    ? commentsData 
    : commentsData.slice(0, COMMENTS_TO_SHOW);
  
  const hasMoreComments = commentsData.length > COMMENTS_TO_SHOW;

  return (
    <SubPageLayout
      defaultFirstDepth="마을이야기"
      defaultSecondDepth="마을총회"
    >
      <div className="detail-page">
        
        {/* 상세 헤더 - 투표용 */}
        <div className="detail-header">
          <div className="detail-header-top">
            <div className="detail-header-left">
              <span className="card-status progress">진행</span>
              <h1 className="detail-title">2025 진월동 주민총회 현장투표</h1>
            </div>
            <div className="detail-more-menu" ref={moreMenuRef}>
              <button 
                type="button" 
                className="detail-more-btn"
                onClick={() => setShowMoreMenu(!showMoreMenu)}
              >
                <img src="/images/ic_more.svg" alt="더보기" />
              </button>
              {showMoreMenu && (
                <div className="detail-more-dropdown">
                  <button type="button" className="detail-more-item">
                    <img src="/images/ic_edit.svg" alt="수정" />
                    <span>수정</span>
                  </button>
                  <button type="button" className="detail-more-item">
                    <img src="/images/ic_delete.svg" alt="삭제" />
                    <span>삭제</span>
                  </button>
                  <button type="button" className="detail-more-item">
                    <img src="/images/ic_pause.svg" alt="중지" />
                    <span>중지</span>
                  </button>
                  <button type="button" className="detail-more-item">
                    <img src="/images/ic_stop.svg" alt="종료" />
                    <span>종료</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="detail-meta">
            <span className="detail-meta-item">
              <span className="detail-meta-label">기간</span>
              <span className="detail-meta-value">2025-10-15 ~ 2025-10-25</span>
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
          <p>광주광역시 남구 「주민자치회 설치·운영에 관한 조례」 제16조에 따라 다음과 같이 마을의제 주민투표를 실시합니다.</p>
          <p>이번 주민투표를 통해 선정된 마을의제는 온라인 사전투표와 현장투표 결과를 합산하여 우선순위를 결정하며, 주민총회(2025. 10. 25.) 당일 최종 결과가 발표됩니다.</p>
          <p>※ 주민투표의 신뢰성과 공정성을 위해 사전투표에 참여하신 주민께서는 본투표에 중복 기표하지 마시고 잠시 기다려주시기 바랍니다.</p>
          <br />
          <p><strong>[ 참고사항 ]</strong></p>
          <p>- 투표결과에 따라 마을 의제의 우선순위가 결정됩니다.</p>
          <p>- 아래 7개 의제 중 3가지를 선택하여 투표해주시기 바랍니다.</p>
        </div>

        {/* 투표 영역 1 - 텍스트형 (여러 그룹) */}
        <div className="vote-section">
          <div className="vote-group">
            <div className="vote-header">
              <div className="vote-header-left">
                <img src="/images/ic_vote.svg" alt="투표" className="vote-icon" />
                <span className="vote-header-title">마을 의제 투표</span>
              </div>
              <span className="vote-header-deadline">8월 17일 20시 종료</span>
            </div>
            
            <div className="vote-list">
              {voteItems.map((item, index) => {
                const isTopRank = index === 0;
                const isSelected = selectedVote === item.id;
                
                return (
                  <div key={item.id} className="vote-item-wrap">
                    <div 
                      className={`vote-item ${isTopRank ? 'top-rank' : ''} ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleVoteSelect(item.id)}
                    >
                      <div className="vote-gauge" style={{ width: `${item.percent}%` }}></div>
                      <input 
                        type="checkbox" 
                        className="vote-checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                      />
                      <div className="vote-item-inner">
                        <div className="vote-item-left">
                          <img 
                            src="/images/ic_check_purple.svg" 
                            alt="선택됨" 
                            className="vote-check-icon"
                          />
                          <span className="vote-item-title">{item.title}</span>
                          <button 
                            type="button" 
                            className="vote-search-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              /* TODO: 팝업 열기 */
                            }}
                          >
                            <img src="/images/ic_search_black.svg" alt="상세보기" />
                          </button>
                        </div>
                        <span className="vote-item-result">{item.percent}% ({item.votes}표)</span>
                      </div>
                    </div>
                    <div className="vote-item-count">
                      온라인 {item.online}명, 오프라인 {item.offline}명
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="vote-group">
            <div className="vote-header">
              <div className="vote-header-left">
                <img src="/images/ic_vote.svg" alt="투표" className="vote-icon" />
                <span className="vote-header-title">추가 의제 투표</span>
              </div>
              <span className="vote-header-deadline">8월 17일 20시 종료</span>
            </div>
            
            <div className="vote-list">
              {additionalVoteItems.map((item, index) => {
                const isTopRank = index === 0;
                const isSelected = selectedAdditionalVote === item.id;
                
                return (
                  <div key={item.id} className="vote-item-wrap">
                    <div 
                      className={`vote-item ${isTopRank ? 'top-rank' : ''} ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleAdditionalVoteSelect(item.id)}
                    >
                      <div className="vote-gauge" style={{ width: `${item.percent}%` }}></div>
                      <input 
                        type="checkbox" 
                        className="vote-checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                      />
                      <div className="vote-item-inner">
                        <div className="vote-item-left">
                          <img 
                            src="/images/ic_check_purple.svg" 
                            alt="선택됨" 
                            className="vote-check-icon"
                          />
                          <span className="vote-item-title">{item.title}</span>
                          <button 
                            type="button" 
                            className="vote-search-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              /* TODO: 팝업 열기 */
                            }}
                          >
                            <img src="/images/ic_search_black.svg" alt="상세보기" />
                          </button>
                        </div>
                        <span className="vote-item-result">{item.percent}% ({item.votes}표)</span>
                      </div>
                    </div>
                    <div className="vote-item-count">
                      온라인 {item.online}명, 오프라인 {item.offline}명
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 투표 영역 2 - 이미지+텍스트형 */}
        <div className="vote-section">
          <div className="vote-header">
            <div className="vote-header-left">
              <img src="/images/ic_vote.svg" alt="투표" className="vote-icon" />
              <span className="vote-header-title">마을 로고 선정 투표</span>
            </div>
            <span className="vote-header-deadline">8월 20일 18시 종료</span>
          </div>
          
          <div className="vote-list-image">
            {imageVoteItems.map((item, index) => {
              const isTopRank = index === 0;
              const isSelected = selectedImageVote === item.id;
              
              return (
                <div 
                  key={item.id}
                  className={`vote-item-image ${isTopRank ? 'top-rank' : ''} ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleImageVoteSelect(item.id)}
                >
                  <input 
                    type="checkbox" 
                    className="vote-checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                  />
                  <img src="/images/ic_check_purple.svg" alt="선택됨" className="vote-check-icon" />
                  <img src={item.image} alt={item.title} className="vote-item-image-thumb" />
                  <div className="vote-item-image-body">
                    <div className="vote-item-image-title">{item.title}</div>
                    <div className="vote-item-image-result">{item.percent}% ({item.votes}표)</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 투표 영역 3 - 별점형 */}
        <div className="vote-section">
          <div className="vote-header">
            <div className="vote-header-left">
              <img src="/images/ic_vote.svg" alt="투표" className="vote-icon" />
              <span className="vote-header-title">마을 행사 만족도 평가</span>
            </div>
            <span className="vote-header-deadline">8월 25일 24시 종료</span>
          </div>
          
          <div className="vote-list-rating">
            {ratingItems.map((item) => {
              const currentRating = ratings[item.id] || 0;
              
              return (
                <div key={item.id} className="vote-item-rating">
                  <span className="vote-item-rating-title">{item.title}</span>
                  <div className="vote-item-rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <img 
                        key={star}
                        src="/images/ic_star.svg" 
                        alt={`${star}점`}
                        className={`vote-star ${star <= currentRating ? 'active' : ''}`}
                        onClick={() => handleRatingChange(item.id, star)}
                      />
                    ))}
                  </div>
                  <span className="vote-item-rating-score">{currentRating}.0점</span>
                </div>
              );
            })}
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

