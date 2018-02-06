import userReducer, { State as UserState } from './UserReducer';

export const rootReducers = {
  user: userReducer
};

export interface State {
  user: UserState;
}
