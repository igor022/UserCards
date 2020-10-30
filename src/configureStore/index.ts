import { applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import allReducer from '../reducers';
import loggerMiddleware from '../middleware/logger';
import monitorReducerEnhancer from '../enhancers/monitorReducer';

export default function configureStore(preloadedState) {
  const middlewares: Array<any> = [thunkMiddleware];
  
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(loggerMiddleware);
  }
  
  const middlewareEnhancer = applyMiddleware(...middlewares);
  
  const enhancers: Array<any> = [middlewareEnhancer];
  if (process.env.NODE_ENV === 'development') {
    enhancers.push(monitorReducerEnhancer);
  }
  
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(allReducer, preloadedState, composedEnhancers);

  return store;
}