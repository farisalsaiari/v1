import { useState, useEffect } from 'react';
import { formatCurrency, formatDate } from '../lib/utils';
import { Spinner } from '../components/ui/Spinner';

// Mock data for reports
const reportData = {
  sales: {
    total: 12456.78,
    change: 12.5,
    trend: 'up',
    data: [
      { date: '2023-01-01', value: 4000 },
      { date: '2023-02-01', value: 3000 },
      { date: '2023-03-01', value: 5000 },
      { date: '2023-04-01', value: 2780 },
      { date: '2023-05-01', value: 1890 },
      { date: '2023-06-01', value: 2390 },
      { date: '2023-07-01', value: 3490 },
    ],
  },
  orders: {
    total: 1245,
    change: -2.3,
    trend: 'down',
    data: [
      { date: '2023-01-01', value: 240 },
      { date: '2023-02-01', value: 139 },
      { date: '2023-03-01', value: 380 },
      { date: '2023-04-01', value: 278 },
      { date: '2023-05-01', value: 189 },
      { date: '2023-06-01', value: 239 },
      { date: '2023-07-01', value: 190 },
    ],
  },
  customers: {
    total: 845,
    change: 5.7,
    trend: 'up',
    data: [
      { date: '2023-01-01', value: 100 },
      { date: '2023-02-01', value: 120 },
      { date: '2023-03-01', value: 80 },
      { date: '2023-04-01', value: 150 },
      { date: '2023-05-01', value: 90 },
      { date: '2023-06-01', value: 130 },
      { date: '2023-07-01', value: 175 },
    ],
  },
  products: [
    { id: 1, name: 'Wireless Earbuds', category: 'Electronics', stock: 45, price: 99.99, sales: 245 },
    { id: 2, name: 'Smart Watch', category: 'Electronics', stock: 32, price: 199.99, sales: 189 },
    { id: 3, name: 'Bluetooth Speaker', category: 'Electronics', stock: 12, price: 79.99, sales: 156 },
    { id: 4, name: 'Phone Case', category: 'Accessories', stock: 87, price: 19.99, sales: 132 },
    { id: 5, name: 'Wireless Charger', category: 'Accessories', stock: 23, price: 29.99, sales: 98 },
  ],
  recentOrders: [
    { id: '#ORD-001', customer: 'John Doe', date: '2023-10-15', amount: 149.97, status: 'completed' },
    { id: '#ORD-002', customer: 'Jane Smith', date: '2023-10-14', amount: 199.99, status: 'processing' },
    { id: '#ORD-003', customer: 'Robert Johnson', date: '2023-10-14', amount: 79.99, status: 'completed' },
    { id: '#ORD-004', customer: 'Emily Davis', date: '2023-10-13', amount: 299.98, status: 'shipped' },
    { id: '#ORD-005', customer: 'Michael Wilson', date: '2023-10-13', amount: 59.97, status: 'pending' },
  ],
  topCategories: [
    { name: 'Electronics', value: 65, color: '#4f46e5' },
    { name: 'Clothing', value: 25, color: '#10b981' },
    { name: 'Home & Garden', value: 10, color: '#f59e0b' },
  ],
};

