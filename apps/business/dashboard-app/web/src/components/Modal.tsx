import { h, ComponentChildren } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import type { TargetedEvent } from 'preact/compat';

interface ModalProps {
    isOpen: boolean;
    onClose: (e?: TargetedEvent<HTMLElement, MouseEvent>) => void;
    title: string;
    description?: string;
    children: ComponentChildren;
    primaryAction?: {
        label: string;
        onClick: () => void;
        disabled?: boolean;
    };
    secondaryAction?: {
        label: string;
        onClick: () => void;
    };
    size?: 'sm' | 'md' | 'lg' | 'xl';
    width?: string;
    textAlign?: 'left' | 'center' | 'right';
    overlayClassName?: string;
    className?: string;
    closeTimeoutMS?: number;
    showCloseButton?: boolean;
}

export default function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
    primaryAction,
    secondaryAction,
    size = 'md',
    width,
    textAlign = 'left',
    overlayClassName = '',
    className = '',
    closeTimeoutMS = 200,
    showCloseButton = true,
}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Handle click outside to close
    const handleClickOutside = (event: any) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    // Handle escape key to close
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                console.log('Escape key pressed, closing modal');
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Handle modal content click to prevent propagation
    const handleModalClick = (e: any) => {
        e.stopPropagation();
    };

    useEffect(() => {
        if (isOpen) {
            console.log('Modal opening...');
            setIsMounted(true);
            // Add click outside listener
            const handleOutsideClick = (e: MouseEvent) => handleClickOutside(e);
            document.addEventListener('mousedown', handleOutsideClick);

            // Add overflow hidden to body
            document.body.style.overflow = 'hidden';

            // Trigger animation on next tick
            const timer = setTimeout(() => {
                setIsVisible(true);
                console.log('Modal visible');
            }, 10);

            return () => {
                clearTimeout(timer);
                document.removeEventListener('mousedown', handleOutsideClick);
            };
        } else {
            console.log('Modal closing...');
            setIsVisible(false);

            // Clean up after animation
            const timer = setTimeout(() => {
                if (!isOpen) {
                    setIsMounted(false);
                    console.log('Modal unmounted');
                }
                document.body.style.overflow = '';
            }, closeTimeoutMS);

            return () => clearTimeout(timer);
        }
    }, [isOpen, closeTimeoutMS]);

    if (!isMounted) return null;

    // Calculate z-index based on modal type
    const modalZIndex = className.includes('locations-modal') ? 200 : 100;

    return (
        <div
            className="fixed inset-0 overflow-y-auto"
            style={{ zIndex: isOpen ? modalZIndex : -1 }}
        >
            <div className="flex items-center justify-center min-h-screen p-4">
                {/* Overlay */}
                <div
                    className={`fixed inset-0 transition-opacity ${overlayClassName || 'bg-black bg-opacity-50'} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ zIndex: modalZIndex - 1 }}
                    onClick={handleClickOutside}
                ></div>

                {/* Modal container */}
                <div
                    className="fixed inset-0 flex items-center justify-center p-4"
                    style={{ zIndex: modalZIndex + 1 }}
                    onClick={handleModalClick}
                >
                    <div
                        className="w-full mx-auto transform transition-all"
                        style={{
                            width: width,
                            maxWidth: '55vw',
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(4px) scale(0.98)'
                        }}>
                        <div
                            ref={modalRef}
                            className="bg-white rounded-md shadow-xl overflow-hidden w-full"
                            onClick={(e: any) => e.stopPropagation()} >
                            {/* Modal content */}

                            <div className="p-6">
                                {showCloseButton && (
                                    <div
                                        className="inline-block mb-5 bg-gray-100 p-2 rounded-md cursor-pointer hover:bg-gray-200 transition-colors"
                                        onClick={() => onClose()}
                                        aria-label="Close modal"
                                    >
                                        <svg data-name="x" viewBox="0 0 24 24" width="24" height="24">
                                            <path
                                                d="M6.71004 18.71L12 13.41L17.29 18.71L18.71 17.29L13.41 12L18.71 6.71004L17.29 5.29004L12 10.59L6.71004 5.29004L5.29004 6.71004L10.59 12L5.29004 17.29L6.71004 18.71Z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </div>
                                )}

                                <h3 className="text-[22px] font-bold text-gray-900 font-semibold">
                                    {title}
                                </h3>
                                {description && (
                                    <p className="mt-1 mb-6 text-sm text-gray-600">
                                        {description}
                                    </p>
                                )}
                                <div className="mt-4">{children}</div>
                            </div>

                            {/* Modal actions */}
                            {(primaryAction || secondaryAction) && (
                                <div className=" bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                                    {secondaryAction ? (
                                        <button
                                            type="button"
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            onClick={secondaryAction.onClick}
                                        >
                                            {secondaryAction.label}
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            onClick={() => onClose()}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    {primaryAction && (
                                        <button
                                            type="button"
                                            className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${primaryAction.disabled ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                            onClick={primaryAction.onClick}
                                            disabled={primaryAction.disabled}
                                        >
                                            {primaryAction.label}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
