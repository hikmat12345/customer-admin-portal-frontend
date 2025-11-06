import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
export type FileOptionsProps = {
  fileOptions: {
    icon: string;
    alt: string;
    href?: string;
    download?: string;
    text: string;
    color: string;
    show: boolean;
    onClick?: () => void;
  }[];
  isLoading?: boolean;
};
function Fileslist({ fileOptions, isLoading }: FileOptionsProps) {
  return (
    <>
      {!isLoading && (
        <div className="inline-flex flex-wrap items-center justify-start gap-10 pt-4">
          {fileOptions.map((option, index) => (
            <>
              {option?.show && (
                <>
                  {option.onClick ? (
                    <button
                      key={index}
                      className="flex items-center justify-start gap-2.5"
                      onClick={(e) => {
                        e.preventDefault();
                        option.onClick && option.onClick();
                      }}
                    >
                      <div className="relative h-6 w-6">
                        <Image src={option.icon} alt={option.alt} width={40} height={30} />
                      </div>
                      <div className={`text-${option.color} text-base font-medium underline`}>{option.text}</div>
                    </button>
                  ) : (
                    <Link
                      key={index}
                      className="flex items-center justify-start gap-2.5"
                      href={`${option.href}`}
                      download={option.download}
                      target="_blank"
                    >
                      <div className="relative h-6 w-6">
                        <Image src={option.icon} alt={option.alt} width={40} height={30} />
                      </div>
                      <div className={`text-${option.color} text-base font-medium underline`}>{option.text}</div>
                    </Link>
                  )}
                </>
              )}
            </>
          ))}
        </div>
      )}
    </>
  );
}
export default Fileslist;
