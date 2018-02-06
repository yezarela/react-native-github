export const LOAD = '[User] Load';
export const SEARCH = '[User] Search';
export const REFRESH = '[User] Refresh';

export function searchUser({ term, order }) {
  return { type: SEARCH, payload: { term, order } };
}

export function refreshUser(users) {
  return { type: REFRESH, payload: users };
}

export function loadUser() {
  return { type: LOAD };
}
