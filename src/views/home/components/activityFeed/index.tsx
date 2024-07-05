
import TooltipText from "@/components/ui/textbox";
import Skeleton from "@veroxos/design-system/dist/ui/Skeleton/skeleton";
import Image from "next/image";

type ActivityFeed = {
    activityFeedType: { logoId: number, name: string };
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
        ) :   activityFeed?.map((activity: { activityFeedType: { logoId: number, name: string }; action: string; targetType: string, }, index: number) => (
                    <div key={index} className="flex items-center gap-5">
                        {activity.activityFeedType ?
                            <>{
                                activity?.activityFeedType?.logoId === 13 ? (
                                    <Image
                                        src={`/svg/invoice.svg`}
                                        width={25}
                                        height={25}
                                        alt={activity?.activityFeedType?.name || 'Invoice'}
                                        title={activity?.activityFeedType?.name || 'Invoice'}
                                    />
                                ) : activity?.activityFeedType?.logoId === 15 ? (
                                    <Image
                                        src={`/svg/data_import_job.svg`}
                                        width={25}
                                        height={25}
                                        alt={activity?.activityFeedType?.name}
                                        title={activity?.activityFeedType?.name}
                                    />
                                ) : activity?.activityFeedType?.logoId === 14 ? (
                                    <Image
                                        src={`/svg/incident.svg`}
                                        width={25}
                                        height={25}
                                        alt={activity?.activityFeedType?.name || 'Incident'}
                                        title={activity?.activityFeedType?.name || 'Incident'}
                                    />
                                ) : activity?.activityFeedType?.logoId === 16 ? (
                                    <Image
                                        src={`/svg/account_payable_request.svg`}
                                        width={25}
                                        height={25}
                                        alt={activity.activityFeedType.name || 'Account Payable Request'}
                                        title={activity?.activityFeedType?.name}
                                    />
                                ) : null}
                            </> : null}
                        <TooltipText
                            className="text-base font-normal text-custom-grey"
                            text={activity.action ? activity.action : '-'}
                            maxLength={40}
                        />
                    </div>
                ))
          }
          { !activityFeedLoading && activityFeed?.length === 0 && (
                <p className="text-base font-normal">No activity feed available</p>
            ) }
    </>
);