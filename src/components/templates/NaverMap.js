import React, { useCallback, useEffect, useState } from "react";
//
import { styled } from "styled-components";
import { MapTitleStyle, ListStyle } from "./_style";
import PopupCenter from "components/_popup/PopupCenter";
//
import useQueryState from "hooks/my-react-query/useQueryState";
import { QueryKeys } from "hooks/my-react-query/QueryKeys";
import { getPipeById, getSiteMap } from "service/api/common";
import { isEmpty } from "lodash";
import { keyWithKor } from "service/global";
//
//swiper
import MySwiper from "components/atoms/MySwiper";
import { SwiperSlide } from "swiper/react";

const naver = window.naver;

function NaverMap(props) {
   const siteId = JSON.parse(sessionStorage.getItem("userInfo"))?.siteId;

   const [myMap, setMyMap] = useState(null); // 지도 저장 (네이버 지도 인스턴스)
   const [actPipe, setActPipe] = useState(null); // 선택된 데이터
   const [openOptical, setOpenOptical] = useState(false); //optical List 팝업 오픈

   // React Query
   const { data: mapData, refetch } = useQueryState(QueryKeys.getMap(siteId), () => getSiteMap({ siteId }), {}); // 지도에 올릴 파이프 데이터 요청

   const { data: pipeDetail } = useQueryState(QueryKeys.getPipeDetail(actPipe?.pipeId), () => getPipeById({ siteId, pipeId: actPipe?.pipeId }), {
      enabled: !!actPipe?.pipeId, // 선택된 파이프 id 있을 때
   }); // 파이프 1개 상세 데이터 요청

   // 기본 지도 그리기
   useEffect(() => {
      try {
         let map = new naver.maps.Map("NaverMap", {
            center: new naver.maps.LatLng(35.85003008, 126.8587761), // 지도의 초기 중심 좌표
            zoom: 21, // 지도의 초기 줌 레벨
            minZoom: 7, //지도의 최소 줌 레벨 (1~21)
            // zoomControl: true, //줌 컨트롤의 표시 여부
            // zoomControlOptions: {
            //    //줌 컨트롤의 옵션
            //    position: naver.maps.Position.TOP_RIGHT,
            // },
         });

         //TEST: 마우스 오른쪽 클릭 - 지도 좌표 정보
         naver.maps.Event.addListener(map, "rightclick", function (e) {
            console.log("offset: " + e.offset.toString());
            console.log("point: " + e.point.toString());
            console.log("Coord: " + e.coord.toString());
         });

         setMyMap(map);
      } catch {
         // alert("지도 불러오기 에러");
      }
   }, []);

   // 폴리 라인 올리기 (+ 이벤트 추가)
   const addPolyline = useCallback(
      (pipeData) => {
         if (myMap) {
            // 파이프 라인 데이터 반복
            pipeData.forEach((pipe, idx) => {
               // 위치 (start, end)
               let posStart = new naver.maps.LatLng(pipe?.startLat, pipe?.startLon);
               let posEnd = new naver.maps.LatLng(pipe?.endLat, pipe?.endLon);
               // 라인 컬러
               let lineColor = pipe?.isSmartPipe === 1 ? "#156fff" : "#5d6168";
               // 폴리라인 올리기
               let polyline = new naver.maps.Polyline({
                  map: myMap, // setMap
                  path: [posStart, posEnd],
                  strokeColor: lineColor, // 선의 색깔
                  strokeWeight: 15, // 선의 두께
                  strokeOpacity: 0.7, // 선의 불투명도
                  clickable: true,
               });
               polyline.customData = { ...pipe }; // 폴리라인 객체에 데이터 저장

               // 이벤트 추가
               naver.maps.Event.addListener(polyline, "mouseover", function () {
                  polyline.setOptions({
                     strokeColor: "#E51D1A",
                     strokeOpacity: 1,
                  });
               });

               naver.maps.Event.addListener(polyline, "mouseout", function () {
                  polyline.setOptions({
                     strokeColor: lineColor,
                     strokeOpacity: 0.7,
                  });
               });

               naver.maps.Event.addListener(polyline, "click", function () {
                  // console.log(polyline.customData);
                  setActPipe({ ...pipe }); // 클릭시, 데이터 저장
               });

               /* 줌 레벨 변경 이벤트 - 멀어질때 마커로 현장 위치 표시 
                  // 첫번째 데이터 순환시에 1번 적용
               */
               if (idx === 0) {
                  let marker = null; // 마커

                  naver.maps.Event.addListener(myMap, "zoom_changed", function (zoom) {
                     // 마커 올리기
                     if (marker === null && zoom < 19) {
                        marker = new naver.maps.Marker({
                           map: myMap,
                           position: posStart, // 첫 데이터의 시작 좌표 사용
                        });
                     }

                     // 마커 지우기
                     if (marker && zoom > 18) {
                        marker.setMap(null);
                        marker = null;
                     }
                  });
               }
            });
         }
      },
      [myMap],
   );

   useEffect(() => {
      if (!isEmpty(mapData?.pipe)) {
         addPolyline(mapData?.pipe); // 데이터 있을 때 폴리라인 그리기
      }
   }, [addPolyline, mapData?.pipe]);

   return (
      <div id="NaverMap" style={{ width: "100%", height: "100%", position: "relative" }}>
         <MapTitleStyle.Wrap>
            <span className="ico"></span> <p>{mapData?.siteName}</p>
         </MapTitleStyle.Wrap>

         {/* 선택된 마커 - 상세 팝업
          pipeId는 mapData, pipeNum은 pipeDetail*/}
         {actPipe?.pipeId && (
            <PopupCenter width={"640px"} height={"660px"} title={`파이프 ${pipeDetail?.pipeNum}`} close={() => setActPipe(null)} leftText={"닫기"} leftFunc={() => setActPipe(null)}>
               <DetailPopupChild pipeDetail={pipeDetail} setOpenOptical={setOpenOptical} />
            </PopupCenter>
         )}

         {/* 광센서 리스트 팝업 */}
         {openOptical && (
            <PopupCenter title={`광센서 목록`} close={() => setOpenOptical(false)} leftText={"닫기"} leftFunc={() => setOpenOptical(false)}>
               <ListStyle.Wrap>
                  <ListStyle.Ul className="cScroll">
                     {pipeDetail?.opticalList?.map((ele) => (
                        <ListStyle.LI>{ele}</ListStyle.LI>
                     ))}
                  </ListStyle.Ul>
               </ListStyle.Wrap>
            </PopupCenter>
         )}
      </div>
   );
}

