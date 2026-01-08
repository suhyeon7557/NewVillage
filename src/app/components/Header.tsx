"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  isLoggedIn?: boolean;
}

export default function Header({ isLoggedIn = false }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  /**
   * ========================================
   * 로그인 상태 클래스 설정
   * ========================================
   * 
   * ------------------------------------------
   * 
   * 비로그인 상태:
   * <header class="header login">
   * 
   * 로그인 상태:
   * <header class="header logout">
   * 
   * ------------------------------------------
   * [버튼 표시 규칙]
   * 
   * header.login (비로그인):
   *   - btn-login 표시 O
   *   - btn-search 표시 O
   *   - btn-logout 표시 X
   *   - btn-mypage 표시 X
   * 
   * header.logout (로그인):
   *   - btn-logout 표시 O
   *   - btn-mypage 표시 O
   *   - btn-search 표시 O
   *   - btn-login 표시 X
   * 
   * ========================================
   */
  const authClass = isLoggedIn ? "logout" : "login";
  // const authClass = "login";  // 테스트용: 비로그인 상태
  // const authClass = "logout"; // 테스트용: 로그인 상태

  // function toggleSearch() { document.querySelector('.search-panel').classList.toggle('open'); }
  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // function closeSearch() { document.querySelector('.search-panel').classList.remove('open'); }
  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  // header 클래스 구조:
  // - header.login : 비로그인 상태 (로그인 버튼 2개 표시)
  // - header.logout : 로그인 상태 (로그아웃/마이페이지/검색 버튼 3개 표시)
  return (
    <header className={`header ${authClass}`}>
      {/* 서브 헤더 (상단 검은색 바) */}
      <div className="sub-header">
        <div className="container">
          <div className="sub-header-inner">
            {/* 좌측 링크들 */}
            <div className="sub-header-links">
              <a 
                href="https://www.gwangju.go.kr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="sub-header-link"
              >
                <Image src="/images/ic_gwangjulogo.svg" alt="광주광역시" width={16} height={16} />
                <span>광주광역시청</span>
              </a>
              <span className="sub-header-divider">|</span>
              <a href="#" className="sub-header-link">
                <Image src="/images/ic_bloglogo.svg" alt="블로그" width={16} height={16} />
                <span>블로그</span>
              </a>
              <span className="sub-header-divider">|</span>
              <a href="#" className="sub-header-link">
                <Image src="/images/ic_centerlogo.svg" alt="센터" width={16} height={16} />
                <span>광주광역시도시재생공동체센터</span>
              </a>
              <span className="sub-header-divider">|</span>
              <a href="#" className="sub-header-link">
                <Image src="/images/ic_guide.svg" alt="안내" width={16} height={16} />
                <span>홈페이지 안내</span>
              </a>
            </div>

            {/* 우측 - 로그인 시에만 표시 */}
            <div className="sub-header-right">
              <span className="sub-header-user">'엔유비즈님' 가입마을</span>
              <div className="sub-header-villages">
                <Link href="#" className="village-tag">[광주마을]</Link>
                <Link href="#" className="village-tag">[북구마을]</Link>
                <Link href="#" className="village-tag">[광산구마을]</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 헤더 */}
      <div className="main-header">
        <div className="container">
          <div className="main-header-inner">
            {/* 로고 */}
            <Link href="/" className="header-logo">
              <Image 
                src="/images/logo.svg" 
                alt="마을e척척" 
                width={140} 
                height={40}
                priority
              />
            </Link>

            {/* 메인 네비게이션 (GNB) */}
            <nav className="gnb">
              {/* 우리마을 - 서브메뉴 없음 */}
              <div className="gnb-item">
                <Link href="/village" className="gnb-link">우리마을</Link>
              </div>

              {/* 마을 이야기 - 서브메뉴 있음 */}
              <div className="gnb-item has-sub">
                <Link href="/story" className="gnb-link">마을 이야기</Link>
                <div className="gnb-dropdown">
                  <div className="gnb-dropdown-inner">
                    <Link href="/story/activity" className="gnb-sub-link">마을활동</Link>
                    <Link href="/story/agenda" className="gnb-sub-link">마을의제</Link>
                    <Link href="/story/meeting" className="gnb-sub-link">마을총회</Link>
                    <Link href="/story/tour" className="gnb-sub-link">동네한바퀴</Link>
                  </div>
                </div>
              </div>

              {/* 마을 데이터 - 서브메뉴 있음 */}
              <div className="gnb-item has-sub">
                <Link href="/data" className="gnb-link">마을 데이터</Link>
                <div className="gnb-dropdown">
                  <div className="gnb-dropdown-inner">
                    <Link href="/data/visualization" className="gnb-sub-link">시각화데이터</Link>
                    <Link href="/data/map" className="gnb-sub-link">마을지도</Link>
                    <Link href="/data/video" className="gnb-sub-link">마을영상관</Link>
                  </div>
                </div>
              </div>
            </nav>

            {/* 
              ========================================
              우측 버튼 영역 - 로그인 상태에 따라 표시되는 버튼이 다름
              ========================================
              
              [비로그인 상태] header.login 클래스일 때:
              - 로그인 버튼 (btn-login) : 표시 O - 보라색 #6369DD
              - 검색 버튼 (btn-search) : 표시 O - 노란색 #FFAE00
              - 로그아웃 버튼 (btn-logout) : 표시 X
              - 마이페이지 버튼 (btn-mypage) : 표시 X
              
              [로그인 상태] header.logout 클래스일 때:
              - 로그아웃 버튼 (btn-logout) : 표시 O - 파란색 #4CA0FF
              - 마이페이지 버튼 (btn-mypage) : 표시 O - 보라색 #6369DD
              - 검색 버튼 (btn-search) : 표시 O - 노란색 #FFAE00
              - 로그인 버튼 (btn-login) : 표시 X
              
              CSS에서 .header.login / .header.logout 클래스로 제어됨
              ========================================
            */}
            <div className="header-buttons">
              {/* [로그인 상태에서만 표시] 로그아웃 버튼 - 파란색 #4CA0FF */}
              <a href="/logout" className="icon-btn icon-btn-blue btn-logout" title="로그아웃">
                <img src="/images/ic_logout.svg" alt="로그아웃" />
              </a>
              
              {/* [로그인 상태에서만 표시] 마이페이지 버튼 - 보라색 #6369DD */}
              <a href="/mypage" className="icon-btn icon-btn-purple btn-mypage" title="마이페이지">
                <img src="/images/ic_login.svg" alt="마이페이지" />
              </a>
              
              {/* [비로그인 상태에서만 표시] 로그인 버튼 - 보라색 #6369DD */}
              <a href="/login" className="icon-btn icon-btn-purple btn-login" title="로그인">
                <img src="/images/ic_login.svg" alt="로그인" />
              </a>
              
              {/* [항상 표시] 검색 버튼 - 노란색 #FFAE00 */}
              <button 
                className={`icon-btn icon-btn-yellow btn-search ${isSearchOpen ? 'active' : ''}`} 
                title="통합검색"
                onClick={handleSearchToggle}
              >
                <img src="/images/ic_search.svg" alt="검색" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 통합검색 패널 */}
      <div className={`search-panel ${isSearchOpen ? 'open' : ''}`}>
        <div className="search-panel-bg" onClick={handleSearchClose} />
        <div className="search-panel-content">
          <div className="container">
            <div className="search-panel-inner">
              <div className="search-panel-header">
                <h2 className="search-panel-title">통합검색</h2>
                <p className="search-panel-desc">마을e척척에서 원하는 정보를 검색해보세요</p>
              </div>
              
              <div className="search-input-wrapper">
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="검색어를 입력하세요"
                  autoFocus={isSearchOpen}
                />
                <button className="search-submit-btn" type="button">
                  <Image src="/images/ic_search.svg" alt="검색" width={24} height={24} />
                  <span>검색</span>
                </button>
              </div>

              <button className="search-close-btn" onClick={handleSearchClose}>
                <span>닫기</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

