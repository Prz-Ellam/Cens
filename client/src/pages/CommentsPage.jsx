import { useParams } from 'react-router-dom';
import Comment from '../components/Comment';
import SurveyForm from '../components/SurveyForm';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';

export default function CommentsPage() {
  const { user } = useAuth();

  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [comments, setComments] = useState(null);
  const [text, setText] = useState('');

  /**
   * Recupera todos los comentarios de una encuesta
   * @param {number} pollId
   */
  const fetchComments = async (pollId) => {
    try {
      const response = await axios.get(`/api/v1/polls/${pollId}/comments`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      const commentsData = response.data; // Assuming the response data contains the survey information
      setComments(commentsData);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleComment = async () => {
    try {
      const response = await axios.post(
        `/api/v1/polls/${pollId}/comments`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );

      setText('');
      Swal.fire({
        title: 'Correcto',
        icon: 'success',
        text: response.data.message
      });

      await fetchComments(pollId);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: error.response.data.message
      });
    }
  };

  useEffect(() => {
    // Function to fetch the survey data
    const fetchPoll = async () => {
      try {
        // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint for fetching the survey
        const response = await axios.get(`/api/v1/polls/${pollId}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        });
        const surveyData = response.data; // Assuming the response data contains the survey information
        setPoll(surveyData);
      } catch (error) {
        console.error('Error fetching survey:', error);
      }
    };

    // Call the fetchSurvey function when the component mounts
    fetchPoll();
  }, []);

  useEffect(() => {
    fetchComments(pollId);
  }, []);

  return (
    <div className="h-full overflow-auto">
      <div className="w-9/12 flex flex-col gap-4 mx-auto">
        {poll ? (
          <SurveyForm
            id={poll.id}
            question={poll.question}
            description={poll.description}
            options={poll.options}
            name={poll.user.username}
            user={poll.user}
            commentCount={poll.comments}
            likeCount={poll.reactions.likes}
            dislikeCount={poll.reactions.dislikes}
            hasLiked={poll.hasLiked}
            hasDisliked={poll.hasDisliked}
            vote={poll.vote}
            voteCount={poll.voteCount}
            reaction={poll.reaction}
          />
        ) : (
          <></>
        )}

        <div className="bg-accent mb-4 p-3 rounded-lg">
          <form className="mb-6">
            <div className="py-2 px-4 mb-4 rounded-lg rounded-t-lg">
              <label
                htmlFor="comment"
                className="block text-gray-300 text-sm font-bold mb-2 cursor-pointer"
              >
                Escribe un comentario
              </label>
              <textarea
                id="comment"
                rows="6"
                onChange={(event) => setText(event.target.value)}
                className="bg-dark shadow appearance-none rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Escribe un comentario..."
                value={text}
                required
              ></textarea>
              <button
                onClick={handleComment}
                type="button"
                className="hover:bg-gray-400 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                Comentar
              </button>
            </div>
          </form>
          {comments && comments.map((comment, index) => (
            <Comment
              key={index}
              id={comment.id}
              text={comment.text}
              username={comment.user.username}
              avatar={
                comment.user.avatar
                  ? `/api/v1/users/${comment.user.id}/avatar`
                  : `/default-profile-picture.png`
              }
              isAuthUser={comment.user.id === user.id}
              onUpdate={() => fetchComments(pollId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}