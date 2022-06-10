import {
  SET_RESTAURANTS,
  SET_RESTAURANTS_LOADING,
  SET_RESTAURANTS_ERROR,
  SET_SEARCH_QUERY,
  SET_LOCATION,
  SET_SEARCH_TYPE,
} from '../actions/RestaurantsActions';
import {LOGOUT} from '../actions/userActions';
const initState = {
  restaurantsList: [],
  isLoading: false,
  error: false,
  initlized: false,
  searchQuery: '',
  location: null,
  type: 'restaurant',
};

export const restaurantsReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_SEARCH_TYPE:
      return {
        ...state,
        type: action.PlaceType,
      };
    case LOGOUT:
      return initState;
    case SET_RESTAURANTS:
      return {
        ...state,
        restaurantsList: action.list,
        initlized: true,
      };
    case SET_RESTAURANTS_LOADING:
      return {...state, isLoading: action.loading};
    case SET_RESTAURANTS_ERROR:
      return {...state, error: action.error};
    case SET_SEARCH_QUERY:
      return {...state, searchQuery: action.term};
    case SET_LOCATION:
      return {...state, location: action.location};

    default:
      return state;
  }
};
