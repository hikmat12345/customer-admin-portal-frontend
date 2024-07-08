'use client';

import React from 'react';
import httpClient from '@/services/httpClient';
import { verifyJwtToken } from '@/services/cognito/cognito-token.service';
import toast from 'react-hot-toast';

const AuthContext = React.createContext<any>(null);

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

export const AuthProvider = ({ children }: IProps) => {
  let retries = 0;

  const checkTokenExpiry: any = async () => {
    const authToken =
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1] || '';

    const payload = await verifyJwtToken(authToken);
    if (!payload) {
      if (retries <= 2) {
        retries += 1;
        return checkTokenExpiry();
      }
      toast.error('Session expired, redirecting you to login page');
      const response = await httpClient.post('/api/session/logout');
      window.location.href = response.data.redirectUrl;
    }

    if (payload && payload.exp) {
      retries = 0;
      const expiry = payload.exp;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const timeRemaining = expiry - currentTimestamp;

      // Keeping the log here for debugging purposes
      console.log('Time remaining for token to expire :>>  :>> ', Math.round(timeRemaining / 60));

      // 5 minutes or less for the token to expire
      if (timeRemaining <= 300) {
        await httpClient.post('/api/session/refresh');
        return;
      }

      return;
    }
  };

  React.useEffect(() => {
    // call immediately
    checkTokenExpiry();
    // then in interval
    const interval = setInterval(() => {
      checkTokenExpiry();
    }, 300000); // runs every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
