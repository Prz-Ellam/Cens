// import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Por demografica'
    }
  }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.random() * 1000),
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => Math.random() * 1000),
      backgroundColor: 'rgba(53, 162, 235, 0.5)'
    }
  ]
};

function Analytics() {
  return (
    <section className="h-full overflow-auto">
      <div className="w-4/5 mx-auto my-4">
        <h1 className="text-4xl text-center font-semibold mb-4 text-gray-300">
          Analiticas
        </h1>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4">
      <div className="bg-white rounded shadow-md p-4">
        <Bar data={data} options={options} />
      </div>
      <div className="bg-white rounded shadow-md p-4">
        <Bar data={data} options={options} />
      </div>
      <div className="bg-white rounded shadow-md p-4">
        <Bar data={data} options={options} />
      </div>
      <div className="bg-white rounded shadow-md p-4">
        <Bar data={data} options={options} />
      </div>
    </div>
      </div>
    </section>
  );
}

export default Analytics;
