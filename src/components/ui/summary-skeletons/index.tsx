import Skeleton from "@/components/ui/skeleton/skeleton";



const GeneratlInfoSkeletons = () => {
    return (
        <div className="flex gap-[45px] pb-8">
            <div className="flex w-[31%] justify-between  ">
                <div className='w-[24rem]'>
                    <Skeleton variant="paragraph" rows={8} />
                </div>
                <div >
                    <Skeleton variant="paragraph" rows={8} />
                </div>
            </div>
            <div className="flex w-[30%] justify-between  ">
                <div className='w-[24rem]'>
                    <Skeleton variant="paragraph" rows={8} />
                </div>
                <div >
                    <Skeleton variant="paragraph" rows={8} />
                </div>
            </div>
            <div className='w-[31%]'>
                <div className="mapouter">
                    <div className="gmap_canvas">
                        <Skeleton variant="block" height="18rem" width="60rem" />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default GeneratlInfoSkeletons;

export const DeviceinfoSkeletons = () => {
    return (
        <div className="flex gap-[30px]">
            <div className="flex w-[15%] justify-between px-5">
                <Skeleton variant="block" height="10rem" width="10rem" />
            </div>
            <div className=" w-[40%]  px-5">
                <div className='text-[20px] font-[600]'>
                   <Skeleton variant="paragraph" rows={1} />
                </div>
                <div className='flex   justify-between'>
                    <div className=''>
                        <Skeleton variant="paragraph" rows={4} />
                    </div>
                    <div >
                        <Skeleton variant="paragraph" rows={4} /> 
                    </div>
                </div>
            </div>
        </div>
    );
}