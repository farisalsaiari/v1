import React, { useEffect, useState, useRef } from 'react';

interface SlidePageModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const SlidePageModal: React.FC<SlidePageModalProps> = ({ isOpen, onClose, children }) => {
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [isVisible, setIsVisible] = useState(false);
    const firstRender = useRef(true);
    const modalRef = useRef<HTMLDivElement>(null);

    // Handle the open/close state and animations
    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            document.body.style.overflow = 'hidden';
            
            // On first render, we need to set initial state before animation
            if (firstRender.current) {
                firstRender.current = false;
                // Force a reflow to ensure the initial state is set
                requestAnimationFrame(() => {
                    if (modalRef.current) {
                        // This forces a reflow
                        modalRef.current.offsetHeight;
                    }
                    // Then start the animation
                    requestAnimationFrame(() => {
                        setIsVisible(true);
                    });
                });
            } else {
                // On subsequent opens, we can animate right away
                requestAnimationFrame(() => {
                    if (modalRef.current) {
                        modalRef.current.offsetHeight;
                    }
                    setIsVisible(true);
                });
            }
        } else {
            // Start closing animation
            setIsVisible(false);
            const timer = setTimeout(() => {
                if (!isOpen) {
                    setShouldRender(false);
                    document.body.style.overflow = 'unset';
                }
            }, 300);
            return () => clearTimeout(timer);
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleClose = () => {
        onClose();
    };

    if (!shouldRender) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden" ref={modalRef}>
            {/* Overlay with animation */}
            <div 
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                    isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
                }`}
                onClick={handleClose}
                aria-hidden="true"
            />

            {/* Modal panel with animation */}
            <div 
                className={`absolute bottom-0 left-0 right-0 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
                    isVisible ? 'translate-y-0' : 'translate-y-full'
                }`}
                ref={modalRef}
            >
                {/* Content - Either children or default settings */}
                {children ? (
                    children
                ) : (
                    <>
                        {/* Header with close button */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white flex-shrink-0">
                            <button
                                onClick={handleClose}
                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
                            <div className="w-8 h-8"></div> {/* Spacer for centering */}
                        </div>

                        {/* Content - Enhanced scrollable area */}
                        <div className="flex-1 overflow-y-auto min-h-0">
                            <div className="p-6">
                                <div className="max-w-4xl mx-auto space-y-8 pb-8">
                                    {/* Default settings content would go here */}
                                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Settings</h3>
                                        <p className="text-gray-600">Default settings content.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SlidePageModal;

