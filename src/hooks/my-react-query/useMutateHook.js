import { useMutation, useQueryClient } from "react-query";

import usePopup from "components/_popup/popupjs/hook/usePopup";

// hook - useMutation
// 성공 & 실패 - 결과 팝업 오픈
export default function useMutateHook({ fetchApi, title, successText, invalidQuery, errorText }) {
   const { addPopup, removeCurrentPopup } = usePopup(); //결과 팝업
   const queryClient = useQueryClient();

   return useMutation(fetchApi, {
      onSuccess: async (data) => {
         // 쿼리 무효화가 필요할때 (invalidQuery : 쿼리 배열)
         if (invalidQuery) {
            await invalidQuery?.map((key) =>
               queryClient.invalidateQueries(key, { refetchInactive: true }),
            );
         }

         // 성공 알림창 띄우고싶을때
         if (successText) {
            removeCurrentPopup(); // 기존 닫기
            addPopup({
               key: null,
               data: {
                  type: "simple",
                  text: successText,
               },
            });
         }
      },
      onError: (error) => {
         // mutation 이 에러가 났을 경우 error를 받을 수 있다.
         // console.log("onError ---", error);

         removeCurrentPopup(); // 기존 닫기
         // 에러 알림창 오픈
         addPopup({
            key: null,
            data: {
               type: "simple",
               text: `${error?.response?.data?.message || errorText}`,
            },
         });
      },
   });
}
