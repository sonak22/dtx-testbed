import { useLayoutEffect, useState } from "react";
import { useQuery } from "react-query";

export default function useQueryState(key, fetchApi, options) {
   const { data, refetch } = useQuery(key, fetchApi, options);
   const [propData, setPropData] = useState(null);

   // query 요청한 data -> 바로 Dom에 사용시 깜빡임 현상
   // ex) data.map((ele) => <div>{ele.id}</div>)
   // 개선책 _ useLayoutEffect
   useLayoutEffect(() => {
      if (data) {
         setPropData(data);
      }
   }, [data]);

   return { data: propData, refetch };
}

// 기본 react-query -> re-rendering
// useEffect(setState) -> re-rendering
