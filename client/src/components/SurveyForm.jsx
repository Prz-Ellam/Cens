import PropTypes from 'prop-types';
import axios from 'axios';
import { getToken } from '../utils/auth';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export default function SurveyForm({
  id,
  question,
  description,
  options,
  name,
  commentCount,
  likeCount,
  dislikeCount
}) {
  const [open, setOpen] = useState(false);

  const selectOption = async (pollId, optionId) => {
    await axios.post(
      `/api/v1/polls/${pollId}/votes`,
      { optionId },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );
  };

  const menuRef = useRef(null);

  useEffect(() => {
    /**
     * 
     * @param {Event} event 
     */
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  /**
   * @param {number} pollId
   * @param {boolean} isLike
   */
  const handleSubmitReaction = async (pollId, isLike) => {
    try {
      const response = await axios.post(
        `/api/v1/polls/${pollId}/reactions`,
        { isLike },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // TODO: Link to profile
  return (
    <article className="bg-accent text-gray-300 p-4 rounded-lg shadow-lg">
      <header className="flex justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src="/default-profile-picture.png"
            alt="Avatar"
            className="h-12 w-12 rounded-full"
          />
          <div className="truncate">
            <Link to={`/profile/${1}`} className="font-bold hover:underline truncate">
              {name}
            </Link>
            <p className="font-md truncate">{question}</p>
          </div>
        </div>
        <div className="relative" ref={menuRef}>
          <button onClick={() => setOpen(!open)}>
            <i className="bx bx-dots-vertical-rounded"></i>
          </button>
          <div
            className={`z-10 w-36 divide-y divide-gray-100 shadow bg-dark right-0 rounded-lg ${
              open ? 'absolute' : 'hidden'
            }`}
          >
            <ul className="py-1 text-sm">
              <li className="py-2 px-4 hover:bg-gray-600 cursor-pointer">
                Editar
              </li>
              <li className="py-2 px-4 hover:bg-gray-600 cursor-pointer">
                Eliminar
              </li>
            </ul>
          </div>
        </div>
      </header>
      <p>{description}</p>
      {options?.map((option, index) => (
        <div className="flex gap-2 py-2" key={index}>
          <div className="flex items-center min-h-[1.5rem] pl-[1.5rem]">
            <input
              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_8px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-purple checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-purple checked:after:bg-purple checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_8px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_8px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-purple checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_8px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-purple dark:checked:after:border-purple dark:checked:after:bg-purple dark:focus:before:shadow-[0px_0px_0px_8px_rgba(255,255,255,0.4)] dark:checked:focus:border-purple dark:checked:focus:before:shadow-[0px_0px_0px_8px_#3b71ca]"
              type="radio"
              name={`radio-${id}`}
              id={`radio-${id}-${index}`}
              onClick={() => selectOption(id, option.id)}
            />
          </div>
          <div className="grow">
            <div className="relative w-full rounded-lg h-8 outline outline-gray-600 outline-2">
              <div
                className={`bg-purple h-8 ${
                  option.percentage !== 100 ? 'rounded-l-lg' : 'rounded-lg'
                }`}
                style={{ width: `${option.percentage}%` }}
              ></div>
              <label
                htmlFor={`radio-${id}-${index}`}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full flex justify-between truncate px-3 cursor-pointer"
              >
                <p className="truncate">{option.text}</p>
                <p className=" text-gray-300">{option.percentage}%</p>
              </label>
            </div>
          </div>
        </div>
      ))}
      <footer className="flex gap-5 mt-3">
        <button
          className="flex content-center gap-1 cursor-pointer hover:text-green-400 transition duration-150 ease-out hover:ease-in"
          onClick={() => handleSubmitReaction(id, true)}
        >
          <i className="bx-sm bx bxs-like"></i>
          <span>{likeCount}</span>
        </button>
        <button
          className="flex content-center gap-1 cursor-pointer hover:text-red-400 transition duration-150 ease-out hover:ease-in"
          onClick={() => handleSubmitReaction(id, false)}
        >
          <i className="bx-sm bx bxs-dislike"></i>
          <span>{dislikeCount}</span>
        </button>
        <Link
          to={`/survey/${id}`}
          className="flex content-center gap-1 cursor-pointer hover:text-blue-400 transition duration-150 ease-out hover:ease-in"
        >
          <i className="bx-sm bx bxs-message-rounded"></i>
          <span>{commentCount}</span>
        </Link>
      </footer>
    </article>
  );
}

SurveyForm.propTypes = {
  id: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
  likeCount: PropTypes.number.isRequired,
  dislikeCount: PropTypes.number.isRequired
};
