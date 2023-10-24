import { styled } from "styled-components";
// ico - login
import IcoUser from "assets/images/login/ico-user.svg";
import IcoLock from "assets/images/login/ico-lock.svg";
import IcoClock from "assets/images/common/ico-clock.svg";

// 로그인 스타일
export const LoginStyle = {
   Wrap: styled.div`
      width: 100%;
      height: 100%;
      background: #191e32;

      display: flex;
      align-items: center;
      justify-content: center;
   `,
   Box: styled.div`
        width: 640px;
        /* height: 486px; */
        background-color: #1d243d;
        border-radius: 2px;
        padding: 68px 110px 46px;
        box-sizing: border-box;
   `,
   Logo: styled.div`
      width: 100%;
      margin-bottom: 43px;
      display: flex;
      align-items: center;
      justify-content: center;
   `,
   LoginForm: styled.div`
      margin-bottom: 52px;
      display: flex;
      flex-direction: column;
      gap:8px;
         input {
            width: 100%;
            height: 62px;
            color: #fff;
            font-size: 1.8rem;
            border: 1px solid #1f2745;
            padding-left: 55px;
            box-sizing: border-box;
            &[name='id']{
               background: #1f2745 url(${IcoUser}) no-repeat 21px center;
            }
            &[name='password']{
               background: #1f2745 url(${IcoLock}) no-repeat 21px center;
            }
            &::placeholder {
               color: #7177a8;
            }
            &:focus {
               outline: 0;
               border: 1px solid #3d5ffc;
            }
         }
   `,
   LoginBtn: styled.button`
      margin-bottom: 43px;
      width: 100%;
      height: 62px;
      font-size: 1.8rem;
      font-weight: 400;
      color:#ffffff;
      background-color: #3d5ffc;
      transition: all.3s;
      &:focus {
         outline: none;
      }
      &:hover {
         color: #fff;
         background: #47a7f5;
      }
   `,
   Inc: styled.div`
      height: 17px;
      text-align: center;
      font-size: 1.4rem;
      color: #b1b1b1;

   `,
};

// [공통] page 에서 사용
export const PageStyle = {
   // 뒷 배경 하단
   Background: styled.div`
      position: fixed;
      z-index: 0;
      bottom: 0;
      width: 100%;
      height: calc(100vh - 400px);
      background: #1f2745;
   `,
   // padding 용
   WrapInner: styled.div`
     position: fixed;
     z-index: 1;
     width: 100%;
     height: calc(100% - 65px); // 헤더영역 제외
     padding: 0 88px;
     box-sizing: border-box;
   `,
   // 박스 영역 - 실질적 Content
   Box: styled.div`
      min-width: 1080px;
      width: 100%;
      height: 100%;
      background-color: #1d243d;
      color:#fff;
   `,
   SubHeader: styled.div`
      height: 72px;
      border-bottom: 1px solid #40526b;
      padding: 0 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // <Link> 하단
      .backButtonWrap {}
      & > .extraButtonWrap {}
   `,
   ContentHeaderWrap: styled.div`
         //공통 (헤더)
         div.contentHeaderWrap {
            display: flex;
            align-items: center;
            padding: 0 30px 14px 40px;
            box-sizing: border-box;
            margin-top: 19px;
            position: relative;
            &:after {
               content: '';
               display: block;
               position: absolute;
               left: 0;
               bottom: 0;
               width: calc(100% - 30px);
               height: 1px;
               background-color: #40526b;
            }
            div.header {
               display: flex;
               align-items: center;
               gap: 8px;
               font-family: 'Pretendard-400';
               font-size: 1.8rem;
               font-weight: 400;
               color: #fff;
               &:before {
                  content: '';
                  display: inline-block;
                  width: 20px;
                  height: 20px;
                  background: url(${IcoClock}) no-repeat center;
               }
            }
            p.helpText {
               margin-left: auto;
               color: #7177a8;
               span {
                  color: #3f90ef;
               }
            }
      }
   `,
   ContWrap: styled.div`
      width: 100%;
      height: calc(100% - 72px);
      display: flex;
       #resizeBar {
            width: 20px;
            height: 100%;
            background: #212946;

            display: flex;
            align-items: center;
            justify-content: center;
        }
   `,
   ContLeft: styled.div`
        width: calc(50% - 10px);
        min-width: calc(50% - 10px);
        height: 100%;
        overflow-y: auto; //스크롤 영역  

        /* padding: 20px 40px 0; */
        /* box-sizing: border-box; */
   `,
   ContRight: styled.div`
      min-width: 30%;
      height: 100%;
      flex:1;
   `,
};
