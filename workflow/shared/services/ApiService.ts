import { ApiConst } from '../constants';
import { fetchClient, format } from '../utils';

export function getWorkflowRequestTypesApiCall(token: string, workflowId: number): Promise<unknown> {
  return fetchClient(format(ApiConst.getWorkflowType, workflowId), 'GET', token)
    .then((response) => response)
    .catch((error) => error);
}

export function getCatalogApiCall(bodyData: Record<string, any>, token: string, workflowId: number): Promise<unknown> {
  return fetchClient(format(ApiConst.getCatalog, workflowId), 'POST', token, bodyData)
    .then((response) => response)
    .catch((error) => error);
}
