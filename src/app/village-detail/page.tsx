"use client";

import { useState } from "react";
import SubPageLayout from "../components/SubPageLayout";
import SharePopup from "../components/SharePopup";
import "../styles/common.css";
import "../styles/ourvillage.css";

export default function VillageDetailPage() {
  const [showSearchSelect, setShowSearchSelect] = useState(false);
  const [searchType, setSearchType] = useState("제목");
  const [activeNav, setActiveNav] = useState("board");
  const [activeCategory, setActiveCategory] = useState("all");
  const [showVillageInfo, setShowVillageInfo] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);

  const handleSelectOption = (value: string) => {
    setSearchType(value);
    setShowSearchSelect(false);
  };

  return (
    <SubPageLayout
      title="우리마을"
      subtitle="마을별 활동 소식과 이웃 간의 소통을 위한 커뮤니티 공간"
      firstDepth="우리마을"
    >
      {/* 사이드바 + 메인 콘텐츠 레이아웃 */}
      <div className="village-layout">
        {/* 왼쪽 사이드바 */}
        <aside className="village-sidebar">
          {/* 마을 프로필 */}
          <div className="village-profile">
            <div className="village-profile-image">
              <img src="/images/image_villagelogo01.png" alt="동박마실동명마을" />
            </div>
            <div className="village-profile-content">
              <div className="village-name-row">
                <a href="/ourvillage" className="btn-back-village">
                  <img src="/images/ic_arrow_left.svg" alt="뒤로가기" />
                </a>
                <h2 className="village-profile-name">동밖마실동명마을</h2>
              </div>
              <div className="village-profile-info">
                <div className="village-info-row">
                  <span className="village-info-label">주소</span>
                  <span className="village-info-value">동구 동명동</span>
                </div>
                <div className="village-info-row">
                  <span className="village-info-label">주민수</span>
                  <span className="village-info-value">1,025</span>
                </div>
                <div className="village-info-row">
                  <span className="village-info-label">정보</span>
                  <button 
                    type="button" 
                    className="village-info-link"
                    onClick={() => setShowVillageInfo(true)}
                  >
                    자세히 보기
                    <img src="/images/ic_view_red.svg" alt="" className="info-link-icon" />
                  </button>
                </div>
                <button 
                  type="button" 
                  className="btn-invite"
                  onClick={() => setShowSharePopup(true)}
                >
                  <img src="/images/ic_invite.svg" alt="" />
                  <span>초대하기</span>
                </button>
              </div>
            </div>
          </div>

          {/* 사이드 메뉴 */}
          <nav className="village-nav">
            <button 
              type="button"
              className={`village-nav-item ${activeNav === "board" ? "active" : ""}`}
              onClick={() => setActiveNav("board")}
            >
              <img src="/images/ic_board_gray.svg" alt="" className="village-nav-icon icon-gray" />
              <img src="/images/ic_board_white.svg" alt="" className="village-nav-icon icon-white" />
              <span>마을게시판</span>
            </button>
            <button 
              type="button"
              className={`village-nav-item ${activeNav === "activity" ? "active" : ""}`}
              onClick={() => setActiveNav("activity")}
            >
              <img src="/images/ic_activity_gray.svg" alt="" className="village-nav-icon icon-gray" />
              <img src="/images/ic_activity_white.svg" alt="" className="village-nav-icon icon-white" />
              <span>마을활동</span>
            </button>
            <button 
              type="button"
              className={`village-nav-item ${activeNav === "agenda" ? "active" : ""}`}
              onClick={() => setActiveNav("agenda")}
            >
              <img src="/images/ic_agenda_gray.svg" alt="" className="village-nav-icon icon-gray" />
              <img src="/images/ic_agenda_white.svg" alt="" className="village-nav-icon icon-white" />
              <span>마을의제</span>
            </button>
            <button 
              type="button"
              className={`village-nav-item ${activeNav === "meeting" ? "active" : ""}`}
              onClick={() => setActiveNav("meeting")}
            >
              <img src="/images/ic_meeting_gray.svg" alt="" className="village-nav-icon icon-gray" />
              <img src="/images/ic_meeting_white.svg" alt="" className="village-nav-icon icon-white" />
              <span>마을총회</span>
            </button>
            <button 
              type="button"
              className={`village-nav-item ${activeNav === "walk" ? "active" : ""}`}
              onClick={() => setActiveNav("walk")}
            >
              <img src="/images/ic_map_gray.svg" alt="" className="village-nav-icon icon-gray" />
              <img src="/images/ic_map_white.svg" alt="" className="village-nav-icon icon-white" />
              <span>동네한바퀴</span>
            </button>
          </nav>
        </aside>

        {/* 오른쪽 메인 콘텐츠 */}
        <div className="village-main">
          {/* 탭 + 등록버튼 영역 */}
          <div className="village-tab-header">
            {/* 탭: 전체/마을알림/마을소통/마을질문 */}
            <div className="tabs tabs-secondary village-category-tabs">
              <button 
                type="button" 
                className={`tab-item ${activeCategory === "all" ? "active" : ""}`}
                onClick={() => setActiveCategory("all")}
              >전체</button>
              <button 
                type="button" 
                className={`tab-item ${activeCategory === "notice" ? "active" : ""}`}
                onClick={() => setActiveCategory("notice")}
              >마을알림</button>
              <button 
                type="button" 
                className={`tab-item ${activeCategory === "communication" ? "active" : ""}`}
                onClick={() => setActiveCategory("communication")}
              >마을소통</button>
              <button 
                type="button" 
                className={`tab-item ${activeCategory === "question" ? "active" : ""}`}
                onClick={() => setActiveCategory("question")}
              >마을질문</button>
            </div>
            {/* 관리자용 등록 버튼 */}
            <button type="button" className="btn-register-sm">
              <img src="/images/ic_pen_white.svg" alt="" />
              <span>등록하기</span>
            </button>
          </div>

          {/* 검색 + 정렬 영역 */}
          <div className="list-toolbar">
            <div className="list-toolbar-left">
              <span className="list-total">총 <strong>83</strong>건 </span>
              <div className="sort-tabs">
                <button type="button" className="sort-tab active" data-sort="latest">최신순</button>
                <button type="button" className="sort-tab" data-sort="popular">공감순</button>
              </div>
            </div>
            <div className="list-toolbar-right">
              <div className="search-box search-box-compact">
                <div className="search-select">
                  <button 
                    type="button" 
                    className="search-select-trigger"
                    onClick={() => setShowSearchSelect(!showSearchSelect)}
                  >
                    <span>{searchType}</span>
                    <img 
                      src="/images/ic_select_gray.svg" 
                      alt="선택" 
                      className={`search-select-icon ${showSearchSelect ? "rotate" : ""}`} 
                    />
                  </button>
                  {showSearchSelect && (
                    <ul className="search-select-dropdown search-select-list">
                      <li 
                        className={`search-select-item ${searchType === "제목" ? "active" : ""}`}
                        onClick={() => handleSelectOption("제목")}
                      >제목</li>
                      <li 
                        className={`search-select-item ${searchType === "내용" ? "active" : ""}`}
                        onClick={() => handleSelectOption("내용")}
                      >내용</li>
                      <li 
                        className={`search-select-item ${searchType === "작성자" ? "active" : ""}`}
                        onClick={() => handleSelectOption("작성자")}
                      >작성자</li>
                    </ul>
                  )}
                </div>
                <div className="search-input-wrap">
                  <input type="text" className="search-input" placeholder="검색" />
                  <button type="button" className="search-btn">
                    <img src="/images/ic_search_gray.svg" alt="검색" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 카드 리스트 */}
          <div className="card-list card-list-text">
            {/* 카드 1: 마을소통 */}
            <div className="card card-text">
              <div className="card-body">
                <div className="card-meta">
                  <span className="card-category cat-communication">마을소통</span>
                  <span className="card-village">[진월동]진월마을</span>
                </div>
                <h3 className="card-title">진월동 달빛 모기장 영화제</h3>
                <p className="card-content">2026년 진월동 주민총회 마을의제 상정 달빛 모기장 영화제 - 관내 학교 운동장, 테니스장 등을 활용하여 주민 모두가 함께 즐기는 야외 영화제 개최</p>
                <div className="card-footer">
                  <div className="profile">
                    <div className="profile-image master"></div>
                    <div className="profile-info">
                      <span className="profile-name">마을e척척</span>
                      <span className="profile-date">2025.09.24</span>
                    </div>
                  </div>
                  <div className="engagement">
                    <span className="engagement-item engagement-likes">
                      <img src="/images/ic_good.svg" alt="좋아요" />
                      <span>1</span>
                    </span>
                    <span className="engagement-item engagement-comments">
                      <img src="/images/ic_talk.svg" alt="댓글" />
                      <span>2</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 카드 2: 마을소통 */}
            <div className="card card-text">
              <div className="card-body">
                <div className="card-meta">
                  <span className="card-category cat-communication">마을소통</span>
                  <span className="card-village">[진월동]진월마을</span>
                </div>
                <h3 className="card-title">푸른길 공원 안심산책길 조성</h3>
                <p className="card-content">2026년 진월동 주민총회 마을의제 상정 푸른길 공원 안심산책길 조성 - 야간 보행로가 어두운 푸른길 공원에 가로수 추가 설치와 더불어 가로등을 가리는 나무에 대한...</p>
                <div className="card-footer">
                  <div className="profile">
                    <div className="profile-image master"></div>
                    <div className="profile-info">
                      <span className="profile-name">마을e척척</span>
                      <span className="profile-date">2025.09.24</span>
                    </div>
                  </div>
                  <div className="engagement">
                    <span className="engagement-item engagement-likes">
                      <img src="/images/ic_good.svg" alt="좋아요" />
                      <span>1</span>
                    </span>
                    <span className="engagement-item engagement-comments">
                      <img src="/images/ic_talk.svg" alt="댓글" />
                      <span>2</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 카드 3: 갤러리형 + 마을알림 */}
            <div className="card card-gallery">
              <div className="card-thumbnail">
                <img src="https://picsum.photos/200/150?random=1" alt="책과 놀자" />
              </div>
              <div className="card-body">
                <div className="card-meta">
                  <span className="card-category cat-notice">마을알림</span>
                  <span className="card-village">[학운동]무꽃동마을</span>
                </div>
                <h3 className="card-title">책과 놀자</h3>
                <p className="card-content">※ 본 투표는 학운동 중장기마을계획 실행을 위한 2026 주민공동체 의제를 선정하기 위한 것입니다.</p>
                <div className="card-footer">
                  <div className="profile">
                    <div className="profile-image master"></div>
                    <div className="profile-info">
                      <span className="profile-name">마을e척척</span>
                      <span className="profile-date">2025.09.24</span>
                    </div>
                  </div>
                  <div className="engagement">
                    <span className="engagement-item engagement-likes">
                      <img src="/images/ic_good.svg" alt="좋아요" />
                      <span>1</span>
                    </span>
                    <span className="engagement-item engagement-comments">
                      <img src="/images/ic_talk.svg" alt="댓글" />
                      <span>2</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 카드 4: 갤러리형 + 마을알림 */}
            <div className="card card-gallery">
              <div className="card-thumbnail">
                <img src="https://picsum.photos/200/150?random=2" alt="마을주민 베이커리 배움터" />
              </div>
              <div className="card-body">
                <div className="card-meta">
                  <span className="card-category cat-notice">마을알림</span>
                  <span className="card-village">[학운동]무꽃동마을</span>
                </div>
                <h3 className="card-title">마을주민 베이커리 배움터</h3>
                <p className="card-content">※ 본 투표는 학운동 중장기마을계획 실행을 위한 2026 주민공동체 의제를 선정하기 위한 것입니다.</p>
                <div className="card-footer">
                  <div className="profile">
                    <div className="profile-image master"></div>
                    <div className="profile-info">
                      <span className="profile-name">마을e척척</span>
                      <span className="profile-date">2025.09.24</span>
                    </div>
                  </div>
                  <div className="engagement">
                    <span className="engagement-item engagement-likes">
                      <img src="/images/ic_good.svg" alt="좋아요" />
                      <span>1</span>
                    </span>
                    <span className="engagement-item engagement-comments">
                      <img src="/images/ic_talk.svg" alt="댓글" />
                      <span>2</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 카드 5: 마을질문 */}
            <div className="card card-text">
              <div className="card-body">
                <div className="card-meta">
                  <span className="card-category cat-question">마을질문</span>
                  <span className="card-village">[광주]광주마을</span>
                </div>
                <h3 className="card-title">광주에 이사온지 얼마 안된 주민입니다. 광주에 산책할 만한 장소 추천 부탁드립니다.</h3>
                <p className="card-content">광주에 이사온지 얼마 안됐습니다. 저녁먹고 산책할 만한 장소가 있는지 추천좀 부탁드립니다.</p>
                <div className="card-footer">
                  <div className="profile">
                    <div className="profile-image basic"></div>
                    <div className="profile-info">
                      <span className="profile-name">달봉맘</span>
                      <span className="profile-date">2025.09.24</span>
                    </div>
                  </div>
                  <div className="engagement">
                    <span className="engagement-item engagement-likes">
                      <img src="/images/ic_good.svg" alt="좋아요" />
                      <span>1</span>
                    </span>
                    <span className="engagement-item engagement-comments">
                      <img src="/images/ic_talk.svg" alt="댓글" />
                      <span>2</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 카드 6: 마을질문 */}
            <div className="card card-text">
              <div className="card-body">
                <div className="card-meta">
                  <span className="card-category cat-question">마을질문</span>
                  <span className="card-village">[치평동]치평마을</span>
                </div>
                <h3 className="card-title">안녕하세요 치평동에 사는 주민인데 시민공원에 체조하는걸 본적이 있습니다. 질문드립니다.</h3>
                <p className="card-content">시민공원에서 체조를 하는걸 본적이 있는데 그게 무슨 요일에 몇시쯤에 하는지 궁금하네요 혹시 아는 분 계시면 알려주세요.</p>
                <div className="card-footer">
                  <div className="profile">
                    <div className="profile-image basic"></div>
                    <div className="profile-info">
                      <span className="profile-name">가을흙아</span>
                      <span className="profile-date">2025.09.24</span>
                    </div>
                  </div>
                  <div className="engagement">
                    <span className="engagement-item engagement-likes">
                      <img src="/images/ic_good.svg" alt="좋아요" />
                      <span>1</span>
                    </span>
                    <span className="engagement-item engagement-comments">
                      <img src="/images/ic_talk.svg" alt="댓글" />
                      <span>2</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 페이지네이션 */}
          <div className="pagination">
            <button type="button" className="pagination-btn pagination-prev" disabled>
              <img src="/images/ic_prev_paging.svg" alt="이전" />
            </button>
            <div className="pagination-numbers">
              <button type="button" className="pagination-num">1</button>
              <button type="button" className="pagination-num active">2</button>
              <button type="button" className="pagination-num">3</button>
              <button type="button" className="pagination-num">4</button>
              <button type="button" className="pagination-num">5</button>
            </div>
            <button type="button" className="pagination-btn pagination-next">
              <img src="/images/ic_next_paging.svg" alt="다음" />
            </button>
          </div>
        </div>
      </div>

      {/* 마을 정보 팝업 */}
      {showVillageInfo && (
        <div className="popup-overlay" onClick={() => setShowVillageInfo(false)}>
          <div className="popup-content popup-content-lg" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2 className="popup-title">동명동</h2>
              <button 
                type="button" 
                className="popup-close"
                onClick={() => setShowVillageInfo(false)}
              >
                <img src="/images/ic_close.svg" alt="닫기" />
              </button>
            </div>
            <div className="popup-body village-info-popup">
              {/* 유래와 특징 */}
              <div className="info-section">
                <h3 className="info-section-title">유래와 특징</h3>
                <p className="info-section-content">
                  광주읍성의 동문 밖에 위치해있었고, 동계천 근처에 위치해 있어 "동밖에"나 "동계" 등으로 불리우다가 1946년 동명동이라고 칭해져 1973년 동명동 1구와 2구가 각각 동명1동, 동명2동이 되었습니다.
                  <br /><br />
                  1998년 동명1동과 동명2동이 다시금 동명동으로 통합되어 명칭이 변경되었습니다. 동구 도심이나 대인시장 등과 인접한 고급주택가로, 계림5거리 부근 나무전거리에는 목재상이 밀집해있고 중앙도서관이나 노인복지회관 등 다양한 교육 및 사회복지시설이 위치하고 있습니다.
                </p>
              </div>

              {/* 행정구역 */}
              <div className="info-section">
                <h3 className="info-section-title">행정구역</h3>
                <table className="info-table">
                  <tbody>
                    <tr>
                      <th>면적</th>
                      <td>0.43km²</td>
                    </tr>
                    <tr>
                      <th>행정동 명칭</th>
                      <td>동명동</td>
                    </tr>
                    <tr>
                      <th>통(개)</th>
                      <td>10</td>
                    </tr>
                    <tr>
                      <th>반(개)</th>
                      <td>59</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 인구 및 세대 현황 */}
              <div className="info-section">
                <h3 className="info-section-title">인구 및 세대 현황</h3>
                <table className="info-table">
                  <tbody>
                    <tr>
                      <th>인구수(계)</th>
                      <td>4,248</td>
                    </tr>
                    <tr>
                      <th>인구수(남자)</th>
                      <td>2,136(50.28%)</td>
                    </tr>
                    <tr>
                      <th>인구수(여자)</th>
                      <td>2,112(49.72%)</td>
                    </tr>
                    <tr>
                      <th>세대수</th>
                      <td>2,333</td>
                    </tr>
                    <tr>
                      <th>세대당 인구수</th>
                      <td>1.82</td>
                    </tr>
                    <tr>
                      <th>외국인 수</th>
                      <td>40</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 연령별 인구분포 현황 */}
              <div className="info-section">
                <h3 className="info-section-title">연령별 인구분포 현황</h3>
                <table className="info-table">
                  <tbody>
                    <tr>
                      <th>합계</th>
                      <td>4,137</td>
                    </tr>
                    <tr>
                      <th>10세 미만</th>
                      <td>141</td>
                    </tr>
                    <tr>
                      <th>10대</th>
                      <td>279</td>
                    </tr>
                    <tr>
                      <th>20~30대</th>
                      <td>1,097</td>
                    </tr>
                    <tr>
                      <th>40~50대</th>
                      <td>1,204</td>
                    </tr>
                    <tr>
                      <th>60대</th>
                      <td>335</td>
                    </tr>
                    <tr>
                      <th>65세 이상 노인 인구</th>
                      <td>1,081</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 주택유형별 현황 */}
              <div className="info-section">
                <h3 className="info-section-title">주택유형별 현황</h3>
                <table className="info-table">
                  <tbody>
                    <tr>
                      <th>일반가구 수</th>
                      <td>2,487</td>
                    </tr>
                    <tr>
                      <th>아파트(연립 포함)</th>
                      <td>2</td>
                    </tr>
                    <tr>
                      <th>빈집</th>
                      <td>14</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 공유 팝업 */}
      <SharePopup 
        isOpen={showSharePopup}
        onClose={() => setShowSharePopup(false)}
        shareTitle="동밖마실동명마을 초대"
      />
    </SubPageLayout>
  );
}

