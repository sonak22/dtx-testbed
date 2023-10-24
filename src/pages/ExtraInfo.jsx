import React from "react";
import { PageStyle } from "./_style";
import SubHeader from "components/organisms/SubHeader";
import useQueryState from "hooks/my-react-query/useQueryState";
import { QueryKeys } from "hooks/my-react-query/QueryKeys";
import { getExtraInfo } from "service/api/common";
import { styled } from "styled-components";
import IcoLayer from "assets/images/common/ico-layer.svg";

// 기타 정보
export const ExtraInfoStyle = {
   ContentWrap: styled(PageStyle.ContentHeaderWrap)`
      width: 100%;
      div.contentHeaderWrap {
           div.header {
               &:before {
                  background-image: url(${IcoLayer});
               }
           }
       }
       div.contentList {
           padding: 24px 30px 0 40px;
           font-size: 16px;
           ul {
               display: flex;
               flex-direction: column;
               gap: 10px;
               li {
                   height: 44px;
                   display: flex;
                   gap: 8px;
                   align-items: center;
                   justify-content: space-between;
                   position: relative;
                   span {
                        color: #ffffff;
                       font-size: 1.6rem;
                       text-align: right;
                   }
                   span.title{
                     color: #7177a8;
                   }
               }
           }
       }
   `,
   ContentLeft: styled.div`
       width: 50%; // 왼쪽 반만
       height: 100%;
       border-right: 1px solid #40526b;
   `,
   ContentRight: styled.div`
      width: 50%; 
   `,
};

// 기타 정보 화면
function ExtraInfo(props) {
   const siteId = JSON.parse(sessionStorage.getItem("userInfo"))?.siteId;

   // React Query
   const { data } = useQueryState(QueryKeys.getPipeDetail(siteId), () => getExtraInfo({ siteId }), {
      enabled: !!siteId,
   }); // 기타 정보 데이터 요청

   return (
      <div id="page">
         <PageStyle.Background></PageStyle.Background>
         <PageStyle.WrapInner>
            <PageStyle.Box>
               <PageStyle.SubHeader>
                  {/* 헤더 - 기타정보  */}
                  <SubHeader.ExtraInfo />
               </PageStyle.SubHeader>
               <PageStyle.ContWrap>
                  <ExtraInfoStyle.ContentWrap>
                     <ExtraInfoStyle.ContentLeft>
                        <div className="contentHeaderWrap">
                           <div className="header">{"사업 정보"}</div>
                        </div>
                        <div className="contentList">
                           <ul>
                              {/* <li>
                                 <span className="title">{"현장 ID"}</span>
                                 <span>{data?.siteId}</span>
                              </li> */}
                              <li>
                                 <span className="title">{"사업명"}</span>
                                 <span>{data?.siteName}</span>
                              </li>
                              <li>
                                 <span className="title">{"내역사업명"}</span>
                                 <span>{data?.info1}</span>
                              </li>
                              <li>
                                 <span className="title">{"중앙행정기관명"}</span>
                                 <span>{data?.info2}</span>
                              </li>
                              <li>
                                 <span className="title">{"전문기관명"}</span>
                                 <span>{data?.info3}</span>
                              </li>
                              <li>
                                 <span className="title">{"총괄연구개발명"}</span>
                                 <span>{data?.info4}</span>
                              </li>
                              <li>
                                 <span className="title">{"연구개발과제명"}</span>
                                 <span>{data?.info5}</span>
                              </li>
                              <li>
                                 <span className="title">{"연구개발기간"}</span>
                                 <span>
                                    {data?.startDate} ~ {data?.endDate}
                                 </span>
                              </li>
                           </ul>
                        </div>
                     </ExtraInfoStyle.ContentLeft>
                     {/* <div className="right">
                     <div className="contentHeaderWrap">
                        <div className="header">{"사용자 정보"}</div>
                     </div>
                     <div className="contentList">
                        <ul>
                           <li>
                              <span className="title">아이디</span>
                              <span>1234</span>
                           </li>
                        </ul>
                     </div>
                  </div> */}
                  </ExtraInfoStyle.ContentWrap>
               </PageStyle.ContWrap>
            </PageStyle.Box>
         </PageStyle.WrapInner>
      </div>
   );
}

export default ExtraInfo;
