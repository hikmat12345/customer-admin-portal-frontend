import { getCountries, getExcel } from '@/services/countries/countriesService';
import { useQuery } from '@tanstack/react-query';

export const useGetCountries = () => useQuery({ queryKey: ['countries'], queryFn: getCountries });

export const useGetExcel = (from: string, to: string) => useQuery({ queryKey: ['excel', from, to], queryFn: getExcel });
