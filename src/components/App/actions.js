import * as types from './constants';

export const load = date => ({
  types:   [types.LOAD_REQUEST, types.LOAD_SUCCESS, types.LOAD_FAILURE],
  promise: api => api.get(`/getData?date_req=${date}`),
});

export const setFilter = currencyArr => ({
  type: types.SET_FILTER, currencyArr,
});
