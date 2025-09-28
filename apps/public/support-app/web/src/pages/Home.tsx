
import React, { useState, useEffect, FormEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@v1/ui-shared';

// Home component props
interface HomeProps {
    // These props are required by the parent component but not used in this implementation
    onToggleSidebar?: () => void;
    onToggleCollapse?: () => void;
    isCollapsed?: boolean;
}

// Mobile Menu Component
interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onResourcesToggle: () => void;
    isResourcesOpen: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onResourcesToggle, isResourcesOpen }) => (
    <>
        {/* Backdrop with blur */}
        <div 
            className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
                isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={onClose}
        />
        
        {/* Menu Panel */}
        <div 
            className={`fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white shadow-2xl z-50 transform transition-all duration-300 ease-out ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            <div className="h-full flex flex-col">
                <div className="flex px-6 py-6 justify-between items-center border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-900">Menu</h2>
                    <button 
                        onClick={onClose} 
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close menu"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-6 py-4">
                    <ul className="space-y-1">
                        <li>
                            <button
                                onClick={onResourcesToggle}
                                className="flex items-center justify-between w-full text-left text-gray-700 hover:text-gray-900 py-3 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                                <span className="font-medium">Resources</span>
                                <svg
                                    className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
                                        isResourcesOpen ? 'rotate-90' : ''
                                    }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <div 
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    isResourcesOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <ul className="pl-4 mt-1 space-y-1">
                                    <li>
                                        <a href="#" className="block py-3 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                                            Documentation
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block py-3 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                                            API Reference
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block py-3 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                                            Tutorials
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a href="#" className="block py-3 px-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                                Pricing
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block py-3 px-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                                Support
                            </a>
                        </li>
                    </ul>
                </nav>
                
                {/* Bottom section for additional links or user info */}
                <div className="p-4 border-t border-gray-100">
                    <a 
                        href="#" 
                        className="block w-full text-center px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Sign In
                    </a>
                </div>
            </div>
        </div>
    </>
);

export const Home: React.FC<HomeProps> = (): React.ReactElement => {
    // Form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    // UI state
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [showPasskey, setShowPasskey] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [forgotPasswordError, setForgotPasswordError] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [resetSent, setResetSent] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState('');
    const [isForgotEmailFocused, setIsForgotEmailFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordScreen, setShowPasswordScreen] = useState(false);

    // Mobile menu state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isResourcesOpen, setIsResourcesOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const navigate = useNavigate();

    // Check if mobile view
    const checkIfMobile = useCallback(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    useEffect(() => {
        // Initial check
        checkIfMobile();

        // Add event listener for window resize
        window.addEventListener('resize', checkIfMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkIfMobile);
    }, [checkIfMobile]);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(prev => {
            document.body.style.overflow = !prev ? 'hidden' : 'auto';
            return !prev;
        });
    }, []);

    const toggleResources = useCallback(() => {
        setIsResourcesOpen(prev => !prev);
    }, []);

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = 'auto';
    }, []);

    const validateEmailOrPhone = useCallback((value: string): boolean => {
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Phone validation regex (supports international format with optional +)
        const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;

        return emailRegex.test(value) || phoneRegex.test(value);
    }, []);

    const handleSignIn = useCallback(async (e?: React.FormEvent) => {
        e?.preventDefault();

        if (isSubmitting) return;

        // Clear previous errors
        setPasswordError('');

        if (!password) {
            setPasswordError('Please enter your password');
            return;
        }

        try {
            setIsSubmitting(true);
            // Simulate API call with delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (password === '111') {
                // Handle successful sign in
                console.log('Sign in successful');
                // Redirect to dashboard or home page
                navigate('/');
            } else {
                // Show error with slight delay for better UX
                await new Promise(resolve => setTimeout(resolve, 300));
                setPasswordError('Incorrect password. Please try again.');
            }
        } catch (err) {
            setPasswordError('An error occurred. Please try again.');
            console.error('Sign in error:', err);
        } finally {
            setIsSubmitting(false);
        }
    }, [isSubmitting, password, navigate]);

    // Mobile Menu Icons
    const HamburgerIcon = () => (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    );

    const XIcon = () => (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );

    return (
        <div className="min-h-screen flex flex-col w-full  bg-white">
            {/* Header Section */}

            <header className="w-full border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="sq-logo-wrapper">
                            <a href="https://squareup.com/us/en" title="Square">
                                <img
                                    alt="Square"
                                    width="22"
                                    height="22"
                                    src="https://images.ctfassets.net/2d5q1td6cyxq/3YgLxN3bwu02VIZ6uzKev8/91925413e0032c61d5b8328aaca33c5c/square_44px.svg"
                                    onError={(e) => {
                                        // Fallback to a simple square if the image fails to load
                                        e.currentTarget.outerHTML = `
                                            <svg width="22" height="22" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="44" height="44" rx="4" fill="#000"/>
                                            </svg>
                                        `;
                                    }}
                                />
                            </a>
                        </div>
                        <div className="h-6 w-px bg-gray-300"></div>
                        <span className="text-gray-500 text-sm font-medium">Support</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                        <a href="#" className="text-gray-700 hover:text-gray-900 text-sm font-medium">Resources</a>
                        <button
                            onClick={() => setShowPasswordScreen(true)}
                            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md text-sm font-medium"
                        >
                            Sign in
                        </button>
                    </div>
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <XIcon /> : <HamburgerIcon />}
                    </button>

                    {/* Mobile menu button */}

                </div>
            </header>

            {/* Mobile Menu Overlay is now part of the MobileMenu component */}

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={closeMobileMenu}
                onResourcesToggle={toggleResources}
                isResourcesOpen={isResourcesOpen}
            />



            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center px-6 py-8 md:px-6 w-full overflow-y-auto">
                <div className="w-full max-w-3xl text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Hi. How can we help?</h1>
                    <div className="relative max-w-2xl mx-auto mt-6">
                        <input
                            type="text"
                            placeholder="Search our help center..."
                            className="w-full px-6 py-4 pr-12 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all duration-200"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Sign in prompt */}
                <div className="w-full max-w-3xl border-t border-gray-200 pt-8 mb-8">
                    <div className="text-center mb-6">
                        <p className="text-gray-600 mb-4">Sign in for expedited support</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                onClick={() => setShowPasswordScreen(true)}
                                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Sign In
                            </button>
                            <button className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors">
                                Sign Up
                            </button>
                        </div>
                    </div>

                    {/* Topics Section */}
                    <div className="mt-10">
                        <h2 className="text-center text-gray-500 text-sm font-medium uppercase tracking-wider mb-6">Topics</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {[
                                { name: 'Your Square account', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                                { name: 'Hardware', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z' },
                                { name: 'Items and inventory', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
                                { name: 'Payments', icon: 'M3 10h18M7 15h1m4 0h1m-1-4h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                                { name: 'Orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
                                { name: 'Appointments', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
                                { name: 'Online store', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
                                { name: 'Reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                                { name: 'Staff and payroll', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
                                { name: 'Customer engagement', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
                                { name: 'Square for Franchises', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
                                { name: 'Bank with Square', icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3.9 1.4M6 7v6m6-6h6m-6 0l-1.1 2.2M12 7v6m0 0l-1.1 2.2M12 13h6m-6 0l-1.1 2.2m6-8.2l-3 1m0 0l-3-9a5.002 5.002 0 00-6.001 0M18 7l-3 9m0 0l-3-9m3 9a5.002 5.002 0 01-6.001 0m0 0l-3-9m3 9a5.002 5.002 0 01-6.001 0' },
                            ].map((topic, index) => (
                                <div key={index} className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors cursor-pointer">
                                    <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center text-gray-500">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={topic.icon} />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-gray-700">{topic.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Trending Articles Section */}
                <div className="w-full max-w-3xl border-t border-gray-200 pt-8 mt-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Trending Articles</h2>
                    <div className="space-y-4">
                        {[
                            'Sign in to your Square account',
                            'Set up and edit transfer options',
                            'Set up your online store',
                            'Set up and order gift cards',
                            'Create and share Square Payment Links',
                            'Link and edit your transfer methods',
                            'Accept payments with Cash App Pay',
                            'Set up analytics and reporting'
                        ].map((article, index) => (
                            <div key={index} className="flex items-center p-3 -mx-3 rounded-md hover:bg-gray-50 group">
                                <svg className="w-5 h-5 text-gray-400 mr-3 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                                <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{article}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </main>

            {/* Footer */}
            <footer className="w-full bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-500 text-sm mb-4 md:mb-0">
                        © 2025 Block, Inc.
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Privacy Notice</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Terms of Service</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Licenses</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};