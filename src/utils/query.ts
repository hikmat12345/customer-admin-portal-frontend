import { UseMutationOptions } from '@tanstack/react-query'
import * as RQ from '@tanstack/react-query'
export const createMutationWithVariables = <TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
	key: string,
	fn: (variables: TVariables) => Promise<TData>
) => {
	const useMutation = (options?: UseMutationOptions<TData, TError, TVariables, TContext>) =>
		RQ.useMutation<TData, TError, TVariables, TContext>({
			...options,
			mutationKey: [key],
			mutationFn: fn,
		})
	return { useMutation }
}