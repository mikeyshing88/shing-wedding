import { BASKET_CONSTANTS } from 'constants/constants';

const initialState = {
  product: [],
  sportOption: [],
  channelExtras: [],
  moreExtras: []
};

/**
 * Combine the ID's of the broadband package and
 * the TV add-on (if selected)
 * @param  {Boolean} state
 * @param  {Array}   action
 * @return {*}
 */
export function combinedIds(state = false, action) {
  switch (action.type) {
    case BASKET_CONSTANTS.ADD_PACKAGE:
      return action.product.ID;
    case BASKET_CONSTANTS.ADD_OPTION: {
      if (action.selectedSportId === '' && action.storeValue !== 'sportOption') {
        return `${action.initialBbId}`;
      }

      // Combine the correct ID if customer selects a TV option
      const fromAddTv = (action.product.selectedId)
        ? action.product.selectedId
        : action.product.ID;

      let combinedId = (action.selectedSportId === '')
        ? `${action.initialBbId}-${fromAddTv}`
        : `${action.initialBbId}-${action.selectedSportId}`;

      if (combinedId.match(/undefined/)) {
        combinedId = action.initialBbId;
      }

      return combinedId;
    }
    case BASKET_CONSTANTS.REMOVE_OPTION: {
      if (((action.storeValue === 'channelExtras') || (action.storeValue === 'moreExtras')) &&
        action.selectedSportId === '') {
        return state;
      }

      const combinedId = (action.storeValue === 'sportOption')
        ? `${action.initialBbId}`
        : `${action.initialBbId}-${action.selectedSportId}`;
      return combinedId;
    }
    case BASKET_CONSTANTS.REMOVE_TV: {
      return action.initialBbId;
    }
    default:
      return state;
  }
}

/**
 * Store selected add-ons into the basket
 * @param  {Object}  state
 * @param  {Array}   action
 * @return {*}
 */
export function basketItems(state = initialState, action) {
  switch (action.type) {
    case BASKET_CONSTANTS.BASKET_CLEAR_CURRENT_OPTIONS: {
      switch (action.storeValue) {
        case 'sportOption':
          return initialState;
        case 'channelExtras': {

          // Remove Add BT TV (sportOption) if the package is not a BB journey
          if (state.product[0].products &&
              state.product[0].products.productType === 'broadband_tv') {
            return Object.assign({}, state, {
              sportOption: initialState.sportOption,
              [action.storeValue]: initialState[action.storeValue],
              moreExtras: initialState.moreExtras
            });
          }
          return Object.assign({}, state, {
            [action.storeValue]: initialState[action.storeValue],
            moreExtras: initialState.moreExtras
          });
        }
        case 'moreExtras':
          // Remove TV packages if it is a landline journey
          if (state.product[0].products &&
            (state.product[0].products.productType === 'landline')) {
            return Object.assign({}, state, {
              sportOption: initialState.sportOption,
              channelExtras: initialState.channelExtras,
              [action.storeValue]: initialState[action.storeValue]
            });
          }

          return Object.assign({}, state, {
            [action.storeValue]: initialState[action.storeValue]
          });
        default:
          return initialState;
      }
    }
    case BASKET_CONSTANTS.ADD_PACKAGE:
      return Object.assign({}, state, {
        product: [action.product]
      });
    case BASKET_CONSTANTS.ADD_OPTION:
      return Object.assign({}, state, {
        [action.storeValue]: [...state[action.storeValue], action.product]
      });
    case BASKET_CONSTANTS.REMOVE_OPTION:
      if (state.channelExtras.length > 0 &&
          state.channelExtras.find(extra => extra.ID === action.product.ID)) {
        return Object.assign({}, state, {
          channelExtras: state.channelExtras.filter(extra => extra.ID !== action.product.ID)
        });
      }

      return Object.assign({}, state, {
        [action.storeValue]: state[action.storeValue]
          .filter(extra => extra.ID !== action.product.ID)
      });
    case BASKET_CONSTANTS.REMOVE_TV:
      return Object.assign({}, state, {
        sportOption: [],
        channelExtras: []
      });
    default:
      return state;
  }
}

/**
 * Store all visible options on the current page
 * to handle non-selected parameter values
 * @param  {Array} state
 * @param  {Array} action
 * @return {*}
 */
export function visibleOptions(state = [], action) {
  switch (action.type) {
    case BASKET_CONSTANTS.BASKET_CLEAR_CURRENT_OPTIONS: {
      switch (action.storeValue) {
        case 'sportOption':
          return Object.assign({}, state, {
            channelExtras: [],
            moreExtras: []
          });
        case 'channelExtras':
          return Object.assign({}, state, {
            moreExtras: []
          });
        case 'moreExtras':
          return Object.assign({}, state, {
            ...state
          });
        default:
          return initialState;
      }
    }
    case BASKET_CONSTANTS.STORED_VISIBLE_OPTIONS:
      return Object.assign({}, state, {
        [action.page]: [...action.visible]
      });
    default:
      return state;
  }
}

/**
 * Store all visible options on the current page
 * to handle non-selected parameter values
 * @param  {String} state
 * @param  {Array} action
 * @return {*}
 */
export function ojUrl(state = '', action) {
  switch (action.type) {
    case BASKET_CONSTANTS.STORED_OJ_URL:
      return action.url;
    default:
      return state;
  }
}

/**
 * Check if TV has been removed after it has been selected
 * @param  {Boolean} state
 * @param  {Array} action
 * @return {*}
 */
export function hasTvBeenRemoved(state = false, action) {
  switch (action.type) {
    case BASKET_CONSTANTS.REMOVE_TV:
      return (Object.keys(action.option).length > 0);
    case BASKET_CONSTANTS.BASKET_CLEAR_CURRENT_OPTIONS:
      return false;
    default:
      return state;
  }
}

/**
 * Set the toast message
 * @param  {Object} state
 * @param  {Array} action
 * @return {*}
 */
export function toastMessage(state = {}, action) {
  switch (action.type) {
    case BASKET_CONSTANTS.TOAST_MESSAGE:
      return action.msg;
    case BASKET_CONSTANTS.BASKET_CLEAR_CURRENT_OPTIONS:
      return {};
    default:
      return state;
  }
}
