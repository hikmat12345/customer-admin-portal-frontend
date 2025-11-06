import { getWorkflow, getWorkflowRenderJson } from '@/services/workflows/workflowsService';
import { useQuery } from '@tanstack/react-query';

export const useGetWorkflow = (workflowId: number) => {
  return useQuery({
    queryKey: ['get_workflow', workflowId],
    queryFn: getWorkflow,
  });
};

export const useGetWorkflowRenderJson = (workflowId: number) => {
  return useQuery({
    queryKey: ['get_workflow', workflowId],
    queryFn: getWorkflowRenderJson,
  });
};
