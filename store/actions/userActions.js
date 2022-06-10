import axios from 'axios';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const SET_LOADING = 'SET_LOADING';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_ERROR = 'SET_ERROR';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = ' AIzaSyAfn91thblVslP2jJVEhCYAFIhF3iMwfgY ';

export const loginAction = (authToken, data) => {
  return {
    type: LOGIN,
    authToken,
    data,
  };
};
export const logoutAction = () => {
  return {
    type: LOGOUT,
  };
};

export const setUserInfo = data => {
  return {
    type: SET_USER_INFO,
    data,
  };
};
export const setLoading = loading => {
  return {
    type: SET_LOADING,
    loading,
  };
};

export const setError = error => {
  return {
    type: SET_ERROR,
    error,
  };
};
export const registerAction = userData => {
  return {
    type: REGISTER,
    userData,
  };
};

async function getUserData(id) {
  //console.log('user id', id);
  try {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
      {
        idToken: id,
      },
    );

    return response.data.users[0];
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.data.error.message == 'INVALID_ID_TOKEN') {
        dispatch(
          setError(
            'There is no user record corresponding to this identifier. The user may have been deleted.',
          ),
        );
      }
      if (error.response.data.error.message == 'USER_NOT_FOUND') {
        dispatch(
          setError(
            'The password is invalid or the user does not have a password',
          ),
        );
      }
    } else if (error.request) {
      console.log(error.request);
      dispatch(setError(error.request));
    } else {
      console.log('Error', error.message);
      dispatch(setError(error.message));
    }
  }
}
export const asyncLogout = () => {
  return async (dispatch, getState) => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userData');
    dispatch(logoutAction());
  };
};
export function login(loginData) {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          email: loginData.email,
          password: loginData.password,
          returnSecureToken: true,
        },
      );
      const userData = await getUserData(response.data.idToken);
      dispatch(loginAction(response.data.idToken, userData));
    } catch (error) {
      console.log('error', error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data.error.message);
        if (error.response.data.error.message == 'EMAIL_NOT_FOUND') {
          dispatch(
            setError(
              'There is no user record corresponding to this identifier. The user may have been deleted.',
            ),
          );
        } else if (
          error.response.data.error.message == 'INVALID_PASSWORD' ||
          error.response.data.error.message == 'INVALID_EMAIL'
        ) {
          dispatch(
            setError(
              'The password is invalid or the user does not have a password',
            ),
          );
        } else if (error.response.data.error.message == 'USER_DISABLED') {
          dispatch(
            setError('The user account has been disabled by an administrator.'),
          );
        } else if (
          error.response.data.error.message == 'TOO_MANY_ATTEMPTS_TRY_LATER'
        ) {
          dispatch(
            setError(
              'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later',
            ),
          );
        } else {
          dispatch(setError(error.response.data.error.message));
        }
      } else if (error.request) {
        dispatch(setError(error.message));
      } else {
        alert('other');
        console.log('Error', error.message);
        dispatch(setError(error.message));
      }
    }
    dispatch(setLoading(false));
  };
}

export function register(regData) {
  return async (dispatch, store) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          email: regData.email,
          password: regData.password,
          returnSecureToken: true,
        },
      );

      const userData = await getUserData(response.data.idToken);
      dispatch(loginAction(response.data.idToken, userData));
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data.error.message);
        if (error.response.data.error.message == 'EMAIL_EXISTS') {
          dispatch(
            setError('The email address is already in use by another account'),
          );
        }
      } else if (error.request) {
        console.log(error.request);
        dispatch(setError(error.request));
      } else {
        console.log('Error', error.message);
        dispatch(setError(error.message));
      }
    }

    dispatch(setLoading(false));
  };
}
