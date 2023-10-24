import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { styled } from "styled-components";

export const MySwiperStyle = {
   Wrap: styled.div`
      width: 100%;
      height: 100%;
      position: relative;
      /* --swiper-navigation-color : #fff; */
      /* --swiper-pagination-color : #fff; */
      .swiper.mySwiper{
         width: 100%;
         height:100%;
         .swiper-wrapper{
            .swiper-slide{
               img{
                  width: 100%;
                  height:100%;
               }
            }
         }
         .swiper-button-prev, .swiper-button-next{
            color:#fff;
            background-color: #7e7e7e94;
            padding: 10px;
            font-size: 8px !important;
            --swiper-navigation-size: 3.0rem;
         }
      }
      #swiper-pagination{
         width: fit-content;
         height: 20px;
         line-height: 20px;
         padding: 4px 12px;
         border-radius: 20px;
         margin: 0 auto;
         text-align: center;
         color:#fff;
         background-color: #23232393;
         position: absolute;
         bottom: 8px;
         left:0; right:0;
         z-index: 9;
      }
     
   `,
};

// swiper
function MySwiper({ children, perView, perGroup, initialSlide }) {
   return (
      <>
         <MySwiperStyle.Wrap>
            <Swiper
               className="mySwiper"
               initialSlide={initialSlide ? initialSlide : 0} // 시작 슬라이드 번호 0 ~
               slidesPerGroup={perGroup ? perGroup : 1}
               spaceBetween={11}
               slidesPerView={perView ? perView : 1}
               navigation={{
                  enabled: true,
                  // nextEl: "#btnSwiperNext",
                  // prevEl: "#btnSwiperPrev",
               }}
               pagination={{
                  el: "#swiper-pagination",
                  type: "fraction",
               }}
               modules={[Navigation, Pagination]}
               // onSlideChange={() => console.log("slide change")}
               //  onSwiper={(swiper) => console.log(swiper)}
            >
               {children}
            </Swiper>
            <div id={"swiper-pagination"}></div>
            {/* <SwiperStyle.Navi>
                <button type={"button"} id={"btnSwiperPrev"} className={"btnSwiperPrev"}></button>
                <button type={"button"} id={"btnSwiperNext"} className={"btnSwiperNext"}></button>
            </SwiperStyle.Navi>
            <SwiperStyle.Footer>
                <div id={"swiper-pagination"}></div>
            </SwiperStyle.Footer> */}
         </MySwiperStyle.Wrap>
      </>
   );
}

export default MySwiper;
