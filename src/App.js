import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";

//pages
import Login from "pages/Login";
import NotFound from "pages/NotFound";
import Main from "pages/Main";
import Header from "components/organisms/Header";
import ExtraInfo from "pages/ExtraInfo";

// 로그인 전 라우터
export const LoginRoute = () => {
   return (
      <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/test" element={<>테스트</>} />
         <Route path="/*" element={<NotFound />} />
      </Routes>
   );
};

// 로그인 후 라우터
export const ContainerRoute = () => {
   return (
      <>
         {/* 헤더 */}
         <Header />
         {/*  */}
         <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/extraInfo" element={<ExtraInfo />} />
            <Route path="/*" element={<NotFound />} />
         </Routes>
      </>
   );
};

// App.js
function App() {
   return sessionStorage.getItem("token") ? <ContainerRoute /> : <LoginRoute />;
}

export default App;
