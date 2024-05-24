type ServiceTypeBadgeProps = {
    label: string,
    count: number,
    color: string,
    subTypes?: {name: string, service_type: number, count ?:number}[]
}
export const ServiceTypeBadge = ({label="Mobile", count=35, color="", subTypes= []} : ServiceTypeBadgeProps) => {
    return (
        <div>
          <div className="w-[49%] h-[64px] bg-[#F4F7FE] rounded border border-neutral-300 flex justify-between pl-5 pr-1 pt-2">
            {label && <div className="text-black pb-2 pt-3 text-base font-semibold ">{label} </div>} 
            <div className={`h-[53px] w-[60px] p-2 ${color ? color :"bg-blue-700"} rounded-[41px] justify-start items-center gap-2.5 inline-flex  !pt-0`}>
              <div className="inline-flex items-center justify-center text-white w-[60px] h-[44px] text-xl font-semibold bg-blue-700 rounded-full relative top-0 ">{count}</div>
            </div>
        </div> 
        {subTypes.length > 0 && 
        <div className="flex gap-4 mt-4 flex-wrap  ">
            {subTypes.map(({name, service_type, count}, i) => {
                 return <div className="w-[49%] h-[64px]  ">
                   <div className=" h-[64px] bg-[#D2DAFD] rounded border border-neutral-300 flex justify-between pl-5 pr-1 pt-2">
                        {name && <div className="text-black pb-2 pt-3 text-base font-semibold ">{name} </div>} 
                        <div className={`h-[53px] w-[60px] p-2   rounded-[41px] justify-start items-center gap-2.5 inline-flex  !pt-0`}>
                        <div className="inline-flex items-center justify-center text-blue-700 w-[60px] h-[44px] text-xl font-semibold  relative top-0 ">{count}</div>
                        </div>
                    </div> 
                </div>
            })}
        </div>}
        </div>
    )
}
 