import converter from './xmlToJson'

const apiMiddleware = api => ({ dispatch, getState }) => next => (action) => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  const { types, promise, schema, schemaOptions, ...rest } = action;

  if (!promise) {
    return next(action);
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const [REQUEST, SUCCESS, FAILURE] = types;
  next({ ...rest, type: REQUEST });

  return promise(api).then(
    response => {
    const data = converter(response.data, 'string');
    next({
      ...rest,
      data,
      type: SUCCESS })},
    error => next({
      ...rest,
      error,
      errors: error.response.data.errors,
      type:   FAILURE }),
  );
};


export default apiMiddleware;
