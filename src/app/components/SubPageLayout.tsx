"use client";

import { useEffect } from "react";


interface SubPageLayoutProps {
  title: string;
  subtitle?: string;
  firstDepth?: string;
  secondDepth?: string;
  children: React.ReactNode;
}

export default function SubPageLayout({ 
  title, 
  subtitle, 
  firstDepth = "마을이야기",
  secondDepth = "마을총회",
  children 
}: SubPageLayoutProps) {

  // 스크롤 애니메이션 초기화
  useEffect(() => {
    initScrollAnimation();
    initBreadcrumbDropdown();
  }, []);

  return (
    <div className="subpage-layout">

      {/* ========== 서브 비주얼 영역 ========== */}
      <div className="sub-visual" id="subVisual">
        <div className="sub-visual-content">
          <p className="sub-visual-subtitle">{subtitle}</p>
          <h1 className="sub-visual-title">{title}</h1>
        </div>
        
        {/* 장식 이미지들 */}
        <div className="sub-visual-deco sub-visual-deco-01">
          <img src="/images/image_subpage_01.svg" alt="장식" />
        </div>
        <div className="sub-visual-deco sub-visual-deco-02">
          <img src="/images/image_subpage_02.svg" alt="장식" />
        </div>
        <div className="sub-visual-deco sub-visual-deco-03">
          <img src="/images/image_subpage_03.svg" alt="장식" />
        </div>
        <div className="sub-visual-deco sub-visual-deco-04">
          <img src="/images/image_subpage_04.svg" alt="장식" />
        </div>
      </div>

      {/* ========== 브레드크럼 네비게이션 ========== */}
      <div className="breadcrumb-nav">
        <div className="container">
          <div className="breadcrumb-inner">

            {/* 홈 아이콘 */}
            <a href="/" className="breadcrumb-home">
              <img src="/images/ic_navbar_home.svg" alt="홈" width="20" height="20" />
            </a>

            {/* 1뎁스 드롭다운 */}
            <div className="breadcrumb-item">
              <div className="breadcrumb-select" data-depth="1">
                <button type="button" className="breadcrumb-select-trigger">
                  <span>{firstDepth}</span>
                  <img src="/images/ic_select_white.svg" alt="선택" className="breadcrumb-select-icon" />
                </button>
                <div className="breadcrumb-dropdown">
                  <ul className="breadcrumb-dropdown-list">
                    <li><button type="button" className="breadcrumb-dropdown-item" data-value="우리마을">우리마을</button></li>
                    <li><button type="button" className="breadcrumb-dropdown-item active" data-value="마을이야기">마을이야기</button></li>
                    <li><button type="button" className="breadcrumb-dropdown-item" data-value="마을데이터">마을데이터</button></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2뎁스 드롭다운 */}
            <div className="breadcrumb-item" id="breadcrumbSecond">
              <div className="breadcrumb-select" data-depth="2">
                <button type="button" className="breadcrumb-select-trigger">
                  <span>{secondDepth}</span>
                  <img src="/images/ic_select_white.svg" alt="선택" className="breadcrumb-select-icon" />
                </button>
                <div className="breadcrumb-dropdown">
                  <ul className="breadcrumb-dropdown-list">
                    <li><button type="button" className="breadcrumb-dropdown-item" data-value="마을활동">마을활동</button></li>
                    <li><button type="button" className="breadcrumb-dropdown-item" data-value="마을의제">마을의제</button></li>
                    <li><button type="button" className="breadcrumb-dropdown-item active" data-value="마을총회">마을총회</button></li>
                    <li><button type="button" className="breadcrumb-dropdown-item" data-value="동네한바퀴">동네한바퀴</button></li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ========== 컨텐츠 영역 ========== */}
      <div className="subpage-content">
        <div className="container">
          {children}
        </div>
      </div>

    </div>
  );
}


/*
===========================================
JavaScript 함수 (별도 JS 파일로 분리 가능)
===========================================
*/

