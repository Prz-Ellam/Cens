import PropTypes from 'prop-types';

export default function SurveyForm({ id, title, description, options }) {
  return (
    <article className="h-full mb-4 p-3 rounded-lg bg-accent text-gray-300 shadow-lg">
      <div className="flex flex-row items-center mb-3">
        <div className="flex items-center justify-center h-12 w-12 rounded-full font-bold flex-shrink-0">
          <img
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
            alt="Your Image"
            className="h-12 w-12 rounded-full"
          />
        </div>
        <div className="flex flex-col flex-grow ml-3 truncate">
          <div className="flex items-center">
            <div className="text-sm font-medium">Nombre apellido</div>
          </div>
          <p className="font-bold">{title}</p>
        </div>
      </div>
      <p>{description}</p>
      {options.map((option, index) => (
        <div className="flex py-2" key={index}>
          <div className="flex items-center min-h-[1.5rem] pl-[1.5rem] mr-2">
            <input
              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_8px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-purple checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-purple checked:after:bg-purple checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_8px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_8px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-purple checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_8px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-purple dark:checked:after:border-purple dark:checked:after:bg-purple dark:focus:before:shadow-[0px_0px_0px_8px_rgba(255,255,255,0.4)] dark:checked:focus:border-purple dark:checked:focus:before:shadow-[0px_0px_0px_8px_#3b71ca]"
              type="radio"
              name={`radioDefault-${id}`}
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
              <label className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-3 cursor-pointer">
                {option.name}
              </label>
              <span className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-3 text-gray-300">
                {option.percentage}%
              </span>
            </div>
          </div>
        </div>
      ))}
      <p className="flex gap-3 mt-3">
        <span className="flex content-center me-2 cursor-pointer">
          <box-icon type="solid" name="like" color="#BDBDBD"></box-icon>
          <span className="ms-1">221</span>
        </span>
        <span className="flex content-center me-2 cursor-pointer">
          <box-icon name="dislike" type="solid" color="#BDBDBD"></box-icon>
          <span className="ms-1">4</span>
        </span>
        <span className="flex content-center me-2 cursor-pointer">
          <box-icon
            name="message-rounded"
            type="solid"
            color="#BDBDBD"
          ></box-icon>
          <span className="ms-1">34 comentarios</span>
        </span>
      </p>
    </article>
  );
}

SurveyForm.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
};
