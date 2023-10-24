import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// router
import { BrowserRouter } from "react-router-dom";
//react-query
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
//recoil
import { RecoilRoot } from "recoil";
import PopupJs from "components/_popup/popupjs/PopupJs";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         // staleTime: 0, // fresh 유지 시간 - 해당시간내에는 refetch 조건이어도 refetch 안일어남(캐시 효과)
         // cacheTime: 0, // unMount 이후 쿼리 inactive 시간체크, GC 로 넘어가는 시간 (캐시에서 삭제)
         refetchOnMount: true, // 새로운 화면(컴포넌트)일때
         refetchOnReconnect: false,
         refetchOnWindowFocus: false,
         retry: 0,
      },
   },
});

root.render(
   //   <React.StrictMode>
   <RecoilRoot>
      <QueryClientProvider client={queryClient}>
         {/* devtools */}
         <ReactQueryDevtools initialIsOpen={false} />
         {/* 공통팝업 */}
         {/* <PopupJs /> */}
         {/* 라우터 */}
         <BrowserRouter basename="/">
            <App />

            <PopupJs />
         </BrowserRouter>
      </QueryClientProvider>
   </RecoilRoot>,
   //   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
