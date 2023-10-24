import React, { useLayoutEffect } from "react";

import { LineChartStyle } from "./_style";
import ApexCharts from "apexcharts";

const lineChartOptions = () => {
   const graphData = [null, 3, 4, 1, 3, 4, 6, null];
   return {
      states: {
         hover: {
            filter: {
               type: "none",
            },
         },
         active: {
            allowMultipleDataPointsSelection: false,
            filter: {
               type: "none",
            },
         },
      },
      chart: {
         parentHeightOffset: 0,
         width: "100%",
         height: 280,
         type: "line",
         stacked: false,
         toolbar: {
            show: false,
         },
         zoom: {
            enabled: false,
         },
         animations: {
            easing: "linear",
            speed: 300,
         },
      },
      dataLabels: {
         enabled: false,
      },
      colors: ["#3f90ef", "#eb6e16", "#8742e5", "#4647db", "#1aa8a3"],
      series: [
         {
            name: "방식전위(DC)",
            data: [...graphData],
         },
         //동시에 여러 라인 데이터 있으면 {name:'', data:[]} 여러개
      ],

      annotations: {
         points: [
            {
               x: "08.01",
               y: 3,
               marker: {
                  size: 4,
                  fillColor: "#3f90ef",
                  strokeColor: "transparent",
                  radius: 2,
                  cssClass: "apexcharts-custom-class",
               },
            },
            {
               x: "08.05",
               y: 4,
               marker: {
                  size: 4,
                  fillColor: "#3f90ef",
                  strokeColor: "transparent",
                  radius: 2,
                  cssClass: "apexcharts-custom-class",
               },
            },
            {
               x: "08.09",
               y: 1,
               marker: {
                  size: 4,
                  fillColor: "#3f90ef",
                  strokeColor: "transparent",
                  radius: 2,
                  cssClass: "apexcharts-custom-class",
               },
            },
            {
               x: "08.13",
               y: 3,
               marker: {
                  size: 4,
                  fillColor: "#3f90ef",
                  strokeColor: "transparent",
                  radius: 2,
                  cssClass: "apexcharts-custom-class",
               },
            },
            {
               x: "08.17",
               y: 4,
               marker: {
                  size: 4,
                  fillColor: "#3f90ef",
                  strokeColor: "transparent",
                  radius: 2,
                  cssClass: "apexcharts-custom-class",
               },
            },
            {
               x: "08.21",
               y: 6,
               marker: {
                  size: 4,
                  fillColor: "#3f90ef",
                  strokeColor: "transparent",
                  radius: 2,
                  cssClass: "apexcharts-custom-class",
               },
            },
         ],
      },
      xaxis: {
         // categories: graphData ? graphData?.time : [],
         categories: ["", "08.01", "08.05", "08.09", "08.13", "08.17", "08.21", ""],
         labels: {
            show: true,
            style: {
               colors: "#fff",
            },
         },
         axisTicks: {
            show: false,
         },
         axisBorder: {
            show: true,
            color: "#fff",
            height: 1,
            width: "100%",
            offsetX: 0,
            offsetY: 0,
         },
      },
      yaxis: [
         // 왼쪽 Y축
         {
            min: 0,
            tickAmount: 5, //전체 데이터 개수만큼

            // seriesName: 'depth', // 심도 항목만
            // reversed: true, // 역방향 그래프 모양
            labels: {
               style: {
                  colors: "#5e5e5e",
               },
            },
            axisTicks: {
               show: false,
               // color: '#5e5e5e',
            },
            axisBorder: {
               show: false,
               // width: 1,
               // color: '#5e5e5e',
            },
            tooltip: {
               enabled: true,
               offsetX: 0,
            },
         },
      ],

      stroke: {
         width: 3,
         curve: "smooth",
      },
      plotOptions: {
         bar: {
            // columnWidth: '20%',
         },
      },
      grid: {
         show: true,
         borderColor: "#5e5e5e",
         strokeDashArray: 3,
         position: "back",
         xaxis: {
            lines: {
               show: false,
            },
         },
         yaxis: {
            lines: {
               show: true,
            },
         },
      },
      tooltip: {
         enabled: false,
      },
      legend: {
         show: false,
      },
   };
};

function LineChart(props) {
   /* Line chart 그리기 - useLayoutEffect : 뷰 깜빡이는 현상 있을때 사용 */
   useLayoutEffect(() => {
      const lineChartDom = document.getElementById("lineChart");
      const data = {}; // calendar 선택한 날짜의 앞,뒤 3일치 데이터 전달하기
      if (lineChartDom) {
         const chart = new ApexCharts(lineChartDom, lineChartOptions());
         chart.render();
         chart.updateOptions(lineChartOptions());
      }
   }, []);

   return (
      <>
         <LineChartStyle.Wrap>
            <div className="contentHeaderWrap">
               <div className="header">방식 전위 히스토리</div>
               <p className="helpText">
                  <span>* </span>
                  최근 30일의 전압값을 표출합니다.
               </p>
            </div>
            <LineChartStyle.ChartWrap>
               <div id="lineChart"></div>
            </LineChartStyle.ChartWrap>
         </LineChartStyle.Wrap>
      </>
   );
}

export default React.memo(LineChart);
