import { Button } from '@veroxos/design-system/dist/ui/Button/button';
import Image from 'next/image';
import React from 'react';

const Error = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <Image src="/svg/error/error.svg" alt="Error screen" width={400} height={400} />
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-center text-[2.5rem] font-bold text-custom-blue">Check back shortly!</h1>
        <p className="w-[70%] text-center text-lg font-light">
          Oops! It looks like we've hit a snag. But don't worry, we're on it and will be back up in no time. Thanks for
          your patience!
        </p>
        <p className="mt-8 w-[70%] text-center text-lg font-light">
          Need help right away? Contact Veroxos Support for prompt support.
        </p>
        <Button className="mt-4 p-6">Contact Support</Button>
      </div>
    </div>
  );
};

export default Error;
