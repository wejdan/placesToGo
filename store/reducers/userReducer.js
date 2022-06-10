import {
  LOGIN,
  LOGOUT,
  SET_USER_INFO,
  SET_LOADING,
  SET_ERROR,
} from '../actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initState = {
  authToken: null,
  loading: false,
  userInfo: null,
  error: null,
};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      AsyncStorage.setItem('token', action.authToken);
      AsyncStorage.setItem('userData', JSON.stringify(action.data));

      return {...state, authToken: action.authToken, userInfo: action.data};
    case LOGOUT:
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('userData');
      return {...state, authToken: null, userInfo: null};
    case SET_LOADING:
      return {...state, loading: action.loading};
    case SET_ERROR:
      return {...state, error: action.error};

    default:
      return state;
  }
};
