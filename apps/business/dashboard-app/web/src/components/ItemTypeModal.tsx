import { h } from 'preact';
import { useState } from 'preact/hooks';

type ItemType = 'prepared-food' | 'beverage' | 'physical-good' | 'digital' | 'custom';

interface ItemTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (type: ItemType) => void;
}

const itemTypes = [
  {
    id: 'prepared-food',
    name: 'Prepared Food',
    description: 'Food that is prepared and sold for immediate consumption',
    icon: '🍽️'
  },
  {
    id: 'beverage',
    name: 'Beverage',
    description: 'Drinks and other liquid items',
    icon: '☕'
  },
  {
    id: 'physical-good',
    name: 'Physical Good',
    description: 'Tangible products that can be physically shipped',
    icon: '📦'
  },
  {
    id: 'digital',
    name: 'Digital',
    description: 'Digital products or services',
    icon: '💻'
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Create a custom item type',
    icon: '✨'
  }
] as const;

export default function ItemTypeModal({ isOpen, onClose, onSelect }: ItemTypeModalProps) {
  const [selectedType, setSelectedType] = useState<ItemType | null>(null);

  if (!isOpen) return null;

  const handleSelect = () => {
    if (selectedType) {
      onSelect(selectedType);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                What type of item do you want to create?
              </h3>
              <div className="mt-4">
                <div className="space-y-3">
                  {itemTypes.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => setSelectedType(type.id as ItemType)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedType === type.id
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{type.icon}</span>
                        <div className="text-left">
                          <div className="font-medium text-gray-900">{type.name}</div>
                          <div className="text-sm text-gray-500">{type.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <button
              type="button"
              onClick={handleSelect}
              disabled={!selectedType}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white ${
                selectedType
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : 'bg-gray-300 cursor-not-allowed'
              } sm:col-start-2 sm:text-sm`}
            >
              Continue
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:col-start-1 sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
