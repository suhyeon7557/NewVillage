import SubPageLayout from "../components/SubPageLayout";
import "../styles/common.css";
import "../styles/ourvillage.css";

export default function OurVillagePage() {
  return (
    <SubPageLayout
      title="우리마을"
      subtitle="마을별 활동 소식과 이웃 간의 소통을 위한 커뮤니티 공간"
      firstDepth="우리마을"
    >
      <div className="list-page">
        {/* 구/지역 탭 */}
        <div className="ourvillage-tabs">
          <div className="tabs tabs-secondary">
            <button type="button" className="tab-item active" data-district="donggu">동구</button>
            <button type="button" className="tab-item" data-district="seogu">서구</button>
            <button type="button" className="tab-item" data-district="namgu">남구</button>
            <button type="button" className="tab-item" data-district="bukgu">북구</button>
            <button type="button" className="tab-item" data-district="gwangsangu">광산구</button>
            <button type="button" className="tab-item" data-district="gwangju">광주</button>
          </div>
        </div>

        {/* 마을 카드 그리드 */}
        <div className="village-grid">
          {/* 마을 카드 1 */}
          <a href="/village/1" className="village-card">
            <div className="village-card-logo">
              <img src="/images/image_villagelogo01.png" alt="계림1마을" />
            </div>
            <div className="village-card-info">
              <span className="village-district-tag district-donggu">동구</span>
              <h3 className="village-card-name">[계림1동]계림1마을</h3>
              <div className="village-card-stats">
                <span className="village-stat">
                  <img src="/images/ic_people.svg" alt="인원" className="stat-icon" />
                  <span className="stat-value">45명</span>
                </span>
                <span className="village-stat">
                  <img src="/images/ic_activity.svg" alt="활동" className="stat-icon" />
                  <span className="stat-value">활동 23건</span>
                </span>
              </div>
            </div>
          </a>

          {/* 마을 카드 2 */}
          <a href="/village/2" className="village-card">
            <div className="village-card-logo">
              <img src="/images/image_villagelogo01.png" alt="계림2마을" />
            </div>
            <div className="village-card-info">
              <span className="village-district-tag district-donggu">동구</span>
              <h3 className="village-card-name">[계림2동]계림2마을</h3>
              <div className="village-card-stats">
                <span className="village-stat">
                  <img src="/images/ic_people.svg" alt="인원" className="stat-icon" />
                  <span className="stat-value">45명</span>
                </span>
                <span className="village-stat">
                  <img src="/images/ic_activity.svg" alt="활동" className="stat-icon" />
                  <span className="stat-value">활동 23건</span>
                </span>
              </div>
            </div>
          </a>

          {/* 마을 카드 3 */}
          <a href="/village/3" className="village-card">
            <div className="village-card-logo">
              <img src="/images/image_villagelogo01.png" alt="다복마을" />
            </div>
            <div className="village-card-info">
              <span className="village-district-tag district-donggu">동구</span>
              <h3 className="village-card-name">[지산2동]다복마을</h3>
              <div className="village-card-stats">
                <span className="village-stat">
                  <img src="/images/ic_people.svg" alt="인원" className="stat-icon" />
                  <span className="stat-value">45명</span>
                </span>
                <span className="village-stat">
                  <img src="/images/ic_activity.svg" alt="활동" className="stat-icon" />
                  <span className="stat-value">활동 23건</span>
                </span>
              </div>
            </div>
          </a>

          {/* 마을 카드 4 */}
          <a href="/village/4" className="village-card">
            <div className="village-card-logo">
              <img src="/images/image_villagelogo01.png" alt="동명마을" />
            </div>
            <div className="village-card-info">
              <span className="village-district-tag district-donggu">동구</span>
              <h3 className="village-card-name">[동명동]동명마을</h3>
              <div className="village-card-stats">
                <span className="village-stat">
                  <img src="/images/ic_people.svg" alt="인원" className="stat-icon" />
                  <span className="stat-value">45명</span>
                </span>
                <span className="village-stat">
                  <img src="/images/ic_activity.svg" alt="활동" className="stat-icon" />
                  <span className="stat-value">활동 23건</span>
                </span>
              </div>
            </div>
          </a>

          {/* 마을 카드 5 */}
          <a href="/village/5" className="village-card">
            <div className="village-card-logo">
              <img src="/images/image_villagelogo01.png" alt="두루마을" />
            </div>
            <div className="village-card-info">
              <span className="village-district-tag district-donggu">동구</span>
              <h3 className="village-card-name">[학동]두루마을</h3>
              <div className="village-card-stats">
                <span className="village-stat">
                  <img src="/images/ic_people.svg" alt="인원" className="stat-icon" />
                  <span className="stat-value">45명</span>
                </span>
                <span className="village-stat">
                  <img src="/images/ic_activity.svg" alt="활동" className="stat-icon" />
                  <span className="stat-value">활동 23건</span>
                </span>
              </div>
            </div>
          </a>

          {/* 마을 카드 6 */}
          <a href="/village/6" className="village-card">
            <div className="village-card-logo">
              <img src="/images/image_villagelogo01.png" alt="무꽃동마을" />
            </div>
            <div className="village-card-info">
              <span className="village-district-tag district-donggu">동구</span>
              <h3 className="village-card-name">[학운동]무꽃동마을</h3>
              <div className="village-card-stats">
                <span className="village-stat">
                  <img src="/images/ic_people.svg" alt="인원" className="stat-icon" />
                  <span className="stat-value">45명</span>
                </span>
                <span className="village-stat">
                  <img src="/images/ic_activity.svg" alt="활동" className="stat-icon" />
                  <span className="stat-value">활동 23건</span>
                </span>
              </div>
            </div>
          </a>

          {/* 마을 카드 7 */}
          <a href="/village/7" className="village-card">
            <div className="village-card-logo">
              <img src="/images/image_villagelogo01.png" alt="산수1마을" />
            </div>
            <div className="village-card-info">
              <span className="village-district-tag district-donggu">동구</span>
              <h3 className="village-card-name">[산수1동]산수1마을</h3>
              <div className="village-card-stats">
                <span className="village-stat">
                  <img src="/images/ic_people.svg" alt="인원" className="stat-icon" />
                  <span className="stat-value">45명</span>
                </span>
                <span className="village-stat">
                  <img src="/images/ic_activity.svg" alt="활동" className="stat-icon" />
                  <span className="stat-value">활동 23건</span>
                </span>
              </div>
            </div>
          </a>

          {/* 마을 카드 8 */}
          <a href="/village/8" className="village-card">
            <div className="village-card-logo">
              <img src="/images/image_villagelogo01.png" alt="산수2마을" />
            </div>
            <div className="village-card-info">
              <span className="village-district-tag district-donggu">동구</span>
              <h3 className="village-card-name">[산수2동]산수2마을</h3>
              <div className="village-card-stats">
                <span className="village-stat">
                  <img src="/images/ic_people.svg" alt="인원" className="stat-icon" />
                  <span className="stat-value">45명</span>
                </span>
                <span className="village-stat">
                  <img src="/images/ic_activity.svg" alt="활동" className="stat-icon" />
                  <span className="stat-value">활동 23건</span>
                </span>
              </div>
            </div>
          </a>

          {/* 마을 카드 9 */}
          <a href="/village/9" className="village-card">
            <div className="village-card-logo">
              <img src="/images/image_villagelogo01.png" alt="서남마을" />
            </div>
            <div className="village-card-info">
              <span className="village-district-tag district-donggu">동구</span>
              <h3 className="village-card-name">[서남동]서남마을</h3>
              <div className="village-card-stats">
                <span className="village-stat">
                  <img src="/images/ic_people.svg" alt="인원" className="stat-icon" />
                  <span className="stat-value">45명</span>
                </span>
                <span className="village-stat">
                  <img src="/images/ic_activity.svg" alt="활동" className="stat-icon" />
                  <span className="stat-value">활동 23건</span>
                </span>
              </div>
            </div>
          </a>

          {/* 마을 카드 10 */}
          <a href="/village/10" className="village-card">
            <div className="village-card-logo">
              <img src="/images/image_villagelogo01.png" alt="지산1마을" />
            </div>
            <div className="village-card-info">
              <span className="village-district-tag district-donggu">동구</span>
              <h3 className="village-card-name">[지산1동]지산1마을</h3>
              <div className="village-card-stats">
                <span className="village-stat">
                  <img src="/images/ic_people.svg" alt="인원" className="stat-icon" />
                  <span className="stat-value">45명</span>
                </span>
                <span className="village-stat">
                  <img src="/images/ic_activity.svg" alt="활동" className="stat-icon" />
                  <span className="stat-value">활동 23건</span>
                </span>
              </div>
            </div>
          </a>

          {/* 마을 카드 11 */}
          <a href="/village/11" className="village-card">
            <div className="village-card-logo">
              <img src="/images/image_villagelogo01.png" alt="지원1마을" />
            </div>
            <div className="village-card-info">
              <span className="village-district-tag district-donggu">동구</span>
              <h3 className="village-card-name">[지원1동]지원1마을</h3>
              <div className="village-card-stats">
                <span className="village-stat">
                  <img src="/images/ic_people.svg" alt="인원" className="stat-icon" />
                  <span className="stat-value">45명</span>
                </span>
                <span className="village-stat">
                  <img src="/images/ic_activity.svg" alt="활동" className="stat-icon" />
                  <span className="stat-value">활동 23건</span>
                </span>
              </div>
            </div>
          </a>

          {/* 마을 카드 12 */}
          <a href="/village/12" className="village-card">
            <div className="village-card-logo">
              <img src="/images/image_villagelogo01.png" alt="계림1마을" />
            </div>
            <div className="village-card-info">
              <span className="village-district-tag district-donggu">동구</span>
              <h3 className="village-card-name">[계림1동]계림1마을</h3>
              <div className="village-card-stats">
                <span className="village-stat">
                  <img src="/images/ic_people.svg" alt="인원" className="stat-icon" />
                  <span className="stat-value">45명</span>
                </span>
                <span className="village-stat">
                  <img src="/images/ic_activity.svg" alt="활동" className="stat-icon" />
                  <span className="stat-value">활동 23건</span>
                </span>
              </div>
            </div>
          </a>

          {/* 마을 카드 13 */}
          <a href="/village/13" className="village-card">
            <div className="village-card-logo">
              <img src="/images/image_villagelogo01.png" alt="서남마을" />
            </div>
            <div className="village-card-info">
              <span className="village-district-tag district-donggu">동구</span>
              <h3 className="village-card-name">[서남동]서남마을</h3>
              <div className="village-card-stats">
                <span className="village-stat">
                  <img src="/images/ic_people.svg" alt="인원" className="stat-icon" />
                  <span className="stat-value">45명</span>
                </span>
                <span className="village-stat">
                  <img src="/images/ic_activity.svg" alt="활동" className="stat-icon" />
                  <span className="stat-value">활동 23건</span>
                </span>
              </div>
            </div>
          </a>
        </div>

        {/* 마을이 없을 경우 */}
        <div className="list-empty hide">
          <div className="list-empty-icon">
            <img src="/images/ic_empty.svg" alt="데이터 없음" />
          </div>
          <p className="list-empty-text">등록된 마을이 없습니다.</p>
        </div>
      </div>
    </SubPageLayout>
  );
}

