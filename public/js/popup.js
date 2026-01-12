/**
 * 팝업 전용 스크립트
 * ==================
 * - 팝업 열기/닫기
 * - 폼 유효성 검사
 * - 파일 업로드
 * - 투표 항목 관리
 * - 폼 제출
 */

(function() {
  'use strict';

  // ========================================
  // 전역 상태 관리
  // ========================================
  var PopupState = {
    voteItemCounter: 1,
    ratingItemCounter: 1,
    currentCategory: '회의록'
  };

  // ========================================
  // 팝업 열기/닫기
  // ========================================
  
  function openPopup(popupId) {
    var popup = document.getElementById(popupId);
    if (popup) {
      popup.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  function closePopup(popupId) {
    // popupId가 있으면 해당 팝업만, 없으면 부모창/현재창 닫기
    if (popupId) {
      var popup = document.getElementById(popupId);
      if (popup) {
        popup.style.display = 'none';
        document.body.style.overflow = '';
      }
    } else {
      // 단독 팝업 페이지인 경우
      if (window.opener) {
        window.close();
      } else if (window.parent !== window) {
        window.parent.postMessage({ action: 'closePopup' }, '*');
      } else {
        history.back();
      }
    }
  }

  // ========================================
  // 폼 유효성 검사
  // ========================================
  
  function validateForm(formId) {
    var form = document.getElementById(formId);
    if (!form) return false;

    var requiredGroups = form.querySelectorAll('[data-required="true"]');
    var isValid = true;

    requiredGroups.forEach(function(group) {
      var input = group.querySelector('input:not([type="radio"]):not([type="checkbox"]), textarea, select');
      var errorMsg = group.querySelector('.form-error');

      if (input && !input.value.trim()) {
        group.classList.add('error');
        if (input) input.classList.add('error');
        if (errorMsg) errorMsg.style.display = 'block';
        isValid = false;
      } else {
        group.classList.remove('error');
        if (input) input.classList.remove('error');
        if (errorMsg) errorMsg.style.display = 'none';
      }
    });

    return isValid;
  }

  function initErrorClear() {
    document.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(function(input) {
      function clearError() {
        var group = this.closest('.form-group');
        if (group) {
          group.classList.remove('error');
          this.classList.remove('error');
          var errorMsg = group.querySelector('.form-error');
          if (errorMsg) errorMsg.style.display = 'none';
        }
      }
      input.addEventListener('input', clearError);
      input.addEventListener('change', clearError);
    });
  }

  // ========================================
  // 파일 업로드
  // ========================================
  
  function handleImageUpload(event, previewContainerId) {
    var files = event.target.files;
    var previewContainer = document.getElementById(previewContainerId);

    if (!files || files.length === 0 || !previewContainer) return;

    Array.from(files).forEach(function(file) {
      var reader = new FileReader();
      var fileId = Date.now() + Math.random();

      reader.onload = function(e) {
        var previewItem = document.createElement('div');
        previewItem.className = 'file-preview-item';
        previewItem.dataset.fileId = fileId;
        previewItem.innerHTML =
          '<img src="' + e.target.result + '" alt="' + file.name + '" class="preview-image">' +
          '<span class="preview-name">' + file.name + '</span>' +
          '<button type="button" class="preview-remove-btn">' +
          '<img src="/images/ic_close.svg" alt="삭제">' +
          '</button>';

        var removeBtn = previewItem.querySelector('.preview-remove-btn');
        if (removeBtn) {
          removeBtn.addEventListener('click', function() {
            previewItem.remove();
          });
        }

        previewContainer.appendChild(previewItem);
      };

      reader.readAsDataURL(file);
    });

    event.target.value = '';
  }

  function handleDocUpload(event, previewContainerId) {
    var files = event.target.files;
    var previewContainer = document.getElementById(previewContainerId);

    if (!files || files.length === 0 || !previewContainer) return;

    Array.from(files).forEach(function(file) {
      var fileId = Date.now() + Math.random();

      var previewItem = document.createElement('div');
      previewItem.className = 'file-preview-item file-preview-doc';
      previewItem.dataset.fileId = fileId;
      previewItem.innerHTML =
        '<img src="/images/ic_document.svg" alt="문서" class="preview-doc-icon">' +
        '<span class="preview-name">' + file.name + '</span>' +
        '<button type="button" class="preview-remove-btn">' +
        '<img src="/images/ic_close.svg" alt="삭제">' +
        '</button>';

      var removeBtn = previewItem.querySelector('.preview-remove-btn');
      if (removeBtn) {
        removeBtn.addEventListener('click', function() {
          previewItem.remove();
        });
      }

      previewContainer.appendChild(previewItem);
    });

    event.target.value = '';
  }

  function removePreviewFile(btn) {
    var item = btn.closest('.file-preview-item');
    if (item) item.remove();
  }

  // 드래그 앤 드롭
  function initDragDrop(uploadAreaId, inputId, type) {
    var uploadArea = document.getElementById(uploadAreaId);
    var input = document.getElementById(inputId);

    if (!uploadArea || !input) return;

    uploadArea.addEventListener('dragover', function(e) {
      e.preventDefault();
      this.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', function(e) {
      e.preventDefault();
      this.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', function(e) {
      e.preventDefault();
      this.classList.remove('dragover');

      var files = e.dataTransfer.files;
      var validFiles;

      if (type === 'image') {
        validFiles = Array.from(files).filter(function(file) {
          return file.type.startsWith('image/');
        });
      } else {
        var extensions = ['.pdf', '.doc', '.docx', '.hwp', '.xlsx', '.xls'];
        validFiles = Array.from(files).filter(function(file) {
          var ext = '.' + file.name.split('.').pop().toLowerCase();
          return extensions.indexOf(ext) !== -1;
        });
      }

      if (validFiles.length > 0) {
        var dt = new DataTransfer();
        validFiles.forEach(function(file) {
          dt.items.add(file);
        });
        input.files = dt.files;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  }

  // ========================================
  // 투표 항목 관리
  // ========================================
  
  function changeVoteType(type) {
    var selectSection = document.getElementById('selectTypeSection');
    var ratingSection = document.getElementById('ratingTypeSection');

    if (!selectSection || !ratingSection) return;

    if (type === 'select') {
      selectSection.style.display = 'block';
      ratingSection.style.display = 'none';
    } else {
      selectSection.style.display = 'none';
      ratingSection.style.display = 'block';
    }
  }

  function addVoteItem() {
    PopupState.voteItemCounter++;
    var container = document.getElementById('voteItemsContainer');
    if (!container) return;

    var count = container.querySelectorAll('.vote-item-row').length;

    var newItem = document.createElement('div');
    newItem.className = 'vote-item-row';
    newItem.dataset.itemId = PopupState.voteItemCounter;
    newItem.innerHTML =
      '<div class="vote-item-input-wrap">' +
      '<span class="vote-item-num">' + (count + 1) + '</span>' +
      '<input type="text" class="form-input" name="voteItem[]" placeholder="투표 항목을 입력하세요">' +
      '</div>' +
      '<div class="vote-item-actions">' +
      '<div class="vote-item-image-upload">' +
      '<input type="file" id="vote-img-' + PopupState.voteItemCounter + '" class="file-input" accept="image/*">' +
      '<label for="vote-img-' + PopupState.voteItemCounter + '" class="btn btn-outline btn-sm">' +
      '<img src="/images/ic_camera.svg" alt="이미지">' +
      '</label>' +
      '</div>' +
      '<button type="button" class="btn btn-icon btn-danger vote-item-delete">' +
      '<img src="/images/ic_delete.svg" alt="삭제">' +
      '</button>' +
      '</div>';

    newItem.querySelector('.vote-item-delete').addEventListener('click', function() {
      removeVoteItem(this);
    });

    container.appendChild(newItem);
    updateVoteItemNumbers();
    updateMaxSelectOptions();
  }

  function removeVoteItem(btn) {
    var container = document.getElementById('voteItemsContainer');
    if (!container) return;

    var items = container.querySelectorAll('.vote-item-row');
    if (items.length > 1) {
      btn.closest('.vote-item-row').remove();
      updateVoteItemNumbers();
      updateMaxSelectOptions();
    } else {
      alert('최소 1개 이상의 항목이 필요합니다.');
    }
  }

  function addRatingItem() {
    PopupState.ratingItemCounter++;
    var container = document.getElementById('ratingItemsContainer');
    if (!container) return;

    var count = container.querySelectorAll('.vote-item-row').length;

    var newItem = document.createElement('div');
    newItem.className = 'vote-item-row';
    newItem.dataset.itemId = PopupState.ratingItemCounter;
    newItem.innerHTML =
      '<span class="vote-item-num">' + (count + 1) + '</span>' +
      '<input type="text" class="form-input" name="ratingItem[]" placeholder="평가 항목을 입력하세요 (예: 프로그램 만족도)">' +
      '<button type="button" class="btn btn-icon btn-danger rating-item-delete">' +
      '<img src="/images/ic_delete.svg" alt="삭제">' +
      '</button>';

    newItem.querySelector('.rating-item-delete').addEventListener('click', function() {
      removeRatingItem(this);
    });

    container.appendChild(newItem);
    updateRatingItemNumbers();
  }

  function removeRatingItem(btn) {
    var container = document.getElementById('ratingItemsContainer');
    if (!container) return;

    var items = container.querySelectorAll('.vote-item-row');
    if (items.length > 1) {
      btn.closest('.vote-item-row').remove();
      updateRatingItemNumbers();
    } else {
      alert('최소 1개 이상의 항목이 필요합니다.');
    }
  }

  function updateVoteItemNumbers() {
    var items = document.querySelectorAll('#voteItemsContainer .vote-item-row');
    items.forEach(function(item, index) {
      var numEl = item.querySelector('.vote-item-num');
      if (numEl) numEl.textContent = index + 1;
    });
  }

  function updateRatingItemNumbers() {
    var items = document.querySelectorAll('#ratingItemsContainer .vote-item-row');
    items.forEach(function(item, index) {
      var numEl = item.querySelector('.vote-item-num');
      if (numEl) numEl.textContent = index + 1;
    });
  }

  function updateMaxSelectOptions() {
    var container = document.getElementById('voteItemsContainer');
    var dropdown = document.getElementById('maxSelectDropdown');
    var totalCount = document.getElementById('totalItemCount');

    if (!container) return;

    var count = container.querySelectorAll('.vote-item-row').length;

    if (dropdown) {
      dropdown.innerHTML = '';
      for (var i = 1; i <= count; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.textContent = i + '개';
        dropdown.appendChild(option);
      }
    }

    if (totalCount) {
      totalCount.textContent = count;
    }
  }

  function toggleMaxSelectInput(show) {
    var inputWrap = document.getElementById('maxSelectInputWrap');
    if (inputWrap) {
      inputWrap.style.display = show ? 'flex' : 'none';
    }
  }

  // ========================================
  // 카테고리 관리 (마을활동)
  // ========================================
  
  function changeCategory(category) {
    PopupState.currentCategory = category;
    var linkField = document.getElementById('linkField');

    if (linkField) {
      linkField.style.display = (category === '모임공지') ? 'none' : 'block';
    }
  }

  function getCurrentCategory() {
    return PopupState.currentCategory;
  }

  // ========================================
  // 폼 제출
  // ========================================
  
  function submitAgendaForm() {
    if (!validateForm('agendaForm')) {
      alert('필수 입력 항목을 확인해주세요.');
      return;
    }

    var form = document.getElementById('agendaForm');
    var formData = new FormData(form);

    // AJAX 전송
    // fetch('/api/agenda/register', { method: 'POST', body: formData });

    alert('마을의제가 등록되었습니다.');
    closePopup();
  }

  function submitVoteForm() {
    if (!validateForm('voteForm')) {
      alert('필수 입력 항목을 확인해주세요.');
      return;
    }

    // 투표 항목 검사
    var form = document.getElementById('voteForm');
    var voteTypeEl = form.querySelector('input[name="voteType"]:checked');
    var voteType = voteTypeEl ? voteTypeEl.value : 'select';

    if (voteType === 'select') {
      var voteItems = document.querySelectorAll('#voteItemsContainer input[name="voteItem[]"]');
      var hasValidItem = false;
      voteItems.forEach(function(input) {
        if (input.value.trim()) hasValidItem = true;
      });
      if (!hasValidItem) {
        alert('최소 1개 이상의 투표 항목을 입력해주세요.');
        return;
      }
    } else {
      var ratingItems = document.querySelectorAll('#ratingItemsContainer input[name="ratingItem[]"]');
      var hasValidItem = false;
      ratingItems.forEach(function(input) {
        if (input.value.trim()) hasValidItem = true;
      });
      if (!hasValidItem) {
        alert('최소 1개 이상의 평가 항목을 입력해주세요.');
        return;
      }
    }

    var formData = new FormData(form);

    // AJAX 전송
    // fetch('/api/vote/register', { method: 'POST', body: formData });

    alert('마을총회 투표가 등록되었습니다.');
    closePopup();
  }

  function submitActivityForm() {
    if (!validateForm('activityForm')) {
      alert('필수 입력 항목을 확인해주세요.');
      return;
    }

    var form = document.getElementById('activityForm');
    var formData = new FormData(form);
    formData.set('category', getCurrentCategory());

    // AJAX 전송
    // fetch('/api/activity/register', { method: 'POST', body: formData });

    alert('마을활동이 등록되었습니다.');
    closePopup();
  }

  // ========================================
  // 팝업별 초기화
  // ========================================
  
  function initAgendaPopup() {
    var closeBtn = document.querySelector('.popup-close-btn');
    var cancelBtn = document.querySelector('.btn-secondary');
    var submitBtn = document.querySelector('.btn-primary');

    if (closeBtn) closeBtn.addEventListener('click', function() { closePopup(); });
    if (cancelBtn) cancelBtn.addEventListener('click', function() { closePopup(); });
    if (submitBtn) submitBtn.addEventListener('click', submitAgendaForm);

    var photoUpload = document.getElementById('photoUpload');
    if (photoUpload) {
      photoUpload.addEventListener('change', function(e) {
        handleImageUpload(e, 'agendaImagePreview');
      });
    }

    initDragDrop('photoUploadArea', 'photoUpload', 'image');
  }

  function initVotePopup() {
    var closeBtn = document.querySelector('.popup-close-btn');
    var cancelBtn = document.querySelector('.btn-secondary');
    var submitBtn = document.querySelector('.btn-primary');

    if (closeBtn) closeBtn.addEventListener('click', function() { closePopup(); });
    if (cancelBtn) cancelBtn.addEventListener('click', function() { closePopup(); });
    if (submitBtn) submitBtn.addEventListener('click', submitVoteForm);

    // 투표 유형 라디오
    document.querySelectorAll('input[name="voteType"]').forEach(function(radio) {
      radio.addEventListener('change', function() {
        changeVoteType(this.value);
      });
    });

    // 최대 선택 수 라디오
    document.querySelectorAll('input[name="maxSelect"]').forEach(function(radio) {
      radio.addEventListener('change', function() {
        toggleMaxSelectInput(this.value === 'custom');
      });
    });

    // 투표 항목 추가 버튼
    var selectSection = document.getElementById('selectTypeSection');
    if (selectSection) {
      var voteAddBtn = selectSection.querySelector('.btn-add');
      if (voteAddBtn) {
        voteAddBtn.addEventListener('click', addVoteItem);
      }
    }

    // 평가 항목 추가 버튼
    var ratingSection = document.getElementById('ratingTypeSection');
    if (ratingSection) {
      var ratingAddBtn = ratingSection.querySelector('.btn-add');
      if (ratingAddBtn) {
        ratingAddBtn.addEventListener('click', addRatingItem);
      }
    }

    // 초기 삭제 버튼 이벤트
    document.querySelectorAll('#voteItemsContainer .btn-danger').forEach(function(btn) {
      btn.addEventListener('click', function() {
        removeVoteItem(this);
      });
    });

    document.querySelectorAll('#ratingItemsContainer .btn-danger').forEach(function(btn) {
      btn.addEventListener('click', function() {
        removeRatingItem(this);
      });
    });

    updateMaxSelectOptions();
  }

  function initActivityPopup() {
    var closeBtn = document.querySelector('.popup-close-btn');
    var cancelBtn = document.querySelector('.btn-secondary');
    var submitBtn = document.querySelector('.btn-primary');

    if (closeBtn) closeBtn.addEventListener('click', function() { closePopup(); });
    if (cancelBtn) cancelBtn.addEventListener('click', function() { closePopup(); });
    if (submitBtn) submitBtn.addEventListener('click', submitActivityForm);

    // 카테고리 라디오
    document.querySelectorAll('input[name="category"]').forEach(function(radio) {
      radio.addEventListener('change', function() {
        changeCategory(this.value);
      });
    });

    // 문서 업로드
    var docUpload = document.getElementById('docUpload');
    if (docUpload) {
      docUpload.addEventListener('change', function(e) {
        handleDocUpload(e, 'docPreview');
      });
    }

    // 이미지 업로드
    var imgUpload = document.getElementById('imgUpload');
    if (imgUpload) {
      imgUpload.addEventListener('change', function(e) {
        handleImageUpload(e, 'imgPreview');
      });
    }

    initDragDrop('docUploadArea', 'docUpload', 'document');
    initDragDrop('imgUploadArea', 'imgUpload', 'image');
  }

  // ========================================
  // 메인 초기화
  // ========================================
  
  function initPopup() {
    // ESC 키로 닫기
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closePopup();
      }
    });

    // 에러 클리어 초기화
    initErrorClear();

    // 팝업 유형에 따라 초기화
    if (document.getElementById('agendaRegisterPopup')) {
      initAgendaPopup();
    } else if (document.getElementById('voteRegisterPopup')) {
      initVotePopup();
    } else if (document.getElementById('activityRegisterPopup')) {
      initActivityPopup();
    }
  }

  // ========================================
  // 전역 함수 노출 (HTML에서 호출용)
  // ========================================
  window.openPopup = openPopup;
  window.closePopup = closePopup;
  window.validateForm = validateForm;
  window.handleImageUpload = handleImageUpload;
  window.handleDocUpload = handleDocUpload;
  window.removePreviewFile = removePreviewFile;
  window.changeVoteType = changeVoteType;
  window.addVoteItem = addVoteItem;
  window.removeVoteItem = removeVoteItem;
  window.addRatingItem = addRatingItem;
  window.removeRatingItem = removeRatingItem;
  window.toggleMaxSelectInput = toggleMaxSelectInput;
  window.changeCategory = changeCategory;
  window.getCurrentCategory = getCurrentCategory;
  window.submitAgendaForm = submitAgendaForm;
  window.submitVoteForm = submitVoteForm;
  window.submitActivityForm = submitActivityForm;

  // DOM 로드 시 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPopup);
  } else {
    initPopup();
  }

})();