// 스크롤 애니메이션 초기화
function initScrollAnimation() {
  const visualElement = document.getElementById('subVisual');
  if (!visualElement) return;

  const decoElements = visualElement.querySelectorAll('.sub-visual-deco');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      decoElements.forEach((deco) => {
        if (entry.isIntersecting) {
          deco.classList.add('animate-in');
        } else {
          deco.classList.remove('animate-in');
        }
      });
    });
  }, { threshold: 0.3 });
  
  observer.observe(visualElement);
}

// 브레드크럼 드롭다운 초기화
function initBreadcrumbDropdown() {
  const selectElements = document.querySelectorAll('.breadcrumb-select');
  
  selectElements.forEach((select) => {
    const trigger = select.querySelector('.breadcrumb-select-trigger');
    const dropdown = select.querySelector('.breadcrumb-dropdown');
    const icon = select.querySelector('.breadcrumb-select-icon');
    const items = select.querySelectorAll('.breadcrumb-dropdown-item');
    const triggerText = trigger?.querySelector('span');
    
    // 트리거 클릭 시 드롭다운 토글
    trigger?.addEventListener('click', () => {
      const isOpen = dropdown?.classList.contains('open');
      
      // 다른 드롭다운 닫기
      document.querySelectorAll('.breadcrumb-dropdown').forEach(d => d.classList.remove('open'));
      document.querySelectorAll('.breadcrumb-select-icon').forEach(i => i.classList.remove('rotate'));
      
      if (!isOpen) {
        dropdown?.classList.add('open');
        icon?.classList.add('rotate');
      }
    });
    
    // 아이템 클릭 시
    items.forEach((item) => {
      item.addEventListener('click', () => {
        const value = item.getAttribute('data-value');
        
        // 텍스트 변경
        if (triggerText && value) {
          triggerText.textContent = value;
        }
        
        // active 클래스 변경
        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        // 드롭다운 닫기
        dropdown?.classList.remove('open');
        icon?.classList.remove('rotate');
        
        // 1뎁스 변경 시 2뎁스 메뉴 업데이트
        const depth = select.getAttribute('data-depth');
        if (depth === '1') {
          updateSecondDepth(value || '');
        }
      });
    });
  });
  
  // 외부 클릭 시 닫기
  document.addEventListener('click', (e) => {
    const target = e.target as Element;
    if (!target.closest('.breadcrumb-select')) {
      document.querySelectorAll('.breadcrumb-dropdown').forEach(d => d.classList.remove('open'));
      document.querySelectorAll('.breadcrumb-select-icon').forEach(i => i.classList.remove('rotate'));
    }
  });
}

// 2뎁스 메뉴 업데이트
function updateSecondDepth(firstValue: string) {
  const secondContainer = document.getElementById('breadcrumbSecond');
  const secondList = secondContainer?.querySelector('.breadcrumb-dropdown-list');
  const secondTriggerText = secondContainer?.querySelector('.breadcrumb-select-trigger span');
  
  // 메뉴 구조
  const menuStructure: Record<string, string[]> = {
    '우리마을': [],
    '마을이야기': ['마을활동', '마을의제', '마을총회', '동네한바퀴'],
    '마을데이터': ['시각화데이터', '마을지도', '마을영상관']
  };
  
  const subMenu = menuStructure[firstValue] || [];
  
  // 하위메뉴가 없으면 숨김
  if (subMenu.length === 0) {
    secondContainer?.style.setProperty('display', 'none');
    return;
  }
  
  // 하위메뉴가 있으면 표시
  secondContainer?.style.setProperty('display', 'block');
  
  // 메뉴 리스트 업데이트
  if (secondList) {
    secondList.innerHTML = subMenu.map((item, index) => 
      `<li><button type="button" class="breadcrumb-dropdown-item ${index === 0 ? 'active' : ''}" data-value="${item}">${item}</button></li>`
    ).join('');
    
    // 첫번째 항목으로 텍스트 변경
    if (secondTriggerText) {
      secondTriggerText.textContent = subMenu[0];
    }
    
    // 새 아이템에 이벤트 리스너 추가
    initBreadcrumbDropdown();
  }
}

