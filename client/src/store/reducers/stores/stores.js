/**
 * Respond to error action type
 * @param  {Boolean} state
 * @param  {String}  action
 * @return {*}
 */
export function storesHasErrored(state = false, action) {
  switch (action.type) {
    case 'STORES_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

/**
 * Respond to loading action type
 * @param  {Boolean} state
 * @param  {String}  action
 * @return {*}
 */
export function storesIsLoading(state = false, action) {
  switch (action.type) {
    case 'STORES_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

/**
 * Respond to successful data action type
 * @param  {Array} state
 * @param  {String}  action
 * @return {*}
 */
export function stores(state = [], action) {
  switch (action.type) {
    case 'STORES_FETCH_DATA_SUCCESS':
      return action.stores.map((store, index) => {
        // By default, select the first store
        if (index === 0) {
          store.selected = true;
        } else {
          store.selected = false;
        }

        // Add label programmatically to avoid data
        // duplication
        store.label = `${store.number} - ${store.location}`;

        return store;
      });
    case 'STORES_SELECT':
      return state.map((store) => {
        if (store.number === action.store.number) {
          store.selected = true;
        } else {
          store.selected = false;
        }

        return store;
      });
    default:
      return state;
  }
}
