import * as React from 'react';
import MenuItems from '@/views/settings/components/menu-items';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="flex w-full rounded-lg bg-white shadow"
      style={{ minHeight: `calc(100vh - 110px)`, height: '100%' }}
    >
      <aside className="h-full w-2/6 bg-[#F4F7FE] p-6">
        <MenuItems />
      </aside>
      <main className="w-4/6">{children}</main>
    </section>
  );
}