// Simple bar chart component
const BarChart = ({ data, height = 300, color = '#4f46e5' }: { data: { date: string; value: number }[], height?: number, color?: string }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  const barWidth = 100 / data.length;
  
  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <div className="flex items-end h-full">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 100;
          return (
            <div 
              key={index} 
              className="flex-1 flex flex-col items-center"
              style={{ width: `${barWidth}%` }}
            >
              <div 
                className="w-3/4 rounded-t-sm"
                style={{
                  height: `${barHeight}%`,
                  backgroundColor: color,
                  opacity: 0.7,
                }}
                title={`${item.value} (${formatDate(item.date)})`}
              />
              <span className="text-xs text-gray-500 mt-1">
                {new Date(item.date).toLocaleDateString('en-US', { month: 'short' })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Donut chart component
const DonutChart = ({ data, size = 120 }: { data: { name: string; value: number; color: string }[], size?: number }) => {
  const radius = size / 2 - 10;
  const centerX = size / 2;
  const centerY = size / 2;
  const strokeWidth = 20;
  
  let startAngle = 0;
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        {data.map((item, i) => {
          const percent = item.value / total;
          const endAngle = startAngle + percent * 2 * Math.PI;
          
          const x1 = centerX + Math.cos(startAngle) * radius;
          const y1 = centerY + Math.sin(startAngle) * radius;
          const x2 = centerX + Math.cos(endAngle) * radius;
          const y2 = centerY + Math.sin(endAngle) * radius;
          
          const largeArcFlag = percent > 0.5 ? 1 : 0;
          
          const pathData = [
            `M ${centerX},${centerY}`,
            `L ${x1},${y1}`,
            `A ${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2}`,
            'Z'
          ].join(' ');
          
          startAngle = endAngle;
          
          return (
            <path
              key={i}
              d={pathData}
              fill={item.color}
              stroke="#fff"
              strokeWidth="2"
              className="transition-all duration-500 ease-in-out"
            />
          );
        })}
      </svg>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-900">{total}%</div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
      </div>
    </div>
  );
};

export function Reports() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [reportType, setReportType] = useState<'sales' | 'orders' | 'customers'>('sales');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [timeRange, reportType]);
  
  const currentReport = reportData[reportType];
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
          <p className="mt-1 text-sm text-gray-500">
            Analyze and export your business data.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setReportType('sales')}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                reportType === 'sales'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Sales
            </button>
            <button
              type="button"
              onClick={() => setReportType('orders')}
              className={`px-4 py-2 text-sm font-medium ${
                reportType === 'orders'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Orders
            </button>
            <button
              type="button"
              onClick={() => setReportType('customers')}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                reportType === 'customers'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Customers
            </button>
          </div>
          
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setTimeRange('week')}
              className={`px-3 py-2 text-sm font-medium rounded-l-md ${
                timeRange === 'week'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Week
            </button>
            <button
              type="button"
              onClick={() => setTimeRange('month')}
              className={`px-3 py-2 text-sm font-medium ${
                timeRange === 'month'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Month
            </button>
            <button
              type="button"
              onClick={() => setTimeRange('year')}
              className={`px-3 py-2 text-sm font-medium rounded-r-md ${
                timeRange === 'year'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Year
            </button>
          </div>
          
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 rounded-md bg-indigo-500 bg-opacity-10">
                  <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Sales</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {formatCurrency(reportData.sales.total)}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="sr-only">Increased by</span>
                      {reportData.sales.change}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 rounded-md bg-green-500 bg-opacity-10">
                  <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {reportData.orders.total}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                      <svg className="self-center flex-shrink-0 h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="sr-only">Decreased by</span>
                      {Math.abs(reportData.orders.change)}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 rounded-md bg-yellow-500 bg-opacity-10">
                  <svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Customers</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {reportData.customers.total}
                    </div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="sr-only">Increased by</span>
                      {reportData.customers.change}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">
            {reportType === 'sales' && 'Sales Report'}
            {reportType === 'orders' && 'Orders Report'}
            {reportType === 'customers' && 'Customers Report'}
          </h2>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {timeRange === 'week' ? 'This Week' : timeRange === 'month' ? 'This Month' : 'This Year'}
            </span>
          </div>
        </div>
        <div className="h-80">
          <BarChart data={currentReport.data} color={
            reportType === 'sales' ? '#4f46e5' : 
            reportType === 'orders' ? '#10b981' : 
            '#f59e0b'
          } />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top Products */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Top Selling Products</h2>
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {reportData.products.map((product) => (
                <li key={product.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">#{product.id}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {product.sales} sold
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatCurrency(product.price * product.sales)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Sales by Category</h2>
          <div className="flex flex-col items-center justify-center">
            <DonutChart data={reportData.topCategories} size={200} />
            <div className="mt-6 w-full">
              {reportData.topCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <div 
                      className="h-3 w-3 rounded-full mr-2" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{category.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            A list of recent orders placed by customers.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportData.recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(order.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'shipped' ? 'bg-indigo-100 text-indigo-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </a>
            <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </a>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">24</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" aria-current="page" className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  1
                </a>
                <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  2
                </a>
                <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  3
                </a>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <a href="#" className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  8
                </a>
                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
