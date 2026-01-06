import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";

export const metadata: Metadata = {
  title: "마을e척척 - 마을 리빙랩 플랫폼",
  description: "지역의 문제를 해결하는 활동을 돕는 마을 리빙랩 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="layout-wrapper">
          <Header isLoggedIn={false} />
          <main className="main-content">{children}</main>
          <Footer />
          {/* 모바일 하단 네비게이션 */}
          <MobileNav />
        </div>
      </body>
    </html>
  );
}
