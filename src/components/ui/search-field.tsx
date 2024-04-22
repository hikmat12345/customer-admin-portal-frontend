import Image from 'next/image'
import React from 'react'

function SearchField({
	className,
	iconHeight = 10,
	iconWidth = 10,
	onChange,
}: {
	className?: string
	iconHeight?: number
	iconWidth?: number
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
	return (
		<form className="max-w-lg min-w-[390px]">
			<label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
			<div className="relative">
				<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
					<Image src="/svg/search.svg" alt="Search icon" height={iconHeight} width={iconWidth} />
				</div>
				<input
					type="search"
					className={`block w-full p-2 ps-8 text-sm text-gray-900 rounded-3xl bg-[#F4F7FE] focus:ring-blue-500 focus:border-[#44444480] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-[#44444480] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none ${className}`}
					placeholder="Search"
					onChange={onChange}
					required
				/>
			</div>
		</form>
	)
}

export default SearchField