export default NaverMap;

// 파이프 상세 팝업 스타일
const Style = {
   Wrap: styled.div`
      width: 100%;
      height: 100%;
      color:#1b1b1b;

      background-color: #1d243d;

   `,
   ImgWrap: styled.div`
      width: 100%;
      height: 340px;
      background: #555;

   `,
   Cont: styled.div`
      width: 100%;
      /* height: calc(100% - 300px); */
      color:#fff;
      padding: 28px 40px;
      box-sizing: border-box;
      div.section{
         /* height: 100%; */
         ul{
            display: flex;
            flex-direction: column;
            gap:8px;
            li{
               display: flex;
               justify-content: space-between;
               align-items: center;
               gap:40px;
               div.item{
                  width: 100%;
                  height: 30px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  border-bottom:1px solid #40526b;
                  span{
                     font-size: 1.6rem;
                  }
                  .title{
                     display: flex;
                     align-items: center;
                     color:#7177a8;

                  }
               }
            }
         }
      } 
   `,
   Button: styled.button`
      margin-left: 8px;
      border:1px solid #fff;
      font-size: 1.0rem;
      color:#fff;
      padding:2px 4px;
      border-radius: 4px;
      transition: all .3s;
      &:hover{
         background-color: #4c4c4c;
      }
   `,
};

