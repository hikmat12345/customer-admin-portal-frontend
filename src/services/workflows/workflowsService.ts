import { NEXT_PUBLIC_TICKET_SERVICE_URL } from 'config/config';
import httpClient from '../httpClient';

export const getWorkflow = async ({ queryKey }: any) => {
  const [, workflowId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_TICKET_SERVICE_URL}/workflow/find/${workflowId}`).then(({ data }) => data);
};

export const getWorkflowRenderJson = async ({ queryKey }: any) => {
  const [, workflowId] = queryKey;

  return httpClient.get(`${NEXT_PUBLIC_TICKET_SERVICE_URL}/workflow/render/${workflowId}`).then(({ data }) => data);
};
