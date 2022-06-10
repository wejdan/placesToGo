import {userReducer} from './reducers/userReducer';
import {cartReducer} from './reducers/cartReducer';
import {favouriteReducer} from './reducers/favouriteReducer';
import {restaurantsReducer} from './reducers/RestaurantsReducer';

import {combineReducers} from 'redux';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createStore} from 'redux';

export const store = createStore(
  combineReducers({
    user: userReducer,
    cart: cartReducer,
    favourite: favouriteReducer,
    restaurants: restaurantsReducer,
  }),
  applyMiddleware(thunk),
);
