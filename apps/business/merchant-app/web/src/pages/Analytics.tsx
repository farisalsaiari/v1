import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { formatCurrency } from '../lib/utils';
import { Spinner } from '../components/ui/Spinner';

// Mock chart component - in a real app, you would use a library like Recharts or Chart.js
const LineChart = ({ data, width = 600, height = 300 }: { data: any[], width?: number, height?: number }) => {
  const maxY = Math.max(...data.map(item => item.value)) * 1.2;
  const minY = 0;
  const chartWidth = width - 100;
  const chartHeight = height - 100;

  const getX = (index: number, total: number) => 50 + (index * chartWidth) / (total - 1);
  const getY = (value: number) => 50 + chartHeight - ((value - minY) / (maxY - minY)) * chartHeight;

  return (
    <svg width={width} height={height} className="w-full h-auto">
      {/* X and Y axis */}
      <line x1="50" y1="50" x2="50" y2={50 + chartHeight} stroke="#e5e7eb" strokeWidth="1" />
      <line x1="50" y1={50 + chartHeight} x2={50 + chartWidth} y2={50 + chartHeight} stroke="#e5e7eb" strokeWidth="1" />
      
      {/* Grid lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line 
          key={`grid-y-${i}`}
          x1="50" 
          y1={50 + (i * chartHeight / 4)} 
          x2={50 + chartWidth} 
          y2={50 + (i * chartHeight / 4)} 
          stroke="#f3f4f6" 
          strokeWidth="1" 
        />
      ))}
      
      {/* Line */}
      <polyline
        fill="none"
        stroke="#4f46e5"
        strokeWidth="2"
        points={data.map((item, i) => `${getX(i, data.length)},${getY(item.value)}`).join(' ')}
      />
      
      {/* Dots */}
      {data.map((item, i) => (
        <g key={`point-${i}`}>
          <circle
            cx={getX(i, data.length)}
            cy={getY(item.value)}
            r="4"
            fill="#4f46e5"
          />
          <text
            x={getX(i, data.length)}
            y={getY(item.value) - 10}
            textAnchor="middle"
            fontSize="12"
            fill="#6b7280"
          >
            {formatCurrency(item.value)}
          </text>
          <text
            x={getX(i, data.length)}
            y={50 + chartHeight + 20}
            textAnchor="middle"
            fontSize="12"
            fill="#6b7280"
          >
            {item.label}
          </text>
        </g>
      ))}
      
      {/* Y-axis labels */}
      {[0, 1, 2, 3, 4].map((i) => {
        const value = Math.round((maxY * i) / 4);
        return (
          <text
            key={`y-label-${i}`}
            x="40"
            y={50 + chartHeight - (i * chartHeight / 4)}
            textAnchor="end"
            dominantBaseline="middle"
            fontSize="12"
            fill="#9ca3af"
          >
            {formatCurrency(value)}
          </text>
        );
      })}
    </svg>
  );
};

