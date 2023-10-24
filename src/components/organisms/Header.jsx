import React, { useState } from "react";
import styled from "styled-components";
//ico
import Logo1 from "assets/images/header/logo.png";
import Logo2 from "assets/images/header/logo2.png";
import IcoUser from "assets/images/header/ico-user-logout-line.svg";
import { logoutFetch } from "service/api/common";

export const HeaderStyle = {
   Wrap: styled.header`
      min-width: 1256px;
      height: 65px;
      background-color: #191e32;
      box-sizing: border-box;
   `,
   Inner: styled.div`
      height: 100%;
      padding: 0 88px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
   `,
   LogoWrap: styled.div`
      display: flex;
      align-items: center;
      gap:15.5px;

   `,
   Title: styled.div`
      font-size: 1.8rem;
      font-weight: 400;
      color:#fff;
      margin: 0 auto;
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%, -50%);

   `,
   UserBtnWrap: styled.div`
       position: relative;
      > .btnLogout{
         width: 40px;
        height: 40px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:before {
            content: '';
            width: 24px;
            height: 26px;
            background: url(${IcoUser}) no-repeat center;
        }
        &:after {
            content: 'ON';
            color: #ffffff;
            font-size: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 0;
            right: -30%;
            width: 30px;
            height: 20px;
            background-color: #3d5ffc;
            border-radius: 10px;
        }
      }
      > .btnUserList{
        width: 120px;
        max-height: 0;
        opacity:0;
        border: 0 solid #0048a9;
        overflow-y: hidden;
        position: absolute;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 999;
        color: #9b9fb1;
        text-align: center;
        transition: all 0.3s;
        li {
            font-size: 16px;
            line-height: 40px;
            background: #191e32;
            border-bottom: 1px solid #1f2745;
            transition: .3s;
            a {
                width: 100%;
                display: inline-block;
            }
            &:last-child {
                border-bottom: 0;
            }
            &:hover {
                cursor: pointer;
                color: #ffffff;
                background-color: #1f2745;
            }
        }
      }
      &.active {
         > .btnUserList {
               border-width: 1px;
               opacity:1;
               max-height: 280px;
               overflow-y: visible;
               //삼각형의 테두리
               &:after {
                  border-color: #0048a9 transparent;
                  border-width: 0px 9px 9px 9px;
                  border-style: solid;
                  content: '';
                  display: inline-block;
                  position: absolute;
                  top: -9px;
                  left: 50%;
                  transform: translateX(-50%);
               }
               //삼각형
               &:before {
                  border-color: #191e32 transparent;
                  border-width: 0 9px 9px 9px;
                  border-style: solid;
                  content: '';
                  display: inline-block;
                  position: absolute;
                  top: -7px;
                  left: 50%;
                  transform: translateX(-50%);
                  z-index: 1;
               }
         }
      }
   `,
};

function Header(props) {
   const [userActive, setUserActive] = useState(false);

   // 로그아웃
   const onClickLogout = () => {
      logoutFetch();
   };

   return (
      <HeaderStyle.Wrap>
         <HeaderStyle.Inner>
            <HeaderStyle.LogoWrap>
               <img src={Logo1} alt={"DTX"} />
               <img src={Logo2} alt={"DTX"} />
            </HeaderStyle.LogoWrap>

            <HeaderStyle.Title>지하시설물 안전관리</HeaderStyle.Title>

            {/* 유저 아이콘 - 메뉴 목록 포함(로그아웃) */}
            <HeaderStyle.UserBtnWrap className={` ${userActive ? "active" : ""}`}>
               <div
                  className={"btnLogout"}
                  onClick={() => {
                     setUserActive(!userActive);
                  }}
               ></div>

               <ul className="btnUserList">
                  <li onClick={onClickLogout}>로그아웃</li>
               </ul>
            </HeaderStyle.UserBtnWrap>
         </HeaderStyle.Inner>
      </HeaderStyle.Wrap>
   );
}

export default Header;
