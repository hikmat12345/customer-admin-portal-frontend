import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import CreateQueryString from '@/utils/createQueryString';

function ToggleComponent() {
  const [isChecked, setIsChecked] = useState(false);
  const params = useSearchParams();
  const showArchived = params.has('show_archived') ? Number(params.get('show_archived')) : undefined;
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = CreateQueryString();

  useEffect(() => {
    setIsChecked(showArchived === 1);
  }, []);

  const handleOnCheckedChange = (value: boolean) => {
    setIsChecked(value);
    return router.push(`${pathname}?${createQueryString('show_archived', value ? 1 : 0)}`);
  };

  return (
    <div className="ml-6 flex items-center gap-x-4">
      <p className="text-sm font-medium">Archived</p>
      <Switch checked={isChecked} onCheckedChange={handleOnCheckedChange} />
    </div>
  );
}

export default ToggleComponent;
