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
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
    </div>
  );
}
