import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

const TrafficChart = ({ data, name }) => {
  const [chartOption, setChartOption] = useState({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      bottom: '0',
      left: '0',
    },
    series: [
      {
        // name: "Access From",
        type: 'pie',
        radius: ['30%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '15',
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
      <div className="card-body pb-0 d-flex">
        <h5 className="card-title z-1 position-absolute">{name}</h5>
        <ReactECharts
          option={chartOption}
          style={{ height: 300, width: '100%' }}
        />
      </div>
    </div>
  );
};

export default TrafficChart;
