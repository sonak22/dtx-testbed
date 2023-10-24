import { styled } from "styled-components";

// 기본 팝업 스타일
export const PopupStyle = {
   Dimmed: styled.div`
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
   `,
   Wrap: styled.div`
       width: ${(p) => (p.width ? p.width : "460px")};
       height: ${(p) => (p.height ? p.height : "300px")};
       // 가운데 위치
       position: fixed;
       /* position: absolute; */
       top: 50%;
       left: 50%;
       transform: translate(-50%, -50%);
       /* z-index: 1000; */
   `,
   Head: styled.div`
       height: 76px;
       padding: 0 30px;
       box-sizing: border-box;
       background: #eee;
       display: flex;
       align-items: center;
       justify-content: space-between;
   `,
   Title: styled.strong`
       display: flex;
       align-items: center;
       font-size: 1.8rem;
       &:before {
           content: "";
           width: 24px;
           height: 24px;
           background-repeat: no-repeat;
           background-position: center;
           margin-right: 10px;
           background-image: ${(p) => (p.src ? `url(${p.src})` : "none")};
           display: ${(p) => (p.src ? "block" : "none")};
       }
   `,
   // (css로 X 닫기 아이콘)
   Close: styled.button`
       position: relative;
       width: 24px;
       height: 24px;
       &:before,
       &:after {
           position: absolute;
           left: 50%;
           top: 50%;
           content: "";
           display: block;
           width: 20px;
           height: 1px;
           background: #ffffff;
       }
       &:before {
           transform: translate(-50%, -50%) rotate(45deg);
       }
       &:after {
           transform: translate(-50%, -50%) rotate(-45deg);
       }
   `,
   Cont: styled.div`
       width: 100%;
       height: calc(100% - 76px);
   `,
   Inner: styled.div`
       &:not(:last-child) {
           border-bottom: 2px dashed #babae8;
       }
       padding: 22px 30px;
       height: ${(p) => (p.height ? p.height : "")};
   `,
};

// 팝업 - 가운데 위치 속성
export const PopupCenterStyle = {
   Dimmed: styled(PopupStyle.Dimmed)`
   `,
   Wrap: styled(PopupStyle.Wrap)`
   `,
   Head: styled(PopupStyle.Head)`
       height: 65px;
       background-color: #1d243d;
       font-size: 2.4rem;
   `,
   Cont: styled(PopupStyle.Cont)`
       height: calc(100% -65px - 56px);
       /* padding: 24px 0 0 0; */
       box-sizing: border-box;
       background-color: #fff;
       overflow: hidden;

       /* border: 1px solid red; */
       display: flex;
       flex-direction: column;
       align-items: center;
   `,
   // ImgWrap: styled.div`
   //     width: 100%;
   //     height: 100%;
   //     padding: 24px;
   // `,
   FooterWrap: styled.div`
       margin-top: auto;
       width: 100%;
       height: 56px;
       flex-shrink: 0;
       display: flex;
       justify-content: space-around;
       align-items: center;
       button {
           height: 100%;
           flex: 1;
           flex-shrink: 0;
           font-size: 1.6rem;
           color: #fff;
           background-color: #3c5ffc;
           transition: all.3s;
           &:hover {
               background-color: #6881ef;
           }
       }
   `,
};
