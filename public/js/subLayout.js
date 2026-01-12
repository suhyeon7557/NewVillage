/**
 * 마을e척척 서브페이지 레이아웃 JavaScript
 * =========================================
 * 포함 기능:
 * - 검색 패널 열기/닫기
 * - 브레드크럼 드롭다운
 * - 모바일 네비게이션 active 처리
 * - 서브 비주얼 스크롤 애니메이션
 * - 팝업 열기/닫기
 * - 더보기 메뉴
 * - 좋아요 토글
 * - 댓글 기능
 * - 투표 기능
 * - 파일 업로드
 * - 탭 전환
 * - 페이지 섹션 전환
 */

document.addEventListener("DOMContentLoaded", () => {
  // ========================================
  // DOM 요소 선택
  // ========================================
  const searchBtn = document.querySelector(".btn-search");
  const searchPanel = document.querySelector(".search-panel");
  const searchBg = document.querySelector(".search-panel-bg");
  const searchCloseBtn = document.querySelector(".search-close-btn");
  const searchInput = document.querySelector(".search-input");

  const subVisual = document.getElementById("subVisual");
  const breadcrumbSelects = document.querySelectorAll(".breadcrumb-select");

  const navItems = document.querySelectorAll(".mobile-nav-item");

  const currentPath = window.location.pathname;

  // ========================================
  // 초기화
  // ========================================
  function init() {
    updateUi();
    bindEvent();
    initScrollAnimation();
    initTabs();
    initCategoryFields();
  }

  // ========================================
  // 검색 패널 기능
  // ========================================
  function openSearch() {
    if (!searchBtn || !searchPanel) return;

    searchBtn.classList.add("active");
    searchPanel.classList.add("open");

    if (searchInput) {
      setTimeout(() => searchInput.focus(), 100);
    }
  }

  function closeSearch() {
    if (!searchBtn || !searchPanel) return;

    searchBtn.classList.remove("active");
    searchPanel.classList.remove("open");
  }

  // ========================================
  // UI 업데이트
  // ========================================
  function updateUi() {
    updateMobileNavActive();
  }

  // 모바일 네비게이션 active 처리
  function updateMobileNavActive() {
    if (!navItems.length) return;

    navItems.forEach((item) => {
      const href = item.getAttribute("href");
      if (!href) return;

      item.classList.remove("active");

      if (currentPath === href || currentPath.startsWith(href + "/")) {
        item.classList.add("active");
      }
    });
  }

  // ========================================
  // 이벤트 바인딩
  // ========================================
  function bindEvent() {
    bindSearchToggleEvent();
    bindBreadcrumbDropdownEvent();
    bindPopupEvent();
    bindMoreMenuEvent();
    bindLikeEvent();
    bindCommentEvent();
    bindVoteEvent();
    bindFileUploadEvent();
    bindSearchSelectEvent();
    bindFormSelectEvent();
  }

  // ----------------------------------------
  // 통합검색 열기/닫기
  // ----------------------------------------
  function bindSearchToggleEvent() {
    if (!searchBtn || !searchPanel) return;

    searchBtn.addEventListener("click", () => {
      searchPanel.classList.contains("open") ? closeSearch() : openSearch();
    });

    searchBg?.addEventListener("click", closeSearch);
    searchCloseBtn?.addEventListener("click", closeSearch);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && searchPanel.classList.contains("open")) {
        closeSearch();
      }
    });
  }

  // ----------------------------------------
  // 브레드크럼 드롭다운
  // ----------------------------------------
  function bindBreadcrumbDropdownEvent() {
    if (!breadcrumbSelects.length) return;

    function closeDropdown() {
      document
        .querySelectorAll(".breadcrumb-dropdown")
        .forEach((d) => d.classList.remove("open"));
      document
        .querySelectorAll(".breadcrumb-select-icon")
        .forEach((i) => i.classList.remove("rotate"));
    }

    function updateSecondDepth(firstValue) {
      const secondContainer = document.querySelector("#breadcrumbSecond");
      const secondList = secondContainer?.querySelector(
        ".breadcrumb-dropdown-list"
      );
      const secondTriggerText = secondContainer?.querySelector(
        ".breadcrumb-select-trigger span"
      );

      const menuStructure = {
        우리마을: [],
        마을이야기: ["마을활동", "마을의제", "마을총회", "동네한바퀴"],
        마을데이터: ["시각화데이터", "마을지도", "마을영상관"],
      };

      const subMenu = menuStructure[firstValue] || [];

      if (!secondContainer) return;

      if (subMenu.length === 0) {
        secondContainer.style.display = "none";
        return;
      }

      secondContainer.style.display = "block";

      if (secondList) {
        secondList.innerHTML = subMenu
          .map(
            (item, index) =>
              `<li><button type="button" class="breadcrumb-dropdown-item ${
                index === 0 ? "active" : ""
              }" data-value="${item}">${item}</button></li>`
          )
          .join("");

        if (secondTriggerText) secondTriggerText.textContent = subMenu[0];

        secondList
          .querySelectorAll(".breadcrumb-dropdown-item")
          .forEach((item) => {
            item.addEventListener("click", () => {
              const value = item.getAttribute("data-value");

              if (secondTriggerText && value)
                secondTriggerText.textContent = value;

              secondList
                .querySelectorAll(".breadcrumb-dropdown-item")
                .forEach((i) => i.classList.remove("active"));
              item.classList.add("active");

              closeDropdown();
            });
          });
      }
    }

    breadcrumbSelects.forEach((select) => {
      const trigger = select.querySelector(".breadcrumb-select-trigger");
      const triggerText = trigger?.querySelector("span");
      const icon = select.querySelector(".breadcrumb-select-icon");
      const dropdown = select.querySelector(".breadcrumb-dropdown");
      const items = select.querySelectorAll(".breadcrumb-dropdown-item");

      // 트리거 클릭
      trigger?.addEventListener("click", () => {
        const isOpen = dropdown?.classList.contains("open");

        closeDropdown();

        if (!isOpen) {
          dropdown?.classList.add("open");
          icon?.classList.add("rotate");
        }
      });

      // 아이템 클릭
      items.forEach((item) => {
        item.addEventListener("click", () => {
          const value = item.getAttribute("data-value");

          if (triggerText && value) triggerText.textContent = value;

          items.forEach((i) => i.classList.remove("active"));
          item.classList.add("active");

          closeDropdown();

          if (select.getAttribute("data-depth") === "1") {
            updateSecondDepth(value || "");
          }
        });
      });
    });

    // 외부 클릭 시 닫기
    document.addEventListener("click", (e) => {
      const target = e.target;

      if (!(target instanceof Element)) return;
      if (!target.closest(".breadcrumb-select")) {
        closeDropdown();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeDropdown();
      }
    });
  }

  // ----------------------------------------
  // 서브 비주얼 스크롤 애니메이션
  // ----------------------------------------
  function initScrollAnimation() {
    if (!subVisual) return;
    const decoElements = subVisual.querySelectorAll(".sub-visual-deco");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          decoElements.forEach((deco) => {
            if (entry.isIntersecting) {
              deco.classList.add("animate-in");
            } else {
              deco.classList.remove("animate-in");
            }
          });
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(subVisual);
  }

  // ========================================
  // 팝업 기능
  // ========================================
  function bindPopupEvent() {
    // 팝업 오버레이 클릭 시 닫기
    document.querySelectorAll(".popup-overlay").forEach((overlay) => {
      overlay.addEventListener("click", () => {
        const popup = overlay.closest(".popup-container");
        if (popup) closePopup(popup.id);
      });
    });

    // 팝업 닫기 버튼
    document.querySelectorAll(".popup-close-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const popup = btn.closest(".popup-container");
        if (popup) closePopup(popup.id);
      });
    });

    // ESC 키로 팝업 닫기
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const openPopup = document.querySelector(
          '.popup-container[style*="flex"]'
        );
        if (openPopup) closePopup(openPopup.id);
      }
    });
  }

  // ----------------------------------------
  // 더보기 메뉴
  // ----------------------------------------
  function bindMoreMenuEvent() {
    document.querySelectorAll(".detail-more-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const dropdown = btn.nextElementSibling;
        if (dropdown) {
          const isOpen = dropdown.style.display === "block";
          // 모든 드롭다운 닫기
          document.querySelectorAll(".detail-more-dropdown").forEach((d) => {
            d.style.display = "none";
          });
          // 현재 드롭다운 토글
          dropdown.style.display = isOpen ? "none" : "block";
        }
      });
    });

    // 외부 클릭 시 더보기 메뉴 닫기
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".detail-more-menu")) {
        document.querySelectorAll(".detail-more-dropdown").forEach((dropdown) => {
          dropdown.style.display = "none";
        });
      }
    });
  }

  // ----------------------------------------
  // 좋아요 기능
  // ----------------------------------------
  function bindLikeEvent() {
    document.querySelectorAll("#likeBtn, .action-box-btn.like-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const countEl = this.querySelector("#likeCount, .like-count");
        if (!countEl) return;

        const isLiked = this.classList.contains("active");
        let count = parseInt(countEl.textContent) || 0;

        if (isLiked) {
          count--;
          this.classList.remove("active");
        } else {
          count++;
          this.classList.add("active");
        }

        countEl.textContent = count;

        // JSP: Ajax로 서버에 좋아요 상태 전송
        // fetch('/api/like', { method: 'POST', body: JSON.stringify({ id: itemId, isLiked: !isLiked }) });
      });
    });
  }

  // ----------------------------------------
  // 댓글 기능
  // ----------------------------------------
  function bindCommentEvent() {
    const commentInput = document.getElementById("commentInput");
    const commentSubmitBtn = document.getElementById("commentSubmitBtn");
    const commentMoreBtn = document.getElementById("commentMoreBtn");
    const commentList = document.getElementById("commentList");

    // 댓글 입력 시 등록 버튼 활성화
    if (commentInput && commentSubmitBtn) {
      commentInput.addEventListener("input", () => {
        if (commentInput.value.trim()) {
          commentSubmitBtn.classList.add("active");
        } else {
          commentSubmitBtn.classList.remove("active");
        }
      });

      // 댓글 등록
      commentSubmitBtn.addEventListener("click", () => {
        const content = commentInput.value.trim();
        if (!content) return;

        // JSP: Ajax로 댓글 등록
        // fetch('/api/comment', { method: 'POST', body: JSON.stringify({ content: content }) });

        alert("댓글이 등록되었습니다.");
        commentInput.value = "";
        commentSubmitBtn.classList.remove("active");
      });
    }

    // 댓글 더보기/접기
    if (commentMoreBtn && commentList) {
      let showAll = false;
      const maxVisible = 4;

      // 초기 상태: 4개만 표시
      const items = commentList.querySelectorAll(".comment-item");
      if (items.length > maxVisible) {
        items.forEach((item, index) => {
          if (index >= maxVisible) {
            item.style.display = "none";
          }
        });
        commentMoreBtn.classList.remove("hide");
        updateMoreBtnText();
      } else {
        commentMoreBtn.classList.add("hide");
      }

      function updateMoreBtnText() {
        const hiddenCount = items.length - maxVisible;
        commentMoreBtn.textContent = showAll
          ? "접기"
          : `더보기 (${hiddenCount})`;
      }

      commentMoreBtn.addEventListener("click", () => {
        showAll = !showAll;
        items.forEach((item, index) => {
          if (index >= maxVisible) {
            item.style.display = showAll ? "block" : "none";
          }
        });
        updateMoreBtnText();
      });
    }
  }

  // ----------------------------------------
  // 투표 기능
  // ----------------------------------------
  function bindVoteEvent() {
    // 텍스트형 투표 항목 선택
    document.querySelectorAll(".vote-item").forEach((item) => {
      item.addEventListener("click", function (e) {
        // 돋보기 버튼 클릭 시 선택 방지
        if (e.target.closest(".vote-search-btn")) return;

        this.classList.toggle("selected");
        const checkbox = this.querySelector(".vote-checkbox");
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
        }
      });
    });

    // 이미지형 투표 항목 선택
    document.querySelectorAll(".vote-item-image").forEach((item) => {
      item.addEventListener("click", function () {
        this.classList.toggle("selected");
        const checkbox = this.querySelector(".vote-checkbox");
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
        }
      });
    });

    // 별점형 투표
    document.querySelectorAll(".vote-item-rating").forEach((ratingItem) => {
      const stars = ratingItem.querySelectorAll(".vote-star");

      stars.forEach((star, index) => {
        star.addEventListener("click", () => {
          const rating = index + 1;
          ratingItem.setAttribute("data-rating", rating);

          // 별 활성화
          stars.forEach((s, i) => {
            if (i < rating) {
              s.classList.add("active");
            } else {
              s.classList.remove("active");
            }
          });

          // 점수 표시 업데이트
          const scoreEl = ratingItem.querySelector(".vote-item-rating-score");
          if (scoreEl) {
            scoreEl.textContent = `${rating}점`;
          }
        });

        // 호버 효과
        star.addEventListener("mouseenter", () => {
          stars.forEach((s, i) => {
            if (i <= index) {
              s.classList.add("hover");
            }
          });
        });

        star.addEventListener("mouseleave", () => {
          stars.forEach((s) => s.classList.remove("hover"));
        });
      });
    });

    // 투표 제출
    document.querySelectorAll(".vote-submit-btn, [onclick*='submitVote']").forEach((btn) => {
      btn.addEventListener("click", () => {
        const selectedItems = document.querySelectorAll(".vote-item.selected");
        if (selectedItems.length === 0) {
          alert("투표할 항목을 선택해주세요.");
          return;
        }

        // JSP: Ajax로 투표 제출
        // const voteIds = Array.from(selectedItems).map(item => item.dataset.id);
        // fetch('/api/vote', { method: 'POST', body: JSON.stringify({ votes: voteIds }) });

        alert("투표가 완료되었습니다.");
      });
    });

    // 의제 상세보기 (돋보기 버튼)
    document.querySelectorAll(".vote-search-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const itemId = btn.closest(".vote-item")?.dataset.id;
        // JSP: itemId로 의제 정보 조회 후 팝업 표시
        openPopup("infoPopup");
      });
    });
  }

  // ----------------------------------------
  // 파일 업로드 기능
  // ----------------------------------------
  function bindFileUploadEvent() {
    document.querySelectorAll(".file-input").forEach((input) => {
      input.addEventListener("change", function () {
        const previewId =
          this.getAttribute("onchange")?.match(/handleFileUpload\(this,\s*'([^']+)'\)/)?.[1] ||
          this.dataset.preview;

        if (previewId) {
          handleFileUpload(this, previewId);
        }
      });
    });
  }

  // ----------------------------------------
  // 검색 셀렉트 드롭다운
  // ----------------------------------------
  function bindSearchSelectEvent() {
    document.querySelectorAll(".search-select").forEach((select) => {
      const trigger = select.querySelector(".search-select-trigger");
      let dropdown = select.querySelector(".search-select-dropdown");
      const icon = select.querySelector(".search-select-icon");

      // 드롭다운이 없으면 자동 생성
      if (trigger && !dropdown) {
        dropdown = document.createElement("div");
        dropdown.className = "search-select-dropdown";
        dropdown.style.display = "none";
        dropdown.innerHTML = `
          <ul class="search-select-list">
            <li><button type="button" class="search-select-item active" data-value="title">제목</button></li>
            <li><button type="button" class="search-select-item" data-value="content">내용</button></li>
            <li><button type="button" class="search-select-item" data-value="author">작성자</button></li>
          </ul>
        `;
        select.appendChild(dropdown);
      }

      if (trigger && dropdown) {
        trigger.addEventListener("click", (e) => {
          e.stopPropagation();
          const isOpen = dropdown.style.display === "block";
          
          // 다른 드롭다운 닫기
          document.querySelectorAll(".search-select-dropdown").forEach((d) => {
            d.style.display = "none";
          });
          document.querySelectorAll(".search-select-icon").forEach((i) => {
            i.classList.remove("rotate");
          });
          
          // 현재 드롭다운 토글
          dropdown.style.display = isOpen ? "none" : "block";
          if (icon) icon.classList.toggle("rotate", !isOpen);
        });

        // 옵션 선택
        dropdown.querySelectorAll(".search-select-item").forEach((item) => {
          item.addEventListener("click", () => {
            const value = item.dataset.value;
            const text = item.textContent;

            trigger.querySelector("span").textContent = text;
            dropdown
              .querySelectorAll(".search-select-item")
              .forEach((i) => i.classList.remove("active"));
            item.classList.add("active");
            dropdown.style.display = "none";
            if (icon) icon.classList.remove("rotate");

            // hidden input 업데이트
            const hiddenInput = select.closest("form")?.querySelector('input[name="searchType"]');
            if (hiddenInput) hiddenInput.value = value;
          });
        });
      }
    });

    // 외부 클릭 시 검색 셀렉트 드롭다운 닫기
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-select")) {
        document.querySelectorAll(".search-select-dropdown").forEach((d) => {
          d.style.display = "none";
        });
        document.querySelectorAll(".search-select-icon").forEach((i) => {
          i.classList.remove("rotate");
        });
      }
    });
  }

  // ----------------------------------------
  // 폼 셀렉트 커스텀 드롭다운
  // ----------------------------------------
  function bindFormSelectEvent() {
    document.querySelectorAll(".form-select").forEach((select) => {
      // 이미 커스텀화 되었으면 스킵
      if (select.classList.contains("select-hidden")) return;

      // select 숨기기
      select.classList.add("select-hidden");
      select.style.display = "none";

      // 커스텀 셀렉트 wrapper 생성
      const wrapper = document.createElement("div");
      wrapper.className = "custom-select";

      // 선택된 값 표시 버튼
      const selectedOption = select.options[select.selectedIndex];
      const trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "custom-select-trigger";
      trigger.innerHTML = `
        <span>${selectedOption ? selectedOption.text : "선택하세요"}</span>
        <img src="/images/ic_select_gray.svg" alt="선택" class="custom-select-icon">
      `;

      // 드롭다운 생성
      const dropdown = document.createElement("div");
      dropdown.className = "custom-select-dropdown";
      dropdown.style.display = "none";

      const list = document.createElement("ul");
      list.className = "custom-select-list";

      // 옵션들 생성
      Array.from(select.options).forEach((option, index) => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "custom-select-item";
        btn.dataset.value = option.value;
        btn.textContent = option.text;
        
        if (index === select.selectedIndex) {
          btn.classList.add("active");
        }

        btn.addEventListener("click", () => {
          // 원본 select 업데이트
          select.value = option.value;
          select.dispatchEvent(new Event("change"));

          // 트리거 텍스트 변경
          trigger.querySelector("span").textContent = option.text;

          // active 클래스 변경
          list.querySelectorAll(".custom-select-item").forEach((i) => {
            i.classList.remove("active");
          });
          btn.classList.add("active");

          // 드롭다운 닫기
          dropdown.style.display = "none";
          trigger.querySelector(".custom-select-icon")?.classList.remove("rotate");
        });

        li.appendChild(btn);
        list.appendChild(li);
      });

      dropdown.appendChild(list);

      // 트리거 클릭 이벤트
      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = dropdown.style.display === "block";

        // 다른 드롭다운 닫기
        document.querySelectorAll(".custom-select-dropdown").forEach((d) => {
          d.style.display = "none";
        });
        document.querySelectorAll(".custom-select-icon").forEach((i) => {
          i.classList.remove("rotate");
        });

        // 현재 드롭다운 토글
        dropdown.style.display = isOpen ? "none" : "block";
        trigger.querySelector(".custom-select-icon")?.classList.toggle("rotate", !isOpen);
      });

      // wrapper에 추가
      wrapper.appendChild(trigger);
      wrapper.appendChild(dropdown);

      // select 뒤에 삽입
      select.parentNode.insertBefore(wrapper, select.nextSibling);
    });

    // 외부 클릭 시 폼 셀렉트 드롭다운 닫기
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".custom-select")) {
        document.querySelectorAll(".custom-select-dropdown").forEach((d) => {
          d.style.display = "none";
        });
        document.querySelectorAll(".custom-select-icon").forEach((i) => {
          i.classList.remove("rotate");
        });
      }
    });

    // 외부 클릭 시 닫기
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-select")) {
        document.querySelectorAll(".search-select-dropdown").forEach((d) => {
          d.style.display = "none";
        });
      }
    });
  }

  // ========================================
  // 탭 기능
  // ========================================
  function initTabs() {
    document.querySelectorAll(".tabs").forEach((tabContainer) => {
      const tabs = tabContainer.querySelectorAll(".tab-item");

      tabs.forEach((tab) => {
        tab.addEventListener("click", function () {
          // 같은 컨테이너 내 탭들만 처리
          tabs.forEach((t) => t.classList.remove("active"));
          this.classList.add("active");

          // 탭 변경 이벤트 발생
          const tabValue = this.dataset.tab || this.dataset.category;
          const event = new CustomEvent("tabChange", {
            detail: { tab: tabValue, container: tabContainer },
          });
          document.dispatchEvent(event);

          // JSP: 탭 변경 시 리스트 필터링 또는 페이지 이동
          // if (tabValue) {
          //   location.href = `?tab=${tabValue}`;
          // }
        });
      });
    });

    // 정렬 탭
    document.querySelectorAll(".sort-tabs .sort-tab").forEach((tab) => {
      tab.addEventListener("click", function () {
        document
          .querySelectorAll(".sort-tabs .sort-tab")
          .forEach((t) => t.classList.remove("active"));
        this.classList.add("active");

        const sortValue = this.dataset.sort;
        // JSP: 정렬 변경 시 리스트 재로딩
        // location.href = `?sort=${sortValue}`;
      });
    });
  }

  // ========================================
  // 카테고리별 필드 표시/숨김 (마을활동)
  // ========================================
  function initCategoryFields() {
    const categoryRadios = document.querySelectorAll('input[name="category"]');

    if (categoryRadios.length === 0) return;

    function updateCategoryFields(category) {
      // 모든 카테고리 필드 숨김
      document.querySelectorAll(".category-field").forEach((field) => {
        field.style.display = "none";
        field.querySelectorAll("input, textarea").forEach((input) => {
          input.removeAttribute("required");
        });
      });

      // 선택된 카테고리 필드 표시
      if (category === "minutes" || category === "activity") {
        document
          .querySelectorAll(".minutes-field, .activity-field")
          .forEach((field) => {
            field.style.display = "block";
            // 필수 필드 설정
            const requiredInputs = field.querySelectorAll(
              'input[name="activityDate"], input[name="location"]'
            );
            requiredInputs.forEach((input) => {
              input.setAttribute("required", "required");
            });
          });
      }
      // notice는 기본 필드만 표시
    }

    categoryRadios.forEach((radio) => {
      radio.addEventListener("change", function () {
        updateCategoryFields(this.value);
      });
    });

    // 초기화: 체크된 라디오 버튼 기준으로 필드 표시
    const checkedRadio = document.querySelector('input[name="category"]:checked');
    if (checkedRadio) {
      updateCategoryFields(checkedRadio.value);
    }
  }

  // ========================================
  // 전역 함수 (HTML에서 직접 호출용)
  // ========================================

  // 검색 셀렉트 토글 (HTML onclick용)
  window.toggleSearchSelect = function (trigger) {
    const select = trigger.closest(".search-select");
    const dropdown = select?.querySelector(".search-select-dropdown");
    const icon = select?.querySelector(".search-select-icon");

    if (!dropdown) return;

    const isOpen = dropdown.style.display === "block";

    // 다른 드롭다운 닫기
    document.querySelectorAll(".search-select-dropdown").forEach((d) => {
      d.style.display = "none";
    });
    document.querySelectorAll(".search-select-icon").forEach((i) => {
      i.classList.remove("rotate");
    });

    // 현재 드롭다운 토글
    dropdown.style.display = isOpen ? "none" : "block";
    if (icon) icon.classList.toggle("rotate", !isOpen);
  };

  // 검색 옵션 선택 (HTML onclick용)
  window.selectSearchOption = function (item, label) {
    const select = item.closest(".search-select");
    const triggerText = select?.querySelector(".search-select-trigger span");
    const dropdown = select?.querySelector(".search-select-dropdown");
    const icon = select?.querySelector(".search-select-icon");

    // 텍스트 변경
    if (triggerText) triggerText.textContent = label;

    // active 클래스 변경
    select?.querySelectorAll(".search-select-item").forEach((i) => {
      i.classList.remove("active");
    });
    item.classList.add("active");

    // 드롭다운 닫기
    if (dropdown) dropdown.style.display = "none";
    if (icon) icon.classList.remove("rotate");
  };

  // 팝업 열기
  window.openPopup = function (popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
      popup.style.display = "flex";
      document.body.style.overflow = "hidden";
    }
  };

  // 팝업 닫기
  window.closePopup = function (popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
      popup.style.display = "none";
      document.body.style.overflow = "";
    }
  };

  // 더보기 메뉴 토글
  window.toggleMoreMenu = function (btn) {
    const dropdown = btn.nextElementSibling;
    if (dropdown) {
      dropdown.style.display =
        dropdown.style.display === "none" ? "block" : "none";
    }
  };

  // 좋아요 토글
  window.toggleLike = function () {
    const likeBtn = document.getElementById("likeBtn");
    const likeCountEl = document.getElementById("likeCount");

    if (!likeBtn || !likeCountEl) return;

    const isLiked = likeBtn.classList.contains("active");
    let count = parseInt(likeCountEl.textContent) || 0;

    if (isLiked) {
      count--;
      likeBtn.classList.remove("active");
    } else {
      count++;
      likeBtn.classList.add("active");
    }

    likeCountEl.textContent = count;
  };

  // 댓글 등록 버튼 활성화
  window.toggleSubmitBtn = function () {
    const input = document.getElementById("commentInput");
    const btn = document.getElementById("commentSubmitBtn");

    if (input && btn) {
      btn.classList.toggle("active", input.value.trim() !== "");
    }
  };

  // 댓글 등록
  window.submitComment = function () {
    const input = document.getElementById("commentInput");
    const content = input?.value.trim();

    if (!content) return;

    alert("댓글이 등록되었습니다.");
    if (input) {
      input.value = "";
      window.toggleSubmitBtn();
    }
  };

  // 댓글 더보기/접기
  window.toggleComments = function () {
    const btn = document.getElementById("commentMoreBtn");
    const list = document.getElementById("commentList");

    if (!btn || !list) return;

    const items = list.querySelectorAll(".comment-item");
    const showAll = btn.textContent.includes("접기");
    const maxVisible = 4;

    items.forEach((item, index) => {
      if (index >= maxVisible) {
        item.style.display = showAll ? "none" : "block";
      }
    });

    const hiddenCount = items.length - maxVisible;
    btn.textContent = showAll ? `더보기 (${hiddenCount})` : "접기";
  };

  // 투표 선택
  window.selectVote = function (element) {
    element.classList.toggle("selected");
    const checkbox = element.querySelector(".vote-checkbox");
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
    }
  };

  // 투표 제출
  window.submitVote = function () {
    const selected = document.querySelectorAll(".vote-item.selected");
    if (selected.length === 0) {
      alert("투표할 항목을 선택해주세요.");
      return;
    }

    alert("투표가 완료되었습니다.");
  };

  // 정보 팝업 열기
  window.openInfoPopup = function (event, itemId) {
    if (event) event.stopPropagation();
    // JSP: itemId로 데이터 조회 후 팝업 내용 업데이트
    openPopup("infoPopup");
  };

  // 파일 업로드 처리
  window.handleFileUpload = function (input, previewId) {
    const preview = document.getElementById(previewId);
    if (!preview) return;

    const files = input.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const item = document.createElement("div");
      item.className = "file-preview-item";

      // 이미지인 경우
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          item.innerHTML = `
            <img src="${e.target.result}" alt="${file.name}" class="preview-image">
            <span class="preview-name">${file.name}</span>
            <button type="button" class="preview-remove-btn" onclick="removePreview(this)">
              <img src="/images/ic_close.svg" alt="삭제">
            </button>
          `;
          preview.appendChild(item);
        };
        reader.readAsDataURL(file);
      } else {
        // 문서인 경우
        item.innerHTML = `
          <img src="/images/ic_document.svg" alt="문서" class="preview-doc-icon">
          <span class="preview-name">${file.name}</span>
          <button type="button" class="preview-remove-btn" onclick="removePreview(this)">
            <img src="/images/ic_close.svg" alt="삭제">
          </button>
        `;
        preview.appendChild(item);
      }
    }
  };

  // 미리보기 삭제
  window.removePreview = function (btn) {
    btn.closest(".file-preview-item")?.remove();
  };

  // 투표 항목 추가
  let voteItemIndex = 1;
  window.addVoteItem = function () {
    voteItemIndex++;
    const manager = document.getElementById("voteItemsManager");
    if (!manager) return;

    const row = document.createElement("div");
    row.className = "vote-item-row";
    row.dataset.index = voteItemIndex;
    row.innerHTML = `
      <div class="vote-item-input-wrap">
        <span class="vote-item-num">${voteItemIndex}</span>
        <input type="text" class="form-input" name="voteItem[]" placeholder="투표 항목을 입력하세요">
      </div>
      <div class="vote-item-actions">
        <div class="vote-item-image-upload">
          <input type="file" id="vote-img-${voteItemIndex}" class="file-input" accept="image/*">
          <label for="vote-img-${voteItemIndex}" class="btn btn-outline btn-sm">
            <img src="/images/ic_camera.svg" alt="이미지">
          </label>
        </div>
        <button type="button" class="btn btn-icon btn-danger" onclick="removeVoteItem(this)">
          <img src="/images/ic_delete.svg" alt="삭제">
        </button>
      </div>
    `;
    manager.appendChild(row);
    updateVoteItemNumbers();
    updateMaxSelectOptions();
  };

  // 투표 항목 삭제
  window.removeVoteItem = function (btn) {
    const manager = document.getElementById("voteItemsManager");
    if (!manager || manager.children.length <= 1) return;

    btn.closest(".vote-item-row")?.remove();
    updateVoteItemNumbers();
    updateMaxSelectOptions();
  };

  // 투표 항목 번호 업데이트
  function updateVoteItemNumbers() {
    const rows = document.querySelectorAll("#voteItemsManager .vote-item-row");
    rows.forEach((row, index) => {
      const num = row.querySelector(".vote-item-num");
      if (num) num.textContent = index + 1;
    });
  }

  // 최대 선택 수 옵션 업데이트
  function updateMaxSelectOptions() {
    const select = document.querySelector('select[name="maxSelectCount"]');
    const rows = document.querySelectorAll("#voteItemsManager .vote-item-row");

    if (!select) return;

    const currentValue = parseInt(select.value) || 1;
    const maxCount = rows.length;

    select.innerHTML = "";
    for (let i = 1; i <= maxCount; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = `${i}개`;
      if (i === Math.min(currentValue, maxCount)) {
        option.selected = true;
      }
      select.appendChild(option);
    }
  }

  // 별점 항목 추가
  let ratingItemIndex = 1;
  window.addRatingItem = function () {
    ratingItemIndex++;
    const manager = document.getElementById("ratingItemsManager");
    if (!manager) return;

    const row = document.createElement("div");
    row.className = "vote-item-row";
    row.innerHTML = `
      <div class="vote-item-input-wrap">
        <span class="vote-item-num">${ratingItemIndex}</span>
        <input type="text" class="form-input" name="ratingItem[]" placeholder="평가 항목을 입력하세요">
      </div>
      <div class="vote-item-actions">
        <button type="button" class="btn btn-icon btn-danger" onclick="removeRatingItem(this)">
          <img src="/images/ic_delete.svg" alt="삭제">
        </button>
      </div>
    `;
    manager.appendChild(row);
  };

  // 별점 항목 삭제
  window.removeRatingItem = function (btn) {
    const manager = document.getElementById("ratingItemsManager");
    if (!manager || manager.children.length <= 1) return;

    btn.closest(".vote-item-row")?.remove();
  };

  // 투표 유형 전환
  window.toggleVoteType = function (type) {
    const selectItems = document.getElementById("selectVoteItems");
    const ratingItems = document.getElementById("ratingVoteItems");
    const maxSelectGroup = document.getElementById("maxSelectGroup");

    if (type === "select") {
      if (selectItems) selectItems.style.display = "block";
      if (maxSelectGroup) maxSelectGroup.style.display = "block";
      if (ratingItems) ratingItems.style.display = "none";
    } else {
      if (selectItems) selectItems.style.display = "none";
      if (maxSelectGroup) maxSelectGroup.style.display = "none";
      if (ratingItems) ratingItems.style.display = "block";
    }
  };

  // 카테고리 필드 전환 (마을활동)
  window.toggleCategoryFields = function (category) {
    document.querySelectorAll(".category-field").forEach((field) => {
      field.style.display = "none";
      field.querySelectorAll("input, textarea").forEach((input) => {
        input.removeAttribute("required");
      });
    });

    if (category === "minutes" || category === "activity") {
      document
        .querySelectorAll(".minutes-field, .activity-field")
        .forEach((field) => {
          field.style.display = "block";
          const requiredInputs = field.querySelectorAll(
            'input[name="activityDate"], input[name="location"]'
          );
          requiredInputs.forEach((input) => {
            input.setAttribute("required", "required");
          });
        });
    }
  };

  // 페이지 이동: 목록으로
  window.goToList = function () {
    const detailSection = document.getElementById("detailSection");
    const listSection = document.getElementById("listSection");

    if (detailSection) detailSection.style.display = "none";
    if (listSection) listSection.style.display = "block";

    window.scrollTo(0, 0);
  };

  // 페이지 이동: 상세로
  window.goToDetail = function (id) {
    const listSection = document.getElementById("listSection");
    const detailSection = document.getElementById("detailSection");

    if (listSection) listSection.style.display = "none";
    if (detailSection) detailSection.style.display = "block";

    window.scrollTo(0, 0);

    // JSP: id로 상세 데이터 로드
    // loadDetailData(id);
  };

  // 관리 기능
  window.editArticle = function () {
    alert("수정 기능");
  };

  window.deleteArticle = function () {
    if (confirm("정말 삭제하시겠습니까?")) {
      alert("삭제되었습니다.");
      goToList();
    }
  };

  window.editVote = function () {
    alert("수정 기능");
  };

  window.deleteVote = function () {
    if (confirm("삭제하시겠습니까?")) {
      alert("삭제되었습니다.");
      goToList();
    }
  };

  window.pauseVote = function () {
    if (confirm("투표를 중지하시겠습니까?")) {
      alert("투표가 중지되었습니다.");
    }
  };

  window.endVote = function () {
    if (confirm("투표를 종료하시겠습니까?")) {
      alert("투표가 종료되었습니다.");
    }
  };

  window.editActivity = function () {
    alert("수정 기능");
  };

  window.deleteActivity = function () {
    if (confirm("삭제하시겠습니까?")) {
      alert("삭제되었습니다.");
      goToList();
    }
  };

  // 공유 기능
  window.shareArticle = function () {
    if (navigator.share) {
      navigator.share({
        title: document.querySelector(".detail-title")?.textContent || "",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("링크가 복사되었습니다.");
    }
  };

  window.shareVote = function () {
    navigator.clipboard.writeText(window.location.href);
    alert("링크가 복사되었습니다.");
  };

  window.shareActivity = function () {
    navigator.clipboard.writeText(window.location.href);
    alert("링크가 복사되었습니다.");
  };

  // 폼 제출
  window.submitAgendaForm = function (event) {
    event.preventDefault();
    alert("마을의제가 등록되었습니다.");
    closePopup("agendaPopup");
    return false;
  };

  window.submitVoteForm = function (event) {
    event.preventDefault();
    alert("투표가 등록되었습니다.");
    closePopup("votePopup");
    return false;
  };

  window.submitActivityForm = function (event) {
    event.preventDefault();
    alert("마을활동이 등록되었습니다.");
    closePopup("activityPopup");
    return false;
  };

  // 초기화 실행
  init();
});

