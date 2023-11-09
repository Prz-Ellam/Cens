// import React from 'react';
import axios from '@/services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Página con las analiticas de cada encuesta
 * @returns 
 */
function Analytics() {
  const optionsAge = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Por edad'
      }
    }
  };

  const optionsGender = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Por genero'
      }
    }
  };

  const colours = [
    'rgba(0, 0, 200, 0.5)',
    'rgba(200, 200, 0, 0.5)',
    'rgba(200, 0, 200, 0.5)',
    'rgba(200, 0, 0, 0.5)',
    'rgba(0, 200, 0, 0.5)',
    'rgba(0, 200, 200, 0.5)',
    'rgba(113, 17, 47, 0.5)',
    'rgba(31, 207, 135, 0.5)',
    'rgba(19, 103, 12, 0.5)',
    'rgba(162, 144, 143, 0.5)'
  ];

  const genderColours = [
    'rgba(53, 162, 235, 0.5)',
    'rgba(255, 99, 132, 0.5)',
    'rgba(0, 162, 6, 0.5)'
  ];

  const [datas, setDatas] = useState([]);
  const [ages, setAges] = useState([]);

  const fetchByGender = async () => {
    const response = await axios.get('/options');
    setDatas(response.data);
  };

  const fetchByAge = async () => {
    const response = await axios.get('/options/1');
    setAges(response.data);
  };

  useEffect(() => {
    fetchByGender();
  }, []);

  useEffect(() => {
    fetchByAge();
  }, []);

  const genderLabels = datas.map((item) => item.option);
  const genderDatasets = [];
  let i = 0;
  for (const key of Object.keys(datas[0] ?? [])) {
    if (key !== 'option') {
      const dataset = {
        label: key,
        data: datas.map((item) => item[key]),
        backgroundColor: genderColours[i],
        minBarLength: 5
      };
      genderDatasets.push(dataset);
      i++;
    }
  }

  const genderData = {
    labels: genderLabels,
    datasets: genderDatasets
  };

  const ageLabels = ages.map((item) => item.option);

  const ageDatasets = [];
  i = 0;
  for (const key of Object.keys(ages[0] ?? [])) {
    if (key !== 'option') {
      const dataset = {
        label: key,
        data: ages.map((item) => item[key]),
        backgroundColor: colours[i],
        minBarLength: 5
      };
      ageDatasets.push(dataset);
      i++;
    }
  }

  const agesData = {
    labels: ageLabels,
    datasets: ageDatasets
  };

  return (
    <section className="h-full overflow-auto">
      <div className="w-4/5 mx-auto my-4">
        <h1 className="text-4xl text-center font-semibold mb-4 text-gray-300">
          Analiticas
        </h1>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4">
          <div className="bg-white rounded shadow-md p-4">
            <Bar data={genderData} options={optionsAge} />
          </div>
          <div className="bg-white rounded shadow-md p-4">
            <Bar data={agesData} options={optionsGender} />
          </div>
          <div className="bg-white rounded shadow-md p-4">
            {/* <Bar data={genderData} options={options} /> */}
          </div>
          <div className="bg-white rounded shadow-md p-4">
            {/* <Bar data={genderData} options={options} /> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Analytics;
