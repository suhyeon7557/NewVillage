"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="mobile-bottom-nav">
      {/* 우리마을 */}
      <Link href="/village" className={`mobile-nav-item ${isActive('/village') ? 'active' : ''}`}>
        <div className="mobile-nav-icon">
          <Image 
            src="/images/ic_mobilevilage.svg" 
            alt="우리마을" 
            width={28} 
            height={28} 
            className="icon-default"
          />
          <Image 
            src="/images/ic_mobilevilage_hover.svg" 
            alt="우리마을" 
            width={28} 
            height={28} 
            className="icon-hover"
          />
        </div>
        <span className="mobile-nav-label">우리마을</span>
      </Link>

      {/* 마을이야기 */}
      <Link href="/story" className={`mobile-nav-item ${isActive('/story') ? 'active' : ''}`}>
        <div className="mobile-nav-icon">
          <Image 
            src="/images/ic_mobiletalk.svg" 
            alt="마을이야기" 
            width={28} 
            height={28} 
            className="icon-default"
          />
          <Image 
            src="/images/ic_mobiletalk_hover.svg" 
            alt="마을이야기" 
            width={28} 
            height={28} 
            className="icon-hover"
          />
        </div>
        <span className="mobile-nav-label">마을이야기</span>
      </Link>

      {/* 홈 (가운데) */}
      <Link href="/" className="mobile-nav-home">
        <div className="mobile-nav-home-btn">
          <Image 
            src="/images/ic_mobilehome_white.svg" 
            alt="홈" 
            width={22} 
            height={22}
          />
        </div>
      </Link>

      {/* 마을데이터 */}
      <Link href="/data" className={`mobile-nav-item ${isActive('/data') ? 'active' : ''}`}>
        <div className="mobile-nav-icon">
          <Image 
            src="/images/ic_mobiledata.svg" 
            alt="마을데이터" 
            width={28} 
            height={28} 
            className="icon-default"
          />
          <Image 
            src="/images/ic_mobiledata_hover.svg" 
            alt="마을데이터" 
            width={28} 
            height={28} 
            className="icon-hover"
          />
        </div>
        <span className="mobile-nav-label">마을데이터</span>
      </Link>

      {/* 내정보 */}
      <Link href="/mypage" className={`mobile-nav-item ${isActive('/mypage') ? 'active' : ''}`}>
        <div className="mobile-nav-icon">
          <Image 
            src="/images/ic_mobilemypage.svg" 
            alt="내정보" 
            width={28} 
            height={28} 
            className="icon-default"
          />
          <Image 
            src="/images/ic_mobilemypage_hover.svg" 
            alt="내정보" 
            width={28} 
            height={28} 
            className="icon-hover"
          />
        </div>
        <span className="mobile-nav-label">내정보</span>
      </Link>
    </nav>
  );
}

