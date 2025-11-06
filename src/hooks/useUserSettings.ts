import {
  getUserCompanyNetworkPreferenceSettings,
  getUserPagePreferenceSettings,
  getUserSettings,
  postCompanyNetworkPreferenceUpdate,
  postPagePreferenceUpdate,
} from '@/services/users/usersService';
import { createMutationWithVariables } from '@/utils/query';
import { useQuery } from '@tanstack/react-query';

export const useGetUserSettings = () => {
  return useQuery({
    queryKey: ['user_profile'],
    queryFn: getUserSettings,
  });
};

export const useGetUserPagePreferences = () => {
  return useQuery({
    queryKey: ['user_page_preferences'],
    queryFn: getUserPagePreferenceSettings,
  });
};

export const useGetUserCompanyNetworkPreferences = () => {
  return useQuery({
    queryKey: ['user_company_network_preferences'],
    queryFn: getUserCompanyNetworkPreferenceSettings,
  });
};

export const { useMutation: usePostUpdatePagePreferences } = createMutationWithVariables(
  'post-page-preference-update',
  postPagePreferenceUpdate,
);

export const { useMutation: usePostUpdateCompanyNetworkPreferences } = createMutationWithVariables(
  'post-company-preference-update',
  postCompanyNetworkPreferenceUpdate,
);
