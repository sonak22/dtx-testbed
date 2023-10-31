import React, { useEffect, useLayoutEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import { isEmpty } from "lodash";
import moment from "moment/moment";
import { CusTooltip, LegendArea, LineChartStyle, SwitchBtn } from "./_style";
import useQueryState from "hooks/my-react-query/useQueryState";
import { QueryKeys } from "hooks/my-react-query/QueryKeys";
import { getHistoryOptical, getHistoryPP, getHistoryWaves } from "service/api/common";
import { PageStyle } from "pages/_style";

//커스텀 툴팁 컴포넌트
const CustomTooltip = ({ active, payload, label }) => {
   if (active && payload && payload.length) {
      return (
         <CusTooltip.Wrap>
            <CusTooltip.XAxis>{moment(label).format("MM.DD")}</CusTooltip.XAxis>
            {payload.map((item, index) => {
               return (
                  <CusTooltip.Text key={index}>
                     <CusTooltip.Dot style={{ backgroundColor: payload[index].stroke }}></CusTooltip.Dot>
                     {item.value}
                  </CusTooltip.Text>
               );
            })}
         </CusTooltip.Wrap>
      );
   }

   return null;
};

//커스텀 범례 컴포넌트
const LegendList = ({ dcacData, list, onChange }) => {
   if (!isEmpty(dcacData)) {
      return (
         <LegendArea.Wrap>
            {dcacData.map((item, i) => {
               const smartPipeNo = item.smartPipeNo; // smartPipeNo : 1,2,3,4
               const listIndex = smartPipeNo - 1; // 0,1,2,3

               return (
                  <LegendArea.Item onClick={() => onChange(listIndex)} key={i} color={list[listIndex]?.color}>
                     <p>스마트파이프번호: {smartPipeNo}</p>
                  </LegendArea.Item>
               );
            })}
         </LegendArea.Wrap>
      );
   }
   return (
      <LegendArea.Wrap>
         {list.map(({ name, active }, i) => {
            return (
               <LegendArea.Item onClick={() => onChange(name)} key={i}>
                  <p>{name}</p>
               </LegendArea.Item>
            );
         })}
      </LegendArea.Wrap>
   );
};

//x축 포맷
export const customTick = (props) => {
   const { x, y, stroke, payload } = props;
   // console.log(payload);
   // console.log(dates);
   // if (!dates.includes(payload.value)) {
   //     return <g></g>;
   // } else {
   return (
      <g transform={`translate(${x},${y})`}>
         <text x={0} y={0} dy={16} textAnchor="middle" fill="#fff">
            {moment(payload.value).format("MM.DD")}
         </text>
      </g>
   );
   // }
};

const dcacData_test = [
   {
      detNum: 1,
      ppList: [
         { date: "2022-12-01", dc: 5, ac: 0 },
         { date: "2022-12-04", dc: 5, ac: 5 },
         { date: "2022-12-05", dc: 5, ac: -5 },
         { date: "2022-12-06", dc: 5, ac: 0 },
         { date: "2022-12-07", dc: 5, ac: 5 },
         { date: "2022-12-16", dc: 5, ac: 0 },
         { date: "2022-12-18", dc: 5, ac: 5 },
         { date: "2022-12-20", dc: 5, ac: -5 },
         { date: "2022-12-22", dc: 5, ac: 0 },
         { date: "2022-12-24", dc: 5, ac: 5 },
         { date: "2022-12-26", dc: 5, ac: -5 },
         { date: "2022-12-28", dc: 5, ac: 0 },
         { date: "2022-12-30", dc: 5, ac: 2 },
      ],
   },
   {
      detNum: 2,
      ppList: [
         { date: "2022-12-01", dc: 4, ac: 0 },
         { date: "2022-12-04", dc: 4, ac: 3 },
         { date: "2022-12-05", dc: 4, ac: -3 },
         { date: "2022-12-06", dc: 4, ac: 0 },
         { date: "2022-12-07", dc: 4, ac: 3 },
         { date: "2022-12-16", dc: 4, ac: 0 },
         { date: "2022-12-18", dc: 4, ac: 3 },
         { date: "2022-12-20", dc: 4, ac: -3 },
         { date: "2022-12-22", dc: 4, ac: 0 },
         { date: "2022-12-24", dc: 4, ac: 3 },
         { date: "2022-12-26", dc: 4, ac: -5 },
         { date: "2022-12-28", dc: 4, ac: 0 },
         { date: "2022-12-30", dc: 4, ac: -3 },
      ],
   },
   {
      detNum: 3,
      ppList: [
         { date: "2022-12-01", dc: 3, ac: -2 },
         { date: "2022-12-04", dc: 3, ac: 7 },
         { date: "2022-12-05", dc: 3, ac: -2 },
         { date: "2022-12-06", dc: 3, ac: 0 },
         { date: "2022-12-07", dc: 3, ac: 5 },
         { date: "2022-12-16", dc: 3, ac: -2 },
         { date: "2022-12-18", dc: 3, ac: 7 },
         { date: "2022-12-20", dc: 3, ac: -2 },
         { date: "2022-12-22", dc: 3, ac: 0 },
         { date: "2022-12-24", dc: 3, ac: 5 },
         { date: "2022-12-26", dc: 3, ac: -5 },
         { date: "2022-12-28", dc: 3, ac: 5 },
         { date: "2022-12-30", dc: 3, ac: -5 },
      ],
   },
];

// TEST: type [optical] - 광센서
const testData = [
   {
      pipeId: 3,
      smartPipeNo: 1,
      opticalList: [
         {
            date: "2023-09-13",
            optical: 10,
         },
         {
            date: "2023-09-14",
            optical: 20,
         },
         {
            date: "2023-09-15",
            optical: null,
         },
         {
            date: "2023-09-16",
            optical: 40,
         },
         {
            date: "2023-09-17",
            optical: 30,
         },
      ],
   },
];

export const fetchApiByType = (type, siteId) => (type === "pp" ? () => getHistoryPP({ siteId }) : type === "optical" ? () => getHistoryOptical({ siteId }) : type === "waves" ? () => getHistoryWaves({ siteId }) : () => {});

function LineChartRechartTest({ title = "차트 제목", type }) {
   const siteId = JSON.parse(sessionStorage.getItem("userInfo"))?.siteId;

   const [chartType, setChartType] = useState("dc"); // ac, dc 선택

   const [list, setList] = useState([
      { name: "장치1", active: true, color: "#3f90ef" },
      { name: "장치2", active: true, color: "#eb6e16" },
      { name: "장치3", active: true, color: "#8742e5" },
      { name: "장치4", active: true, color: "#1aa8a3" },
      { name: "장치5", active: true, color: "#4647db" },
      { name: "장치6", active: true, color: "#de39eb" },
      { name: "장치7", active: true, color: "#676767" },
      { name: "장치8", active: true, color: "#9a5f10" },
      { name: "장치9", active: true, color: "#3cb6e3" },
   ]); // 범례 리스트

   // React Query
   const { data: chartData, refetch } = useQueryState(QueryKeys.getHistoryType(type, siteId), fetchApiByType(type, siteId), {
      enabled: !!siteId,
   });
   const { smartPipeList = [] } = chartData || {};

   //범례 클릭이벤트
   const onChange = (listIndex) => {
      let newArr = [...list];

      newArr.filter((ele, idx) => idx === listIndex)[0].active = !newArr.filter((ele, idx) => idx === listIndex)[0].active;

      setList(newArr);
   };

   // console.log(smartPipeList);

   return (
      <>
         <LineChartStyle.Wrap>
            <LineChartStyle.HeaderWrap>
               <div className="contentHeaderWrap">
                  <div className="header">{title}</div>
               </div>
            </LineChartStyle.HeaderWrap>

            <div style={{ padding: "0 20px 40px 40px" }}>
               {/* 차트 종류 선택 버튼 -> 방식전위 차트 일때만*/}
               {type === "pp" && (
                  <SwitchBtn.Wrap>
                     <div className="typeBtnWrap">
                        <button className={`typeBtn ${chartType === "dc" ? "active" : ""} `} onClick={() => setChartType("dc")}>
                           방식 전위(DC)
                        </button>
                        <button className={`typeBtn ${chartType === "ac" ? "active" : ""} `} onClick={() => setChartType("ac")}>
                           방식 전위(AC)
                        </button>
                     </div>
                  </SwitchBtn.Wrap>
               )}

               {/* 범례 */}
               <LegendList dcacData={testData} list={list} onChange={onChange} />

               {/* 라인 차트 */}
               <LineChartStyle.ChartWrap>
                  <ResponsiveContainer width={"100%"} height={284}>
                     <LineChart data={testData}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={"#494d50"} />
                        <XAxis
                           dataKey={"date"}
                           allowDuplicatedCategory={false}
                           padding={{ left: 37, right: 37 }}
                           tickLine={false}
                           axisLine={{ stroke: "#fff" }}
                           tick={(p) => customTick(p)}
                           // tickCount={5}
                        />
                        <YAxis tickCount={10} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} />

                        {!isEmpty(testData)
                           ? testData?.map((detData, i) => (
                                <Line
                                   //   r={0}
                                   key={i}
                                   data={type === "optical" ? detData?.opticalList : []}
                                   dataKey={type === "pp" ? chartType : type} //'dc','ac'
                                   type="monotone"
                                   strokeWidth={2}
                                   //   stroke={list[i].color}
                                   //   fill={list[i].color}
                                   //   hide={!list[i].active}
                                   stroke={list[detData?.smartPipeNo - 1].color}
                                   fill={list[detData?.smartPipeNo - 1].color}
                                   hide={!list[detData?.smartPipeNo - 1].active}
                                />
                             ))
                           : null}
                     </LineChart>
                  </ResponsiveContainer>
               </LineChartStyle.ChartWrap>
            </div>
         </LineChartStyle.Wrap>
      </>
   );
}

export default LineChartRechartTest;
