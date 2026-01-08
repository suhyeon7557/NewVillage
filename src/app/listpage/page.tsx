import SubPageLayout from "../components/SubPageLayout";


export default function ListPageExample() {
  return (
    <SubPageLayout
      title="마을이야기"
      firstDepth="마을이야기"
      secondDepth="마을의제"
    >
      {/* 리스트 페이지 */}
      <div className="list-page">
        
        {/* 필터 영역: 1뎁스 + 2뎁스 탭 */}
        <div className="list-filter-area">
          {/* 1뎁스 탭: 전체 / 내 마을 */}
          <div className="tabs tabs-primary">
            <button type="button" className="tab-item active" data-tab="all">전체</button>
            <button type="button" className="tab-item" data-tab="my">내 마을</button>
          </div>
          
          {/* 2뎁스 탭: 마을e척척 / do반장 */}
          <div className="tabs tabs-secondary">
            <button type="button" className="tab-item active" data-tab="echuckchuck">마을e척척</button>
            <button type="button" className="tab-item" data-tab="dobanjang">우리동네do반장</button>
          </div>
        </div>

        {/* 검색 + 정렬 영역 */}
        <div className="list-toolbar">
          <div className="list-toolbar-left">
            <span className="list-total">총 <strong>83</strong>건</span>
            <div className="sort-tabs">
              <button type="button" className="sort-tab active" data-sort="latest">최신순</button>
              <button type="button" className="sort-tab" data-sort="popular">공감순</button>
            </div>
          </div>
          <div className="list-toolbar-right">
            <div className="search-box search-box-compact">
              <div className="search-select">
                <button type="button" className="search-select-trigger">
                  <span>제목</span>
                  <img src="/images/ic_select_gray.svg" alt="선택" className="search-select-icon" />
                </button>
              </div>
              <div className="search-input-wrap">
                <input type="text" className="search-input" placeholder="검색어 입력" />
                <button type="button" className="search-btn">
                  <img src="/images/ic_search_gray.svg" alt="검색" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 리스트 없음 예시 - class="list-empty hide" 로 숨김 처리 */}
        <div className="list-empty hide">
          <div className="list-empty-icon">
            <img src="/images/ic_empty.svg" alt="게시글 없음" />
          </div>
          <p className="list-empty-text">등록된 게시글이 없습니다.</p>
          <p className="list-empty-subtext">첫 번째 게시글을 작성해보세요!</p>
        </div>

        {/* 카드 리스트 */}
        <div className="card-list card-list-text">
          
          {/* 카드 1: 관리자(master) */}
          <div className="card card-text">
            <div className="card-body">
              <div className="card-meta">
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
                    <span>4</span>
                  </span>
                  <span className="engagement-item engagement-comments">
                    <img src="/images/ic_talk.svg" alt="댓글" />
                    <span>0</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 카드 2: 관리자(master) */}
          <div className="card card-text">
            <div className="card-body">
              <div className="card-meta">
                <span className="card-village">[진월동]진월마을</span>
              </div>
              <h3 className="card-title">푸른길 공원 안심산책길 조성</h3>
              <p className="card-content">2026년 진월동 주민총회 마을의제 상정 푸른길 공원 안심산책길 조성 - 야간 보행로가 어두운 푸른길 공원에 가로수 추가 설치와 더불어 가로등을 가리는 나무에 대한...</p>
              <div className="card-footer">
                <div className="profile">
                  <div className="profile`-image master"></div>
                  <div className="profile-info">
                    <span className="profile-name">마을e척척</span>
                    <span className="profile-date">2025.09.24</span>
                  </div>
                </div>
                <div className="engagement">
                  <span className="engagement-item engagement-likes">
                    <img src="/images/ic_good.svg" alt="좋아요" />
                    <span>4</span>
                  </span>
                  <span className="engagement-item engagement-comments">
                    <img src="/images/ic_talk.svg" alt="댓글" />
                    <span>0</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 카드 3: 갤러리형 + 관리자(master) */}
          <div className="card card-gallery">
            <div className="card-thumbnail">
              <img src="https://picsum.photos/200/150?random=1" alt="책과 놀자" />
            </div>
            <div className="card-body">
              <div className="card-meta">
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
                    <span>4</span>
                  </span>
                  <span className="engagement-item engagement-comments">
                    <img src="/images/ic_talk.svg" alt="댓글" />
                    <span>0</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 카드 4: 갤러리형 + 관리자(master) */}
          <div className="card card-gallery">
            <div className="card-thumbnail">
              <img src="https://picsum.photos/200/150?random=2" alt="마을주민 베이커리 배움터" />
            </div>
            <div className="card-body">
              <div className="card-meta">
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
                    <span>4</span>
                  </span>
                  <span className="engagement-item engagement-comments">
                    <img src="/images/ic_talk.svg" alt="댓글" />
                    <span>0</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 
            카드 5: 상태형 갤러리 카드 (진행중)
            -------------------------------------------
            상태 클래스:
            - pending: 대기 (파란색)
            - progress: 진행 (주황색)
            - complete: 종료 (회색)
          */}
          <div className="card card-gallery">
            <div className="card-thumbnail">
              <img src="https://picsum.photos/200/150?random=3" alt="동운마을 안심등교 아침길" />
            </div>
            <div className="card-body">
              <div className="card-meta">
                <span className="card-status progress">진행</span>
                <span className="card-village">[운암1동]운암1마을</span>
              </div>
              <h3 className="card-title">[마을리빙랩] 동운마을 안심등교 아침길</h3>
              <p className="card-content">마을e척척 마을리빙랩(동운마을) 안심등교 아침길 이야기입니다. 의제발굴, 마을공동체 협력 캠페인 등 현장맞춤형 마을의제 실행을 지원합니다.</p>
              <div className="card-footer">
                <span className="card-period">2025-10-15 ~ 2025-10-25</span>
                <div className="engagement">
                  <span className="engagement-item engagement-likes">
                    <img src="/images/ic_good.svg" alt="좋아요" />
                    <span>4</span>
                  </span>
                  <span className="engagement-item engagement-comments">
                    <img src="/images/ic_talk.svg" alt="댓글" />
                    <span>0</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 카드 6: 상태형 갤러리 카드 (대기) */}
          <div className="card card-gallery">
            <div className="card-thumbnail">
              <img src="https://picsum.photos/200/150?random=4" alt="마을 축제 투표" />
            </div>
            <div className="card-body">
              <div className="card-meta">
                <span className="card-status pending">대기</span>
                <span className="card-village">[진월동]진월마을</span>
              </div>
              <h3 className="card-title">2026년 진월동 마을축제 주제 선정 투표</h3>
              <p className="card-content">진월동 마을축제 주제를 선정하기 위한 주민 투표입니다. 많은 참여 부탁드립니다.</p>
              <div className="card-footer">
                <span className="card-period">2025-11-01 ~ 2025-11-15</span>
                <div className="engagement">
                  <span className="engagement-item engagement-likes">
                    <img src="/images/ic_good.svg" alt="좋아요" />
                    <span>2</span>
                  </span>
                  <span className="engagement-item engagement-comments">
                    <img src="/images/ic_talk.svg" alt="댓글" />
                    <span>1</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 카드 7: 상태형 갤러리 카드 (종료) */}
          <div className="card card-gallery">
            <div className="card-thumbnail">
              <img src="https://picsum.photos/200/150?random=5" alt="마을 환경 개선" />
            </div>
            <div className="card-body">
              <div className="card-meta">
                <span className="card-status complete">종료</span>
                <span className="card-village">[학운동]무꽃동마을</span>
              </div>
              <h3 className="card-title">2025년 마을 환경개선 사업 의제 투표</h3>
              <p className="card-content">학운동 환경개선 사업 우선순위 선정을 위한 투표가 종료되었습니다.</p>
              <div className="card-footer">
                <span className="card-period">2025-08-01 ~ 2025-08-31</span>
                <div className="engagement">
                  <span className="engagement-item engagement-likes">
                    <img src="/images/ic_good.svg" alt="좋아요" />
                    <span>15</span>
                  </span>
                  <span className="engagement-item engagement-comments">
                    <img src="/images/ic_talk.svg" alt="댓글" />
                    <span>8</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 카드 8: 일반사용자(basic) */}
          <div className="card card-text">
            <div className="card-body">
              <div className="card-meta">
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
                    <span>4</span>
                  </span>
                  <span className="engagement-item engagement-comments">
                    <img src="/images/ic_talk.svg" alt="댓글" />
                    <span>0</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 카드 9: 일반사용자(basic) */}
          <div className="card card-text">
            <div className="card-body">
              <div className="card-meta">
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
                    <span>4</span>
                  </span>
                  <span className="engagement-item engagement-comments">
                    <img src="/images/ic_talk.svg" alt="댓글" />
                    <span>0</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ================================================
            투표 카드 (4열 그리드)
            ================================================ */}
        <div className="card-grid-vote" style={{ marginTop: '2rem' }}>
          {/* 투표 카드 1: 진행 */}
          <div className="card card-vote">
            <div className="card-body">
              <div className="card-meta">
                <span className="card-status progress">진행</span>
                <span className="card-village">[진월동]진월마을</span>
              </div>
              <h3 className="card-title">현장투표 ② 2025 학운동 주민총회...</h3>
              <p className="card-content">공익형법인설립 의제 내용에 공감하시나요? (1~5점 투표) ※ 본 투표는 학운동 중장기마을계획 실행을 위한 마을의제 공감 정도를...</p>
            </div>
            <div className="card-footer">
              <div className="card-footer-row">
                <span className="card-period">2025-08-12 ~ 2025-08-19</span>
                <div className="engagement">
                  <span className="engagement-item engagement-likes">
                    <img src="/images/ic_good.svg" alt="좋아요" />
                    <span>4</span>
                  </span>
                  <span className="engagement-item engagement-comments">
                    <img src="/images/ic_talk.svg" alt="댓글" />
                    <span>0</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 투표 카드 2: 대기 */}
          <div className="card card-vote">
            <div className="card-body">
              <div className="card-meta">
                <span className="card-status pending">대기</span>
                <span className="card-village">[운암1동]운암마을</span>
              </div>
              <h3 className="card-title">2026년 마을 예산 우선순위 투표</h3>
              <p className="card-content">내년도 마을 예산 사용 우선순위를 결정하기 위한 투표입니다. 많은 참여 부탁드립니다.</p>
            </div>
            <div className="card-footer">
              <div className="card-footer-row">
                <span className="card-period">2025-09-01 ~ 2025-09-15</span>
                <div className="engagement">
                  <span className="engagement-item engagement-likes">
                    <img src="/images/ic_good.svg" alt="좋아요" />
                    <span>2</span>
                  </span>
                  <span className="engagement-item engagement-comments">
                    <img src="/images/ic_talk.svg" alt="댓글" />
                    <span>1</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 투표 카드 3: 정지 */}
          <div className="card card-vote">
            <div className="card-body">
              <div className="card-meta">
                <span className="card-status paused">정지</span>
                <span className="card-village">[학운동]무꽃동마을</span>
              </div>
              <h3 className="card-title">마을 공동텃밭 운영 방식 선정</h3>
              <p className="card-content">일시적으로 투표가 정지되었습니다. 추후 공지 예정입니다.</p>
            </div>
            <div className="card-footer">
              <div className="card-footer-row">
                <span className="card-period">2025-07-20 ~ 2025-07-30</span>
                <div className="engagement">
                  <span className="engagement-item engagement-likes">
                    <img src="/images/ic_good.svg" alt="좋아요" />
                    <span>8</span>
                  </span>
                  <span className="engagement-item engagement-comments">
                    <img src="/images/ic_talk.svg" alt="댓글" />
                    <span>3</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 투표 카드 4: 종료 */}
          <div className="card card-vote">
            <div className="card-body">
              <div className="card-meta">
                <span className="card-status complete">종료</span>
                <span className="card-village">[광주]광주마을</span>
              </div>
              <h3 className="card-title">주민자치센터 프로그램 선호도 조사</h3>
              <p className="card-content">투표가 종료되었습니다. 결과는 마을게시판에서 확인하실 수 있습니다.</p>
            </div>
            <div className="card-footer">
              <div className="card-footer-row">
                <span className="card-period">2025-06-01 ~ 2025-06-30</span>
                <div className="engagement">
                  <span className="engagement-item engagement-likes">
                    <img src="/images/ic_good.svg" alt="좋아요" />
                    <span>25</span>
                  </span>
                  <span className="engagement-item engagement-comments">
                    <img src="/images/ic_talk.svg" alt="댓글" />
                    <span>12</span>
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
            <button type="button" className="pagination-num active">1</button>
            <button type="button" className="pagination-num">2</button>
            <button type="button" className="pagination-num">3</button>
            <button type="button" className="pagination-num">4</button>
            <button type="button" className="pagination-num">5</button>
          </div>
          <button type="button" className="pagination-btn pagination-next">
            <img src="/images/ic_next_paging.svg" alt="다음" />
          </button>
        </div>

      </div>
    </SubPageLayout>
  );
}
