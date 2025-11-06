import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle  } from '../../../ui/dialog';
import type { ReactNode } from 'react';
import React from 'react';

interface DialogComponentProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: string;
  content: ReactNode;
  actions?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const sizeClasses = {
  small: 'sm:max-w-[18.75rem]',
  medium: 'sm:max-w-[34.75rem]',
  large: 'sm:max-w-[42.5rem]',
};

const DialogComponent: React.FC<DialogComponentProps> = ({
  open,
  onClose,
  title,
  description,
  content,
  actions,
  size = 'medium',
  className = '',
}) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className={`max-h-[98%] overflow-hidden px-6 ${sizeClasses[size]} ${className}`}>
      <DialogHeader className="text-start">
        <DialogTitle className='text-[1.75rem] leading-[2.144rem]'>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <div className="flex-1 overflow-y-auto">{content}</div>
      <DialogFooter>{actions}</DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DialogComponent;
