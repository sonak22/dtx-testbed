import { useRecoilState } from "recoil";
import popupState from "../state/popupState";

export default function usePopup() {
   const [popupList, setPopupList] = useRecoilState(popupState);

   // 보여줄 팝업 추가 - 중첩 가능
   const addPopup = ({ key, data }) => {
      setPopupList((prev) => {
         let newModalList = [...prev];
         newModalList.push({ key, data }); // 추가
         return newModalList;
      });
   };

   // 닫기 이벤트
   const removeCurrentPopup = () => {
      setPopupList((prev) => {
         let newModalList = [...prev];
         newModalList.pop(); // 마지막 항목 삭제
         return newModalList;
      });
   };

   return {
      addPopup,
      removeCurrentPopup,
   };
}
