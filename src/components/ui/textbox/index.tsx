import { FC } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@radix-ui/react-tooltip';
import Image from 'next/image';

interface TooltipTextProps {
  text: string;
  maxLength?: number;
  className?: string;
  type?: string;
}

const TooltipText: FC<TooltipTextProps> = ({ text, maxLength = 10, className, type }) => {
  const shouldTruncate = text.length > maxLength;
  const truncatedText = shouldTruncate ? `${text.substring(0, maxLength)}...` : text;

  return shouldTruncate ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={`relative ${className}`}>
          {type === 'notification' ? (
            <Image src="/notification.svg" alt="info" width={16} height={16} />
          ) : (
            truncatedText
          )}
        </TooltipTrigger>
        <TooltipContent className="tooltip-content max-w-96 font-normal">{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <div className={className}>{text}</div>
  );
};

export default TooltipText;
