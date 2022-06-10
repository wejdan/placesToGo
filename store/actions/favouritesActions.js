export const ADD_TO_FAVOURITE = 'ADD_TO_FAVOURITE';
export const REMOVE_FROM_FAVOURITE = 'REMOVE_FROM_FAVOURITE';
export const SET_FAVOURITE = 'SET_FAVOURITE';

export const loadFavourite = (token, list) => {
  return {type: SET_FAVOURITE, token, list};
};
export const removeFromFavourite = id => {
  return {type: REMOVE_FROM_FAVOURITE, payload: id};
};
export const addToFavourite = item => {
  return {type: ADD_TO_FAVOURITE, payload: item};
};
