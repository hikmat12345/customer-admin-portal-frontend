import {
    NEXT_PUBLIC_API_BASE_URL,
  } from 'config/config';
  import httpClient from '../httpClient';
  
  export const getActivityFeedback = async () => { 
    return httpClient.get(`${NEXT_PUBLIC_API_BASE_URL}/activity-feed`).then(({ data }) => data).catch((error) => error);
  };