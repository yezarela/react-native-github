import { createStore, applyMiddleware, combineReducers, Store } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducers, State } from '../Reducers';
import { rootEpics } from '../Epics/';

const loggerMiddleware = createLogger();
const epicMiddleware = createEpicMiddleware(rootEpics);

export function configureStore() {
  return createStore(
    combineReducers({
      ...rootReducers
    }),
    {},
    applyMiddleware(epicMiddleware)
  );
}
