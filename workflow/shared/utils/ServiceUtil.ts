import { BASE_URL } from '../constants';

export function fetchClient(url?: string, method?: string, token?: string, bodyData?: Record<string, any>) {
  return fetch(`${BASE_URL}${url}`, {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(bodyData)
  })
    .then((res) => res.json())
    .catch((err) => err);
}
