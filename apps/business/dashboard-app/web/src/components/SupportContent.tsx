import React from 'react';

interface SupportItem {
    id: string;
    title: string;
    description: string;
    icon: 'guide' | 'contact' | 'faq' | 'video' | 'chat';
    action: () => void;
}

interface SupportContentProps {
    onClose: () => void;
}

const SupportContent: React.FC<SupportContentProps> = ({ onClose }) => {
    // Sample support data
    const supportItems: SupportItem[] = [
        {
            id: '1',
            title: 'Getting Started Guide',
            description: 'Learn the basics of using your merchant dashboard',
            icon: 'guide',
            action: () => console.log('Open getting started guide')
        },
        {
            id: '2',
            title: 'Contact Support',
            description: 'Get help from our support team',
            icon: 'contact',
            action: () => console.log('Open contact form')
        },
        {
            id: '3',
            title: 'Frequently Asked Questions',
            description: 'Find answers to common questions',
            icon: 'faq',
            action: () => console.log('Open FAQ')
        },
        {
            id: '4',
            title: 'Video Tutorials',
            description: 'Watch step-by-step video guides',
            icon: 'video',
            action: () => console.log('Open video tutorials')
        },
        {
            id: '5',
            title: 'Live Chat Support',
            description: 'Chat with our support team in real-time',
            icon: 'chat',
            action: () => console.log('Open live chat')
        },
        {
            id: '6',
            title: 'API Documentation',
            description: 'Technical documentation for developers',
            icon: 'guide',
            action: () => console.log('Open API docs')
        },
        {
            id: '7',
            title: 'Feature Requests',
            description: 'Suggest new features or improvements',
            icon: 'contact',
            action: () => console.log('Open feature request form')
        },
        {
            id: '8',
            title: 'System Status',
            description: 'Check current system status and uptime',
            icon: 'faq',
            action: () => console.log('Open system status page')
        }
    ];

    const getSupportIcon = (iconType: string) => {
        switch (iconType) {
            case 'guide':
                return (
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                );
            case 'contact':
                return (
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                );
            case 'faq':
                return (
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                );
            case 'video':
                return (
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </div>
                );
            case 'chat':
                return (
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                );
            default:
                return (
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <h2 className="text-lg font-semibold text-gray-900">Help & Support</h2>
                <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Support Options */}
            <div className="flex-1 overflow-y-auto max-h-[calc(100vh-120px)] p-4">
                <div className="space-y-4">
                    {supportItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={item.action}
                            className="flex items-start space-x-4 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer"
                        >
                            {getSupportIcon(item.icon)}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-medium text-gray-900 mb-1">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {item.description}
                                </p>
                            </div>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
                <div className="text-center text-xs text-gray-500">
                    Need more help? Contact us at{' '}
                    <a href="mailto:support@example.com" className="text-blue-600 hover:text-blue-700">
                        support@example.com
                    </a>
                </div>
            </div>
        </>
    );
};

export default SupportContent;
