import type { ReactNode } from 'react';
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../dialog';

interface CommonDialogProps {
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

const CommonDialog: React.FC<CommonDialogProps> = ({
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
    <DialogContent className={`max-h-[98%] overflow-hidden px-0 ${sizeClasses[size]} ${className}`}>
      <DialogHeader className="px-6">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <div className="flex-1 overflow-y-auto px-6 py-6">{content}</div>
      <DialogFooter>{actions}</DialogFooter>
    </DialogContent>
  </Dialog>
);

export default CommonDialog;
