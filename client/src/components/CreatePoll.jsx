import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from '@/services/api';
import z from 'zod';
import Swal from 'sweetalert2';
import ErrorList from './ErrorList';
import getErrors from '@/utils/error-format';
import { ToastTopEnd } from '../utils/toast';

/**
 * Formulario para crear encuestas
 * @param {object} params
 * @param {function} params.onCreate - Evento cuando se ha creado una encuesta
 * @returns 
 */
function CreatePoll({ onCreate = () => {} }) {
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

  const handleOptionChange = (index, event) => {
    const { name, value } = event.target;

    const newOptions = [...formData.options];
    newOptions[index] = value;

    const updatedFormData = {
      ...formData,
      options: newOptions
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

  const handleAddOption = () => {
    if (formData.options.length >= 5) {
      ToastTopEnd.fire({
        title: 'Máximo 5 opciones',
        icon: 'error'
      });
      return;
    }

    setFormData({
      ...formData,
      options: [...formData.options, '']
    });
  };

  const handleDeleteOption = (indexToDelete) => {
    if (formData.options.length <= 2) {
      ToastTopEnd.fire({
        title: 'Mínimo 2 opciones',
        icon: 'error'
      });
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = formValidator.safeParse(formData);
    if (!result.success) {
      const errors = getErrors(result.error);
      setFormErrors(errors);

      ToastTopEnd.fire({
        title: 'Formulario no válido',
        icon: 'error'
      });
      return;
    }

    try {
      const response = await axios.post('/polls', formData);

      Swal.fire({
        title: 'Operación éxitosa',
        icon: 'success',
        text: response.data.message
      });

      const updatedFormData = {
        question: '',
        description: '',
        options: ['', '']
      }
      setFormData(updatedFormData);
      setFormErrors({});

      onCreate();
    } catch (error) {
      const errorText = (axios.isAxiosError(error)) ? error.response.data.message : 'Error inesperado';
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: errorText
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
          value={formData.question}
          onChange={handleChange}
        />
        {formErrors.question && <ErrorList errors={formErrors.question} />}
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
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        {formErrors.description && <ErrorList errors={formErrors.description} />}
      </div>

      <label className="block text-gray-300 text-sm font-bold mb-2 cursor-pointer">
        Opciones
      </label>
      <div>
        {formData.options.map((value, index) => (
          <div key={index} className="mb-4">
            <div className="flex flex-wrap items-stretch">
              <input
                type="text"
                className="bg-accent shadow hover:shadow-md appearance-none rounded-l relative m-0 block w-[1px] min-w-0 flex-auto border-solid border-neutral-300 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-gray-300 outline-none transition duration-200 ease-in-out focus:z-[3]"
                placeholder={`Opción ${index + 1}`}
                value={value}
                name={`options.${index}`}
                onChange={(event) => handleOptionChange(index, event)}
              />
              <button
                type="button"
                className="bg-red-500 text-gray-300 flex items-center whitespace-nowrap rounded-r border border-l-0 border-solid border-red-500 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6]"
                onClick={() => handleDeleteOption(index)}
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
          onClick={handleAddOption}
        >
          Añadir opción
        </button>
      </div>

      <button
        type="submit"
        className="w-full text-gray-300 bg-purple-800 hover:bg-purple-900 focus:outline-none font-bold rounded-lg text-[0.9rem] px-5 py-2 text-center transition duration-150 ease-out hover:ease-in"
      >
        Crear
      </button>
    </form>
  );
}

CreatePoll.propTypes = {
  onCreate: PropTypes.func,
}

export default CreatePoll;
