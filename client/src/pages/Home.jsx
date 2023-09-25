import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import SurveyForm from '../components/SurveyForm';
import axios from 'axios';
import { getToken } from '../utils/auth';

// eslint-disable-next-line react/prop-types
export default function Home({ className }) {
  const initialItems = [];

  // Create a state variable to store the input values
  const [options, setOptions] = useState(initialItems);
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');

  // Function to handle changes in input values
  const handleInputChange = (index, event) => {
    const newValues = [...options];
    newValues[index] = event.target.value;
    setOptions(newValues);
  };

  const handleAddInput = () => {
    if (options.length < 5) {
      setOptions([...options, '']);
    }
  };

  const handleDelete = (indexToDelete) => {
    // Create a new array without the item to be deleted
    const updatedItems = options.filter((option, index) => index !== indexToDelete);
    
    // Update the state with the new array
    setOptions(updatedItems);
  };

  const createPoll = async () => {
    const poll = {
      question,
      description,
      options
    };

    console.log(getToken());

    await axios.post('/api/v1/polls', poll, {
      headers: {
        Authorization:
          `Bearer ${getToken()}`
      }
    });
  };

  const [close, setClose] = useState(true);

  let [polls, setPolls] = useState([]);

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
                commentCount={poll.comments.length}
                likeCount={
                  poll.reactions.filter((reaction) => reaction.isLike === true)
                    .length
                }
                dislikeCount={
                  poll.reactions.filter((reaction) => reaction.isLike === false)
                    .length
                }
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
        <form className="mb-4">
          <label
            className="block text-gray-300 text-sm font-bold mb-2 cursor-pointer"
            htmlFor="question"
          >
            Pregunta
          </label>
          <input
            className="shadow appearance-none border rounded w-full mb-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="question"
            type="text"
            placeholder="Pregunta"
            onChange={(event) => setQuestion(event.target.value)}
          />

          <label
            className="block text-gray-300 text-sm font-bold mb-2 cursor-pointer"
            htmlFor="description"
          >
            Descripción
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            cols="30"
            rows="3"
            placeholder="Descripción"
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>

          <label className="block text-gray-300 text-sm font-bold mb-2 cursor-pointer">
            Opciones
          </label>
          <div>
            {options.map((value, index) => (
              <div
                className="relative mb-4 flex flex-wrap items-stretch"
                key={index}
              >
                <input
                  type="text"
                  className="shadow appearance-none border rounded-l relative m-0 block w-[1px] min-w-0 flex-auto border-solid border-neutral-300 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-gray-700 outline-none transition duration-200 ease-in-out focus:z-[3]"
                  placeholder="Recipient's username"
                  value={value}
                  onChange={(event) => handleInputChange(index, event)}
                />
                <button
                  type="button"
                  className="bg-red-500 text-gray-300 flex items-center whitespace-nowrap rounded-r border border-l-0 border-solid border-red-500 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6]"
                  onClick={() => {handleDelete(index)}}
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleAddInput}
            >
              Añadir opción
            </button>
          </div>

          <button
            type="button"
            onClick={createPoll}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create
          </button>
        </form>
      </Modal>
    </section>
  );
}
