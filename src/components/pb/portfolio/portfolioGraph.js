import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PortfolioGraph({ vipId }) {
  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [],
  });

  const colors = [
    'rgba(75, 192, 192, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(199, 199, 199, 1)',
    'rgba(83, 102, 255, 1)',
    'rgba(99, 255, 132, 1)',
    'rgba(255, 99, 255, 1)',
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://${process.env.REACT_APP_BESERVERURI}:8080/api/portfolio/graphData`,
          {
            params: {
              vipId: vipId,
            },
          }
        );

        let keys = Object.keys(res.data);
        let k = keys[0];

        let ds = [];
        let values = [];
        for (let i = 0; i < keys.length; i++) {
          let k = keys[i];
          let d = {
            label: k,
            data: res.data[k].serialValue,
            borderColor: colors[i % colors.length],
            backgroundColor: colors[i % colors.length].replace('1)', '0.2)'),
          };
          values.push(res.data[k].serialValue);
          ds.push(d);
        }

        let timeline_length = values[0].length;

        let total_values = [];
        for (let i = 0; i < timeline_length; i++) {
          let sum = 0;
          for (let j = 0; j < values.length; j++) {
            sum += values[j][i];
          }
          total_values.push(sum);
        }

        ds.push({
          label: 'Total',
          data: total_values,
          borderColor: colors[ds.length % colors.length],
          backgroundColor: colors[ds.length % colors.length].replace(
            '1)',
            '0.2)'
          ),
        });

        let gd = {
          labels: res.data[k].serialTime,
          datasets: ds,
        };
        setGraphData(gd);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [vipId]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Multi-Line Chart Example',
      },
    },
  };

  return <Line data={graphData} options={options} />;
}

export default PortfolioGraph;
