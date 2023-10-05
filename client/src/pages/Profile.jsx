import { useEffect, useState } from 'react';
import SurveyForm from '../components/SurveyForm';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../utils/auth';

const TABS = Object.freeze({
  POSTS: 'POSTS',
  FOLLOWERS: 'FOLLOWERS',
  FOLLOWING: 'FOLLOWING'
});

function Profile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/api/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      console.log(response.data);
      setUser(response.data.user);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const fetchFollowers = async () => {
    try {
      const response = await axios.get(`/api/v1/users/${userId}/followers`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      console.log(response.data);
      setFollowers(response.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const fetchFollowing = async () => {
    try {
      const response = await axios.get(`/api/v1/users/${userId}/following`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      console.log(response.data);
      setFollowing(response.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchFollowers();
  }, []);

  useEffect(() => {
    fetchFollowing();
  }, []);

  const [selectedTab, setSelectedTab] = useState(sessionStorage.getItem('tab'));

  useEffect(() => {
    sessionStorage.setItem('tab', selectedTab);
  }, [selectedTab]);

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

  if (!user) {
    return <></>;
  }

  return (
    <section className="h-full overflow-auto">
      <div className="w-4/5 mx-auto my-4">
        <header className="p-4 flex md:flex-row flex-col gap-5 items-center">
          <img
            src={`/api/v1/users/${user?.id}/avatar`}
            className="w-48 min-w-[12rem] h-48 rounded-full object-cover"
            alt="Avatar"
          />
          <div className="md:w-5/6 sm:w-7/12 md:text-start text-center">
            <h3 className="text-gray-300 font-bold text-3xl">
              {user?.username}
            </h3>
            <h6 className="text-gray-300 text-xl">{user?.email}</h6>
            <h6 className="text-gray-300">{user?.birthDate}</h6>
            <div className="flex md:flex-row flex-col gap-4 my-3">
              <Link
                to="/"
                className="bg-purple text-gray-300 py-2 px-4 rounded-lg shadow-none cursor-pointer"
              >
                Editar perfil
              </Link>
              <Link
                to="/"
                className="bg-purple text-gray-300 py-2 px-4 rounded-lg shadow-none cursor-pointer"
              >
                Cambiar contraseña
              </Link>
            </div>
          </div>
        </header>

        <hr />

        <div className="grid grid-flow-col justify-stretch mb-5">
          <button
            className="border-t hover:border-purple sm:text-xl text-md text-gray-300 hover:bg-purple text-bold py-3 transition duration-150 ease-out hover:ease-in"
            onClick={() => setSelectedTab(TABS.POSTS)}
          >
            Actividad
          </button>
          <button
            className="sm:text-xl text-md text-gray-300 hover:bg-purple text-bold py-3 transition duration-150 ease-out hover:ease-in"
            onClick={() => setSelectedTab(TABS.FOLLOWERS)}
          >
            Seguidores
          </button>
          <button
            className="sm:text-xl text-md text-gray-300 hover:bg-purple text-bold py-3 transition duration-150 ease-out hover:ease-in"
            onClick={() => setSelectedTab(TABS.FOLLOWING)}
          >
            Seguidos
          </button>
        </div>

        <div className="md:w-9/12 w-11/12 flex flex-col gap-4 mx-auto mb-5">
          {selectedTab === TABS.POSTS &&
            polls.map((poll, index) => (
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
          {selectedTab === TABS.FOLLOWERS &&
            followers.map((follower, index) => (
              <div className="flex flex-row items-center p-4 bg-accent rounded-lg" key={index}>
                <img
                  src={`/api/v1/users/${follower.followerUser.id}/avatar`}
                  alt="Avatar"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex flex-col flex-grow ml-3 truncate text-gray-300">
                  <p className="text-md font-medium">{follower.followerUser.username}</p>
                  <p className="text-sm font-medium">{follower.followerUser.email}</p>
                </div>
                <button className="bg-gray-500 text-gray-300 rounded-lg px-3 py-1">
                  Dejar de seguir
                </button>
              </div>
            ))}
          {selectedTab === TABS.FOLLOWING && 
            following.map((follow, index) => (
            <div className="flex flex-row items-center p-4 bg-accent rounded-lg" key={index}>
              <img
                src={`/api/v1/users/${follow.followedUser.id}/avatar`}
                alt="Your Image"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="flex flex-col flex-grow ml-3 truncate text-gray-300">
                <p className="text-md font-bold">{follow.followedUser.username}</p>
                <p className="text-sm font-medium">{follow.followedUser.email}</p>
              </div>
              <button className="bg-red-500 text-gray-300 rounded-lg px-3 py-1">
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Profile;
