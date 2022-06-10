import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions/cartActions';

let initialValues = {
  cart: [],
  total: 0,
  amount: 0,
};

export const cartReducer = (state = initialValues, action) => {
  if (action.type === CLEAR_CART) {
    return {...state, cart: []};
  }
  if (action.type === ADD_TO_CART) {
    return {...state, cart: [...state.cart, action.payload]};
  }
  if (action.type === REMOVE_CART_ITEM) {
    return {
      ...state,
      cart: state.cart.filter(cartItem => cartItem.id !== action.payload),
    };
  }

  if (action.type === COUNT_CART_TOTALS) {
    let {total, amount} = state.cart.reduce(
      (cartTotal, cartItem) => {
        const {productPrice, quantity} = cartItem;
        const itemTotal = productPrice * quantity;

        cartTotal.total += itemTotal;
        cartTotal.amount += quantity;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      },
    );
    total = parseFloat(total.toFixed(2));

    return {...state, total, amount};
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    let tempCart = state.cart
      .map(cartItem => {
        if (cartItem.id === action.payload.id) {
          let newSum;
          if (action.payload.type === 'inc') {
            newSum = parseFloat(
              ((cartItem.quantity + 1) * cartItem.productPrice).toFixed(2),
            );
            return {...cartItem, quantity: cartItem.quantity + 1, sum: newSum};
          }
          if (action.payload.type === 'dec') {
            newSum = parseFloat(
              ((cartItem.quantity - 1) * cartItem.productPrice).toFixed(2),
            );

            return {...cartItem, quantity: cartItem.quantity - 1, sum: newSum};
          }
        }
        return cartItem;
      })
      .filter(cartItem => cartItem.quantity !== 0);
    return {...state, cart: tempCart};
  }
  return state;
};
