import Skeleton from '@/components/ui/skeleton/skeleton';

function GeneralInfoSkeletons() {
  return (
    <div className="flex gap-[45px] pb-8">
      <div className="flex w-[31%] justify-between">
        <div className="w-[24rem]">
          <Skeleton variant="paragraph" rows={8} />
        </div>
        <div>
          <Skeleton variant="paragraph" rows={8} />
        </div>
      </div>
      <div className="flex w-[30%] justify-between">
        <div className="w-[24rem]">
          <Skeleton variant="paragraph" rows={8} />
        </div>
        <div>
          <Skeleton variant="paragraph" rows={8} />
        </div>
      </div>
      <div className="w-[31%]">
        <div className="mapouter">
          <div className="gmap_canvas">
            <Skeleton variant="block" height="18rem" width="60rem" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default GeneralInfoSkeletons;

export function DeviceinfoSkeletons() {
  return (
    <div className="flex items-center gap-[1.875rem]">
      <div className="flex justify-between px-5">
        <Skeleton variant="block" height="10rem" width="10rem" />
      </div>
      <div className="w-[40%] px-5">
        <div className="text-[20px] font-[600]">
          <Skeleton variant="paragraph" rows={1} />
        </div>
        <div className="flex justify-between">
          <div className="">
            <Skeleton variant="paragraph" rows={4} />
          </div>
          <div>
            <Skeleton variant="paragraph" rows={4} />
          </div>
        </div>
      </div>
    </div>
  );
}
export function APFInfoSkeletons() {
  return (
    <>
      <div className="flex gap-[45px] pb-2">
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <div className="flex w-[33%] justify-between" key={index}>
              <Skeleton variant="paragraph" rows={4} />
            </div>
          ))}
      </div>
      <div className="flex gap-[45px] pb-0 pt-2">
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <div className="w-[15%]" key={index}>
              <Skeleton variant="block" height="3rem" width="10rem" />
            </div>
          ))}
      </div>
    </>
  );
}
