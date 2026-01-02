import SubPageLayout from "../components/SubPageLayout";

export default function SubPage() {
  return (
    <SubPageLayout
      title="마을이야기"
      subtitle="마을의 활동, 의제, 기록을 한곳에서 만나는 공간"
      defaultFirstDepth="마을이야기"
      defaultSecondDepth="마을총회"
    >
      <div className="subpage-demo-content">
        <h2>서브페이지 컨텐츠 영역</h2>
        <p>여기에 컨텐츠가 들어갑니다.</p>
      </div>
    </SubPageLayout>
  );
}


