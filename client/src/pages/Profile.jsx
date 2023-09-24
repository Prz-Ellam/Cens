import SurveyForm from '../components/SurveyForm';

// eslint-disable-next-line react/prop-types
export default function Profile() {
  const polls = [
    {
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
    },
    {
      id: 2,
      question: 'Poll 2',
      description: 'Poll description 2',
      options: [
        {
          text: 'Opcion 1',
          percentage: 33
        },
        {
          text: 'Opcion 2',
          percentage: 33
        },
        {
          text: 'Opcion 3',
          percentage: 33
        }
      ]
    },
    {
      id: 3,
      question: 'Poll 3',
      description: 'Poll description 3',
      options: [
        {
          text: 'Opcion 1',
          percentage: 25
        },
        {
          text: 'Opcion 2',
          percentage: 25
        },
        {
          text: 'Opcion 3',
          percentage: 25
        },
        {
          text: 'Opcion 4',
          percentage: 25
        }
      ]
    },
    {
      id: 4,
      question: 'Poll 4',
      description: 'Poll description 4',
      options: [
        {
          text: 'Ejemplo',
          percentage: 100
        }
      ]
    }
  ];

  return (
    <section className="h-full overflow-auto">
      <div className="w-4/5 mx-auto">
        <div className="p-4 flex md:flex-row flex-col gap-5 items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Gnome_2.20.png"
            className="w-48 min-w-48 h-48 rounded-full mx-auto"
            alt="Foto de perfil"
          />

          <div className="md:w-5/6 sm:w-7/12 md:text-start text-center">
            <div>
              <h3 className="text-gray-300 font-bold text-3xl">Eliam Pérez</h3>
            </div>
            <div>
              <h6 className="text-gray-300 text-xl">eliam@gmail.com</h6>
            </div>
            <div>
              <h6 className="text-gray-300">01/06/2023</h6>
            </div>
            <div className="flex md:flex-row flex-col gap-4 my-3">
              <a className="bg-purple text-gray-300 py-2 px-4 rounded-lg shadow-none cursor-pointer">
                Editar perfil
              </a>
              <a className="bg-purple text-gray-300 py-2 px-4 rounded-lg shadow-none cursor-pointer">
                Cambiar contraseña
              </a>
            </div>
          </div>
        </div>

        <hr className="" />

        <div className="grid grid-flow-col justify-stretch gap-5 mb-5 ">
          <button className="border-t hover:border-purple  sm:text-xl text-md text-gray-300 hover:bg-purple text-bold py-3 transition duration-150 ease-out hover:ease-in">
            Actividad
          </button>
          <button className="sm:text-xl text-md text-gray-300 hover:bg-purple text-bold py-3 transition duration-150 ease-out hover:ease-in">
            Seguidores
          </button>
          <button className="sm:text-xl text-md text-gray-300 hover:bg-purple text-bold py-3 transition duration-150 ease-out hover:ease-in">
            Seguidos
          </button>
        </div>

        <div className="md:w-9/12 w-11/12 flex flex-col gap-4 mx-auto mb-5">
          {polls.map((poll, index) => (
            <SurveyForm
              key={index}
              id={poll.id}
              question={poll.question}
              description={poll.description}
              options={poll.options}
              name={'Eliam'}
              commentCount={3}
              likeCount={23}
              dislikeCount={3}
            />
          ))}
        </div>

        <div className="md:w-9/12 w-11/12 flex flex-col gap-4 mx-auto mb-5">
          <div className="flex flex-row items-center p-4 bg-accent rounded-lg">
            <img
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
              alt="Your Image"
              className="h-12 w-12 rounded-full"
            />
            <div className="flex flex-col flex-grow ml-3 truncate text-gray-300">
              
              <p className="text-md font-medium">Nombre apellido</p>
              <p className="text-sm font-medium">eliam@correo.com</p>
            </div>
          <button className='bg-white rounded-lg px-3 py-1'>Eliminar</button>
          </div>
        </div>
      </div>
    </section>
  );
}
