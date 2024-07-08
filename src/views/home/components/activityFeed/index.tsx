import TooltipText from '@/components/ui/textbox';
import { makeFileUrlFromBase64 } from '@/utils/utils';
import Skeleton from '@veroxos/design-system/dist/ui/Skeleton/skeleton';
import Image from 'next/image';

type ActivityFeed = {
  activityFeedType: { logoId: number; name: string , logo: { image: string } };
  action: string;
  targetType: string;
};
type ActivityFeedProps = {
  activityFeed: ActivityFeed[];
  activityFeedLoading: boolean;
};
export const ActivityFeed = ({ activityFeed, activityFeedLoading }: ActivityFeedProps) => (
  <>
    {activityFeedLoading ? (
      <Skeleton variant="paragraph" rows={4} />
    ) : (
      activityFeed?.map(
        (
          activity: ActivityFeed,
          index: number,
        ) => {
          const imageUrl = makeFileUrlFromBase64(activity.activityFeedType?.logo.image ? Buffer.from(activity.activityFeedType?.logo.image).toString('base64') : null);

          return (
            <div key={index} className="flex items-center gap-5">
              {activity.activityFeedType ? (
                <>
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      width={25}
                      height={25}
                      alt={activity?.activityFeedType?.name || 'action icon'}
                      title={activity?.activityFeedType?.name || 'action icon'}
                    />
                  ) : null}
                </>
              ) : null}
              <TooltipText
                className="text-base font-normal text-custom-grey"
                text={activity.action ? activity.action : '-'}
                maxLength={40}
              />
            </div>
          );
        },
      )
    )}
    {!activityFeedLoading && activityFeed?.length === 0 && (
      <p className="text-base font-normal">No activity feed available</p>
    )}
  </>
);
