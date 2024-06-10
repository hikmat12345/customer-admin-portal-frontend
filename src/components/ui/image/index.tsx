// components/VImage.tsx
import Skeleton from '@veroxos/design-system/dist/ui/Skeleton/skeleton';
import Image from 'next/image';
import { useState } from 'react';

interface VImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loader?: ({ src, width, quality }: { src: string; width: number; quality?: number }) => string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

const VImage: React.FC<VImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  loader,
  priority = false,
  placeholder = 'empty',
  blurDataURL,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={` ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loader={loader}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={'rounded-lg transition-transform duration-300 hover:scale-105 ' + className}
        onLoadingComplete={() => setIsLoaded(true)}
      />
      {!isLoaded && (
        <div className="flex items-center justify-center">
          <div style={{ width: width, height: height }} className="rounded-lg bg-custom-lightGray">
            <Skeleton variant="block" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VImage;
