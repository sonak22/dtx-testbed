import React from "react";
import { Map, MarkerClusterer, MapMarker, Polyline } from "react-kakao-maps-sdk";

function KakaoMap(props) {
   return (
      <>
         <Map // 지도를 표시할 Container
            center={{
               // 지도의 중심좌표
               lat: 35.85003008,
               lng: 126.8587761,
            }}
            style={{
               // 지도의 크기
               width: "100%",
               height: "100%",
            }}
            level={1} // 지도의 확대 레벨
         >
            {/* <MarkerClusterer averageCenter={true} minLevel={1}> */}

            <MapMarker
               // key={`${pos.lat}-${pos.lng}`}
               position={{
                  lat: 35.85003008,
                  lng: 126.8587761,
               }}
            />
            <Polyline
               path={[
                  [
                     { lat: 35.84997619, lng: 126.8587707 },
                     { lat: 35.85003008, lng: 126.8587761 },
                  ],
               ]}
               strokeWeight={15} // 선의 두께
               strokeColor={"#156fff"} // 선의 색깔
               strokeOpacity={0.8} // 선의 불투명도
               strokeStyle={"solid"} // 선의 스타일
            />
            <Polyline
               path={[
                  [
                     { lat: 35.85003008, lng: 126.8587761 },
                     { lat: 35.85003189, lng: 126.8587787 },
                  ],
               ]}
               strokeWeight={15} // 선의 두께
               strokeColor={"#ffe415"} // 선의 색깔
               strokeOpacity={0.8} // 선의 불투명도
               strokeStyle={"solid"} // 선의 스타일
            />
            <Polyline
               path={[
                  [
                     { lat: 35.85003189, lng: 126.8587787 },
                     { lat: 35.85003117, lng: 126.8587898 },
                  ],
               ]}
               strokeWeight={15} // 선의 두께
               strokeColor={"#676767"} // 선의 색깔
               strokeOpacity={0.8} // 선의 불투명도
               strokeStyle={"solid"} // 선의 스타일
            />
            {/* </MarkerClusterer> */}
         </Map>
      </>
   );
}

export default KakaoMap;
