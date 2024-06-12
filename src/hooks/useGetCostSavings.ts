import { getCostSavings } from '@/services/accounts/accountsService';
import { useQuery } from '@tanstack/react-query';

export const useGetCostSavings = (year: number) => useQuery({ queryKey: ['cost-savings', year], queryFn: getCostSavings });
