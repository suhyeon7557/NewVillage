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
        
        {/* 상단 헤더: 탭 + 검색 */}
        <div className="list-header">
          <div className="list-header-left">
            <div className="tabs">
              <button type="button" className="tab-item active" data-tab="all">전체</button>
              <button type="button" className="tab-item" data-tab="my">내 마을</button>
            </div>
          </div>
          <div className="list-header-right">
            <div className="search-box">
              <div className="search-select">
                <button type="button" className="search-select-trigger">
                  <span>제목</span>
                  <img src="/images/ic_select_gray.svg" alt="선택" className="search-select-icon" />
                </button>
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

        {/* 리스트 정보: 총 개수 + 정렬 */}
        <div className="list-info">
          <div className="list-info-left">
            <span className="list-total">총 <strong>83</strong>건</span>
          </div>
          <div className="list-info-right">
            <div className="sort-tabs">
              <button type="button" className="sort-tab active" data-sort="latest">최신순</button>
              <button type="button" className="sort-tab" data-sort="popular">공감순</button>
            </div>
          </div>
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
