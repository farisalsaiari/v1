import React, { useState } from 'react';
import { Button, PopupModal } from '@v1/ui-shared';
import { DashboardContent } from '../components/dashboard/DashboardContent';


export function Home({ }) {

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
        <DashboardContent title="Dashboard" />
      </div>
    </div>
  )
}