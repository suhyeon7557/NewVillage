import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      {/* 상단 파트너 영역 */}
      <div className="footer-partner">
        <div className="container">
          <div className="footer-partner-inner">
            <p className="footer-partner-text">
              마을e척척은 행정안전부가 주최하고, 한국정보화진흥원이 주관하는 '2019년 디지털 사회혁신 프로젝트'의 지원을 받아 개발하였습니다.
            </p>
            <div className="footer-partner-logos">
              <Image src="/images/ic_centerbiglogo.svg" alt="GURCC" width={100} height={32} />
              <Image src="/images/ic_nubizlogo.svg" alt="(주)엔유비즈" width={130} height={32} />
              <Image src="/images/ic_gwangjubiglogo.svg" alt="광주광역시" width={100} height={32} />
            </div>
          </div>
        </div>
      </div>

      {/* 메인 푸터 영역 */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-main-inner">
            <div className="footer-info">
              <Link href="/" className="footer-logo">
                <Image src="/images/logo.svg" alt="마을e척척" width={120} height={35} />
              </Link>
              <div className="footer-text">
                <Link href="/terms" className="footer-terms">
                  이용약관 및 개인정보처리방침
                </Link>
                <div className="footer-address">
                  <p>(61226) 광주광역시 북구 독립로375번길 80 푸른이용센터</p>
                  <p>TEL 062-515-2800 FAX 062-515-2808</p>
                </div>
                <p className="footer-copyright">
                  COPYRIGHT (C) 2019 GURCC. ALL RIGHTS RESERVED
                </p>
              </div>
            </div>

            <div className="footer-apps">
              {/* <Link href="#" className="app-link">
                <div className="app-icon">
                  <Image src="/images/ic_ios.svg" alt="iOS" width={24} height={24} />
                </div>
                <span className="app-label">iOS</span>
              </Link> */}
              <Link href="#" className="app-link">
                <div className="app-icon">
                  <Image src="/images/ic_android.svg" alt="안드로이드" width={24} height={24} />
                </div>
                <span className="app-label">안드로이드</span>
              </Link>
              <Link href="#" className="app-link">
                <div className="app-icon">
                  <Image src="/images/ic_one.svg" alt="원스토어" width={24} height={24} />
                </div>
                <span className="app-label">원스토어</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

