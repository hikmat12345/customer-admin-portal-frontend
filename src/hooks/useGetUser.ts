import { useEffect } from 'react';
import useUserStore from '@/stores/useUserStore';
import { useGetLoggedInUserDetails } from './useTickets';

const useGetUser = () => {
  const { data: getLoggedInUserDetailsRes } = useGetLoggedInUserDetails();
  const setUser = useUserStore((state: any) => state.setUser);

  useEffect(() => {
    if (getLoggedInUserDetailsRes?.data) {
      setUser(getLoggedInUserDetailsRes.data);
    }
  }, [getLoggedInUserDetailsRes, setUser]);
};

export default useGetUser;
