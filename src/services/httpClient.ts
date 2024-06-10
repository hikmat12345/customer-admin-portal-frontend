import axios from 'axios';

const httpClient = axios.create();

let accessToken = '';

if (typeof document !== 'undefined') {
  accessToken =
    document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1] || '';
}
httpClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
httpClient.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';

export default httpClient;
