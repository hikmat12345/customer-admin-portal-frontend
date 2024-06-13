'use client';

import React from 'react';
import httpClient from '@/services/httpClient';
import toast from 'react-hot-toast';
import { verifyJwtToken } from '@/services/cognito/cognito-token.service';

const AuthContext = React.createContext<any>(null);

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

export const AuthProvider = ({ children }: IProps) => {
  let retries = 0;

  const checkTokenExpiry: any = async () => {
    const accessToken =
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1] || '';

    const payload = await verifyJwtToken(accessToken);
    if (!payload) {
      if (retries <= 2) {
        retries += 1;
        return checkTokenExpiry();
      }
      toast.error('Session expired, redirecting you to login page');
      const response = await httpClient.post('/api/logout', {});
      window.location.href = response.data.redirectUrl;
    }

    if (payload && payload.exp) {
      retries = 0;
      const expiry = payload.exp;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const timeRemaining = expiry - currentTimestamp;

      // Keeping the log here for debugging purposes
      console.log('Time remaining for token to expire :>>  :>> ', Math.round(timeRemaining / 60));

      // 5 minutes
      if (timeRemaining <= 300) {
        const refreshToken =
          document.cookie
            .split('; ')
            .find((row) => row.startsWith('refresh_token='))
            ?.split('=')[1] || '';

        await httpClient.post('/api/session/refresh', { refreshToken });
        return;
      }

      return;
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      checkTokenExpiry();
    }, 300000); // runs every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
