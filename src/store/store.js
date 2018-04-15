import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer as router, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory';

import { loadState, saveState } from 'utils/utils';
import { stores, storesIsLoading, storesHasErrored } from 'store/reducers/stores/stores';
// import {
//   basketItems,
//   combinedIds,
//   visibleOptions,
//   ojUrl,
//   hasTvBeenRemoved,
//   toastMessage } from 'store/reducers/basket/basket';

export const history = createHistory({
  basename: ''
});

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Create a combined "root" reducer
const rootReducer = combineReducers({
  router,
  stores,
  storesIsLoading,
  storesHasErrored
});

// Create a store using either a state loaded from
// localStorage or from afresh
const persistedState = loadState('localStorageState');
export const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(
    applyMiddleware(thunk, middleware)
  )
);

// Save state to localStorage on each store change
store.subscribe(() => {
  saveState(store.getState(), 'localStorageState');
});