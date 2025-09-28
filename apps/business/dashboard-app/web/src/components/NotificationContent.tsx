import React from 'react';

interface NotificationItem {
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type: 'info' | 'success' | 'warning' | 'error';
}

interface NotificationContentProps {
    onClose: () => void;
}

const NotificationContent: React.FC<NotificationContentProps> = ({ onClose }) => {
    // Sample notification data
    const notifications: NotificationItem[] = [
        {
            id: '1',
            title: 'New Order Received',
            message: 'Order #12345 has been placed by John Doe',
            time: '2 minutes ago',
            read: false,
            type: 'success'
        },
        {
            id: '2',
            title: 'Payment Processed',
            message: 'Payment of $150.00 has been successfully processed',
            time: '15 minutes ago',
            read: false,
            type: 'success'
        },
        {
            id: '3',
            title: 'Low Stock Alert',
            message: 'Product "Wireless Headphones" is running low on stock',
            time: '1 hour ago',
            read: true,
            type: 'warning'
        },
        {
            id: '4',
            title: 'System Update',
            message: 'System maintenance completed successfully',
            time: '3 hours ago',
            read: true,
            type: 'info'
        },
        {
            id: '5',
            title: 'Failed Payment',
            message: 'Payment attempt failed for order #12340',
            time: '5 hours ago',
            read: true,
            type: 'error'
        },
        {
            id: '6',
            title: 'New Customer Registration',
            message: 'Sarah Johnson has created a new account',
            time: '6 hours ago',
            read: true,
            type: 'info'
        },
        {
            id: '7',
            title: 'Inventory Update',
            message: 'Stock levels have been updated for 15 products',
            time: '8 hours ago',
            read: true,
            type: 'success'
        },
        {
            id: '8',
            title: 'Security Alert',
            message: 'Suspicious login attempt detected',
            time: '12 hours ago',
            read: true,
            type: 'warning'
        },
        {
            id: '9',
            title: 'Order Shipped',
            message: 'Order #12338 has been shipped to customer',
            time: '1 day ago',
            read: true,
            type: 'success'
        },
        {
            id: '10',
            title: 'Refund Processed',
            message: 'Refund of $75.00 has been processed for order #12335',
            time: '1 day ago',
            read: true,
            type: 'info'
        },
        {
            id: '11',
            title: 'Product Review',
            message: 'New 5-star review received for "Bluetooth Speaker"',
            time: '2 days ago',
            read: true,
            type: 'success'
        },
        {
            id: '12',
            title: 'Server Maintenance',
            message: 'Scheduled maintenance will begin at 2:00 AM',
            time: '2 days ago',
            read: true,
            type: 'warning'
        }
    ];

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'success':
                return (
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                );
            case 'warning':
                return (
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                );
            case 'error':
                return (
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                );
            default:
                return (
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                );
        }
    };

    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Notification List */}
            <div className="flex-1 overflow-y-auto max-h-[calc(100vh-120px)]">
                {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM11 19H6a2 2 0 01-2-2V7a2 2 0 012-2h5m5 0v5" />
                        </svg>
                        <p className="text-sm">No notifications</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                                    !notification.read ? 'bg-blue-50' : ''
                                }`}
                            >
                                <div className="flex items-start space-x-3">
                                    {getNotificationIcon(notification.type)}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className={`text-sm font-medium ${
                                                !notification.read ? 'text-gray-900' : 'text-gray-700'
                                            }`}>
                                                {notification.title}
                                            </p>
                                            {!notification.read && (
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-2">
                                            {notification.time}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Mark all as read
                </button>
            </div>
        </>
    );
};

export default NotificationContent;
