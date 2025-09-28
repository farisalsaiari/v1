
import React, { useState } from 'react';
import { Button, PopupModal } from '@v1/ui-shared';

export interface HomeProps {
    onToggleSidebar: () => void;
    onToggleCollapse: () => void;
    isCollapsed: boolean;
}

export function Home({ }: HomeProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleConfirm = () => {
        console.log('Confirmed!');
        handleCloseModal();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to Customers App</h1>
                <div className="space-x-4">
                    <Button
                        variant="bordered"
                        size="lg"
                        rounded={false}
                        onClick={handleOpenModal}
                        className="mb-4">
                        Button
                    </Button>
                </div>
            </div>

            <PopupModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Confirm Action"
                width="55%"
                position="top"
                animation="slide"
                showCloseButton={true}
                closeOnOverlayClick={true}
                closeOnEscape={true}
                showCancelButton={true}
                showConfirmButton={true}
                onConfirm={handleConfirm}
                buttonAlignment="left"
                confirmButtonVariant="primary">
                <p>Are you sure you want to proceed?</p>
            </PopupModal>
        </div>
    )
}