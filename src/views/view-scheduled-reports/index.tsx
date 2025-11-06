'use client';
import React from 'react';
import { DataTable } from './components/data-table/data-table';

const ScheduledReportsPage = () => {
  return (
    <div>
      <div className="mt-2 overflow-x-auto">
        <DataTable />
      </div>
    </div>
  );
};

export default ScheduledReportsPage;
