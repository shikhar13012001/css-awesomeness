import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';
ChartJS.register(CategoryScale,TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
    fill:true,
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
  scales: {
    x: {
      display: true,
      type: 'time',
      adapters: {
        date: {
          locale: enUS,
        },
      },
      time: {
        unit: 'day',
        displayFormats: {
          day: 'dd MMM yy',
        },
      },
      title: {
        display: true,
        text: 'Data observations',
      },
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'].map((label, i) => faker.date.between('2021-01-01T00:00:00.000Z', '2021-03-01T00:00:00.000Z'))        
console.log(labels)
// export const data = {
//   labels,
  
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: 10000, max: 1000000, precision: 0.01 })),
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: 10000, max: 1000000, precision: 0.01 })),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

export default function App({data}) {
  return <Line options={options} data={data} />;
}
