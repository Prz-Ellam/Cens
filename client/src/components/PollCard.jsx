import PropTypes from 'prop-types';
import classNames from 'classnames';
import axios from '@/services/api';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '@/hooks/useAuth';
// import { ToastTopEnd } from '../utils/toast';

/**
 * Card para ver una encuesta, sus opciones, votos y acceder a comentarios
 * @param {*} param0 
 * @returns 
 */
function PollCard({
  poll,
  onUpdate
}) {
  const {
    id,
    question,
    description,
    options,
    user,
    reactions,
    vote,
    hasLiked,
    hasDisliked,
    reaction,
    voteCount,
    comments
  } = poll;
  const authContext = useAuth();
  const authUser = authContext.user;

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const submitCreateVote = async (pollId, optionId) => {
    try {
      await axios.post(
        `/polls/${pollId}/votes`,
        { optionId }
      );

      onUpdate(id);
    } catch (error) {
      const errorText = (axios.isAxiosError(error)) ? error.response.data.message : 'Error inesperado';
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: errorText
      });
    }
  };

  const submitUpdateVote = async (voteId, optionId) => {
    try {
      await axios.put(
        `/votes/${voteId}`,
        { optionId }
      );

      onUpdate(id);
    } catch (error) {
      const errorText = (axios.isAxiosError(error)) ? error.response.data.message : 'Error inesperado';
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: errorText
      });
    }
  };

  const submitDeleteVote = async (voteId) => {
    try {
      await axios.delete(`/votes/${voteId}`);

      onUpdate(id);
    } catch (error) {
      const errorText = (axios.isAxiosError(error)) ? error.response.data.message : 'Error inesperado';
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: errorText
      });
    }
  };

  const submitDeletePoll = async (pollId) => {
    try {
      setOpen(false);

      const result = await Swal.fire({
        title: '¿Estas seguro que deseas borrar la encuesta?',
        text: 'No podrás recuperarla después',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'Eliminar',
        denyButtonText: `Cancelar`
      });
  
      if (result.isDenied) {
        return;
      }

      await axios.delete(`/polls/${pollId}`);

      onUpdate(pollId);
    } catch (error) {
      const errorText = (axios.isAxiosError(error)) ? error.response.data.message : 'Error inesperado';
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: errorText
      });
    }
  };

  const menuRef = useRef(null);

  useEffect(() => {
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
      await axios.post(
        `/polls/${pollId}/reactions`,
        { isLike }
      );
      onUpdate(id);
    } catch (error) {
      const errorText = (axios.isAxiosError(error)) ? error.response.data.message : 'Error inesperado';
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: errorText
      });
    }
  };

  const updateReaction = async (reactionId, isLike) => {
    try {
      await axios.put(
        `/reactions/${reactionId}`,
        { isLike }
      );

      onUpdate(id);
    } catch (error) {
      const errorText = (axios.isAxiosError(error)) ? error.response.data.message : 'Error inesperado';
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: errorText
      });
    }
  };

  const deleteReaction = async (reactionId) => {
    try {
      await axios.delete(`/reactions/${reactionId}`);
      onUpdate(id);
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
    <article className="bg-accent text-gray-300 p-4 rounded-lg shadow-lg">
      <header className="flex justify-between mb-3">
        <div className="flex items-center gap-3 truncate">
          <img
            src={`/api/v1/users/${user.id}/avatar`}
            alt="Avatar"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="truncate">
            <Link
              to={`/profile/${user.id}`}
              className="font-bold hover:underline truncate"
            >
              {user.username}
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
              className={classNames('z-10 w-36 divide-y divide-gray-100 shadow bg-dark right-0 rounded-lg', {
                'absolute': open,
                'hidden': !open
              })}
            >
              <ul className="py-1 text-sm">
                <li className="py-2 px-4 hover:bg-gray-600 cursor-pointer" onClick={() => navigate(`/analytics/${id}`)}>
                  Estadísticas
                </li>
                <li className="py-2 px-4 hover:bg-gray-600 cursor-pointer" onClick={() => submitDeletePoll(id)}>
                  Eliminar
                </li>
              </ul>
            </div>
          </div>
        )}
      </header>
      <p className="truncate">{description}</p>
      <small className="text-gray-400">
        {voteCount} {voteCount === 1 ? 'voto' : 'votos'}
      </small>
      {options?.map((option, index) => (
        <div className="flex gap-2 py-2" key={index}>
          <div className="flex items-center min-h-[1.5rem] pl-[1.5rem]">
            <input
              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_8px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-purple checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-purple checked:after:bg-purple-800 checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_8px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_8px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-purple checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_8px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-purple dark:checked:after:border-purple dark:checked:after:bg-purple dark:focus:before:shadow-[0px_0px_0px_8px_rgba(255,255,255,0.4)] dark:checked:focus:border-purple dark:checked:focus:before:shadow-[0px_0px_0px_8px_#3b71ca]"
              type="radio"
              name={`radio-${id}`}
              id={`radio-${id}-${index}`}
              disabled={user.id === authUser.id}
              defaultChecked={vote?.option.id === option.id}
              onClick={() => {
                vote
                  ?
                    vote?.option.id === option.id
                    ? submitDeleteVote(vote.id)
                    : submitUpdateVote(vote.id, option.id)
                  : submitCreateVote(id, option.id);

                if (vote?.option.id === option.id)
                  document.getElementById(
                    `radio-${id}-${index}`
                  ).checked = false;
              }}
            />
          </div>
          <div className="grow">
            <div className="relative w-full rounded-lg h-8 outline outline-gray-600 outline-2">
              <div
                className={classNames('bg-purple h-8', {
                  'rounded-l-lg': option.percentage !== 100,
                  'rounded-lg': option.percentage === 100
                })}
                style={{ width: `${option.percentage}%` }}
              ></div>
              <label
                htmlFor={`radio-${id}-${index}`}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full flex justify-between truncate px-3 cursor-pointer"
              >
                <p className="truncate">{option.text}</p>
                <p className=" text-gray-300">
                  {option.percentage.toFixed(0)}%
                </p>
              </label>
            </div>
          </div>
        </div>
      ))}
      <footer className="flex gap-5 mt-3">
        <button
          className={classNames('flex content-center gap-1 cursor-pointer hover:text-green-400 transition duration-150 ease-out hover:ease-in', {
            'text-green-400': hasLiked
          })}
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
          <span>{reactions.likes}</span>
        </button>
        <button
          className={classNames('flex content-center gap-1 cursor-pointer hover:text-red-400 transition duration-150 ease-out hover:ease-in', {
            'text-red-400': hasDisliked
          })}
          onClick={async () => {
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
          <span>{reactions.dislikes}</span>
        </button>
        <Link
          to={`/survey/${id}`}
          className="flex content-center gap-1 cursor-pointer hover:text-violet-400 transition duration-150 ease-out hover:ease-in"
        >
          <i className="bx-sm bx bxs-message-rounded"></i>
          <span>{comments}</span>
        </Link>
      </footer>
    </article>
  );
}

PollCard.propTypes = {
  onUpdate: PropTypes.func,
  poll: PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    reactions: PropTypes.object.isRequired,
    reaction: PropTypes.oneOfType([
      PropTypes.object.isRequired,
      PropTypes.oneOf([null]).isRequired
    ]),
    hasLiked: PropTypes.number.isRequired,
    hasDisliked: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    voteCount: PropTypes.number.isRequired,
    vote: PropTypes.oneOfType([
      PropTypes.object.isRequired,
      PropTypes.oneOf([null]).isRequired
    ]),
  }).isRequired
};

export default PollCard;
