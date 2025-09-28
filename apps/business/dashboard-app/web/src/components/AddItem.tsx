import { h } from 'preact';

import React from 'react';

interface AddItemProps {
  onClose: () => void;
  onItemCreated: (itemType: string) => void;
}

export const AddItem: React.FC<AddItemProps> = ({ onClose, onItemCreated }) => {
  return (
    <div>
      <h2>Add Item</h2>
      {/* Add item form or logic here */}
      <h3 className="text-lg font-medium text-gray-900 mb-2">Select Item Type</h3>
      <div className="flex gap-3 justify-center mb-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => onItemCreated('prepared-food')}
        >
          Prepared Food
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => onItemCreated('retail')}
        >
          Retail
        </button>
      </div>
      <button
        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
        onClick={onClose}
      >
        Cancel
      </button>
    </div>
  );
}
