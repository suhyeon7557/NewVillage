"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  isLoggedIn?: boolean;
}

export default function Header({ isLoggedIn = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  /**
   * 로그인 상태에 따른 클래스 설정
   * - login: 비로그인 상태 (로그인 버튼 + 검색 버튼)
   * - logout: 로그인 상태 (로그아웃 버튼 + 마이페이지 버튼 + 검색 버튼)
   */
  const authClass = isLoggedIn ? "logout" : "login";

  return (
    // header에 login 또는 logout 클래스를 추가하여 CSS로 버튼 표시/숨김 제어
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
              <span className="sub-header-user">'엔유비즈님' 가입마</span>
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

            {/* 메인 네비게이션 - 데스크톱 */}
            <nav className="gnb">
              <Link href="/village" className="gnb-link">우리마을</Link>
              <Link href="/story" className="gnb-link">마을 이야기</Link>
              <Link href="/data" className="gnb-link">마을 데이터</Link>
            </nav>

            {/* 우측 버튼들 */}
            <div className="header-buttons">
              {/* 로그아웃 버튼 - 로그인 상태에서만 표시 (파란색) */}
              <Link href="/logout" className="icon-btn icon-btn-blue btn-logout" title="로그아웃">
                <Image src="/images/ic_logout.svg" alt="로그아웃" width={20} height={20} />
              </Link>
              
              {/* 마이페이지 버튼 - 로그인 상태에서만 표시 (보라색) */}
              <Link href="/mypage" className="icon-btn icon-btn-purple btn-mypage" title="마이페이지">
                <Image src="/images/ic_login.svg" alt="마이페이지" width={20} height={20} />
              </Link>
              
              {/* 로그인 버튼 - 비로그인 상태에서만 표시 (보라색) */}
              <Link href="/login" className="icon-btn icon-btn-purple btn-login" title="로그인">
                <Image src="/images/ic_login.svg" alt="로그인" width={20} height={20} />
              </Link>
              
              {/* 검색 버튼 - 항상 표시 (노란색) */}
              <button className="icon-btn icon-btn-yellow btn-search" title="통합검색">
                <Image src="/images/ic_search.svg" alt="검색" width={20} height={20} />
              </button>

              {/* 모바일 메뉴 버튼 */}
              <button 
                className="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="메뉴 열기"
              >
                <svg className="mobile-menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <div className="container mobile-menu-inner">
              <nav className="mobile-nav">
                <Link 
                  href="/village" 
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  우리마을
                </Link>
                <Link 
                  href="/story" 
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  마을 이야기
                </Link>
                <Link 
                  href="/data" 
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  마을 데이터
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
