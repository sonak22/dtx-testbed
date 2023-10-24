import React from "react";
//recoil
import { useRecoilValue } from "recoil";
import { SimplePopup, BasicPopup, TwoBtnPopup } from "./component/PopupType.jsx"; // 기본

import popupState from "./state/popupState.js";

// 팝업 컴포넌트
function PopupJs() {
   const popupList = useRecoilValue(popupState); // Recoil state

   // type에 따라 해당 팝업 스타일 컴포넌트를 리턴해준다.
   const filterPopup = (props, index) => {
      const {
         key,
         data: { type },
      } = props;

      //   console.log(String(key) + index);

      if (type === "simple") {
         return <SimplePopup key={String(key) + index} {...props} />;
      }

      if (type === "basic") {
         return <BasicPopup key={String(key) + index} {...props} />;
      }
      if (type === "twoBtn") {
         return <TwoBtnPopup key={String(key) + index} {...props} />;
      }

      return null;
   };

   return <>{popupList.map((props, index) => filterPopup(props, index))}</>;
}

export default PopupJs;
