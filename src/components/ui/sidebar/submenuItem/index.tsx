'use client'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useMemo } from 'react'

interface ISubItem {
	name: string
	path: string
}

const SubMenuItem = ({ item, isActive }: { item: ISubItem; isActive: boolean }) => {
	const { name, path } = item
	const router = useRouter()

	const pathname = usePathname()

	const onClick = () => {
		router.push(path)
	}

	const isItemActive = useMemo(() => path === pathname, [path, pathname])

	return (
		<div
			className={`flex items-center py-2 rounded-lg text-sm text-[#CBE0FF] hover:bg-[#FFFFFF4D] hover:text-custom-white  p-2 pl-9 cursor-pointer hover:text-sidebar-active justify-between
		${isItemActive && 'bg-[#FFFFFF4D] text-custom-white'}
	   `}
			onClick={onClick}
		>
			{name}
		</div>
	)
}

export default SubMenuItem
