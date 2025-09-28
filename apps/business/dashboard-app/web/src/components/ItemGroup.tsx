import { h } from 'preact';

interface ItemGroupProps {
  name: string;
  description?: string;
  itemsCount: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ItemGroup = ({ name, description, itemsCount, onEdit, onDelete }: ItemGroupProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-gray-900">{name}</h3>
            {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
            <p className="text-xs text-gray-500 mt-2">{itemsCount} items</p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={onEdit}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Edit group"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button 
              onClick={onDelete}
              className="text-gray-400 hover:text-red-600"
              aria-label="Delete group"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemGroup;
