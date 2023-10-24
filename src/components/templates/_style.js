import { styled } from "styled-components";
import IcoMapPin from "assets/images/map/ico-map-pin.svg";
import IcoClock from "assets/images/common/ico-clock.svg";
import { PageStyle } from "pages/_style";

// 지도 - 현장명
export const MapTitleStyle = {
   Wrap: styled.div`
      width: calc(100% - 80px);
      height: 48px;
      border: 1px solid #3d5ffc;
      border-radius: 6px;
      background-color: #fff;
      padding-left: 16px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      gap: 8px;
      position: absolute;
      top:30px;
      left: 50%;
      transform: translate(-50%);
      z-index: 99;
      p{
         font-size: 1.6rem;
         font-weight: 400;
         color:#1b1b1b;
      }
      span.ico{
         width: 24px;
         height:24px;
         background: url(${IcoMapPin}) no-repeat center;
      }
   `,
};

// 광센서 목록 child
export const ListStyle = {
   Wrap: styled.div`
     width: 100%;
     height: 100%;
     padding:10px 20px 10px 30px; 
     box-sizing: border-box;
     background-color: #1d243d;
     border-top: 2px solid #30364a;
   `,
   Ul: styled.ul`
      width: 100%;
      height: 100%;
   `,
   LI: styled.li`
      line-height: 24px;
      /* color:#1b1b1b; */
   `,
};

// 차트 디자인
export const LineChartStyle = {
   Wrap: styled.div`

   `,
   HeaderWrap: styled(PageStyle.ContentHeaderWrap)`
         //공통 (헤더)
         div.contentHeaderWrap {
            div.header {
                &:before {
                    
                    width: 20px;
                    height: 20px;
                    background: url(${IcoClock}) no-repeat center;
                }
            }
           
        }
   `,
   ChartWrap: styled.div`
      margin-left: -40px;
        #lineChart {
            width: 100%;
            padding-left: 40px;
            /* padding: 0 30px 0 40px; */
        }
   `,
};

//dc,ac 차트 전환 버튼
export const SwitchBtn = {
   Wrap: styled.div`
       margin-top: 10px;
       display: flex;
       justify-content: space-between;
       align-items: center;
       .typeBtnWrap {
           display: flex;
           gap: 32px;
           button.typeBtn {
               padding: 13px 0;
               box-sizing: border-box;
               font-size: 1.5rem;
               color: #7177a8;
               transition: all 0.4s;
               &:hover {
                   color: white;
               }
               &.active {
                   color: white;
                   position: relative;
                   &::after {
                       position: absolute;
                       bottom: 0;
                       content: '';
                       display: block;
                       width: 100%;
                       height: 3px;
                       background: #32dde9;
                       box-shadow: 0 -2px 7px 0 #32dde9;
                   }
               }
           }
       }
       .periodBtnWrap {
           display: flex;
           gap: 20px;
           button.periodBtn {
               color: #7177a8;
               &.active {
                   color: white;
                   font-weight: bold;
               }
           }
       }
   `,
};

//커스텀 툴팁 스타일
export const CusTooltip = {
   Wrap: styled.div`
       padding: 20px;
       background: #3f455a;
       border-radius: 2px;
   `,
   XAxis: styled.p`
       font-size: 16px;
       color: #3f90ef;
       font-family: 'Pretendard';
   `,
   Text: styled.p`
       display: flex;
       align-items: center;
       color: #fff;
       font-size: 16px;
       font-family: 'Pretendard';
       font-weight: 200;
   `,
   Dot: styled.span`
       width: 6px;
       height: 6px;
       border-radius: 50%;
       margin-right: 10px;
   `,
};

//커스텀 범례 스타일
export const LegendArea = {
   Wrap: styled.div`
       display: flex;
       align-items: center;
       margin: 16px 0 18px;
   `,
   Item: styled.div`
       display: flex;
       align-items: center;
       cursor: pointer;
       &:not(:last-child) {
           margin-right: 12px;
       }
       p {
           font-size: 14px;
           font-family: 'Pretendard';
           font-weight: 300;
           color: ${(p) => (p.color ? p.color : "#fff")};
       }
       &:before {
           content: '';
           width: 8px;
           height: 8px;
           border-radius: 50%;
           margin-right: 6px;
           background: ${(p) => (p.color ? p.color : "#fff")};
       }
       /* &:first-child {
           p {
               color: #3f90ef;
           }
           &:before {
               background: #3f90ef;
           }
       }
       &:nth-child(2) {
           p {
               color: #eb6e16;
           }
           &:before {
               background: #eb6e16;
           }
       }
       &:nth-child(3) {
           p {
               color: #8742e5;
           }
           &:before {
               background: #8742e5;
           }
       }
       &:nth-child(4) {
           p {
               color: #4647db;
           }
           &:before {
               background: #4647db;
           }
       }
       &:nth-child(5) {
           p {
               color: #1aa8a3;
           }
           &:before {
               background: #1aa8a3;
           }
       }
       &:nth-child(6) {
           p {
               color: #de39eb;
           }
           &:before {
               background: #de39eb;
           }
       }
       &:nth-child(7) {
           p {
               color: #676767;
           }
           &:before {
               background: #676767;
           }
       }
       &:nth-child(8) {
           p {
               color: #9a5f10;
           }
           &:before {
               background: #9a5f10;
           }
       }
       &:nth-child(9) {
           p {
               color: #3cb6e3;
           }
           &:before {
               background: #3cb6e3;
           }
       }
       &:nth-child(10) {
           p {
               color: #a5afff;
           }
           &:before {
               background: #a5afff;
           }
       } */
   `,
};
