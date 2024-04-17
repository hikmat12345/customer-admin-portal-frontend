'use client'

import React from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import SearchField from '@/components/ui/search-field'

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

const SearchTextField = () => {
	const [position, setPosition] = React.useState('bottom')

	return (
		<div className="flex w-[550px] justify-between bg-[#FFFFFF] p-2 rounded-full">
			<SearchField />
			<div className="flex gap-7 items-center">
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
							<DropdownMenuContent className="w-56">
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
