import { useState } from 'react';
import Modal from '../components/Modal';
import SurveyForm from '../components/SurveyForm';

// eslint-disable-next-line react/prop-types
export default function Home({ className }) {
  const [close, setClose] = useState(true);

  const polls = [
    {
      id: 1,
      title: 'Poll 1',
      description: 'Poll description 1',
      options: [
        {
          name: 'Opcion 1',
          percentage: 50
        },
        {
          name: 'Opcion 2',
          percentage: 50
        }
      ]
    },
    {
      id: 2,
      title: 'Poll 2',
      description: 'Poll description 2',
      options: [
        {
          name: 'Opcion 1',
          percentage: 33
        },
        {
          name: 'Opcion 2',
          percentage: 33
        },
        {
          name: 'Opcion 3',
          percentage: 33
        }
      ]
    },
    {
      id: 3,
      title: 'Poll 3',
      description: 'Poll description 3',
      options: [
        {
          name: 'Opcion 1',
          percentage: 25
        },
        {
          name: 'Opcion 2',
          percentage: 25
        },
        {
          name: 'Opcion 3',
          percentage: 25
        },
        {
          name: 'Opcion 4',
          percentage: 25
        }
      ]
    },
    {
      id: 4,
      title: 'Poll 4',
      description: 'Poll description 4',
      options: [
        {
          name: 'Ejemplo',
          percentage: 100
        }
      ]
    }
  ];

  return (
    <section className={className}>
      <div className="flex over">
        <div className="md:w-2/3 w-screen p-3">
          <div className="rounded-lg bg-dark text-white mb-5">
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
              className="ml-3 my-1 text-blue-700 hover:text-white  border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() => setClose(false)}
            >
              Encuesta
            </button>
          </div>

          <div className="rounded-lg bg-dark text-white p-4">
            {polls.map((poll, index) => (
              <SurveyForm
                key={index}
                id={poll.id}
                title={poll.title}
                description={poll.description}
                options={poll.options}
              />
            ))}
          </div>
        </div>
        <div className="md:w-1/3 md:block hidden p-3">
          <div className="h-screen rounded-lg bg-dark text-white mb-5 p-4">
            <h2 className="font-bold">Buscar encuestas</h2>

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
      <Modal title="Crear encuesta" close={close} setClose={setClose}>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          With less than a month to go before the European Union enacts new
          consumer privacy laws for its citizens, companies around the world are
          updating their terms of service agreements to comply.
        </p>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          The European Union’s General Data Protection Regulation (G.D.P.R.)
          goes into effect on May 25 and is meant to ensure a common set of data
          rights in the European Union. It requires organizations to notify
          users as soon as possible of high-risk data breaches that could
          personally affect them.
        </p>
      </Modal>
    </section>
  );
}
