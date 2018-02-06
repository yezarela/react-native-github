import { SEARCH, REFRESH, LOAD } from '../Actions/UserAction';

const initialState = {
  data: [],
  loading: true,
  error: null
};

export interface State {
  data: any[];
  loading: boolean;
  error?: string;
}

export default function userReducer(state: State = initialState, action) {
  switch (action.type) {
    case SEARCH: {
      return { ...state, loading: true };
    }

    case REFRESH: {
      return { ...state, ...action.payload, loading: false };
    }

    default: {
      return state;
    }
  }
}
