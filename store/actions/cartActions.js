export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
export const TOGGLE_CART_ITEM_AMOUNT = 'TOGGLE_CART_ITEM_AMOUNT';
export const CLEAR_CART = 'CLEAR_CART';
export const COUNT_CART_TOTALS = 'COUNT_CART_TOTALS';

export const clearCart = () => {
  return {type: CLEAR_CART};
};
export const getCartTotal = () => {
  return {type: COUNT_CART_TOTALS};
};
export const removeItem = id => {
  return {type: REMOVE_CART_ITEM, payload: id};
};
export const addItem = item => {
  console.log('add item***');
  return {type: ADD_TO_CART, payload: item};
};
export const toggleAmount = (id, type, value) => {
  return {type: TOGGLE_CART_ITEM_AMOUNT, payload: {id, type, value}};
};
