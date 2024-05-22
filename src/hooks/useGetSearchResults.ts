/* eslint-disable react-hooks/rules-of-hooks */

//TODO: please use conditional in the top level not in the hooks
import { getSearchResults } from '@/services/search/searchService'
import { useQuery } from '@tanstack/react-query'
export const useGetSearchResults = (searchQuery: string | null, filters?: string[]) => {
	const stringifiedFilters = filters?.join(',')
	return useQuery({
		queryKey: ['search', searchQuery, stringifiedFilters],
		queryFn: getSearchResults,
	})
}
