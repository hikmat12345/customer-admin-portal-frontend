'use client'

import React from 'react'
import Image from 'next/image'
import Avatar from '@veroxos/design-system/dist/ui/Avatar/avatar'
import AvatarFallback from '@veroxos/design-system/dist/ui/AvatarFallback/avatarFallback'
import AvatarImage from '@veroxos/design-system/dist/ui/AvatarImage/avatarImage'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../dropdown-menu'

import AnimatedSearchField from '@/components/ui/animated-search-field'
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/utils'
import { usePathname, useRouter } from 'next/navigation'

const items = [
	{
		id: 1,
		label: 'Bot Message',
		src: '/svg/navbar/bot-message.svg',
		menuItems: [],
	},
	{
		id: 2,
		label: 'Avatar',
		src: '/icons/navbar/dummyAvatar.jpg',
		menuItems: [
			{ id: 1, label: 'My Account' },
			{
				id: 2,
				label: 'Profile',
			},
		],
	},
]

const searchTextFieldVariants = cva('flex justify-between bg-[#FFFFFF] p-2 rounded-full gap-x-1', {
	variants: {
		variant: {
			default: 'w-auto',
			expanded: 'w-[530px]',
		},
	},
})

const SearchTextField = () => {
	const [expanded, setExpanded] = React.useState(false)
	const [position, setPosition] = React.useState('bottom')

	const router = useRouter()
	const pathname = usePathname()
	const variant = expanded ? 'expanded' : 'default'
	const handleOnSubmit = (query: string) => {
		router.push(`/search?query=${query}`)
	}

	return (
		<div className={cn(searchTextFieldVariants({ variant }))}>
			{pathname !== '/search' && (
				<AnimatedSearchField variant={variant} setExpanded={setExpanded} onSubmit={handleOnSubmit} />
			)}
			<div className="flex-1 flex justify-end gap-x-2 items-center pl-2">
				{items.map((item, index) => (
					<div key={index} className={index === items?.length - 1 ? 'ml-3' : ''}>
						<DropdownMenu>
							<DropdownMenuTrigger className="cursor-pointer" asChild>
								{item.label === 'Avatar' ? (
									<Avatar>
										<AvatarImage src="/icons/navbar/dummyAvatar.jpg" />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
								) : (
									<Image src={item.src} alt={`${item.label} icon`} height={20} width={20} />
								)}
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>{item.label}</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{item.menuItems.map((menuItem) => (
									<DropdownMenuRadioGroup value={position} onValueChange={setPosition} key={menuItem.id}>
										<DropdownMenuRadioItem value={menuItem.label}>{menuItem.label}</DropdownMenuRadioItem>
									</DropdownMenuRadioGroup>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				))}
			</div>
		</div>
	)
}

export default SearchTextField
