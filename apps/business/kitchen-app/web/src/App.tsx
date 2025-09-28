import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Home } from './pages/Home'
import { Contact } from './pages/Contact';

export function App() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onToggleSidebar={() => console.log("Sidebar toggled")}
                onToggleCollapse={() => console.log("Collapse toggled")}
                isCollapsed={false}
              />
            }
          />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  )
}