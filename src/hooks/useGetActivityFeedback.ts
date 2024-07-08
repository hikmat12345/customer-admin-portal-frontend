import { getActivityFeedback } from '@/services/feedback/activity-feed';
import { useQuery } from '@tanstack/react-query';

export const useGetActivityFeed = () => useQuery({ queryKey: ['activity-feedback'], queryFn: getActivityFeedback });
