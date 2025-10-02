import { PageContainer } from '../components/PageContainer';

export function Dashboard() {
  return (
    <PageContainer title="Dashboard" subtitle="Overview of your business performance">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Stats Cards */}
        {[
          { title: 'Total Revenue', value: '$24,780', change: '+12%', trend: 'up' },
          { title: 'Total Orders', value: '1,248', change: '+8%', trend: 'up' },
          { title: 'Active Customers', value: '842', change: '+5%', trend: 'up' },
          { title: 'Avg. Order Value', value: '$42.50', change: '-2%', trend: 'down' },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <span className={`ml-2 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Overview</h3>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <p className="text-gray-500">Sales chart will be displayed here</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-medium">U{item}</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">New order #{1000 + item}</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 text-sm font-medium">
                New Order
              </button>
              <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 text-sm font-medium">
                Add Item
              </button>
              <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 text-sm font-medium">
                View Reports
              </button>
              <button className="p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-yellow-700 text-sm font-medium">
                Manage Staff
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default Dashboard;