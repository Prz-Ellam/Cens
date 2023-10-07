import { useParams } from 'react-router-dom';
import Comment from '@/components/Comment';
import SurveyForm from '@/components/SurveyForm';
import { useEffect, useState } from 'react';
import axios from '@/services/api';

export default function Survey() {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [comments, setComments] = useState(null);
  const [comment, setComment] = useState('');

  const postComment = async () => {
    try {
      await axios.post(`/api/v1/polls/${pollId}/comments`, { text: comment });
    } catch (error) {
      console.error('Error sending comment:', error);
    }
  };

  useEffect(() => {
    // Function to fetch the survey data
    const fetchPoll = async () => {
      try {
        const response = await axios.get(`/api/v1/polls/${pollId}`);
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
    // Function to fetch the survey data
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/v1/polls/${pollId}/comments`);
        const commentsData = response.data; // Assuming the response data contains the survey information
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    // Call the fetchSurvey function when the component mounts
    fetchComments();
  }, []);

  if (!poll || !comments) {
    // Render a loading message or spinner while the survey data is being fetched
    return <></>;
  }

  return (
    <div className="h-full overflow-auto">
      <div className="w-9/12 flex flex-col gap-4 mx-auto">
        <SurveyForm
          id={poll.id}
          question={poll.question}
          description={poll.description}
          options={poll.options}
          name={poll.user.username}
          commentCount={poll.comments.length}
          likeCount={
            poll.reactions.filter((reaction) => reaction.isLike === true).length
          }
          dislikeCount={
            poll.reactions.filter((reaction) => reaction.isLike === false)
              .length
          }
        />

        <div className="bg-accent  mb-4 p-3 rounded-lg">
          <form className="mb-6">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows="6"
                onChange={(event) => setComment(event.target.value)}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              onClick={postComment}
              type="button"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Post comment
            </button>
          </form>
          {comments.map((comment, index) => (
            <Comment
              key={index}
              text={comment.text}
              username={comment.user.username}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
