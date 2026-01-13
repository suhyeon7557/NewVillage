"use client";

import { useState, useEffect } from "react";

interface SharePopupProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl?: string;
  shareTitle?: string;
}

export default function SharePopup({ 
  isOpen, 
  onClose, 
  shareUrl,
  shareTitle = "마을 초대하기"
}: SharePopupProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // 클라이언트에서만 URL 설정
    setCurrentUrl(shareUrl || window.location.href);
  }, [shareUrl]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 카카오톡 공유
  const handleKakaoShare = () => {
    // 카카오 SDK가 로드되어 있는 경우
    if (typeof window !== "undefined" && (window as any).Kakao) {
      const Kakao = (window as any).Kakao;
      if (!Kakao.isInitialized()) {
        // 카카오 앱 키로 초기화 (실제 앱 키로 교체 필요)
        // Kakao.init('YOUR_KAKAO_APP_KEY');
      }
      Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: shareTitle,
          description: "우리 마을에 초대합니다!",
          imageUrl: `${window.location.origin}/images/image_villagelogo01.png`,
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
        buttons: [
          {
            title: "마을 방문하기",
            link: {
              mobileWebUrl: currentUrl,
              webUrl: currentUrl,
            },
          },
        ],
      });
    } else {
      // 카카오 SDK가 없는 경우 카카오톡 공유 링크로 이동
      const kakaoShareUrl = `https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(currentUrl)}`;
      window.open(kakaoShareUrl, "_blank", "width=600,height=400");
    }
  };

  // URL 복사
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
    } catch (err) {
      // fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = currentUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content popup-share" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2 className="popup-title">공유하기</h2>
          <button type="button" className="popup-close" onClick={onClose}>
            <img src="/images/ic_close.svg" alt="닫기" />
          </button>
        </div>
        <div className="popup-body">
          <div className="share-options">
            {/* 카카오톡 공유 */}
            <button type="button" className="share-option" onClick={handleKakaoShare}>
              <div className="share-option-icon share-kakao">
                <img src="/images/ic_kakao.svg" alt="카카오톡" />
              </div>
              <span className="share-option-label">카카오톡</span>
            </button>

            {/* URL 복사 */}
            <button type="button" className="share-option" onClick={handleCopyUrl}>
              <div className="share-option-icon share-url">
                <img src="/images/ic_link.svg" alt="URL 복사" />
              </div>
              <span className="share-option-label">URL 복사</span>
            </button>
          </div>

          {/* URL 입력 필드 */}
          <div className="share-url-field">
            <input 
              type="text" 
              value={currentUrl} 
              readOnly 
              className="share-url-input"
            />
            <button 
              type="button" 
              className={`share-url-copy ${copied ? "copied" : ""}`}
              onClick={handleCopyUrl}
            >
              {copied ? "복사됨!" : "복사"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

