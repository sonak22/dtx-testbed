import React, { useState } from "react";
import { omitBy } from "lodash";
import { LoginStyle } from "./_style";
//ico
import Logo from "assets/images/login/logo.png";
//service
import { loginFetch } from "service/api/common";
import useMutateHook from "hooks/my-react-query/useMutateHook";

function Login(props) {
   // mutate
   const { mutate } = useMutateHook({
      fetchApi: loginFetch,
      title: "로그인 알림",
      errorText: "로그인에 실패하였습니다.",
   });

   const [loginForm, setLoginForm] = useState({
      id: "",
      password: "",
   }); // 로그인 정보

   // input onChange
   const onChangeForm = (e) => {
      const strSpace = /\s/;
      const { value, name } = e.target;
      const { id, password } = loginForm;

      // 빈칸 금지, 최대 20자
      if (!strSpace.exec(value) && !(value.length > 20)) {
         setLoginForm((prev) => ({
            ...prev,
            [name]: value,
         }));
         return;
      }
   };

   // 로그인 버튼
   const onLogin = async () => {
      let mustData = omitBy(loginForm, []);
      let isReady = Object.values(mustData).every((val) => val);

      if (!isReady) {
         alert("빈 항목이 있습니다.");
         return;
      }

      let param = {
         email: loginForm.id,
         password: loginForm.password,
      };

      // 로그인 시도
      await mutate(
         { ...param },
         {
            onSuccess(data, variables, context) {
               window.location.reload();
            },
         },
      );
   };

   return (
      <>
         <LoginStyle.Wrap>
            <LoginStyle.Box>
               <LoginStyle.Logo>
                  <img className="logo" src={Logo} alt="logo" />
               </LoginStyle.Logo>

               <LoginStyle.LoginForm>
                  <input
                     name="id"
                     value={loginForm.id}
                     onChange={onChangeForm}
                     type="text"
                     placeholder={"아이디 입력"}
                  />

                  <input
                     name="password"
                     value={loginForm.password}
                     onChange={onChangeForm}
                     type="password"
                     placeholder={"비밀번호 입력"}
                  />
               </LoginStyle.LoginForm>

               <LoginStyle.LoginBtn onClick={onLogin}>Log in</LoginStyle.LoginBtn>

               <LoginStyle.Inc>Movements,Inc.</LoginStyle.Inc>
            </LoginStyle.Box>
         </LoginStyle.Wrap>
      </>
   );
}

export default Login;
