type BadgeProps = {
  status: string;
};
export function Badge({ status }: BadgeProps) {
  return (
    <span
      className={`inline-flex cursor-pointer items-center gap-x-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white ${status === 'Active' ? 'bg-[#219653]' : status === 'Suspended' ? 'bg-custom-orange' : 'bg-custom-deepRed'}`}
    >
      {status}
    </span>
  );
}
