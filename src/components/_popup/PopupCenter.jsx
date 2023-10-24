import React from "react";
import { PopupCenterStyle, PopupStyle } from "./_style";

function PopupCenter({ width, height, src, title, close, children, leftText, rightText, leftFunc, rightFunc }) {
   return (
      <>
         <PopupCenterStyle.Dimmed>
            <PopupCenterStyle.Wrap width={width} height={height}>
               <PopupCenterStyle.Head>
                  <PopupStyle.Title src={src}>{title}</PopupStyle.Title>
                  <PopupStyle.Close type={"button"} onClick={close}>
                     <span className={"hidden"}>닫기</span>
                  </PopupStyle.Close>
               </PopupCenterStyle.Head>
               <PopupCenterStyle.Cont>{children && children}</PopupCenterStyle.Cont>
               {leftText && (
                  <PopupCenterStyle.FooterWrap>
                     {leftFunc && <button onClick={leftFunc}>{leftText}</button>}
                     {rightFunc && <button onClick={rightFunc}>{rightText}</button>}
                  </PopupCenterStyle.FooterWrap>
               )}
            </PopupCenterStyle.Wrap>
         </PopupCenterStyle.Dimmed>
      </>
   );
}

export default PopupCenter;
