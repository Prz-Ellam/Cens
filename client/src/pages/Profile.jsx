import { useEffect, useState } from 'react';
import SurveyForm from '@/components/SurveyForm';
import { Link, useParams } from 'react-router-dom';
import axios from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import Swal from 'sweetalert2';

const TABS = Object.freeze({
  POSTS: 'POSTS',
  FOLLOWERS: 'FOLLOWERS',
  FOLLOWING: 'FOLLOWING'
});

function Profile() {
  const authUser = useAuth().user;

  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [polls, setPolls] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const fetchUserPolls = async (userId) => {
    try {
      const response = await axios.get(`/users/${userId}/polls`);

      setPolls(response.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(`/users/${userId}`);

      console.log(response.data);
      setUser(response.data.user);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const fetchFollowers = async () => {
    try {
      const response = await axios.get(`/users/${userId}/followers`);

      console.log(response.data);
      setFollowers(response.data.followers);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const fetchFollowing = async () => {
    try {
      const response = await axios.get(`/users/${userId}/following`);

      setFollowing(response.data.following);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const unfollowUser = async (userId) => {
    try {
      const response = await axios.delete(`/users/${userId}/following`);

      Swal.fire({
        title: 'Operación éxitosa',
        icon: 'success',
        text: response.data.message
      });

      fetchFollowing();
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserPolls(userId);
    }
  }, []);

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
            {user.id === authUser.id && (
              <div className="flex md:flex-row flex-col gap-4 my-3">
                <Link
                  to="/profileEdit"
                  className="text-gray-300 bg-purple-800 hover:bg-purple-90 focus:outline-none font-bold rounded-lg py-2 px-4 shadow-none cursor-pointer transition duration-150 ease-out hover:ease-in"
                >
                  Editar perfil
                </Link>
                <Link
                  to="/profileEdit"
                  className="text-gray-300 bg-purple-800 hover:bg-purple-900 focus:outline-none font-bold rounded-lg py-2 px-4 shadow-none cursor-pointer transition duration-150 ease-out hover:ease-in"
                >
                  Cambiar contraseña
                </Link>
              </div>
            )}
          </div>
        </header>

        <hr />

        <div className="grid grid-flow-col justify-stretch mb-5">
          <button
            className={`${
              selectedTab === TABS.POSTS ? 'bg-purple-800' : ''
            } sm:text-xl text-md text-gray-300 hover:bg-purple-900 text-bold py-3 transition duration-150 ease-out hover:ease-in`}
            onClick={() => setSelectedTab(TABS.POSTS)}
          >
            Actividad
          </button>
          <button
            className={`${
              selectedTab === TABS.FOLLOWERS ? 'bg-purple-800' : ''
            } sm:text-xl text-md text-gray-300 hover:bg-purple-900 text-bold py-3 transition duration-150 ease-out hover:ease-in`}
            onClick={() => setSelectedTab(TABS.FOLLOWERS)}
          >
            Seguidores
          </button>
          <button
            className={`${
              selectedTab === TABS.FOLLOWING ? 'bg-purple-800' : ''
            } sm:text-xl text-md text-gray-300 hover:bg-purple-900 text-bold py-3 transition duration-150 ease-out hover:ease-in`}
            onClick={() => setSelectedTab(TABS.FOLLOWING)}
          >
            Seguidos
          </button>
        </div>

        <div className="md:w-9/12 w-11/12 flex flex-col gap-4 mx-auto mb-5">
          {selectedTab === TABS.POSTS &&
            (polls.length > 0 ? (
              polls.map((poll, index) => (
                <SurveyForm
                  key={index}
                  poll={poll}
                  onDelete={async (pollId) => {
                    try {
                      const newPolls = polls.filter((poll) => poll.id !== pollId);
                      setPolls(newPolls);
                    } catch (error) {
                      console.error('Error deleting poll:', error);
                    }
                  }}
                  onUpdate={async (pollId) => {
                    try {
                      const response = await axios.get(`/polls/${pollId}`);

                      // console.log(response.data);
                      const newPoll = response.data;
                      console.log(newPoll);
                      const newPolls = polls.map((poll) =>
                        poll.id === pollId ? newPoll : poll
                      );
                      setPolls(newPolls);
                      console.log(newPolls);
                    } catch (error) {
                      console.log('error');
                    }
                  }}
                />
              ))
            ) : (
              <p className="text-gray-300 text-2xl text-center font-bold">
                Está cuenta no tiene ninguna actividad...
              </p>
            ))}
          {selectedTab === TABS.FOLLOWERS &&
            (followers.length > 0 ? (
              followers.map((follower, index) => (
                <div
                  className="flex flex-row items-center p-4 bg-accent rounded-lg"
                  key={index}
                >
                  <img
                    src={`/api/v1/users/${follower.followerUser.id}/avatar`}
                    alt="Avatar"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="flex flex-col flex-grow ml-3 truncate text-gray-300">
                    <Link
                      to={`/profile/${follower.followerUser.id}`}
                      className="text-md font-bold"
                      reloadDocument
                    >
                      {follower.followerUser.username}
                    </Link>
                    <p className="text-sm font-medium">
                      {follower.followerUser.email}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-300 text-2xl text-center font-bold">
                Está cuenta no tiene seguidores...
              </p>
            ))}
          {selectedTab === TABS.FOLLOWING &&
            (followers.length > 0 ? (
              following.map((follow, index) => (
                <div
                  className="flex flex-row items-center p-4 bg-accent rounded-lg"
                  key={index}
                >
                  <img
                    src={`/api/v1/users/${follow.followedUser.id}/avatar`}
                    alt="Avatar"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="flex flex-col flex-grow ml-3 truncate text-gray-300">
                    <p className="text-md font-bold">
                      {follow.followedUser.username}
                    </p>
                    <p className="text-sm font-medium">
                      {follow.followedUser.email}
                    </p>
                  </div>
                  {authUser.id == userId && (
                    <button
                      className="bg-red-500 text-gray-300 rounded-lg px-3 py-1"
                      onClick={() => unfollowUser(follow.followedUser.id)}
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-300 text-2xl text-center font-bold">
                Está cuenta no sigue a nadie...
              </p>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Profile;
