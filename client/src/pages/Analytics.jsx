// import React from 'react';
import axios from '@/services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { useCallback, useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { useNavigate, useParams } from 'react-router-dom';
import { allCountries } from '../utils/countries';
import Swal from 'sweetalert2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

/**
 * Página con las analiticas de cada encuesta
 * @returns
 */
function Analytics() {
  const { pollId } = useParams();
  const navigate = useNavigate();

  const ageOptions = {
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

  const genderOptions = {
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

  const countryOptions = {
    type: 'doughnut',
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Pos paises'
        }
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

  const [gender, setGender] = useState([]);
  const [ages, setAges] = useState([]);
  const [countries, setCountries] = useState([]);

  const fetchPoll = useCallback(async () => {
    try {
      await axios.get(`/polls/${pollId}`);
    } catch (error) {
      console.error('Error fetching poll');
      navigate('/');
    }
  }, [pollId, navigate]);

  const fetchByGender = useCallback(async () => {
    try {
      const response = await axios.get(`/options/gender/${pollId}`);
      setGender(response.data);
    } catch (error) {
      const errorText = axios.isAxiosError(error)
        ? error.response.data.message
        : 'Error inesperado';
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: errorText
      });
    }
  }, [pollId]);

  const fetchByAge = useCallback(async () => {
    try {
      const response = await axios.get(`/options/age/${pollId}`);
      setAges(response.data);
    } catch (error) {
      const errorText = axios.isAxiosError(error)
        ? error.response.data.message
        : 'Error inesperado';
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: errorText
      });
    }
  }, [pollId]);

  const fetchByCountry = useCallback(async () => {
    try {
      const response = await axios.get(`/options/country/${pollId}`);
      setCountries(response.data);
    } catch (error) {
      const errorText = axios.isAxiosError(error)
        ? error.response.data.message
        : 'Error inesperado';
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: errorText
      });
    }
  }, [pollId]);

  const genderLabels = gender.map((item) => item.option);
  const genderDatasets = [];
  let i = 0;
  for (const key of Object.keys(gender[0] ?? [])) {
    if (key !== 'option') {
      const dataset = {
        label: key,
        data: gender.map((item) => item[key]),
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
  const ageData = {
    labels: ageLabels,
    datasets: ageDatasets
  };

  const countryLabels = countries.map(
    ({ country }) => allCountries[country] ?? 'Desconocido'
  );
  const countryData = {
    labels: countryLabels,
    datasets: [
      {
        label: 'Paises',
        data: countries.map(({ percentage }) => percentage),
        backgroundColor: colours.map((colour) => colour)
      }
    ]
  };

  useEffect(() => {
    fetchPoll();
  }, [fetchPoll]);

  useEffect(() => {
    fetchByGender();
  }, [fetchByGender]);

  useEffect(() => {
    fetchByAge();
  }, [fetchByAge]);

  useEffect(() => {
    fetchByCountry();
  }, [fetchByCountry]);

  return (
    <section className="h-full overflow-auto">
      <div className="w-4/5 mx-auto my-4">
        <h1 className="text-4xl text-center font-semibold mb-4 text-gray-300">
          Analiticas
        </h1>
        <div className="grid grid-cols-2 grid-rows-1 gap-4 p-4 h-100">
          <div className="bg-white rounded shadow-md p-4">
            <Bar data={genderData} options={ageOptions} />
          </div>
          <div className="bg-white rounded shadow-md p-4">
            <Bar data={ageData} options={genderOptions} />
          </div>
          <div className="bg-white rounded shadow-md p-4">
            <Doughnut data={countryData} options={countryOptions} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Analytics;
