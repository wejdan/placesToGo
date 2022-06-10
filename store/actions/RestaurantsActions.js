export const SET_RESTAURANTS_ERROR = 'SET_RESTAURANTS_ERROR';
export const SET_RESTAURANTS = 'SET_RESTAURANTS';
export const SET_RESTAURANTS_LOADING = 'SET_RESTAURANTS_LOADING';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SET_LOCATION = 'SET_LOCATION';
export const SET_SEARCH_TYPE = 'SET_SEARCH_TYPE';

import {
  restaurantsRequest,
  restaurantsTransform,
  nearbyRestaurents,
} from '../../services/restaurants';
import {searchForCords} from '../../services/restaurants';
export const setLocation = location => {
  return {type: SET_LOCATION, location};
};

export const setType = type => {
  console.log('set type', type);
  return {type: SET_SEARCH_TYPE, PlaceType: type};
};
export const setSearchQuery = term => {
  return {type: SET_SEARCH_QUERY, term};
};
export const setRestaurants = list => {
  return {type: SET_RESTAURANTS, list};
};
export const setRestaurantsError = error => {
  return {type: SET_RESTAURANTS_ERROR, error};
};

export const setRestaurantsLoading = loading => {
  return {type: SET_RESTAURANTS_LOADING, loading};
};

export function searchRestaurants(city, type) {
  return async (dispatch, getState) => {
    dispatch(setRestaurantsLoading(true));

    const response = await searchForCords(city.toLocaleLowerCase().trim());

    if (response) {
      dispatch(setLocation(response));

      dispatch(
        retrieveRestaurants({lat: response.lat, lng: response.lng}, type),
      );
    } else {
      dispatch(setRestaurants([]));
      dispatch(setRestaurantsLoading(false));
    }
  };
}
export function retrieveRestaurants(location, type) {
  return async (dispatch, getState) => {
    dispatch(setRestaurantsLoading(true));
    dispatch(setRestaurantsError(null));
    try {
      const response = await nearbyRestaurents(location, type);
      const transformedData = await restaurantsTransform(response);
      dispatch(setRestaurants(transformedData));
    } catch (error) {
      dispatch(setRestaurantsError(error));
    }
    dispatch(setRestaurantsLoading(false));
  };
}
