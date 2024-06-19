import { useSearchParams } from 'next/navigation';
import React from 'react';

const CreateQueryString = () => {
  const searchParams = useSearchParams();

  const createQueryString = React.useCallback(
    (name: string, value: number | string | undefined) => {
      const sParams = new URLSearchParams(searchParams?.toString());

      if (value !== undefined) {
        sParams.set(name, value.toString());
      } else {
        sParams.delete(name);
      }

      return sParams.toString();
    },
    [searchParams],
  );

  return createQueryString;
};

export default CreateQueryString;
