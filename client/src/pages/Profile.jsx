import { useCallback, useEffect, useState } from 'react';
import SurveyForm from '@/components/SurveyForm';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import Swal from 'sweetalert2';
import Pagination from '@/components/Pagination';

const TABS = Object.freeze({
  POSTS: 'POSTS',
  FOLLOWERS: 'FOLLOWERS',
  FOLLOWING: 'FOLLOWING'
});

/**
 * Página del perfil de usuario con encuestas, seguidores y seguidos
 * @returns
 */
function Profile() {
  const authUser = useAuth().user;

  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [polls, setPolls] = useState([]);
  const [pollsTotalPages, setPollsTotalPages] = useState(0);
  const [pollsPage, setPollsPage] = useState(1);

  const [followers, setFollowers] = useState([]);
  const [followersTotalPages, setFollowersTotalPages] = useState(0);
  const [followersPage, setFollowersPage] = useState(1);

  const [following, setFollowing] = useState([]);
  const [followingTotalPages, setFollowingTotalPages] = useState(0);
  const [followingPage, setFollowingPage] = useState(1);

  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get(`/users/${userId}`);

      setUser(response.data.user);
    } catch (error) {
      console.error(error.response.data.message);
      navigate('/');
    }
  }, [navigate, userId]);

  const fetchUserPolls = useCallback(
    async (page) => {
      try {
        const response = await axios.get(
          `/users/${userId}/polls?page=${page}&limit=5`
        );

        setPolls(response.data.polls);
        setPollsTotalPages(response.data.totalPages);
        setPollsPage(page);
      } catch (error) {
        console.error(error.response.data.message);
      }
    },
    [userId]
  );

  const fetchFollowers = useCallback(
    async (page) => {
      try {
        const response = await axios.get(
          `/users/${userId}/followers?page=${page}&limit=5`
        );

        setFollowers(response.data.followers);
        setFollowersTotalPages(response.data.totalPages);
        setFollowersPage(page);
      } catch (error) {
        console.error(error.response.data.message);
      }
    },
    [userId]
  );

  const fetchFollowing = useCallback(
    async (page) => {
      try {
        const response = await axios.get(
          `/users/${userId}/following?page=${page}&limit=5`
        );

        setFollowing(response.data.following);
        setFollowingTotalPages(response.data.totalPages);
        setFollowingPage(page);
      } catch (error) {
        console.error(error.response.data.message);
      }
    },
    [userId]
  );

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
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (userId) {
      fetchUserPolls(pollsPage);
    }
  }, [userId, pollsPage, fetchUserPolls]);

  useEffect(() => {
    fetchFollowers(followersPage);
  }, [followersPage, fetchFollowers]);

  useEffect(() => {
    fetchFollowing(followingPage);
  }, [followingPage, fetchFollowing]);

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
          {selectedTab === TABS.POSTS && (
              <>
                {polls.length > 0 ? (
                  <>
                    {polls.map((poll, index) => (
                      <SurveyForm
                        key={index}
                        poll={poll}
                        onDelete={async (pollId) => {
                          try {
                            const newPolls = polls.filter(
                              (poll) => poll.id !== pollId
                            );
                            setPolls(newPolls);
                          } catch (error) {
                            console.error('Error deleting poll:', error);
                          }
                        }}
                        onUpdate={async (pollId) => {
                          try {
                            const response = await axios.get(
                              `/polls/${pollId}`
                            );

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
                    ))}
                    <Pagination
                      page={pollsPage}
                      totalPages={pollsTotalPages}
                      onSelect={(page) => fetchUserPolls(page)}
                    />
                  </>
                ) : (
                  <p className="text-gray-300 text-2xl text-center font-bold">
                    Está cuenta no tiene ninguna actividad...
                  </p>
                )}
              </>
            )}

          {selectedTab === TABS.FOLLOWERS && (
            <>
              {followers.length > 0 ? (
                <>
                  {followers.map((follower, index) => (
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
                        >
                          {follower.followerUser.username}
                        </Link>
                        <p className="text-sm font-medium">
                          {follower.followerUser.email}
                        </p>
                      </div>
                    </div>
                  ))}

                  <Pagination
                    page={followersPage}
                    totalPages={followersTotalPages}
                    onSelect={(page) => fetchFollowers(page)}
                  />
                </>
              ) : (
                <p className="text-gray-300 text-2xl text-center font-bold">
                  Está cuenta no tiene seguidores...
                </p>
              )}
            </>
          )}

          {selectedTab === TABS.FOLLOWING && (
            <>
              {following.length > 0 ? (
                <>
                  {following.map((follow, index) => (
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
                        <Link
                          to={`/profile/${follow.followedUser.id}`}
                          className="text-md font-bold"
                        >
                          {follow.followedUser.username}
                        </Link>
                        <p className="text-sm font-medium">
                          {follow.followedUser.email}
                        </p>
                      </div>
                      {authUser.id === userId && (
                        <button
                          className="bg-red-500 text-gray-300 rounded-lg px-3 py-1"
                          onClick={() => unfollowUser(follow.followedUser.id)}
                        >
                          Eliminar
                        </button>
                      )}
                    </div>
                  ))}

                  <Pagination
                    page={followingPage}
                    totalPages={followingTotalPages}
                    onSelect={(page) => fetchFollowing(page)}
                  />
                </>
              ) : (
                <p className="text-gray-300 text-2xl text-center font-bold">
                  Esta cuenta no sigue a nadie...
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Profile;
