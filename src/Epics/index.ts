import { combineEpics } from 'redux-observable';

import { searchEpic, loadEpic } from './UserEpic';

export const rootEpics = combineEpics(searchEpic, loadEpic);
