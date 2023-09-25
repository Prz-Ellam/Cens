import Comment from '../components/Comment';
import SurveyForm from '../components/SurveyForm';

export default function Survey() {
  const poll = {
    id: 1,
    question: 'Poll 1',
    description: 'Poll description 1',
    options: [
      {
        text: 'Opcion 1',
        percentage: 50
      },
      {
        text: 'Opcion 2',
        percentage: 50
      }
    ]
  };

  return (
    <div className="h-full overflow-auto">
      <div className="w-9/12 mx-auto">
        <SurveyForm
          id={poll.id}
          question={poll.question}
          description={poll.description}
          options={poll.options}
          name={'Eliam'}
          commentCount={3}
          likeCount={9}
          dislikeCount={3}
        />
      </div>
      <div className="bg-accent  mb-4 p-3 rounded-lg w-9/12 mx-auto">
      <form className="mb-6">
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">Your comment</label>
            <textarea id="comment" rows="6"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..." required></textarea>
        </div>
        <button type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            Post comment
        </button>
    </form>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
    </div>
  );
}
