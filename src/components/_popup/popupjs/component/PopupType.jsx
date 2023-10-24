import React, { useEffect } from "react";
import usePopup from "../hook/usePopup";
// style
import { PopupStyle, SimplePopupStyle } from "../style";

// 심플 팝업 - Text & 하단 닫기 버튼만 존재
export function SimplePopup(props) {
   const { text = "확인버튼을 누르세요." } = props.data;
   const { removeCurrentPopup } = usePopup();

   return (
      <PopupStyle.Dimmed>
         <PopupStyle.Wrap>
            <SimplePopupStyle.Box>
               <SimplePopupStyle.Cont>
                  <div className="message">{text}</div>
                  <div className="btnWrap">
                     <button onClick={removeCurrentPopup}>{"확인"}</button>
                  </div>
               </SimplePopupStyle.Cont>
            </SimplePopupStyle.Box>
         </PopupStyle.Wrap>
      </PopupStyle.Dimmed>
   );
}

// 기본 팝업 - 단순 창 닫기
export function BasicPopup(props) {
   const { title = "알림", text = "", src } = props.data;
   const { removeCurrentPopup } = usePopup();

   // console.log('BasicPopup : ', props);
   return (
      <PopupStyle.Dimmed>
         <PopupStyle.Wrap>
            <PopupStyle.Box>
               <PopupStyle.Head>
                  <PopupStyle.Title src={src}>{title}</PopupStyle.Title>
                  <PopupStyle.Close type={"button"} onClick={removeCurrentPopup}>
                     <span className={"hidden"}>닫기</span>
                  </PopupStyle.Close>
               </PopupStyle.Head>
               <PopupStyle.Cont>
                  <div className="message">{text}</div>
                  <PopupStyle.Dashed>
                     <div></div>
                  </PopupStyle.Dashed>
                  <div className="btnWrap">
                     <button onClick={removeCurrentPopup}>{"확인"}</button>
                  </div>
               </PopupStyle.Cont>
            </PopupStyle.Box>
         </PopupStyle.Wrap>
      </PopupStyle.Dimmed>
   );
}

// 버튼 2개 팝업 - twoBtn (simple)
export function TwoBtnPopup(props) {
   const { text = "", leftText = "닫기", rightText = "확인", leftFunc, rightFunc } = props.data;
   const { removeCurrentPopup } = usePopup();

   return (
      <PopupStyle.Dimmed>
         <PopupStyle.Wrap>
            <SimplePopupStyle.Box>
               <SimplePopupStyle.Cont>
                  <div className="message">{text}</div>

                  <div className="btnWrap">
                     <button
                        onClick={async () => {
                           if (leftFunc) {
                              await leftFunc();
                           }
                           removeCurrentPopup();
                        }}
                     >
                        {leftText}
                     </button>
                     <button
                        onClick={async () => {
                           if (rightFunc) {
                              await rightFunc();
                           }
                           removeCurrentPopup();
                        }}
                     >
                        {rightText}
                     </button>
                  </div>
               </SimplePopupStyle.Cont>
            </SimplePopupStyle.Box>
         </PopupStyle.Wrap>
      </PopupStyle.Dimmed>
   );
}
