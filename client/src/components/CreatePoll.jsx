import { useState } from 'react';
import axios from '@/services/api';
import z from 'zod';
import Swal from 'sweetalert2';
import ErrorList from './ErrorList';

export default function CreatePoll() {
  const createPollValidator = z.object({
    question: z.string().trim().min(1).max(255),
    description: z.string().trim().min(1).max(255),
    options: z.array(z.string().trim().min(1).max(65)).min(2).max(5)
  });

  const [poll, setPoll] = useState({
    question: '',
    description: '',
    options: ['', '']
  });

  /**
   *
   * @param {Event} event
   * @returns
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPoll({
      ...poll,
      [name]: value
    });

    const validationResult =
      createPollValidator.shape.question.safeParse(value);
    if (validationResult.error) {
      const lerrors = [];
      console.log(validationResult.error.issues);

      validationResult.error.issues.forEach((validationError) => {
        const message = validationError.message;

        lerrors.push(message);
      });

      console.log(lerrors);

      setErrors({
        ...errors,
        [name]: lerrors
      });

      return;
    }

    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const [errors, setErrors] = useState({});

  // Function to handle changes in input values
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;

    const newOptions = [...poll.options];
    newOptions[index] = event.target.value;
    setPoll({ ...poll, options: newOptions });

    const validationResult =
      createPollValidator.shape.question.safeParse(value);
    if (validationResult.error) {
      const lerrors = [];
      console.log(validationResult.error.issues);

      validationResult.error.issues.forEach((validationError) => {
        const message = validationError.message;

        lerrors.push(message);
      });

      console.log(lerrors);

      setErrors({
        ...errors,
        [name]: lerrors
      });

      return;
    }

    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const handleAddInput = () => {
    if (poll.options.length < 5) {
      setPoll({
        ...poll,
        options: [...poll.options, '']
      });
    }
  };

  const handleDelete = (indexToDelete) => {
    if (poll.options.length <= 2) {
      return;
    }

    const updatedOptions = poll.options.filter(
      (_option, index) => index !== indexToDelete
    );

    setPoll({
      ...poll,
      options: updatedOptions
    });
  };

  const validateForm = async () => {
    const validationResult = createPollValidator.safeParse(poll);
    if (validationResult.error) {
      console.log('Hubo un error');
      const lerrors = {};

      validationResult.error.issues.forEach((validationError) => {
        const path = validationError.path.join('.');
        const message = validationError.message;

        if (!lerrors[path]) {
          lerrors[path] = [];
        }
        lerrors[path].push(message);
      });
      console.log(lerrors);
      setErrors(lerrors);
      return false;
    }
    return true;
  };

  /**
   *
   * @param {Event} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      await Swal.fire({
        title: 'Error'
      });
      return;
    }

    try {
      const response = await axios.post('/polls', poll);

      await Swal.fire({
        title: 'Ok',
        text: response.data.message
      });
    } catch (error) {
      await Swal.fire({
        title: 'Error'
      });
    }
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label
          className="block text-gray-300 text-sm font-bold mb-2 cursor-pointer"
          htmlFor="question"
        >
          Pregunta
        </label>
        <input
          className="bg-accent shadow hover:shadow-md appearance-none rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          id="question"
          type="text"
          name="question"
          placeholder="Pregunta"
          onChange={handleChange}
        />
        {errors.question && <ErrorList errors={errors.question} />}
      </div>

      <div className="mb-5">
        <label
          className="block text-gray-300 text-sm font-bold mb-2 cursor-pointer"
          htmlFor="description"
        >
          Descripción
        </label>
        <textarea
          className="bg-accent shadow hover:shadow-md appearance-none rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          type="text"
          cols="30"
          rows="3"
          name="description"
          placeholder="Descripción"
          onChange={handleChange}
        ></textarea>
        {errors.description && <ErrorList errors={errors.description} />}
      </div>

      <label className="block text-gray-300 text-sm font-bold mb-2 cursor-pointer">
        Opciones
      </label>
      <div>
        {poll.options.map((value, index) => (
          <div key={index} className="mb-4">
            <div className="relative flex flex-wrap items-stretch">
              <input
                type="text"
                className="bg-accent shadow hover:shadow-md appearance-none rounded-l relative m-0 block w-[1px] min-w-0 flex-auto border-solid border-neutral-300 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-gray-300 outline-none transition duration-200 ease-in-out focus:z-[3]"
                placeholder={`Opción ${index + 1}`}
                value={value}
                name={`options.${index}`}
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
            {errors[`options.${index}`] && (
              <ErrorList errors={errors[`options.${index}`]} />
            )}
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
