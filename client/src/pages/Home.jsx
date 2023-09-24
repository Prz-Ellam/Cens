import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import SurveyForm from '../components/SurveyForm';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
export default function Home({ className }) {
  const [close, setClose] = useState(true);

  let [polls, setPolls] = useState([]);
  const [options] = useState([]);

  useEffect(() => {
    axios('/api/v1/polls', {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjk1NDk5MjY5LCJleHAiOjE2OTgwOTEyNjl9.A7yURrk3ot3dJbpgn8DZBRidp6G_J6hJbrFPxq0JN40`
      }
    }).then((response) => {
      setPolls(response.data);
    });
  }, []);

  return (
    <section className={className}>
      <div className="flex">
        <div className="md:w-2/3 w-full p-3">
          <div className="rounded-lg bg-accent shadow-lg text-white mb-5">
            <div className="flex flex-row items-center p-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-full font-bold flex-shrink-0">
                <img
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                  alt="Your Image"
                  className="h-12 w-12 rounded-full"
                />
              </div>
              <div className="flex flex-col flex-grow ml-3 truncate">
                <div className="flex items-center">
                  <div className="font-bold">Nombre apellido</div>
                </div>
                <p className="text-gray-300">¿Qué deseas compartir?</p>
              </div>
            </div>
            <hr className="mx-3 text-gray-600" />
            <button
              type="button"
              className="ml-3 my-1 text-white hover:bg-gray-500 font-medium rounded-lg px-5 py-2.5 text-center"
              onClick={() => setClose(false)}
            >
              Encuesta
            </button>
          </div>

          <section className="flex flex-col gap-4 rounded-lg">
            {polls.map((poll, index) => (
              <SurveyForm
                key={index}
                id={poll.id}
                question={poll.question}
                description={poll.description}
                options={poll.options}
                name={poll.user.username}
              />
            ))}
          </section>
        </div>
        <div className="md:w-1/3 md:block hidden p-3">
          <div className="h-screen rounded-lg bg-accent text-white mb-5 p-4">
            <h2 className="text-lg font-bold">Buscar encuestas</h2>

            <div className="flex flex-row items-center py-3 hover:bg-gray-500">
              <div className="flex items-center justify-center h-12 w-12 rounded-full font-bold flex-shrink-0">
                <img
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                  alt="Your Image"
                  className="h-12 w-12 rounded-full"
                />
              </div>
              <div className="flex flex-col flex-grow ml-3 truncate">
                <div className="flex items-center">
                  <div className="text-sm font-medium">Nombre apellido</div>
                </div>
                <p className="font-bold">Título de la encuesta</p>
              </div>
            </div>

            <div className="flex flex-row items-center py-3">
              <div className="flex items-center justify-center h-12 w-12 rounded-full font-bold flex-shrink-0">
                <img
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                  alt="Your Image"
                  className="h-12 w-12 rounded-full"
                />
              </div>
              <div className="flex flex-col flex-grow ml-3 truncate">
                <div className="flex items-center">
                  <div className="text-sm font-medium">Nombre apellido</div>
                </div>
                <p className="font-bold">Título de la encuesta</p>
              </div>
            </div>

            <div className="flex flex-row items-center py-3">
              <div className="flex items-center justify-center h-12 w-12 rounded-full font-bold flex-shrink-0">
                <img
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                  alt="Your Image"
                  className="h-12 w-12 rounded-full"
                />
              </div>
              <div className="flex flex-col flex-grow ml-3 truncate">
                <div className="flex items-center">
                  <div className="text-sm font-medium">Nombre apellido</div>
                </div>
                <p className="font-bold">Título de la encuesta</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal question="Crear encuesta" close={close} setClose={setClose}>
        <div className="mb-4">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Pregunta
          </label>
          <input
            className="shadow appearance-none border rounded w-full mb-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Pregunta"
          />


          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Descripción
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Descripción"
          ></textarea>

          {options?.map((option, index) => (
            <h1 key={index}>
              A
            </h1>
          ))}

          <button>Añadir opción</button>

        </div>
      </Modal>
    </section>
  );
}
