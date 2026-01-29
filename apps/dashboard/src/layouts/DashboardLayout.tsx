import { Outlet } from 'react-router-dom';

function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar - To be implemented */}
      <aside className="hidden w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 lg:block">
        <div className="p-4">
          <h1 className="text-xl font-bold text-primary-600">Propery Agents</h1>
        </div>
        <nav className="mt-4 px-2">{/* Navigation items will be added here */}</nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header - To be implemented */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Dashboard</h2>
            {/* Search, notifications, profile will be added here */}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
