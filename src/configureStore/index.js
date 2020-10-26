import { applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import allReducer from '../reducers';
import loggerMiddleware from '../middleware/logger';
import monitorReducerEnhancer from '../enhancers/monitorReducer';

export default function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware];
  const enhancers = [middlewareEnhancer];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(loggerMiddleware);
    enhancers.push(monitorReducerEnhancer);
  }

  const middlewareEnhancer = applyMiddleware(...middlewares);
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(allReducer, preloadedState, composedEnhancers);

  return store;
}