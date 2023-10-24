import axios from "axios";

export const request = axios.create({
   baseURL: `/dtxiot`,
   headers: {
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
   },
});

/* 로그인 */
export const loginFetch = async (params) => {
   const { data } = await request.post(`/user/login`, params);

   const result = {
      ...data.datas,
   };
   sessionStorage.setItem("userInfo", JSON.stringify(result));
   sessionStorage.setItem("token", data?.datas?.token);

   return data.datas;
};

/* 로그아웃 */
export const logoutFetch = () => {
   sessionStorage.removeItem("userInfo");
   sessionStorage.removeItem("token");

   window.location.href = "/";
   // navigate("/");
   // window.location.reload();
};

/* 지도 조회 */
export const getSiteMap = async (params) => {
   const { siteId } = params;

   const { data } = await request.get(`/site/${siteId}/map`, { params: { test: "" } });

   return data.datas;
};

/* 파이프 (상세) 조회 */
export const getPipeById = async (params) => {
   const { siteId, pipeId } = params;

   const { data } = await request.get(`/site/${siteId}/pipe/${pipeId}`);

   return data.datas;
};

/* 방식전위 히스토리 조회 */
export const getHistoryPP = async (params) => {
   const { siteId } = params;

   const { data } = await request.get(`/site/${siteId}/history/pp`);

   return data.datas;
};

/* 광센서 히스토리 조회 */
export const getHistoryOptical = async (params) => {
   const { siteId } = params;

   const { data } = await request.get(`/site/${siteId}/history/optical`);

   return data.datas;
};

/* 초음파 히스토리 조회 */
export const getHistoryWaves = async (params) => {
   const { siteId } = params;

   const { data } = await request.get(`/site/${siteId}/history/waves`);

   return data.datas;
};

/* 기타 정보 조회 */
export const getExtraInfo = async (params) => {
   const { siteId } = params;

   const { data } = await request.get(`/site/${siteId}`);

   return data.datas;
};
