import { createSelector, createStructuredSelector } from 'reselect';

const REDUCER = 'app';

const isLoad = state => state[REDUCER].isLoad;
const entity = state => state[REDUCER].entity;
const reportDate = state => state[REDUCER].entity.Date;
const currencyFilter = state => state[REDUCER].currencyFilter;

export default createStructuredSelector({
  isLoad,
  entity,
  reportDate,
  currencyFilter,
});
