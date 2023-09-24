import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
export default function SurveyForm({ id, question, description, options, name, commentCount, likeCount, dislikeCount }) {
  return (
    <article className="bg-accent text-gray-300 p-4 rounded-lg shadow-lg">
      <div className="flex gap-3 items-center mb-3">
        <img
          src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
          alt="Avatar"
          className="h-12 w-12 rounded-full"
        />
        <div className="truncate">
          <p className="font-bold truncate">{name}</p>
          <p className="font-medium truncate">{question}</p>
        </div>
      </div>
      <p>{description}</p>
      {options?.map((option, index) => (
        <div className="flex gap-2 py-2" key={index}>
          <div className="flex items-center min-h-[1.5rem] pl-[1.5rem]">
            <input
              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_8px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-purple checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-purple checked:after:bg-purple checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_8px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_8px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-purple checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_8px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-purple dark:checked:after:border-purple dark:checked:after:bg-purple dark:focus:before:shadow-[0px_0px_0px_8px_rgba(255,255,255,0.4)] dark:checked:focus:border-purple dark:checked:focus:before:shadow-[0px_0px_0px_8px_#3b71ca]"
              type="radio"
              name={`radioDefault-${id}`}
              id={`radioDefault-${id}-${index}`}
              onClick={() => console.log('Hola')}
            />
          </div>
          <div className="grow">
            <div
              className="relative w-full rounded-lg h-8 outline outline-gray-600"
              style={{ outlineWidth: '2px' }}
            >
              <div
                className={`bg-purple h-8 ${
                  option.percentage !== 100 ? 'rounded-l-lg' : 'rounded-lg'
                }`}
                style={{ width: `${option.percentage}%` }}
              ></div>
              <label
                htmlFor={`radioDefault-${id}-${index}`}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full flex justify-between truncate px-3 cursor-pointer"
              >
                <p className="truncate">{option.text}</p>
                <p className=" text-gray-300">{option.percentage}%</p>
              </label>
            </div>
          </div>
        </div>
      ))}
      <div className="flex gap-5 mt-3">
        <p className="flex content-center gap-1 cursor-pointer hover:text-green-400 transition duration-150 ease-out hover:ease-in">
          <i className="bx-sm bx bxs-like"></i>
          <span>{likeCount}</span>
        </p>
        <p className="flex content-center gap-1 cursor-pointer hover:text-red-400 transition duration-150 ease-out hover:ease-in">
          <i className="bx-sm bx bxs-dislike"></i>
          <span>{dislikeCount}</span>
        </p>
        <p className="flex content-center gap-1 cursor-pointer hover:text-blue-400 transition duration-150 ease-out hover:ease-in">
          <i className="bx-sm bx bxs-message-rounded"></i>
          <span>{commentCount}</span>
        </p>
      </div>
    </article>
  );
}

SurveyForm.propTypes = {
  id: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
};
