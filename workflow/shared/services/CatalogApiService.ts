import { ApiConst, BASE_URL } from '../constants';
import { format } from '../utils';

export function fetchLocation(
  token?: string,
  method?: string,
  bodyData?: Record<string, any>,
  wokflowId?: number,
  signal?: AbortSignal
): Promise<void> {
  return fetch(`${BASE_URL}${format(ApiConst.getCatalog, wokflowId)}`, {
    signal: signal,
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