// 파이프 상세 내용 - 팝업용
export function DetailPopupChild({ pipeDetail, setOpenOptical }) {
   const { type = "-", material = "-", diameter = "-", length = "-", angle = "-", constDate, smartPipeNo = "-", waves = "-", optical = "-", acdc = "-", imgList = [] } = pipeDetail || {};

   console.log(pipeDetail);

   const subTitle = (keyName) => {
      const item = keyWithKor.find(({ key }) => key === keyName);
      return <span>{item?.kor || "-"}</span>;
   };

   const mainTarget = process.env.NODE_ENV === "development" ? process.env.REACT_APP_API_URL : "";

   console.log(mainTarget);
   return (
      <>
         <Style.Wrap>
            <Style.ImgWrap>
               {!isEmpty(imgList) ? (
                  <MySwiper>
                     {imgList.map((item) => (
                        <SwiperSlide key={item.img}>
                           <img alt={`이미지${item.img}`} src={`${mainTarget}/img${item.img}`} />
                        </SwiperSlide>
                     ))}
                  </MySwiper>
               ) : (
                  //   <Swiper
                  //       style={{
                  //           '--swiper-navigation-color': '#fff',
                  //           '--swiper-pagination-color': '#fff',
                  //       }}
                  //       className="imgSwiper"
                  //       spaceBetween={10}
                  //       // modules={[Navigation, Lazy, Pagination]}
                  //       navigation={true}
                  //       lazy={true}
                  //       pagination={true}
                  //   >
                  //       {imgList.map((img, i) => (
                  //           <SwiperSlide key={img.img + i}>
                  //               <img
                  //                   alt={`이미지 ${i}`}
                  //                   src={`http://3.38.180.149/img${img.img}`}
                  //               />
                  //           </SwiperSlide>
                  //       ))}
                  //   </Swiper>
                  <p className="nullText"> 이미지가 없습니다.</p>
               )}
            </Style.ImgWrap>
            <Style.Cont>
               <div className="section">
                  <ul>
                     <li>
                        <div className="item">
                           <span className="title">{subTitle("type")}</span>
                           <span>{type}</span>
                        </div>
                        <div className="item">
                           <span className="title">{subTitle("material")}</span>
                           <span>{material}</span>
                        </div>
                     </li>
                     <li>
                        <div className="item">
                           <span className="title">{subTitle("diameter")}(mm)</span>
                           <span>{diameter}</span>
                        </div>
                        <div className="item">
                           <span className="title">{subTitle("length")}(mm)</span>
                           <span>{length}</span>
                        </div>
                     </li>
                     <li>
                        <div className="item">
                           <span className="title">{subTitle("angle")}(deg)</span>
                           <span>{angle}</span>
                        </div>
                        <div className="item">
                           <span className="title">{subTitle("constDate")}</span>
                           <span>{constDate}</span>
                        </div>
                     </li>
                     {/* smartPipeNo 있을때 (스마트 파이프일때) */}
                     {smartPipeNo !== 0 && (
                        <>
                           <li>
                              <div className="item">
                                 <span className="title">{subTitle("smartPipeNo")}</span>
                                 <span>{smartPipeNo}</span>
                              </div>
                              <div className="item">
                                 <span className="title">{subTitle("waves")}</span>
                                 <span>{waves === 1 ? "유" : "무"}</span>
                              </div>
                           </li>
                           <li>
                              <div className="item">
                                 <span className="title">
                                    {subTitle("optical")} <Style.Button onClick={() => setOpenOptical(true)}>목록보기</Style.Button>
                                 </span>
                                 <span>{optical === 1 ? "유" : "무"}</span>
                              </div>
                              <div className="item">
                                 <span className="title">{subTitle("acdc")}</span>
                                 <span>{acdc === 1 ? "유" : "무"}</span>
                              </div>
                           </li>
                        </>
                     )}
                  </ul>
               </div>
            </Style.Cont>
         </Style.Wrap>
      </>
   );
}
