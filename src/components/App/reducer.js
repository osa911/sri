import { combineReducers } from 'redux';
import * as types from './constants';

const initialState = {
  isLoad: false,
  entity: {
    Date:   '',
    name:   '',
    Valute: [],
  },
  currencyFilter:[ 'USD', 'EUR' ],
};

const entity = (state = initialState.entity, action) => {
  switch (action.type) {
    case types.LOAD_SUCCESS:
      return action.data.ValCurs;
    default:
      return state;
  }
};

const currencyFilter = (state = initialState.currencyFilter, action) => {
  switch (action.type) {
    case types.SET_FILTER:
      return action.currencyArr;
    default:
      return state;
  }
};

const isLoad = (state = initialState.isLoad, action) => {
  switch (action.type) {
    case types.LOAD_REQUEST:
      return true;
    case types.LOAD_SUCCESS:
    case types.LOAD_FAILURE:
      return false;
    default:
      return state;
  }
};


export default combineReducers({
  isLoad,
  entity,
  currencyFilter,
});
