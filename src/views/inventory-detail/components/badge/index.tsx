type BadgeProps = {
    status: string;
}
export const Badge = ({ status }: BadgeProps) => {
    return (
        <span className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-lg text-xs text-white font-medium cursor-pointer ${status === 'Active' ? 'bg-[#219653]' : status === 'Suspended' ? 'bg-[#FC762B]' : status === 'Disconnected' ? 'bg-[#A40000]' : status === 'Decommissioned' ? 'bg-[#A40000]' : status === 'Being Prepared' ? 'bg-[#A40000]' : status === 'Awaiting Service' ? 'bg-[#A40000]' : status === 'In Transit to User' ? 'bg-[#A40000]' : status === 'In Transit from User' ? 'bg-[#A40000]' : status === 'Lost' ? 'bg-[#A40000]' : status === 'Unknown' ? 'bg-[#A40000]' : 'bg-[#A40000]'}`}>
            {status}
        </span>
    )
}