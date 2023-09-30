import { useState } from 'react';
import { getToken } from '../utils/auth';
import axios from 'axios';

export default function CreatePoll() {

  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['', '']);

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
    if (options.length <= 2) {
      return;
    }
    
    const updatedItems = options.filter(
      (_option, index) => index !== indexToDelete
    );

    setOptions(updatedItems);
  };

  /**
   *
   * @param {Event} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const poll = {
      question,
      description,
      options
    };

    try {
      const response = await axios.post('/api/v1/polls', poll, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      console.log(response.data);
    } catch (error) {
      console.log(typeof error.response.data);
    }
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <label
        className="block text-gray-300 text-sm font-bold mb-2 cursor-pointer"
        htmlFor="question"
      >
        Pregunta
      </label>
      <input
        className="bg-accent shadow appearance-none rounded w-full mb-5 py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
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
        className="bg-accent shadow appearance-none rounded w-full mb-5 py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
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
              className="bg-accent shadow appearance-none rounded-l relative m-0 block w-[1px] min-w-0 flex-auto border-solid border-neutral-300 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-gray-700 outline-none transition duration-200 ease-in-out focus:z-[3]"
              placeholder={`Opción ${index + 1}`}
              value={value}
              onChange={(event) => handleInputChange(index, event)}
            />
            <button
              type="button"
              className="bg-red-500 text-gray-300 flex items-center whitespace-nowrap rounded-r border border-l-0 border-solid border-red-500 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6]"
              onClick={() => {
                handleDelete(index);
              }}
            >
              &times;
            </button>
          </div>
        ))}
        <button
          type="button"
          className="text-white bg-violet-500 hover:bg-violet-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={handleAddInput}
        >
          Añadir opción
        </button>
      </div>

      <button
        type="submit"
        className="text-white bg-violet-500 hover:bg-violet-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Create
      </button>
    </form>
  );
}
