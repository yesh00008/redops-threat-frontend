import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

/**
 * Main layout component that includes the navigation and page content
 */
export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto py-4 px-4">
        <Outlet />
      </main>
    </div>
  );
}
