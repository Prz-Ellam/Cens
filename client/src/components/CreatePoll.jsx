import { useState } from 'react';
import axios from '@/services/api';
import z from 'zod';
import Swal from 'sweetalert2';
import ErrorList from './ErrorList';
import getErrors from '@/utils/error-format';

function CreatePoll() {
  const formValidator = z.object({
    question: z
      .string({
        invalid_type_error: 'La pregunta debe ser una cadena de texto'
      })
      .trim()
      .min(1, 'Es requerido al menos 1 caracter')
      .max(255, 'Máximo de 255 caracteres'),
    description: z
      .string({
        invalid_type_error: 'La descripción debe ser una cadena de texto'
      })
      .trim()
      .min(1, 'Es requerido al menos 1 caracter')
      .max(255, 'Máximo de 255 caracteres'),
    options: z
      .array(
        z
          .string({
            invalid_type_error: 'La opción debe ser una cadena de texto'
          })
          .trim()
          .min(1, 'Es requerido al menos 1 caracter')
          .max(65, 'Máximo de 255 caracteres')
      )
      .min(2, 'Debe haber minimo 2 opciones')
      .max(5, 'Debe haber máximo 5 opciones')
  });

  const [formData, setFormData] = useState({
    question: '',
    description: '',
    options: ['', '']
  });

  const [formErrors, setFormErrors] = useState({});

  /**
   *
   * @param {Event} event
   * @returns
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedFormData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedFormData);

    const result = formValidator.safeParse(updatedFormData);
    if (!result.success) {
      const errors = getErrors(result.error);
      setFormErrors({
        ...formErrors,
        [name]: errors[name]
      });
      return;
    }

    const updatedFormErrors = formErrors;
    delete updatedFormErrors[name];
    setFormErrors(updatedFormErrors);
  };


  // Function to handle changes in input values
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;

    const newOptions = [...formData.options];
    newOptions[index] = event.target.value;
    setFormData({ ...formData, options: newOptions });

    const validationResult =
    formValidator.shape.question.safeParse(value);
    if (validationResult.error) {
      const lerrors = [];
      console.log(validationResult.error.issues);

      validationResult.error.issues.forEach((validationError) => {
        const message = validationError.message;

        lerrors.push(message);
      });

      console.log(lerrors);

      setFormErrors({
        ...formErrors,
        [name]: lerrors
      });

      return;
    }

    setFormErrors({
      ...formErrors,
      [name]: ''
    });
  };

  const handleAddInput = () => {
    if (formData.options.length < 5) {
      setFormData({
        ...formData,
        options: [...formData.options, '']
      });
    }
  };

  const handleDelete = (indexToDelete) => {
    if (formData.options.length <= 2) {
      return;
    }

    const updatedOptions = formData.options.filter(
      (_option, index) => index !== indexToDelete
    );

    setFormData({
      ...formData,
      options: updatedOptions
    });
  };

  /**
   *
   * @param {Event} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = formValidator.safeParse(formData);
    if (!result.success) {
      const errors = getErrors(result.error);
      setFormErrors(errors);
      return;
    }

    try {
      const response = await axios.post('/polls', formData);

      await Swal.fire({
        title: 'Operación éxitosa',
        icon: 'success',
        text: response.data.message
      });
    } catch (error) {
      await Swal.fire({
        title: 'Ocurrio un error',
        icon: 'error',
        text: error.response.data.message
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
        {formErrors['question'] && <ErrorList errors={formErrors.question} />}
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
        {formErrors['description'] && <ErrorList errors={formErrors.description} />}
      </div>

      <label className="block text-gray-300 text-sm font-bold mb-2 cursor-pointer">
        Opciones
      </label>
      <div>
        {formData.options.map((value, index) => (
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
            {formErrors[`options.${index}`] && (
              <ErrorList errors={formErrors[`options.${index}`]} />
            )}
          </div>
        ))}
        <button
          type="button"
          className="mb-3 text-gray-300 bg-purple-800 hover:bg-purple-900 focus:outline-none font-bold rounded-lg text-[0.9rem] px-5 py-2 text-center transition duration-150 ease-out hover:ease-in"
          onClick={handleAddInput}
        >
          Añadir opción
        </button>
      </div>

      <button
        type="submit"
        className="text-gray-300 bg-purple-800 hover:bg-purple-900 focus:outline-none font-bold rounded-lg text-[0.9rem] px-5 py-2 text-center transition duration-150 ease-out hover:ease-in"
      >
        Crear
      </button>
    </form>
  );
}

export default CreatePoll;
