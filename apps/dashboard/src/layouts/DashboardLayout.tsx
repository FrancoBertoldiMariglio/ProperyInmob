import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, Header, Breadcrumb, CommandPalette, MobileSidebar } from '@/components/layout';

function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header onMenuClick={() => setMobileMenuOpen(true)} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Breadcrumb />
          <Outlet />
        </main>
      </div>

      {/* Command Palette */}
      <CommandPalette />
    </div>
  );
}

export default DashboardLayout;
