'use client';

import { useState } from 'react';

/* 파일 타입 정의 */
interface UploadedFile {
  id: number;
  name: string;
  url: string;
  type: 'image' | 'document';
}

export default function PopupPage() {
  /* 마을 선택 */
  const [selectedVillage, setSelectedVillage] = useState('');
  
  /* 카테고리 선택 (마을활동용) */
  const [selectedCategory, setSelectedCategory] = useState('회의록');
  
  /* 투표 유형 선택 */
  const [voteType, setVoteType] = useState('select'); // select, rating
  
  /* 투표 항목 리스트 */
  const [voteItems, setVoteItems] = useState([
    { id: 1, title: '', image: null },
  ]);
  
  /* 별점 항목 리스트 */
  const [ratingItems, setRatingItems] = useState([
    { id: 1, title: '' },
  ]);

  /* 최대 선택 수 (0 = 제한없음) */
  const [maxSelect, setMaxSelect] = useState(0);

  /* 마을의제 사진 첨부 */
  const [agendaImages, setAgendaImages] = useState<UploadedFile[]>([]);

  /* 마을활동 문서 첨부 */
  const [activityDocs, setActivityDocs] = useState<UploadedFile[]>([]);

  /* 마을활동 이미지 첨부 */
  const [activityImages, setActivityImages] = useState<UploadedFile[]>([]);

  /* 투표 항목 추가 */
  const addVoteItem = () => {
    setVoteItems([...voteItems, { id: Date.now(), title: '', image: null }]);
  };

  /* 투표 항목 삭제 */
  const removeVoteItem = (id: number) => {
    if (voteItems.length > 1) {
      setVoteItems(voteItems.filter(item => item.id !== id));
    }
  };

  /* 별점 항목 추가 */
  const addRatingItem = () => {
    setRatingItems([...ratingItems, { id: Date.now(), title: '' }]);
  };

  /* 별점 항목 삭제 */
  const removeRatingItem = (id: number) => {
    if (ratingItems.length > 1) {
      setRatingItems(ratingItems.filter(item => item.id !== id));
    }
  };

  /* 파일 업로드 핸들러 */
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>,
    type: 'image' | 'document'
  ) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: UploadedFile[] = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
      type,
    }));

    setFiles(prev => [...prev, ...newFiles]);
    e.target.value = ''; // 같은 파일 재선택 가능하게
  };

  /* 파일 삭제 핸들러 */
  const handleFileRemove = (
    id: number,
    setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>
  ) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  return (
    <div className="popup-layout-page">

      {/* ========== 1. 마을의제 등록 폼 ========== */}
      <section className="popup-section">
        <h2 className="section-title">1. 마을의제 등록</h2>
        <div className="popup-container">
          <div className="popup-overlay"></div>
          <div className="popup-content">
            <div className="popup-header">
              <h3 className="popup-title">마을의제 등록</h3>
              <button type="button" className="popup-close-btn">
                <img src="/images/ic_close.svg" alt="닫기" />
              </button>
            </div>
            
            <div className="popup-body">
              {/* 마을 선택 */}
              <div className="form-group">
                <label className="form-label">마을 선택 <span className="required">*</span></label>
                <select className="form-select" value={selectedVillage} onChange={(e) => setSelectedVillage(e.target.value)}>
                  <option value="">마을을 선택하세요</option>
                  <option value="진월마을">진월마을</option>
                  <option value="봉선마을">봉선마을</option>
                  <option value="주월마을">주월마을</option>
                </select>
              </div>

              {/* 제목 */}
              <div className="form-group">
                <label className="form-label">제목 <span className="required">*</span></label>
                <input type="text" className="form-input" placeholder="제목을 입력하세요" />
              </div>

              {/* 내용 */}
              <div className="form-group">
                <label className="form-label">내용 <span className="required">*</span></label>
                <textarea className="form-textarea" placeholder="내용을 입력하세요" rows={6}></textarea>
              </div>

              {/* 사진 첨부 */}
              <div className="form-group">
                <label className="form-label">사진 첨부</label>
                <div className="file-upload-area">
                  <input 
                    type="file" 
                    id="photo-upload-1" 
                    className="file-input" 
                    accept="image/*" 
                    multiple 
                    onChange={(e) => handleFileUpload(e, setAgendaImages, 'image')}
                  />
                  <label htmlFor="photo-upload-1" className="file-upload-label">
                    <img src="/images/ic_camera.svg" alt="사진" className="upload-icon" />
                    <span>이미지를 드래그하거나 클릭하여 업로드</span>
                    <span className="upload-hint">JPG, PNG, GIF (최대 10MB)</span>
                  </label>
                </div>
                {agendaImages.length > 0 && (
                  <div className="file-preview-list">
                    {agendaImages.map(file => (
                      <div key={file.id} className="file-preview-item">
                        <img src={file.url} alt={file.name} className="preview-image" />
                        <span className="preview-name">{file.name}</span>
                        <button 
                          type="button" 
                          className="preview-remove-btn"
                          onClick={() => handleFileRemove(file.id, setAgendaImages)}
                        >
                          <img src="/images/ic_close.svg" alt="삭제" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="popup-footer">
              <button type="button" className="btn btn-secondary">취소</button>
              <button type="button" className="btn btn-primary">등록</button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 2. 마을총회(투표) 등록 폼 ========== */}
      <section className="popup-section">
        <h2 className="section-title">2. 마을총회(투표) 등록</h2>
        <div className="popup-container">
          <div className="popup-overlay"></div>
          <div className="popup-content popup-content-lg">
            <div className="popup-header">
              <h3 className="popup-title">마을총회 투표 등록</h3>
              <button type="button" className="popup-close-btn">
                <img src="/images/ic_close.svg" alt="닫기" />
              </button>
            </div>
            
            <div className="popup-body">
              {/* 마을 선택 */}
              <div className="form-group">
                <label className="form-label">마을 선택 <span className="required">*</span></label>
                <select className="form-select">
                  <option value="">마을을 선택하세요</option>
                  <option value="진월마을">진월마을</option>
                  <option value="봉선마을">봉선마을</option>
                  <option value="주월마을">주월마을</option>
                </select>
              </div>

              {/* 제목 */}
              <div className="form-group">
                <label className="form-label">제목 <span className="required">*</span></label>
                <input type="text" className="form-input" placeholder="투표 제목을 입력하세요" />
              </div>

              {/* 내용 */}
              <div className="form-group">
                <label className="form-label">내용 <span className="required">*</span></label>
                <textarea className="form-textarea" placeholder="투표 설명을 입력하세요" rows={4}></textarea>
              </div>

              {/* 기간 설정 */}
              <div className="form-group">
                <label className="form-label">투표 기간 <span className="required">*</span></label>
                <div className="form-row">
                  <input type="datetime-local" className="form-input" />
                  <span className="form-separator">~</span>
                  <input type="datetime-local" className="form-input" />
                </div>
              </div>

              {/* 투표 유형 선택 */}
              <div className="form-group">
                <label className="form-label">투표 유형 <span className="required">*</span></label>
                <div className="form-radio-group">
                  <label className="form-radio">
                    <input 
                      type="radio" 
                      name="voteType" 
                      value="select" 
                      checked={voteType === 'select'}
                      onChange={(e) => setVoteType(e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    <span>선택형 (체크박스)</span>
                  </label>
                  <label className="form-radio">
                    <input 
                      type="radio" 
                      name="voteType" 
                      value="rating" 
                      checked={voteType === 'rating'}
                      onChange={(e) => setVoteType(e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    <span>점수형 (별점)</span>
                  </label>
                </div>
              </div>

              {/* 선택형 투표 항목 관리 */}
              {voteType === 'select' && (
                <>
                  <div className="form-group">
                    <label className="form-label">투표 항목 관리 <span className="required">*</span></label>
                    <div className="vote-items-manager">
                      {voteItems.map((item, index) => (
                        <div key={item.id} className="vote-item-row">
                          <div className="vote-item-input-wrap">
                            <span className="vote-item-num">{index + 1}</span>
                            <input 
                              type="text" 
                              className="form-input" 
                              placeholder="투표 항목을 입력하세요"
                            />
                          </div>
                          <div className="vote-item-actions">
                            <div className="vote-item-image-upload">
                              <input type="file" id={`vote-img-${item.id}`} className="file-input" accept="image/*" />
                              <label htmlFor={`vote-img-${item.id}`} className="btn btn-outline btn-sm">
                                <img src="/images/ic_camera.svg" alt="이미지" />
                              </label>
                            </div>
                            <button 
                              type="button" 
                              className="btn btn-icon btn-danger"
                              onClick={() => removeVoteItem(item.id)}
                            >
                              <img src="/images/ic_delete.svg" alt="삭제" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <button type="button" className="btn btn-outline btn-add" onClick={addVoteItem}>
                        <img src="/images/ic_plus.svg" alt="추가" />
                        <span>항목 추가</span>
                      </button>
                    </div>
                  </div>

                  {/* 최대 선택 수 */}
                  <div className="form-group">
                    <label className="form-label">최대 선택 수 <span className="required">*</span></label>
                    <div className="max-select-container">
                      <div className="form-radio-group">
                        <label className="form-radio">
                          <input 
                            type="radio" 
                            name="maxSelect" 
                            value="0" 
                            checked={maxSelect === 0}
                            onChange={() => setMaxSelect(0)}
                          />
                          <span className="radio-custom"></span>
                          <span>제한없음</span>
                        </label>
                        <label className="form-radio">
                          <input 
                            type="radio" 
                            name="maxSelect" 
                            value="custom" 
                            checked={maxSelect > 0}
                            onChange={() => setMaxSelect(1)}
                          />
                          <span className="radio-custom"></span>
                          <span>직접 설정</span>
                        </label>
                      </div>
                      {maxSelect > 0 && (
                        <div className="max-select-input">
                          <select 
                            className="form-select"
                            value={maxSelect}
                            onChange={(e) => setMaxSelect(Number(e.target.value))}
                          >
                            {Array.from({ length: voteItems.length }, (_, i) => i + 1).map(num => (
                              <option key={num} value={num}>
                                {num}개
                              </option>
                            ))}
                          </select>
                          <span className="max-select-hint">/ 총 {voteItems.length}개 항목 중</span>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* 점수형 투표 항목 관리 */}
              {voteType === 'rating' && (
                <div className="form-group">
                  <label className="form-label">평가 항목 관리</label>
                  <div className="vote-items-manager">
                    {ratingItems.map((item, index) => (
                      <div key={item.id} className="vote-item-row">
                        <span className="vote-item-num">{index + 1}</span>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="평가 항목을 입력하세요 (예: 프로그램 만족도)"
                        />
                        <button 
                          type="button" 
                          className="btn btn-icon btn-danger"
                          onClick={() => removeRatingItem(item.id)}
                        >
                          <img src="/images/ic_delete.svg" alt="삭제" />
                        </button>
                      </div>
                    ))}
                    <button type="button" className="btn btn-outline btn-add" onClick={addRatingItem}>
                      <img src="/images/ic_plus.svg" alt="추가" />
                      <span>항목 추가</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="popup-footer">
              <button type="button" className="btn btn-secondary">취소</button>
              <button type="button" className="btn btn-primary">등록</button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 3. 마을활동 등록 폼 ========== */}
      <section className="popup-section">
        <h2 className="section-title">3. 마을활동 등록</h2>
        <div className="popup-container">
          <div className="popup-overlay"></div>
          <div className="popup-content popup-content-lg">
            <div className="popup-header">
              <h3 className="popup-title">마을활동 등록</h3>
              <button type="button" className="popup-close-btn">
                <img src="/images/ic_close.svg" alt="닫기" />
              </button>
            </div>
            
            <div className="popup-body">
              {/* 카테고리 선택 */}
              <div className="form-group">
                <label className="form-label">카테고리 <span className="required">*</span></label>
                <div className="form-radio-group">
                  <label className="form-radio">
                    <input 
                      type="radio" 
                      name="category" 
                      value="회의록" 
                      checked={selectedCategory === '회의록'}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    <span>회의록</span>
                  </label>
                  <label className="form-radio">
                    <input 
                      type="radio" 
                      name="category" 
                      value="활동기록" 
                      checked={selectedCategory === '활동기록'}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    <span>활동기록</span>
                  </label>
                  <label className="form-radio">
                    <input 
                      type="radio" 
                      name="category" 
                      value="모임공지" 
                      checked={selectedCategory === '모임공지'}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    <span>모임공지</span>
                  </label>
                </div>
              </div>

              {/* 제목 */}
              <div className="form-group">
                <label className="form-label">제목 <span className="required">*</span></label>
                <input type="text" className="form-input" placeholder="제목을 입력하세요" />
              </div>

              {/* 내용 */}
              <div className="form-group">
                <label className="form-label">내용 <span className="required">*</span></label>
                <textarea className="form-textarea" placeholder="내용을 입력하세요" rows={6}></textarea>
              </div>

              {/* 일시 */}
              <div className="form-group">
                <label className="form-label">일시 <span className="required">*</span></label>
                <input type="datetime-local" className="form-input" />
              </div>

              {/* 장소 */}
              <div className="form-group">
                <label className="form-label">장소 <span className="required">*</span></label>
                <input type="text" className="form-input" placeholder="장소를 입력하세요" />
              </div>

              {/* 링크 (모임공지에서는 숨김) */}
              {selectedCategory !== '모임공지' && (
                <div className="form-group">
                  <label className="form-label">관련 링크</label>
                  <input type="url" className="form-input" placeholder="https://" />
                </div>
              )}

              {/* 파일 첨부 (문서 + 이미지) */}
              <div className="file-upload-row">
                {/* 문서 첨부 */}
                <div className="form-group">
                  <label className="form-label">문서 첨부</label>
                  <div className="file-upload-area file-upload-compact">
                    <input 
                      type="file" 
                      id="doc-upload" 
                      className="file-input" 
                      accept=".pdf,.doc,.docx,.hwp,.xlsx,.xls" 
                      multiple 
                      onChange={(e) => handleFileUpload(e, setActivityDocs, 'document')}
                    />
                    <label htmlFor="doc-upload" className="file-upload-label">
                      <img src="/images/ic_document.svg" alt="문서" className="upload-icon" />
                      <span>문서 파일 업로드</span>
                      <span className="upload-hint">PDF, DOC, HWP, XLS (최대 20MB)</span>
                    </label>
                  </div>
                  {activityDocs.length > 0 && (
                    <div className="file-preview-list file-preview-docs">
                      {activityDocs.map(file => (
                        <div key={file.id} className="file-preview-item file-preview-doc">
                          <img src="/images/ic_document.svg" alt="문서" className="preview-doc-icon" />
                          <span className="preview-name">{file.name}</span>
                          <button 
                            type="button" 
                            className="preview-remove-btn"
                            onClick={() => handleFileRemove(file.id, setActivityDocs)}
                          >
                            <img src="/images/ic_close.svg" alt="삭제" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 이미지 첨부 */}
                <div className="form-group">
                  <label className="form-label">이미지 첨부</label>
                  <div className="file-upload-area file-upload-compact">
                    <input 
                      type="file" 
                      id="img-upload" 
                      className="file-input" 
                      accept="image/*" 
                      multiple 
                      onChange={(e) => handleFileUpload(e, setActivityImages, 'image')}
                    />
                    <label htmlFor="img-upload" className="file-upload-label">
                      <img src="/images/ic_camera.svg" alt="이미지" className="upload-icon" />
                      <span>이미지 파일 업로드</span>
                      <span className="upload-hint">JPG, PNG, GIF (최대 10MB)</span>
                    </label>
                  </div>
                  {activityImages.length > 0 && (
                    <div className="file-preview-list">
                      {activityImages.map(file => (
                        <div key={file.id} className="file-preview-item">
                          <img src={file.url} alt={file.name} className="preview-image" />
                          <span className="preview-name">{file.name}</span>
                          <button 
                            type="button" 
                            className="preview-remove-btn"
                            onClick={() => handleFileRemove(file.id, setActivityImages)}
                          >
                            <img src="/images/ic_close.svg" alt="삭제" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="popup-footer">
              <button type="button" className="btn btn-secondary">취소</button>
              <button type="button" className="btn btn-primary">등록</button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 4. 정보 팝업 (의제 상세보기) ========== */}
      <section className="popup-section">
        <h2 className="section-title">4. 정보 팝업 (의제 상세보기)</h2>
        <div className="popup-container">
          <div className="popup-overlay"></div>
          <div className="popup-content popup-content-info">
            <div className="popup-header">
              <h3 className="popup-title">의제 상세보기</h3>
              <button type="button" className="popup-close-btn">
                <img src="/images/ic_close.svg" alt="닫기" />
              </button>
            </div>
            
            <div className="popup-body">
              {/* 정보 헤더 */}
              <div className="info-header">
                <h4 className="info-title">마을 주민 센터 리모델링 관련 의견</h4>
                <div className="info-meta">
                  <span className="info-author">
                    <img src="/images/ic_profile_basic.svg" alt="작성자" className="info-author-icon" />
                    홍길동
                  </span>
                  <span className="info-divider">|</span>
                  <span className="info-date">2025.01.08 14:30</span>
                  <span className="info-divider">|</span>
                  <span className="info-views">조회 128</span>
                </div>
              </div>

              {/* 정보 내용 */}
              <div className="info-content">
                <p>
                  마을 주민 센터 리모델링에 대해 주민들의 다양한 의견을 수렴하고자 합니다.
                  현재 노후화된 시설을 개선하고, 주민들이 더 편리하게 이용할 수 있는 공간으로 
                  탈바꿈하는 것을 목표로 하고 있습니다.
                </p>
                <p>
                  특히 다음과 같은 사항에 대해 주민 여러분의 의견을 듣고 싶습니다:
                </p>
                <ul>
                  <li>휴게 공간 확대 필요성</li>
                  <li>무장애 시설 설치</li>
                  <li>주차장 확보 방안</li>
                  <li>에너지 효율화 시설 도입</li>
                </ul>
                <p>
                  많은 관심과 참여 부탁드립니다.
                </p>
              </div>

              {/* 정보 이미지 (있을 경우) */}
              <div className="info-images">
                <div className="info-image-item">
                  <img src="/images/sample_image.jpg" alt="첨부 이미지 1" />
                </div>
                <div className="info-image-item">
                  <img src="/images/sample_image.jpg" alt="첨부 이미지 2" />
                </div>
              </div>
            </div>

            <div className="popup-footer popup-footer-single">
              <button type="button" className="btn btn-primary">닫기</button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 5. 정보 팝업 (이미지 없는 버전) ========== */}
      <section className="popup-section">
        <h2 className="section-title">5. 정보 팝업 (이미지 없음)</h2>
        <div className="popup-container">
          <div className="popup-overlay"></div>
          <div className="popup-content popup-content-info">
            <div className="popup-header">
              <h3 className="popup-title">의제 상세보기</h3>
              <button type="button" className="popup-close-btn">
                <img src="/images/ic_close.svg" alt="닫기" />
              </button>
            </div>
            
            <div className="popup-body">
              {/* 정보 헤더 */}
              <div className="info-header">
                <h4 className="info-title">2025년 마을 예산 사용 계획 논의</h4>
                <div className="info-meta">
                  <span className="info-author">
                    <img src="/images/ic_profile_basic.svg" alt="작성자" className="info-author-icon" />
                    김철수
                  </span>
                  <span className="info-divider">|</span>
                  <span className="info-date">2025.01.07 10:15</span>
                  <span className="info-divider">|</span>
                  <span className="info-views">조회 256</span>
                </div>
              </div>

              {/* 정보 내용 */}
              <div className="info-content">
                <p>
                  2025년 마을 예산 사용 계획에 대해 주민들과 함께 논의하고자 합니다.
                  올해 배정된 예산을 효율적으로 사용하여 마을 발전에 기여할 수 있는 
                  방안을 모색하고 있습니다.
                </p>
                <p>
                  주요 예산 항목:
                </p>
                <ul>
                  <li>마을 환경 개선 사업</li>
                  <li>주민 복지 프로그램</li>
                  <li>문화 행사 지원</li>
                  <li>시설 유지 보수</li>
                </ul>
                <p>
                  예산 배분에 대한 의견이 있으시면 자유롭게 제안해 주세요.
                </p>
              </div>
            </div>

            <div className="popup-footer popup-footer-single">
              <button type="button" className="btn btn-primary">닫기</button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 공통 컴포넌트 모음 ========== */}
      <section className="popup-section">
        <h2 className="section-title">공통 폼 컴포넌트</h2>
        
        <div className="component-grid">
          {/* 텍스트 입력 */}
          <div className="component-item">
            <h4 className="component-title">텍스트 입력 (form-input)</h4>
            <div className="form-group">
              <label className="form-label">라벨</label>
              <input type="text" className="form-input" placeholder="placeholder" />
            </div>
          </div>

          {/* 텍스트 입력 - 에러 */}
          <div className="component-item">
            <h4 className="component-title">텍스트 입력 - 에러 상태</h4>
            <div className="form-group error">
              <label className="form-label">라벨 <span className="required">*</span></label>
              <input type="text" className="form-input error" placeholder="placeholder" />
              <p className="form-error">필수 입력 항목입니다.</p>
            </div>
          </div>

          {/* 텍스트영역 */}
          <div className="component-item">
            <h4 className="component-title">텍스트영역 (form-textarea)</h4>
            <div className="form-group">
              <label className="form-label">라벨</label>
              <textarea className="form-textarea" placeholder="placeholder" rows={3}></textarea>
            </div>
          </div>

          {/* 텍스트영역 - 에러 */}
          <div className="component-item">
            <h4 className="component-title">텍스트영역 - 에러 상태</h4>
            <div className="form-group error">
              <label className="form-label">라벨 <span className="required">*</span></label>
              <textarea className="form-textarea error" placeholder="placeholder" rows={3}></textarea>
              <p className="form-error">내용을 입력해주세요.</p>
            </div>
          </div>

          {/* 셀렉트 */}
          <div className="component-item">
            <h4 className="component-title">셀렉트 (form-select)</h4>
            <div className="form-group">
              <label className="form-label">라벨</label>
              <select className="form-select">
                <option value="">선택하세요</option>
                <option value="1">옵션 1</option>
                <option value="2">옵션 2</option>
              </select>
            </div>
          </div>

          {/* 셀렉트 - 에러 */}
          <div className="component-item">
            <h4 className="component-title">셀렉트 - 에러 상태</h4>
            <div className="form-group error">
              <label className="form-label">라벨 <span className="required">*</span></label>
              <select className="form-select error">
                <option value="">선택하세요</option>
                <option value="1">옵션 1</option>
                <option value="2">옵션 2</option>
              </select>
              <p className="form-error">마을을 선택해주세요.</p>
            </div>
          </div>

          {/* 라디오 */}
          <div className="component-item">
            <h4 className="component-title">라디오 (form-radio)</h4>
            <div className="form-group">
              <label className="form-label">라벨</label>
              <div className="form-radio-group">
                <label className="form-radio">
                  <input type="radio" name="sample" defaultChecked />
                  <span className="radio-custom"></span>
                  <span>옵션 1</span>
                </label>
                <label className="form-radio">
                  <input type="radio" name="sample" />
                  <span className="radio-custom"></span>
                  <span>옵션 2</span>
                </label>
              </div>
            </div>
          </div>

          {/* 체크박스 */}
          <div className="component-item">
            <h4 className="component-title">체크박스 (form-checkbox)</h4>
            <div className="form-group">
              <label className="form-checkbox">
                <input type="checkbox" />
                <span className="checkbox-custom"></span>
                <span>체크박스 라벨</span>
              </label>
            </div>
          </div>

          {/* 버튼 */}
          <div className="component-item">
            <h4 className="component-title">버튼 (btn)</h4>
            <div className="btn-group">
              <button type="button" className="btn btn-primary">Primary</button>
              <button type="button" className="btn btn-secondary">Secondary</button>
              <button type="button" className="btn btn-outline">Outline</button>
              <button type="button" className="btn btn-danger">Danger</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

