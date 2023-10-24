import React, { useRef, useEffect, useState } from "react";

import { PageStyle } from "./_style";
import SubHeader from "components/organisms/SubHeader";
import KakaoMap from "components/templates/KakaoMap";
import NaverMap from "components/templates/NaverMap";
import PopupCenter from "components/_popup/PopupCenter";
import LineChart from "components/templates/LineChart";
import LineChartRechart from "components/templates/LineChartRechart";
import LineChartRechartTest from "components/templates/LineChartRechartTest";

// 왼쪽 영역 - 사이즈 조절 함수
function resizeContent(contLeftRef) {
   const resizeBar = document.getElementById("resizeBar");

   let dragging = false;

   //왼쪽 항목 width 변경
   function resize(e) {
      contLeftRef.current?.style.setProperty("width", e.pageX - 100 + "px");
   }

   //마우스 drag 시작
   function start(e) {
      e.preventDefault();
      dragging = true;
      document.addEventListener("mousemove", resize);
   }
   //핸들러 클릭 이벤트
   resizeBar.addEventListener("mousedown", start);
   //마우스 up
   document.addEventListener("mouseup", function (e) {
      if (dragging) {
         document.removeEventListener("mousemove", resize);
         dragging = false;
      }
   });
}

// 메인 화면 - 실시간 현황
function Main(props) {
   const contLeftRef = useRef(null); // 왼쪽 영역 div
   // const [actMarker, setActMarker] = useState(null); // 선택된 지도 객체 (정보)
   // const [isOpenPop, setIsOpenPop] = useState(false); // 상세 오픈 팝업

   // 왼쪽 영역 사이즈 조절
   useEffect(() => {
      resizeContent(contLeftRef);
   }, []);

   return (
      <>
         <div id="page">
            <PageStyle.Background></PageStyle.Background>
            <PageStyle.WrapInner>
               <PageStyle.Box>
                  <PageStyle.SubHeader>
                     {/* 헤더 - 실시간 현황 */}
                     <SubHeader.Main />
                  </PageStyle.SubHeader>

                  <PageStyle.ContWrap>
                     <PageStyle.ContLeft className="cScroll" ref={contLeftRef}>
                        <LineChartRechart title="방식 전위 히스토리" type={"pp"} />
                        <LineChartRechart title="광센서 히스토리" type={"optical"} />
                        <LineChartRechart title="초음파 히스토리" type={"waves"} />
                     </PageStyle.ContLeft>

                     <div id="resizeBar">{""}</div>

                     <PageStyle.ContRight>
                        <NaverMap />
                     </PageStyle.ContRight>
                  </PageStyle.ContWrap>
               </PageStyle.Box>
            </PageStyle.WrapInner>
         </div>
      </>
   );
}

export default React.memo(Main);
