import { fakeApi } from '../lib/utils';

// Types
type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: OrderStatus;
  date: string;
  items: { name: string; quantity: number; price: number }[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
  image: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalSpent: number;
  orders: number;
  lastOrder: string;
}

// Mock data
const mockOrders: Order[] = Array.from({ length: 50 }, (_, i) => ({
  id: `ORD-${1000 + i}`,
  customer: ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis', 'Michael Brown'][
    Math.floor(Math.random() * 5)
  ],
  email: ['example1@test.com', 'example2@test.com', 'example3@test.com', 'example4@test.com', 'example5@test.com'][
    Math.floor(Math.random() * 5)
  ],
  amount: Math.floor(Math.random() * 1000) + 50,
  status: ['pending', 'processing', 'completed', 'cancelled'][
    Math.floor(Math.random() * 4)
  ] as OrderStatus,
  date: new Date(
    Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
  ).toISOString(),
  items: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => ({
    name: `Product ${i + 1}`,
    quantity: Math.floor(Math.random() * 5) + 1,
    price: Math.floor(Math.random() * 200) + 10,
  })),
}));

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 199.99,
    stock: 150,
    sales: 1245,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Smart Watch',
    category: 'Electronics',
    price: 249.99,
    stock: 89,
    sales: 876,
    image: 'https://via.placeholder.com/150',
  },
  // Add more mock products as needed
];

const mockCustomers: Customer[] = Array.from({ length: 20 }, (_, i) => ({
  id: `CUST-${1000 + i}`,
  name: `Customer ${i + 1}`,
  email: `customer${i + 1}@example.com`,
  totalSpent: Math.floor(Math.random() * 10000) + 100,
  orders: Math.floor(Math.random() * 50) + 1,
  lastOrder: new Date(
    Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
  ).toISOString(),
}));

// API functions
export const api = {
  // Orders
  getOrders: (page = 1, limit = 10) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    const orders = mockOrders.slice(start, end);
    const total = mockOrders.length;
    const totalPages = Math.ceil(total / limit);
    
    return fakeApi({
      data: orders,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  },

  // Products
  getProducts: (page = 1, limit = 10) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    const products = mockProducts.slice(start, end);
    const total = mockProducts.length;
    const totalPages = Math.ceil(total / limit);
    
    return fakeApi({
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  },

  // Customers
  getCustomers: (page = 1, limit = 10) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    const customers = mockCustomers.slice(start, end);
    const total = mockCustomers.length;
    const totalPages = Math.ceil(total / limit);
    
    return fakeApi({
      data: customers,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  },

  // Dashboard stats
  getDashboardStats: () => {
    return fakeApi({
      totalSales: 125000,
      totalOrders: 1245,
      totalCustomers: 342,
      totalProducts: 89,
      recentOrders: mockOrders.slice(0, 5),
      topProducts: mockProducts.slice(0, 5),
      salesData: Array.from({ length: 12 }, (_, i) => ({
        month: new Date(2023, i, 1).toLocaleString('default', { month: 'short' }),
        sales: Math.floor(Math.random() * 5000) + 1000,
      })),
    });
  },
};
