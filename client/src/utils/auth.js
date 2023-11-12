/**
 *
 * @param {string} token
 */
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

/**
 *
 * @param {object} userData
 */
export const setUserData = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
};

/**
 *
 * @returns {string}
 */
export const getToken = () => {
  return localStorage.getItem('token') ?? '';
};

export const getUserData = () => {
  try {
    const userData = localStorage.getItem('user') ?? '';
    return JSON.parse(userData);
  } catch (error) {
    return {};
  }
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const removeUserData = () => {
  localStorage.removeItem('user');
};
