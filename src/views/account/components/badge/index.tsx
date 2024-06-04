type BadgeProps = {
    status: string;
}
export const Badge = ({ status }: BadgeProps) => {
    return (
        <span className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-lg text-xs text-white font-medium cursor-pointer ${status === 'Active' ? 'bg-[#219653]' : status === 'Suspended' ? 'bg-[#FC762B]' :  'bg-[#A40000]'}`}>
            {status}
        </span>
    )
}