import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { Link } from 'react-router-dom';
import { IconComponent } from '../../../data/sidebarData';
import { JSX } from 'preact';
import Modal from '../../../components/Modal';

type LocationType = 'Dine-in' | 'Takeaway' | 'Delivery' | 'All';

declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

interface Location {
  id: string;
  name: string;
  type: LocationType;
  address: string;
  city: string;
  phone: string;
  email: string;
}

export default function LocationsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [newLocation, setNewLocation] = useState<Omit<Location, 'id'>>({ 
    name: '',
    type: 'Dine-in',
    address: '',
    city: '',
    phone: '',
    email: ''
  });
  
  const isEditMode = !!editingLocation;

  // Default location that can't be deleted
  const defaultLocation = {
    id: 'default',
    name: 'Main Branch',
    type: 'Dine-in' as const,
    address: '123 Main St',
    city: 'Riyadh',
    phone: '+966 50 123 4567',
    email: 'main@example.com',
  };

  // Load locations from localStorage on mount
  const [locations, setLocations] = useState<Location[]>(() => {
    const savedLocations = localStorage.getItem('locations');
    if (savedLocations) {
      const parsed = JSON.parse(savedLocations);
      // Ensure default location always exists
      const hasDefault = parsed.some((loc: Location) => loc.id === 'default');
      return hasDefault ? parsed : [defaultLocation, ...parsed];
    }
    return [defaultLocation];
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewLocation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save locations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('locations', JSON.stringify(locations));
  }, [locations]);

  const handleSaveLocation = () => {
    if (!newLocation.name || !newLocation.address) return;
    
    if (isEditMode && editingLocation) {
      // Update existing location
      setLocations(locations.map(loc => 
        loc.id === editingLocation.id ? { ...newLocation, id: editingLocation.id } : loc
      ));
    } else {
      // Add new location
      const location: Location = {
        ...newLocation,
        id: Date.now().toString()
      };
      setLocations([...locations, location]);
    }
    
    setShowCreateModal(false);
    setEditingLocation(null);
    // Reset form
    setNewLocation({ 
      name: '',
      type: 'Dine-in',
      address: '',
      city: '',
      phone: '',
      email: ''
    });
  };
  
  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
    setNewLocation({
      name: location.name,
      type: location.type,
      address: location.address,
      city: location.city,
      phone: location.phone,
      email: location.email
    });
    setShowCreateModal(true);
  };
  
  const handleDeleteLocation = (id: string) => {
    if (id === 'default') return; // Prevent deleting default location
    if (window.confirm('Are you sure you want to delete this location?')) {
      setLocations(locations.filter(loc => loc.id !== id));
    }
  };

  const isSaveDisabled = !newLocation.name || !newLocation.address;

  const handleCreateClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Create button clicked, showing modal');
    setEditingLocation(null);
    setNewLocation({
      name: '',
      type: 'Dine-in',
      address: '',
      city: '',
      phone: '',
      email: ''
    });
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    console.log('Closing modal from handler');
    setShowCreateModal(false);
    setEditingLocation(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Locations</h1>
        <div>
          <button
            type="button"
            onClick={handleCreateClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
          >
            <span className="w-4 h-4 mr-2 flex items-center justify-center">
              {IconComponent({ type: "plus" })}
            </span>
            Create Location
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  City
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {locations.map((location) => (
                <tr key={location.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {location.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {location.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {location.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {location.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {location.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {location.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleEditLocation(location)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    {location.id !== 'default' && (
                      <button 
                        onClick={() => handleDeleteLocation(location.id)}
                        className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {locations.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    No locations found. Create your first location to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Location Modal */}
      {showCreateModal && (
        <Modal
          isOpen={showCreateModal}
          onClose={handleCloseModal}
          title={isEditMode ? 'Edit Location' : 'Create Location'}
          size="sm"
          width="500px"
          showCloseButton={true}
          className="locations-modal"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
        <div className="space-y-6">
          <div className="border border-gray-200 overflow-hidden rounded">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="w-1/3 bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">
                    Location Name
                  </td>
                  <td className="w-2/3">
                    <input
                      type="text"
                      name="name"
                      className="w-full px-3 py-2 focus:outline-none bg-white"
                      placeholder="e.g., Main Branch"
                      value={newLocation.name}
                      onInput={handleInputChange}
                    />
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="w-1/3 bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">
                    Type
                  </td>
                  <td className="w-2/3">
                    <select
                      name="type"
                      className="w-full px-3 py-2 focus:outline-none bg-white"
                      value={newLocation.type}
                      onChange={handleInputChange}
                    >
                      <option value="Dine-in">Dine-in</option>
                      <option value="Takeaway">Takeaway</option>
                      <option value="Delivery">Delivery</option>
                      <option value="All">All</option>
                    </select>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="w-1/3 bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">
                    Address
                  </td>
                  <td className="w-2/3">
                    <input
                      type="text"
                      name="address"
                      className="w-full px-3 py-2 focus:outline-none bg-white"
                      placeholder="e.g., 123 Main St"
                      value={newLocation.address}
                      onInput={handleInputChange}
                    />
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="w-1/3 bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">
                    City
                  </td>
                  <td className="w-2/3">
                    <input
                      type="text"
                      name="city"
                      className="w-full px-3 py-2 focus:outline-none bg-white"
                      placeholder="e.g., Riyadh"
                      value={newLocation.city}
                      onInput={handleInputChange}
                    />
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="w-1/3 bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">
                    Phone
                  </td>
                  <td className="w-2/3">
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-3 py-2 focus:outline-none bg-white"
                      placeholder="e.g., +966 50 123 4567"
                      value={newLocation.phone}
                      onInput={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">
                    Email
                  </td>
                  <td className="w-2/3">
                    <input
                      type="email"
                      name="email"
                      className="w-full px-3 py-2 focus:outline-none bg-white"
                      placeholder="e.g., contact@example.com"
                      value={newLocation.email}
                      onInput={handleInputChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveLocation}
              disabled={isSaveDisabled}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isSaveDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              Save
            </button>
          </div>
        </div>
        </Modal>
      )}
    </div>
  );
}
