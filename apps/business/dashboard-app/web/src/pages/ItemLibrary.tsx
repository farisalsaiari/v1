import React, { useState, useEffect } from 'react';
import { AddItem } from '../components/AddItem';
import SlidePageModal from '../components/SlidePageModal';
import AddItemForm from '../components/AddItemForm';
import ItemTypePicker from '../components/ItemTypePicker';

// Add custom CSS for slide-up animation
const slideUpStyles = `
  @keyframes slide-up {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes slide-down {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(100%);
      opacity: 0;
    }
  }
  .animate-slide-up {
    animation: slide-up 0.3s ease-out;
  }
  .animate-slide-down {
    animation: slide-down 0.3s ease-in;
  }
  @keyframes modal-fade-in {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  .animate-modal-fade-in {
    animation: modal-fade-in 0.2s ease-out;
  }
`;

interface Item {
  id: string;
  name: string;
  price: string;
  gtin: string;
  sku: string;
  reportingCategory: string;
  locations: string;
  createdAt: string;
  image?: { color: string; initials: string };
}

export const ItemLibrary: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [isQuickCreateActive, setIsQuickCreateActive] = useState(false);
  const [quickCreateName, setQuickCreateName] = useState('');
  const [quickCreatePrice, setQuickCreatePrice] = useState('');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [editingPrice, setEditingPrice] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [columnDropdownOpen, setColumnDropdownOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [alertAnimating, setAlertAnimating] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingInModal, setEditingInModal] = useState<Item | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [bulkActionsDropdownOpen, setBulkActionsDropdownOpen] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showItemFormModal, setShowItemFormModal] = useState(false);
  const [showChangeTypeModal, setShowChangeTypeModal] = useState(false);
  const [selectedItemType, setSelectedItemType] = useState<string>('prepared-food');
  const [visibleColumns, setVisibleColumns] = useState({
    images: true,        // Default checked
    gtin: false,         // Optional
    sku: true,          // Default checked
    reportingCategory: false,  // Optional
    locations: true,     // Default checked
    stock: false,        // Optional
    price: true         // Default checked
  });

  // Load items from localStorage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem('items');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
    setIsLoading(false);
  }, []);

  // Save items to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  // Helper: open create flow honoring session choice
  const openCreateFlow = () => {
    const hasSeen = sessionStorage.getItem('hasSeenItemTypeModal') === '1';
    const lastType = (sessionStorage.getItem('lastItemType') || 'prepared-food');
    if (hasSeen) {
      setSelectedItemType(lastType);
      setShowItemFormModal(true);
    } else {
      setShowAddItemModal(true);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setDropdownOpen(null);
        setColumnDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSave = () => {
    if (itemName.trim()) {
      const newItem: Item = {
        id: Date.now().toString(),
        name: itemName.trim(),
        price: itemPrice.trim() || '0',
        gtin: '',
        sku: '',
        reportingCategory: '',
        locations: 'Heemeeh',
        createdAt: new Date().toISOString()
      };

      setItems(prev => [...prev, newItem]);
      setItemName('');
      setItemPrice('');
    }
  };

  const handleDeleteItem = (id: string) => {
    const item = items.find(item => item.id === id);
    if (item) {
      setItemToDelete(item);
      setShowDeleteModal(true);
    }
    setDropdownOpen(null);
  };

  const handleDeleteConfirm = async () => {
    if (itemToDelete && !isDeleting) {
      setIsDeleting(true);

      // Simulate network delay for delete operation
      await new Promise(resolve => setTimeout(resolve, 1000));

      setItems(prev => prev.filter(item => item.id !== itemToDelete.id));
      setShowDeleteModal(false);
      setItemToDelete(null);
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
    setIsDeleting(false);
  };

  // Bulk selection handlers
  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  const handleItemSelect = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleDeselectAll = () => {
    setSelectedItems([]);
  };

  const handleBulkDelete = () => {
    setShowBulkDeleteModal(true);
    setBulkActionsDropdownOpen(false);
  };

  const handleBulkDeleteConfirm = async () => {
    if (selectedItems.length > 0 && !isDeleting) {
      setIsDeleting(true);

      // Simulate network delay for bulk delete operation
      await new Promise(resolve => setTimeout(resolve, 1000));

      setItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
      setShowBulkDeleteModal(false);
      setIsDeleting(false);
    }
  };

  const handleBulkDeleteCancel = () => {
    setShowBulkDeleteModal(false);
    setIsDeleting(false);
  };

  const toggleBulkActionsDropdown = () => {
    setBulkActionsDropdownOpen(!bulkActionsDropdownOpen);
  };

  const hideSuccessAlert = () => {
    setAlertAnimating(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
      setAlertAnimating(false);
    }, 300); // Match animation duration
  };

  const handleQuickCreateClick = () => {
    setIsQuickCreateActive(true);
  };

  const handleQuickCreateCancel = () => {
    setIsQuickCreateActive(false);
    setQuickCreateName('');
    setQuickCreatePrice('');
  };

  const handleQuickCreateSave = async () => {
    if (quickCreateName.trim() && !isSaving) {
      setIsSaving(true);

      // Simulate network delay (industry practice)
      await new Promise(resolve => setTimeout(resolve, 800));

      const newItem: Item = {
        id: Date.now().toString(),
        name: quickCreateName.trim(),
        price: quickCreatePrice.trim() || '0',
        gtin: '',
        sku: '',
        reportingCategory: '',
        locations: '0 locations',
        createdAt: new Date().toISOString()
      };

      setItems(prev => [newItem, ...prev]);
      setQuickCreateName('');
      setQuickCreatePrice('');
      setIsQuickCreateActive(false);
      setIsSaving(false);

      // Show success alert
      setShowSuccessAlert(true);

      // Auto-hide after 3.5 seconds with slide-back animation
      setTimeout(() => {
        hideSuccessAlert();
      }, 3500);
    }
  };

  const handleEditItem = (item: Item) => {
    // Open slide modal editor with item values
    setSelectedItemType('prepared-food');
    setEditingInModal(item);
    setShowItemFormModal(true);
    setDropdownOpen(null);
  };

  const handleEditCancel = () => {
    setEditingItemId(null);
    setEditingName('');
    setEditingPrice('');
  };

  const handleEditUpdate = () => {
    if (editingName.trim() && editingItemId) {
      setItems(prev => prev.map(item =>
        item.id === editingItemId
          ? { ...item, name: editingName.trim(), price: editingPrice.trim() || '0' }
          : item
      ));
      setEditingItemId(null);
      setEditingName('');
      setEditingPrice('');
    }
  };

  const toggleDropdown = (itemId: string) => {
    setDropdownOpen(dropdownOpen === itemId ? null : itemId);
  };

  const toggleColumnDropdown = () => {
    setColumnDropdownOpen(!columnDropdownOpen);
  };

  const toggleColumnVisibility = (column: string) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column as keyof typeof prev]
    }));
  };

  const resetFilters = () => {
    setVisibleColumns({
      images: true,        // Default checked
      gtin: false,         // Optional
      sku: true,          // Default checked
      reportingCategory: false,  // Optional
      locations: true,     // Default checked
      stock: false,        // Optional
      price: true         // Default checked
    });
    setSearchTerm('');
  };

  // Filter items based on search term (search by name and price)
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.price.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isSaveButtonActive = itemName.trim().length > 0;
  const isQuickCreateSaveActive = quickCreateName.trim().length > 0;

  // Show loading state while checking localStorage
  if (isLoading) {
    return (
      <>
        <style>{slideUpStyles}</style>
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6 max-w-7xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <div className="text-gray-500">Loading items...</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Show empty state if no items (after loading is complete)
  if (items.length === 0) {
    return (
      <>
        <style>{slideUpStyles}</style>
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6 max-w-7xl mx-auto">
            {/* Main Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-12 mb-8">
              <div className="text-center">
                {/* Shopping bag icon */}
                <div className="mx-auto w-16 h-16 mb-6 flex items-center justify-center">
                  <svg className="w-16 h-16 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" />
                    <path d="M9 8V17H11V8H9ZM13 8V17H15V8H13Z" />
                  </svg>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                  Your item library
                </h1>

                {/* Description */}
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                  Organise what you sell with the item library. Create items to help speed up checkout, view sales reports and track inventory.{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                    Download our template
                  </a>
                  {' '}to create and update items with import.
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={openCreateFlow}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                  >
                    Create an item
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                    Import items
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Create Items Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Quick create items
              </h2>

              <div className="flex gap-4 items-center">
                {/* Plus Icon */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>

                {/* Item Name Input */}
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Item name"
                    value={itemName}
                    onChange={(e) => setItemName((e.target as HTMLInputElement).value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                {/* Price Input */}
                <div className="w-48">
                  <input
                    type="text"
                    placeholder="Price"
                    value={itemPrice}
                    onChange={(e) => setItemPrice((e.target as HTMLInputElement).value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${isSaveButtonActive
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Show table view when items exist
  return (
    <>
      <style>{slideUpStyles}</style>
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header with Search and Actions */}
          <div className="bg-white rounded-lg border border-gray-200 mb-6">
            <div className="p-4">
              {/* Mobile: Stack vertically */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Left side - Search and controls */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 flex-1">
                  {/* Search */}
                  <div className="relative flex-1 max-w-full sm:max-w-md">
                    <input
                      type="text"
                      placeholder="Search items..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  {/* Buttons row */}
                  <div className="flex gap-2 sm:gap-3">
                    <button
                      onClick={resetFilters}
                      className="px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 text-sm whitespace-nowrap"
                    >
                      Reset filters
                    </button>
                    <button
                      onClick={handleQuickCreateClick}
                      className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-1 sm:gap-2 text-sm whitespace-nowrap"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="hidden sm:inline">Quick create</span>
                      <span className="sm:hidden">Create</span>
                    </button>
                  </div>
                </div>

                {/* Right side - Actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Actions Dropdown */}
                  <button className="px-3 sm:px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors flex items-center gap-1 sm:gap-2 text-sm">
                    Actions
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Create Item Button */}
                  <button
                    onClick={openCreateFlow}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm whitespace-nowrap"
                  >
                    <span className="hidden sm:inline">Create item</span>
                    <span className="sm:hidden">Create</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div>
              <table className="w-full">
                <thead className="bg-gray-50 border-t border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left w-12">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                        onChange={handleSelectAll}
                        ref={(input) => {
                          if (input) input.indeterminate = selectedItems.length > 0 && selectedItems.length < filteredItems.length;
                        }}
                      />
                    </th>
                    {visibleColumns.images && <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 w-16">Images</th>}
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 min-w-0">Item</th>
                    {visibleColumns.gtin && <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 hidden sm:table-cell">GTIN</th>}
                    {visibleColumns.sku && <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 hidden md:table-cell">SKU</th>}
                    {visibleColumns.reportingCategory && <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 hidden lg:table-cell">Reporting c...</th>}
                    {visibleColumns.locations && <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 hidden lg:table-cell">Locations</th>}
                    {visibleColumns.stock && <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 hidden xl:table-cell">Stock</th>}
                    {visibleColumns.price && <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 w-32">Price</th>}
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                      <div className="relative dropdown-container">
                        <button
                          onClick={toggleColumnDropdown}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>

                        {/* Column Visibility Dropdown */}
                        {columnDropdownOpen && (
                          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            <div className="p-2">
                              <div
                                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                onClick={() => toggleColumnVisibility('images')}
                              >
                                <div className={`w-5 h-5 rounded flex items-center justify-center ${visibleColumns.images ? 'bg-blue-600' : 'border border-gray-300'}`}>
                                  {visibleColumns.images && (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <span className="text-sm text-gray-700">Images</span>
                              </div>

                              <div
                                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                onClick={() => toggleColumnVisibility('gtin')}
                              >
                                <div className={`w-5 h-5 rounded flex items-center justify-center ${visibleColumns.gtin ? 'bg-blue-600' : 'border border-gray-300'}`}>
                                  {visibleColumns.gtin && (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <span className="text-sm text-blue-600">GTIN</span>
                              </div>

                              <div
                                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                onClick={() => toggleColumnVisibility('sku')}
                              >
                                <div className={`w-5 h-5 rounded flex items-center justify-center ${visibleColumns.sku ? 'bg-blue-600' : 'border border-gray-300'}`}>
                                  {visibleColumns.sku && (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <span className="text-sm text-gray-700">SKU</span>
                              </div>

                              <div
                                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                onClick={() => toggleColumnVisibility('reportingCategory')}
                              >
                                <div className={`w-5 h-5 rounded flex items-center justify-center ${visibleColumns.reportingCategory ? 'bg-blue-600' : 'border border-gray-300'}`}>
                                  {visibleColumns.reportingCategory && (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <span className="text-sm text-gray-700">Reporting category</span>
                              </div>

                              <div
                                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                onClick={() => toggleColumnVisibility('locations')}
                              >
                                <div className={`w-5 h-5 rounded flex items-center justify-center ${visibleColumns.locations ? 'bg-blue-600' : 'border border-gray-300'}`}>
                                  {visibleColumns.locations && (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <span className="text-sm text-gray-700">Locations</span>
                              </div>

                              <div
                                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                onClick={() => toggleColumnVisibility('stock')}
                              >
                                <div className={`w-5 h-5 rounded flex items-center justify-center ${visibleColumns.stock ? 'bg-blue-600' : 'border border-gray-300'}`}>
                                  {visibleColumns.stock && (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <span className="text-sm text-gray-700">Stock</span>
                              </div>

                              <div
                                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                onClick={() => toggleColumnVisibility('price')}
                              >
                                <div className={`w-5 h-5 rounded flex items-center justify-center ${visibleColumns.price ? 'bg-blue-600' : 'border border-gray-300'}`}>
                                  {visibleColumns.price && (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <span className="text-sm text-gray-700">Price</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Quick Create Row - Shows when activated */}
                  {isQuickCreateActive && (
                    <tr className="bg-blue-50 border-l-4 border-blue-500">
                      <td className="px-4 py-3" colSpan={100}>
                        <div className="flex items-center justify-between">
                          {/* Left side - Inputs with gap-4 */}
                          <div className="flex items-center gap-4">
                            {/* Item Name Input */}
                            <div className="w-48 sm:w-64">
                              <input
                                type="text"
                                placeholder="Item name"
                                value={quickCreateName}
                                onChange={(e) => setQuickCreateName((e.target as HTMLInputElement).value)}
                                className="w-full px-3 py-2 border border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                                autoFocus
                              />
                            </div>

                            {/* Price Input */}
                            <div className="w-24 sm:w-32">
                              <input
                                type="text"
                                placeholder="Price"
                                value={quickCreatePrice}
                                onChange={(e) => setQuickCreatePrice((e.target as HTMLInputElement).value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
                              />
                            </div>
                          </div>

                          {/* Right side - Action buttons */}
                          <div className="flex items-center gap-2">
                            {quickCreateName.trim() ? (
                              <button
                                onClick={handleQuickCreateSave}
                                disabled={isSaving}
                                className={`w-16 h-8 rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${isSaving
                                  ? 'bg-blue-400 cursor-not-allowed'
                                  : 'bg-blue-600 hover:bg-blue-700'
                                  } text-white`}
                              >
                                {isSaving ? (
                                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                ) : (
                                  'Save'
                                )}
                              </button>
                            ) : (
                              <button
                                onClick={handleQuickCreateCancel}
                                className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}

                  {/* Items */}
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer group" onClick={() => handleEditItem(item)}>
                      <td className="px-4 py-3 w-12">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={selectedItems.includes(item.id)}
                          onClick={(e) => e.stopPropagation()}
                          onChange={() => handleItemSelect(item.id)}
                        />
                      </td>
                      {visibleColumns.images && (
                        <td className="px-4 py-3 w-16">
                          <div className="w-10 h-10 rounded flex items-center justify-center" style={{ backgroundColor: item.image?.color || '#E5E7EB' }}>
                            <span className="text-white text-xs font-semibold">
                              {(item.image?.initials || item.name.slice(0, 2)).toUpperCase()}
                            </span>
                          </div>
                        </td>
                      )}
                      <td className="px-4 py-3 min-w-0">
                        <div className="font-medium text-gray-900 truncate">{item.name}</div>
                      </td>
                      {visibleColumns.gtin && <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{item.gtin || '-'}</td>}
                      {visibleColumns.sku && <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{item.sku || '-'}</td>}
                      {visibleColumns.reportingCategory && <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{item.reportingCategory || '-'}</td>}
                      {visibleColumns.locations && <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{item.locations}</td>}
                      {visibleColumns.stock && <td className="px-4 py-3 text-gray-500 hidden xl:table-cell">-</td>}
                      {visibleColumns.price && <td className="px-4 py-3 text-gray-900 w-32">${item.price}</td>}
                      <td className="px-4 py-3 w-12">
                        <div className="relative dropdown-container">
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleDropdown(item.id); }}
                            className="text-gray-400 hover:text-gray-600 p-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v.01M12 12v.01M12 18v.01" />
                            </svg>
                          </button>

                          {/* Dropdown Menu */}
                          {dropdownOpen === item.id && (
                            <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                              <button
                                onClick={(e) => { e.stopPropagation(); handleEditItem(item); }}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                              >
                                Edit
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id); }}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* No items found message */}
              {filteredItems.length === 0 && items.length > 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg font-medium mb-2">No items found</div>
                  <div className="text-gray-400 text-sm">Consider adjusting your search term or filters</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Footer Selection Bar */}
      {selectedItems.length > 0 && (
        <div className="fixed bottom-0 left-64 right-0 bg-gray-50 z-40">
          <div className="p-6">
            <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-lg shadow-lg px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Left side - Selection info */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-900">
                    {selectedItems.length} {selectedItems.length === 1 ? 'variation' : 'variations'} selected
                  </span>
                  <button
                    onClick={handleDeselectAll}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Deselect all
                  </button>
                </div>

                {/* Right side - Action buttons */}
                <div className="flex items-center gap-3">
                  {/* Actions Dropdown */}
                  <div className="relative dropdown-container">
                    <button
                      onClick={toggleBulkActionsDropdown}
                      className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors flex items-center gap-2"
                    >
                      Actions
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Actions Dropdown Menu */}
                    {bulkActionsDropdownOpen && (
                      <div className="absolute bottom-full right-0 mb-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        <button
                          onClick={handleBulkDelete}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-t-lg"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setBulkActionsDropdownOpen(false)}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg"
                        >
                          Set as non-taxable
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Update Items Button */}
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                    Update items
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Confirmation Modal */}
      {showBulkDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 animate-modal-fade-in">
            <div className="text-center">
              {/* Warning Icon */}
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Delete Items
              </h3>

              {/* Message */}
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'}? This action cannot be undone.
              </p>

              {/* Buttons */}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleBulkDeleteCancel}
                  disabled={isDeleting}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkDeleteConfirm}
                  disabled={isDeleting}
                  className={`w-20 h-10 rounded-lg font-medium transition-colors flex items-center justify-center ${isDeleting
                    ? 'bg-red-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                    } text-white`}
                >
                  {isDeleting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 animate-modal-fade-in">
            <div className="text-center">
              {/* Warning Icon */}
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Delete Item
              </h3>

              {/* Message */}
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete <span className="font-medium text-gray-900">{itemToDelete?.name}</span> item? This action cannot be undone.
              </p>

              {/* Buttons */}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleDeleteCancel}
                  disabled={isDeleting}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                  className={`w-20 h-10 rounded-lg font-medium transition-colors flex items-center justify-center ${isDeleting
                    ? 'bg-red-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                    } text-white`}
                >
                  {isDeleting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Alert - Slides up from bottom */}
      {showSuccessAlert && (
        <div className={`fixed bottom-4 left-64 right-0 flex justify-center z-50 ${alertAnimating ? 'animate-slide-down' : 'animate-slide-up'}`}>
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-80">
            {/* Green checkmark */}
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Message */}
            <div className="flex-1">
              <div className="text-gray-900 font-medium">{successMessage || 'Done successfully.'}</div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View item
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={hideSuccessAlert}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <AddItem
            onClose={() => setShowAddItemModal(false)}
            onItemCreated={(itemType: string) => {
              // Persist session choice and proceed to form
              sessionStorage.setItem('hasSeenItemTypeModal', '1');
              sessionStorage.setItem('lastItemType', itemType);
              setSelectedItemType(itemType);
              setShowAddItemModal(false);
              setShowItemFormModal(true);
            }}
          />
        </div>
      )}

      {/* Item Form Modal */}
      <SlidePageModal
        isOpen={showItemFormModal}
        onClose={() => setShowItemFormModal(false)}
      >
        <AddItemForm
          selectedItemType={selectedItemType}
          title={editingInModal ? 'Update item' : 'Create item'}
          submitLabel={editingInModal ? 'Update' : 'Save'}
          initialValues={editingInModal ? {
            name: editingInModal.name,
            kitchenFacingName: '',
            description: ''
          } : undefined}
          initialImageColor={editingInModal?.image?.color}
          onSave={(itemData) => {
            if (editingInModal) {
              // Update existing item
              setItems(prev => prev.map(it => it.id === editingInModal.id ? {
                ...it,
                name: itemData.name || it.name,
                image: itemData.image || it.image
              } : it));
              setEditingInModal(null);
              setSuccessMessage('Item updated successfully.');
            } else {
              // Create new item with default location Heemeeh
              const newItem: Item = {
                id: Date.now().toString(),
                name: itemData.name || 'Untitled Item',
                price: '0',
                gtin: '',
                sku: '',
                reportingCategory: '',
                locations: 'Heemeeh',
                createdAt: new Date().toISOString(),
                image: itemData.image
              };
              setItems(prev => [newItem, ...prev]);
              setSuccessMessage('1 new item created successfully.');
            }

            setShowItemFormModal(false);
            // Show success alert
            setShowSuccessAlert(true);
            setTimeout(() => {
              hideSuccessAlert();
            }, 3500);
          }}
          onCancel={() => {
            setEditingInModal(null);
            setShowItemFormModal(false);
          }}
          onChangeItemType={() => {
            // Show change type modal on top of form modal
            setShowChangeTypeModal(true);
          }}
        />
      </SlidePageModal>

      {/* Change Item Type Modal - Uses the shared Modal component */}
      <ItemTypePicker
        isOpen={showChangeTypeModal}
        initialSelectedType={selectedItemType as any}
        onClose={() => setShowChangeTypeModal(false)}
        onApply={(itemType) => {
          sessionStorage.setItem('lastItemType', itemType);
          setSelectedItemType(itemType);
          setShowChangeTypeModal(false);
        }}
      />
    </>
  );
};


export default ItemLibrary