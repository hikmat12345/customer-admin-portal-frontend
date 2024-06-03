import type { ReactNode } from 'react'
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../dialog'

interface CommonDialogProps {
	open: boolean
	onClose: () => void
	title: ReactNode
	description?: string
	content: ReactNode
	actions?: ReactNode
	size?: 'small' | 'medium' | 'large'
	className?: string
}

const sizeClasses = {
	small: 'sm:max-w-[300px]',
	medium: 'sm:max-w-[540px]',
	large: 'sm:max-w-[600px]',
}

const CommonDialog: React.FC<CommonDialogProps> = ({
	open,
	onClose,
	title,
	description,
	content,
	actions,
	size = 'medium',
	className = '',
}) => {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className={`${sizeClasses[size]} ${className}`}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 pt-2">{content}</div>
				<DialogFooter>{actions}</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default CommonDialog
