import React, { useEffect, useState, useRef } from 'react';
import NotificationContent from './NotificationContent';
import SupportContent from './SupportContent';

export type ModalType = 'notifications' | 'support';

interface SideModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: ModalType;
}

const SideModal: React.FC<SideModalProps> = ({ isOpen, onClose, type }) => {
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [isVisible, setIsVisible] = useState(false);
    const [currentType, setCurrentType] = useState<ModalType>(type);
    const modalRef = useRef<HTMLDivElement>(null);
    const firstRender = useRef(true);

    // Handle the open/close state and animations
    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setCurrentType(type);
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
    }, [isOpen, type]);

    const handleClose = () => {
        onClose();
    };

    const renderContent = () => {
        if (currentType === 'notifications') {
            return <NotificationContent onClose={handleClose} />;
        } else if (currentType === 'support') {
            return <SupportContent onClose={handleClose} />;
        }
        return null;
    };

    if (!shouldRender) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Overlay */}
            <div 
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                    isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
                }`}
                onClick={handleClose}
                aria-hidden="true"
            />
            
            {/* Modal Panel */}
            <div 
                className={`absolute right-0 top-0 h-full w-[400px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
                    isVisible ? 'translate-x-0' : 'translate-x-full'
                }`}
                ref={modalRef}
            >
                {renderContent()}
            </div>
        </div>
    );
};

export default SideModal;
