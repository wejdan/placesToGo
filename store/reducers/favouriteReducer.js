import {
  ADD_TO_FAVOURITE,
  REMOVE_FROM_FAVOURITE,
  SET_FAVOURITE,
} from '../actions/favouritesActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initState = {token: null, list: {}};

export const favouriteReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_FAVOURITE:
      return {token: action.token, list: action.list};
    case ADD_TO_FAVOURITE:
      const {id} = action.payload;
      let newlist = {
        ...state.list,
        [id]: {...action.payload},
      };
      AsyncStorage.setItem(state.token, JSON.stringify(newlist));
      return {...state, list: newlist};
    case REMOVE_FROM_FAVOURITE:
      let newState = Object.assign({}, state.list);
      delete newState[action.payload];
      AsyncStorage.setItem(state.token, JSON.stringify(newState));

      return {...state, list: newState};

    default:
      return state;
  }
};
