import { useState, useCallback } from "react";

/* custom hook 만들기 */
function useInputArea(initialForm) {
   const [form, setForm] = useState(initialForm);

   // change
   const onChange = (e, str) => {
      if (str) {
         const { ariaValueText } = e.target; // li 태그 (select 박스)
         setForm({
            ...form,
            [str]: ariaValueText,
         });
      } else {
         const { name, value } = e.target;
         setForm({
            ...form,
            [name]: value,
         });
      }
   };

   //모든 input => form 초기화
   const resetAll = useCallback(() => setForm(initialForm), [initialForm]);

   //특정 input 초기화
   const resetOne = useCallback((name) => {
      setForm((prev) => {
         return { ...prev, [name]: "" };
      });
   }, []);

   // date picker 일때
   const onChangeDate = useCallback((value, name) => {
      setForm((prev) => ({
         ...prev,
         [name]: value,
      }));
   }, []);

   return [form, setForm, onChange, resetAll, resetOne, onChangeDate];
}

export default useInputArea;
