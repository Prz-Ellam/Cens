import PropTypes from 'prop-types';
import axios from 'axios';
import { getToken, getUserData } from '../utils/auth';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';

export default function SurveyForm({
  id,
  question,
  description,
  options,
  // eslint-disable-next-line react/prop-types
  user,
  name,
  commentCount,
  likeCount,
  dislikeCount,
  hasLiked,
  hasDisliked,
  // eslint-disable-next-line react/prop-types
  vote,
  // eslint-disable-next-line react/prop-types
  voteCount,
  // eslint-disable-next-line react/prop-types
  reaction,
  onUpdate
}) {
  const authContext = useAuth();
  const authUser = authContext.user;

  const [open, setOpen] = useState(false);

  const submitCreateVote = async (pollId, optionId) => {
    try {
      const response = await axios.post(
        `/api/v1/polls/${pollId}/votes`,
        { optionId },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );

      await Swal.fire({
        title: 'Todo bien',
        icon: 'success',
        text: response.data.message
      });
    } catch (error) {
      await Swal.fire({
        title: 'Error',
        icon: 'error',
        text: error.response.data.message
      });
    }
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
  const createReaction = async (pollId, isLike) => {
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
      onUpdate(id);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const updateReaction = async (reactionId, isLike) => {
    try {
      const response = await axios.put(
        `/api/v1/reactions/${reactionId}`,
        { isLike },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );

      console.log(response.data);
      onUpdate(id);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const deleteReaction = async (reactionId) => {
    try {
      console.log('Delete');
      await axios.delete(
        `/api/v1/reactions/${reactionId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );
      onUpdate(id);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  // TODO: Link to profile
  return (
    <article className="bg-accent text-gray-300 p-4 rounded-lg shadow-lg">
      <header className="flex justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={
              user.avatar
                ? `/api/v1/users/${user.id}/avatar`
                : `/default-profile-picture.png`
            }
            alt="Avatar"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="truncate">
            <Link
              to={`/profile/${1}`}
              className="font-bold hover:underline truncate"
            >
              {name}
            </Link>
            <p className="font-md truncate">{question}</p>
          </div>
        </div>
        {user?.id === authUser?.id && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen(!open)}
              className="hover:bg-gray-500 rounded-full px-1"
            >
              <i className="bx bx-dots-vertical-rounded"></i>
            </button>
            <div
              className={`z-10 w-36 divide-y divide-gray-100 shadow bg-dark right-0 rounded-lg ${
                open ? 'absolute' : 'hidden'
              }`}
            >
              <ul className="py-1 text-sm">
                <li className="py-2 px-4 hover:bg-gray-600 cursor-pointer">
                  Eliminar
                </li>
              </ul>
            </div>
          </div>
        )}
      </header>
      <p>{description}</p>
      <small className="text-gray-400">
        {voteCount} {voteCount === 1 ? 'voto' : 'votos'}
      </small>
      {options?.map((option, index) => (
        <div className="flex gap-2 py-2" key={index}>
          <div className="flex items-center min-h-[1.5rem] pl-[1.5rem]">
            <input
              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_8px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-purple checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-purple checked:after:bg-purple checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_8px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_8px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-purple checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_8px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-purple dark:checked:after:border-purple dark:checked:after:bg-purple dark:focus:before:shadow-[0px_0px_0px_8px_rgba(255,255,255,0.4)] dark:checked:focus:border-purple dark:checked:focus:before:shadow-[0px_0px_0px_8px_#3b71ca]"
              type="radio"
              name={`radio-${id}`}
              id={`radio-${id}-${index}`}
              disabled={user.id === authUser.id}
              // eslint-disable-next-line react/prop-types
              defaultChecked={vote?.option.id === option.id}
              onClick={() => submitCreateVote(id, option.id)}
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
                <p className=" text-gray-300">
                  {option.percentage.toFixed(2)}%
                </p>
              </label>
            </div>
          </div>
        </div>
      ))}
      <footer className="flex gap-5 mt-3">
        <button
          className={`flex content-center gap-1 cursor-pointer hover:text-green-400 transition duration-150 ease-out hover:ease-in ${
            hasLiked ? 'text-green-400' : ''
          }`}
          onClick={async () => {
            if (!hasLiked && !hasDisliked) {
              createReaction(id, true);
            } else if (hasLiked && !hasDisliked) {
              deleteReaction(reaction.id);
            } else if (!hasLiked && hasDisliked) {
              updateReaction(reaction.id, true);
            }
          }}
        >
          <i className="bx-sm bx bxs-like"></i>
          <span>{likeCount}</span>
        </button>
        <button
          className={`flex content-center gap-1 cursor-pointer hover:text-red-400 transition duration-150 ease-out hover:ease-in ${
            hasDisliked ? 'text-red-400' : ''
          }`}
          onClick={async () => {
            console.log(reaction.id);
            if (!hasLiked && !hasDisliked) {
              createReaction(id, false);
            } else if (!hasLiked && hasDisliked) {
              deleteReaction(reaction.id);
            } else if (hasLiked && !hasDisliked) {
              updateReaction(reaction.id, false);
            }
          }}
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
  dislikeCount: PropTypes.number.isRequired,
  hasLiked: PropTypes.number.isRequired,
  hasDisliked: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired
  // vote: PropTypes.oneOfType([
  //   PropTypes.string.isRequired,
  //   PropTypes.oneOf([null]).isRequired,
  // ]).isRequired,
};
