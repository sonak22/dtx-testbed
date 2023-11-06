import React from "react";
import styled from "styled-components";
//ico
import IcoClose from "assets/images/notiArea/ico-close.svg";
import IcoWarn from "assets/images/notiArea/ico-warn.svg";
import IcoBell from "assets/images/notiArea/ico-bell.svg";
import IcoNew from "assets/images/notiArea/ico-new.svg";
import useMutateHook from "hooks/my-react-query/useMutateHook";
import { postSensorNotiSingle } from "service/api/common";
import { QueryKeys } from "hooks/my-react-query/QueryKeys";
import { isEmpty } from "lodash";

export const NotiAreaStyle = {
   Wrap: styled.div`
      position: fixed;
      top: 65px;
      right:88px;
      width: 480px;
      height: 700px;
      z-index: 9999;
   `,
   Header: styled.h1`
      padding: 28px 30px;
      text-align: center;
      color:#fff;
      font-size: 20px;
      font-weight: 400;
      background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.39), rgba(0, 0, 0, 1));
      border-bottom: 1px solid #1a1a1a;
      .closeBtn{
         float: right;
         width: 32px;
         height: 32px;
         display: block;
         background: url(${IcoClose}) no-repeat center;
         cursor: pointer;
      }
   `,
   ContWrap: styled.div`
      width: 100%;
      height: auto;
      /* min-height: 260px;
      max-height: 620px; */
      background-color:#000;
      ul{
         height: 620px;
         padding: 10px 16px 16px 0;
         box-sizing: border-box;
         overflow: auto;
         li{

         }
      }
   `,
   LI: styled.li`
       width: 100%;
       /* height: 80px; */
       min-height: 80px;
       padding:20px 24px;
       box-sizing: border-box;
       border-bottom: 1px solid #1a1a1a;
       display: flex;
       gap: 17.5px;
       cursor: pointer;
       &:hover{
         background-color: #30333f;
       }
      
      // 아이콘영역
      .icoWrap{
         flex-shrink: 0;
         width: 41px;
         height: 41px;
         display: block;
         border: 2px solid #1a1a1a;
         box-sizing: border-box;
         display: flex;
         align-items: center;
         justify-content: center;
         
         .newIco{
            position: absolute;
            top:-6px;
            left:-3px;
            width:16px;
            height:16px;
            display: inline-block;
            background: url(${IcoNew}) no-repeat center;
         }
         .ico{
            width:24px;
            height:24px;
            display: inline-block;
            background: url(${IcoWarn}) no-repeat center;
         }
         // 삼각형 영역
         position: relative;
         &::before{
            content: "";
            position: absolute;
            bottom: 0px;
            right: 0px;
            width: 0;
            height: 0;
            /* border-left: 50px solid transparent; */
            border-right: 12px solid #1a1a1a;
            border-top: 12px solid transparent;
         }
         &::after{
            content: "";
            position: absolute;
            bottom: -2px;
            right: -2px;
            width: 0;
            height: 0;
            border-right: 12px solid #000;
            border-top: 12px solid transparent;
         }
      }
    // 내용 영역
    .textWrap{
      width: 100%;
      /* height: 100%; */
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color:#fff;
      font-weight: 400;
      .title{
         color:#f25858;
         font-weight: 500;
         span{
            color: rgba(255,255,255,0.6);
            float: right;
         }
      }
    }
   `,
   NullWrap: styled.div`
      height: 260px;
      font-weight: bold;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap:16px;
      p{
         color:#7177a8;
         font-size: 1.6rem;
      }
   `,
};
function NotiArea({ setOpenNoti, notiData }) {
   const siteId = JSON.parse(sessionStorage.getItem("userInfo"))?.siteId;

   const { mutate: sensorNotiSingleMutate } = useMutateHook({
      fetchApi: postSensorNotiSingle,
      invalidQuery: [QueryKeys.getNoti(siteId)],
   }); // 알림 읽음 처리 - 개별

   // 알림 클릭 - 읽음처리
   const onClickNotiRow = async (notiId) => {
      await sensorNotiSingleMutate({
         siteId,
         notiId,
      });
   };

   return (
      <NotiAreaStyle.Wrap>
         <NotiAreaStyle.Header>
            알림 <span className="closeBtn" onClick={() => setOpenNoti(false)}></span>
         </NotiAreaStyle.Header>
         <NotiAreaStyle.ContWrap>
            {/* 알림 없을 때 */}
            {isEmpty(notiData) && (
               <NotiAreaStyle.NullWrap>
                  <img src={IcoBell} alt="bell" />
                  <p>알림이 없습니다.</p>
               </NotiAreaStyle.NullWrap>
            )}

            {/* 알림 있을 때 */}
            {!isEmpty(notiData) && (
               <ul className="cScrollGray">
                  {notiData?.map((ele) => (
                     <NotiAreaStyle.LI key={ele?.notiId} onClick={() => onClickNotiRow(ele?.notiId)}>
                        <div className={`icoWrap`}>
                           {ele?.isChecked === 0 && <span className="newIco"></span>}
                           <span className="ico"></span>
                        </div>
                        <div className="textWrap">
                           <p className="title">
                              이상감지 <span>{ele?.time || "-"}</span>
                           </p>
                           <p>{ele?.msg || "-"}</p>
                        </div>
                     </NotiAreaStyle.LI>
                  ))}
               </ul>
            )}
         </NotiAreaStyle.ContWrap>
      </NotiAreaStyle.Wrap>
   );
}

export default NotiArea;
