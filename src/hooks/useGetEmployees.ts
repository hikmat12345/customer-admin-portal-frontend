import {
  getEmployeeCostTrend,
  getEmployeeDetail,
  getEmployeeServiceTypes,
  getEmployeeServices,
  getEmployeeTickets,
} from '@/services/employee/employee-summary';
import { useQuery } from '@tanstack/react-query';

export const useGetEmployeeDetail = (employee_id: number) =>
  useQuery({ queryKey: ['employee_detail', employee_id], queryFn: getEmployeeDetail });

export const useGetEmployeeCostTrend = (account_id: number) =>
  useQuery({ queryKey: ['account_cost_trend', account_id], queryFn: getEmployeeCostTrend });
export const useGetEmployeeTickets = (employee_id: number, offset: number, limit: number) =>
  useQuery({
    queryKey: ['employee_tickets', employee_id, offset, limit],
    queryFn: getEmployeeTickets,
  });
// service types
export const useGetEmployeeServiceTypes = (employee_id: number) =>
  useQuery({ queryKey: ['service_types', employee_id], queryFn: getEmployeeServiceTypes });
export const useGetEmployeeServices = (employee_id: number) =>
  useQuery({ queryKey: ['employee_services', employee_id], queryFn: getEmployeeServices });