// Mock donut chart component
const DonutChart = ({ data, width = 200, height = 200 }: { data: any[], width?: number, height?: number }) => {
  const radius = Math.min(width, height) / 2 - 10;
  const centerX = width / 2;
  const centerY = height / 2;
  
  let startAngle = 0;
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <svg width={width} height={height} className="mx-auto">
      {data.map((item, i) => {
        const percent = item.value / total;
        const endAngle = startAngle + percent * Math.PI * 2;
        
        const x1 = centerX + Math.sin(startAngle) * radius;
        const y1 = centerY - Math.cos(startAngle) * radius;
        const x2 = centerX + Math.sin(endAngle) * radius;
        const y2 = centerY - Math.cos(endAngle) * radius;
        
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
          />
        );
      })}
      
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-lg font-medium text-gray-700"
      >
        {data.length} categories
      </text>
      
      <g transform={`translate(${width + 20}, 0)`}>
        {data.map((item, i) => (
          <g key={`legend-${i}`} transform={`translate(0, ${i * 25})`}>
            <rect width="16" height="16" fill={item.color} rx="2" />
            <text x="24" y="12" fontSize="12" fill="#4b5563">
              {item.name} ({(item.value / total * 100).toFixed(0)}%)
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
};

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [salesData, setSalesData] = useState<any[]>([]);
  const [revenueData, setRevenueData] = useState({
    total: 0,
    change: 0,
    trend: 'up',
  });
  const [ordersData, setOrdersData] = useState({
    total: 0,
    change: 0,
    trend: 'up',
  });
  const [customersData, setCustomersData] = useState({
    total: 0,
    change: 0,
    trend: 'up',
  });
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch this data from your API
        // const data = await api.getAnalyticsData(timeRange);
        
        // Mock data for demonstration
        setTimeout(() => {
          // Generate mock sales data
          const months = timeRange === 'week' 
            ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            : timeRange === 'month'
            ? ['Week 1', 'Week 2', 'Week 3', 'Week 4']
            : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          
          const mockSalesData = months.map((month, i) => ({
            label: month,
            value: 1000 + Math.random() * 4000,
          }));
          
          setSalesData(mockSalesData);
          
          // Mock metrics
          setRevenueData({
            total: 12456.78,
            change: 12.5,
            trend: 'up',
          });
          
          setOrdersData({
            total: 1245,
            change: -2.3,
            trend: 'down',
          });
          
          setCustomersData({
            total: 845,
            change: 5.7,
            trend: 'up',
          });
          
          // Mock category data
          setCategoryData([
            { name: 'Electronics', value: 35, color: '#4f46e5' },
            { name: 'Clothing', value: 25, color: '#10b981' },
            { name: 'Home & Garden', value: 20, color: '#f59e0b' },
            { name: 'Beauty', value: 15, color: '#ec4899' },
            { name: 'Other', value: 5, color: '#6b7280' },
          ]);
          
          // Mock top products
          setTopProducts([
            { id: 1, name: 'Wireless Earbuds', sales: 245, revenue: 3675 },
            { id: 2, name: 'Smart Watch', sales: 189, revenue: 5670 },
            { id: 3, name: 'Bluetooth Speaker', sales: 156, revenue: 3120 },
            { id: 4, name: 'Phone Case', sales: 132, revenue: 792 },
            { id: 5, name: 'Wireless Charger', sales: 98, revenue: 1470 },
          ]);
          
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        setLoading(false);
      }
    };

    fetchAnalyticsData();
{{ ... }}

  const MetricCard = ({ title, value, change, trend }: { title: string, value: string | number, change: number, trend: 'up' | 'down' }) => (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="p-3 rounded-md bg-indigo-500 bg-opacity-10">
              <svg 
                className={`h-6 w-6 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {trend === 'up' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h5m0 0v5m0-5l-7 7-4-4-6 6" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h5m0 0v-5m0 5l-7-7-4 4-6-6" />
                )}
              </svg>
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {typeof value === 'number' && title.includes('Revenue') ? formatCurrency(value) : value}
                </div>
                <div className={`ml-2 flex items-baseline text-sm font-semibold ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {trend === 'up' ? (
                    <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="self-center flex-shrink-0 h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className="sr-only">
                    {trend === 'up' ? 'Increased' : 'Decreased'} by
                  </span>
                  {Math.abs(change)}%
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and analyze your store's performance and key metrics.
          </p>
        </div>
        <div className="mt-4 sm:mt-0
        <div className="flex rounded-md shadow-sm">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${
              timeRange === 'week'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === 'month'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              timeRange === 'year'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Year
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          {/* Metrics */}
          <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-3">
            <MetricCard
              title="Total Revenue"
              value={revenueData.total}
              change={revenueData.change}
              trend={revenueData.trend as 'up' | 'down'}
            />
            <MetricCard
              title="Total Orders"
              value={ordersData.total}
              change={ordersData.change}
              trend={ordersData.trend as 'up' | 'down'}
            />
            <MetricCard
              title="Total Customers"
              value={customersData.total}
              change={customersData.change}
              trend={customersData.trend as 'up' | 'down'}
            />
          </div>

          {/* Sales Chart */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Sales Overview</h2>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {timeRange === 'week' ? 'This Week' : timeRange === 'month' ? 'This Month' : 'This Year'}
                </span>
              </div>
            </div>
            <div className="h-80">
              <LineChart data={salesData} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-2">
            {/* Categories */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Sales by Category</h2>
              <div className="flex justify-center">
                <DonutChart data={categoryData} />
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Top Selling Products</h2>
              <div className="flow-root">
                <ul className="divide-y divide-gray-200">
                  {topProducts.map((product) => (
                    <li key={product.id} className="py-3 sm:py-4">
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
                            {product.sales} sales
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                          {formatCurrency(product.revenue)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
