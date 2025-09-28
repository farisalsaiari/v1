import { h } from 'preact';
import { useState } from 'preact/hooks';
import type { JSX } from 'preact';

export interface ItemData {
  id: string;
  name: string;
  price: string;
  gtin: string;
  sku: string;
  reportingCategory: string;
  locations: string;
  description?: string;
  image?: { color: string; initials: string };
  kitchenFacingName?: string;
  createdAt?: string;
}

interface AddItemFormProps {
  onSave: (itemData: ItemData) => void;
  onCancel: () => void;
  isSaving?: boolean;
  initialValues?: Partial<ItemData>;
  title?: string;
  submitLabel?: string;
  selectedItemType?: string;
  onChangeItemType?: () => void;
  initialImageColor?: string;
}

export default function AddItemForm({ 
  onSave, 
  onCancel, 
  isSaving = false,
  initialValues = {},
  title = '',
  submitLabel = '',
  selectedItemType = '',
  onChangeItemType,
  initialImageColor = ''
}: AddItemFormProps) {
  const [formData, setFormData] = useState<ItemData>(() => {
    const defaultValues: ItemData = {
      id: Date.now().toString(),
      name: '',
      price: '0',
      gtin: '',
      sku: '',
      reportingCategory: '',
      locations: 'Heemeeh',
      description: '',
      kitchenFacingName: '',
      createdAt: new Date().toISOString(),
      image: { color: '#6B7280', initials: 'NI' } // Default image with neutral color and 'NI' (New Item) initials
    };
    
    return {
      ...defaultValues,
      ...initialValues,
      image: initialValues?.image || defaultValues.image
    };
  });

  const handleChange = (e: JSX.TargetedEvent<HTMLInputElement | HTMLTextAreaElement, Event>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {title && <h2 className="text-lg font-medium text-gray-900 mb-4">{title}</h2>}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Item Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
          disabled={isSaving}
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price *
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="0.00"
            required
            disabled={isSaving}
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description (Optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          disabled={isSaving}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSaving ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {submitLabel || 'Saving...'}
            </div>
          ) : 'Save Item'}
        </button>
      </div>
    </form>
  );
}
