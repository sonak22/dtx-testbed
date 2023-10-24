import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

//ico
import IcoPower from "assets/images/subHeader/ico-power.svg";
import IcoBackArrow from "assets/images/subHeader/ico-back.svg";
import IcoArrow8 from "assets/images/subHeader/ico-arrow-8px.svg";

export const SubHeaderStyle = {
   BackBtnWrap: styled.div`
       width: fit-content;
            height: 100%;
            display: flex;
            align-items: center;
            gap: 12px;
            color: #fff;
            font-size: 24px;
            cursor: pointer;
            // back 화살표
            &::before {
               content: '';
               display: inline-block;
               width: 32px;
               height: 32px;
               background: url(${IcoBackArrow}) no-repeat center;
            }
            // 뒤로가기 없는 경우
            &.noBack{
               cursor: default;
               &::before{
                  background-image: url(${IcoPower});
               }
            }
   `,
   ExtraBtnWrap: styled.div`
      display: flex;
            align-items: center;
            gap: 12px;
            /* <Link/> - a태그  */
            a {
                button {
                    border: 1px solid #464850;
                    padding: 8px 10px;
                    color: #9b9fb1;
                    cursor: pointer;
                    transition: all 0.4s;
                    &.info {
                        padding-right: 22px;
                        position: relative;
                        &:before {
                            content: '';
                            display: block;
                            width: 8px;
                            height: 24px;
                            position: absolute;
                            top: 50%;
                            right: 10px;
                            transform: translateY(-50%);
                            background: url(${IcoArrow8}) no-repeat center;
                        }
                    }
                    &:hover {
                        color: #fff;
                        background: #3d5ffc;
                    }
                }
            }

   `,
};

const SubHeader = {
   // 메인 화면 (실시간 현황)
   Main: ({ updateTime }) => {
      return (
         <>
            {/* 왼쪽 버튼 */}
            <SubHeaderStyle.BackBtnWrap className="noBack">사업 현황</SubHeaderStyle.BackBtnWrap>

            {/* 오른쪽 버튼 */}
            <SubHeaderStyle.ExtraBtnWrap>
               <Link to={`/extraInfo`}>
                  <button className="info">기타 정보 확인 하기</button>
               </Link>
            </SubHeaderStyle.ExtraBtnWrap>
         </>
      );
   },
   // 기타 정보 화면
   ExtraInfo: () => {
      return (
         <>
            {/* 왼쪽 버튼 */}
            <Link to={`/`}>
               <SubHeaderStyle.BackBtnWrap>기타 정보</SubHeaderStyle.BackBtnWrap>
            </Link>
         </>
      );
   },
};

export default SubHeader;
