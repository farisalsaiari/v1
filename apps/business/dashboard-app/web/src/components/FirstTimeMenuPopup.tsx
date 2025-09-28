import { h } from 'preact';

interface FirstTimeMenuPopupProps {
  isOpen?: boolean;
  onClose?: () => void;
  onCreateMenu?: () => void;
}

export default function FirstTimeMenuPopup({ isOpen = false, onClose = () => {}, onCreateMenu = () => {} }: FirstTimeMenuPopupProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to Menus</h3>
                <p className="text-sm text-gray-600 mb-4">Create your first menu to get started. You can add items, set locations and customise availability.</p>

                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                        onClick={() => {
                            onCreateMenu();
                        }}
                    >
                        Create menu
                    </button>
                </div>
            </div>
        </div>
    );
}
