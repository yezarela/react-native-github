import { Observable } from 'rxjs/Observable';
import { SEARCH, LOAD, refreshUser, loadUser } from '../Actions/UserAction';
import { ActionsObservable } from 'redux-observable';
import { Action, Store } from 'redux';
import { State } from '../Reducers/UserReducer';
import * as userService from '../Services/UserService';

export function loadEpic(action$: ActionsObservable<any>, store: Store<State>) {
  return action$
    .ofType(LOAD)
    .startWith(loadUser())
    .switchMap(action => {
      return userService
        .getUsers({ term: '', order: 'desc' })
        .map(data => refreshUser({ data: data.items }))
        .catch(e => Observable.of(refreshUser({ data: [], error: e })));
    });
}

export function searchEpic(
  action$: ActionsObservable<any>,
  store: Store<State>
) {
  return action$.ofType(SEARCH).switchMap(action => {
    return userService
      .getUsers(action.payload)
      .map(data => {
        console.log(data);

        return refreshUser({
          data: data.items,
          ...(data.message ? { error: data.message } : {})
        });
      })
      .catch(e => {
        console.log('err', e);
        return Observable.of(refreshUser({ data: [], error: e }));
      });
  });
}
