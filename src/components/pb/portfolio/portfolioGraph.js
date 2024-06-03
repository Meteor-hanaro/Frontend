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
function PortfolioGraph(vipId) {
  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get('http://localhost:8080/api/portfolio/graphData', {
            params: {
              vipId: 1,
            },
          })
          .then((res) => {
            let keys = Object.keys(res.data);
            let k = keys[0];
            let timeline = res.data[k].serialTime;

            let ds = [];
            let values = [];
            for (let i = 0; i < keys.length; i++) {
              let k = keys[i];
              let d = {
                label: k,
                data: res.data[k].serialValue,
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

            // let sum_values = [];
            // values.forEach((v) => {
            //   for (let i = 0; i < v.length; i++) {
            //     if (i == 0) {
            //       sum_values.push(v[i]);
            //     } else {
            //       sum_values[i] += v[i];
            //     }
            //   }
            // });

            ds.push({
              label: 'Total',
              data: total_values,
            });

            // console.log(sum_values);

            console.log(ds[0]);
            let gd = {
              labels: res.data[k].serialTime,
              datasets: ds,
            };
            setGraphData(gd);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
