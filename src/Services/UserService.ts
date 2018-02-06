import { Observable } from 'rxjs/Observable';

const apiURL = 'https://api.github.com';

export function getUsers({ term, order }) {
  const query = `${term}+type:user+in:fullname`;

  return Observable.fromPromise(
    fetch(
      `${apiURL}/search/users?q=${query}&sort=repositories&order=${order}`
    ).then(res => res.json())
  );
}
