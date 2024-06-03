import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

const TrafficChart = ({ data, name }) => {
  const [chartOption, setChartOption] = useState({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        // name: "Access From",
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [],
      },
    ],
  });

  // 데이터 올때마다 option 값 수정해주는 코드
  useEffect(() => {
    setChartOption((prevOption) => ({
      ...prevOption,
      series: [
        {
          ...prevOption.series[0],
          data: data,
        },
      ],
    }));
  }, [data]);

  return (
    <div className="container">
      <div className="card-body pb-0">
        <h5 className="card-title">{name}</h5>
        <ReactECharts
          option={chartOption}
          style={{ height: 300, width: '100%' }}
        />
      </div>
    </div>
  );
};

export default TrafficChart;
