import { h } from 'preact';
import { useState } from 'preact/hooks';
import Modal from './Modal';

export type ItemTypeId = 'prepared-food' | 'physical-good' | 'digital' | 'beverage' | 'custom';

interface ItemTypePickerProps {
  isOpen: boolean;
  initialSelectedType: ItemTypeId;
  onApply: (type: ItemTypeId) => void;
  onClose: () => void;
}

const ITEM_TYPES = [
  {
    id: 'prepared-food' as const,
    title: 'Prepared food',
    description: 'Best for restaurants or other food venues. Add nutritional information and identify food allergens.',
    icon: '🍽️'
  },
  {
    id: 'beverage' as const,
    title: 'Beverage',
    description: 'Drinks and other liquid items',
    icon: '☕'
  },
  {
    id: 'physical-good' as const,
    title: 'Physical good',
    description: 'Best for retail items such as clothing or jewellery.',
    icon: '📦'
  },
  {
    id: 'digital' as const,
    title: 'Digital',
    description: 'Best for digital products like software, ebooks, or courses.',
    icon: '💻'
  },
  {
    id: 'custom' as const,
    title: 'Custom',
    description: 'Create a custom item type',
    icon: '✨'
  }
];

export const ItemTypePicker = ({ isOpen, initialSelectedType, onApply, onClose }: ItemTypePickerProps) => {
  const [selected, setSelected] = useState<ItemTypeId>(initialSelectedType);

  const handleApply = () => {
    onApply(selected);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="What type of item do you want to create?"
      primaryAction={{
        label: 'Continue',
        onClick: handleApply,
        disabled: !selected
      }}
      secondaryAction={{
        label: 'Cancel',
        onClick: onClose
      }}
    >
      <div className="space-y-3">
        {ITEM_TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelected(t.id)}
            className={`w-full text-left border rounded-lg p-4 transition-colors ${
              selected === t.id ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">{t.icon}</span>
              <div className="text-left">
                <div className="font-medium text-gray-900">{t.title}</div>
                <div className="text-sm text-gray-500">{t.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </Modal>
  );
};

export default ItemTypePicker;
