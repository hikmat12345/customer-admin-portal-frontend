import { Switch } from '@/components/ui/switch';
import { usePostUpdatePagePreferences } from '@/hooks/useUserSettings';
import { cn } from '@/utils/utils';
import React from 'react';
import toast from 'react-hot-toast';

type PagePreference = {
  pageId: number;
  isDisabled: boolean;
  title: string;
  helpText: string;
  status: number;
  pageLink: string;
  id?: number;
};

interface IProps {
  pagePreference: PagePreference;
  pagePreferencesData: PagePreference[];
  setPagePreferencesData: (arg: any) => void;
}

function PageToggle({ pagePreference, pagePreferencesData, setPagePreferencesData }: IProps) {
  const { pageId, isDisabled, title, helpText, status, id, pageLink } = pagePreference;
  const { mutate: updatePagePreference, isPending: pagePreferenceUpdating } = usePostUpdatePagePreferences({
    onSuccess: () => {
      toast.success(`Page preferences updated successfully`);
      setTimeout(() => {
        location.reload(); // TODO: Mutate State from data received from the database rather than page reload
      }, 400);
    },
    onError: () => {
      toast.error(`Error updating page preferences`);
    },
  });

  const handleOnPageSwitchChange = (pageData: any) => {
    const updatedPagePrefs = pagePreferencesData.map((p) => {
      const item = p.pageId === pageData.pageId;
      return item ? { ...p, status: pageData.status ? 1 : 0 } : p;
    });

    setPagePreferencesData(updatedPagePrefs);
    updatePagePreference(pageData);
  };

  return (
    <div key={pageId} className="mb-4 flex items-center justify-between">
      <h4 className={cn('text-sm font-medium')}>
        {title + ' '}
        <span className="font-normal text-[#C2C2C2]">{helpText && `(${helpText})`}</span>
      </h4>
      <Switch
        className="data-[state=checked]:bg-custom-blue"
        checked={status === 1}
        disabled={isDisabled}
        onCheckedChange={(status: boolean) =>
          handleOnPageSwitchChange({
            id,
            pageId,
            pageLink,
            status,
          })
        }
      />
    </div>
  );
}

export default PageToggle;
