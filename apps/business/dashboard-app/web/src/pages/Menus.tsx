import { h, JSX, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useNavigate } from 'react-router-dom';
// Preact/React type differences handled by using `any` for event types in this file
import MenuList, { Menu } from '../components/MenuList';
import Modal from '../components/Modal';
import FirstTimeMenuPopup from '../components/FirstTimeMenuPopup';


// Use `any` for event aliases to avoid Preact/React type incompatibilities in this mixed-typing codebase
type InputChangeEvent = any;
type ButtonClickEvent = any;

interface Location {
  id: string;
  name: string;
  selected?: boolean;
  type?: string;
  address?: string;
  city?: string;
  phone?: string;
  email?: string;
}



interface MenuItem {
  id: string;
  name: string;
  description: string;
  price?: number;
  category?: string;
  updatedAt: string;
}

const MENU_STORAGE_KEY = 'menus';

// Sample initial menu data
const SAMPLE_MENUS: Menu[] = [
  {
    id: '1',
    name: 'Breakfast Menu',
    description: 'Start your day right with our breakfast selection',
    location: '1',
    locationName: 'Main Branch',
    items: [],
    groups: [],
    modifiers: [],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Lunch Menu',
    description: 'Delicious lunch options for everyone',
    location: '1',
    locationName: 'Main Branch',
    items: [],
    groups: [],
    modifiers: [],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Dinner Menu',
    description: 'A perfect way to end your day',
    location: '1',
    locationName: 'Main Branch',
    items: [],
    groups: [],
    modifiers: [],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Animation styles
const animationStyles = `
  @keyframes modal-enter {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Menus = () => {
  const colors = [
    '#9CA3AF', // Gray
    '#3B82F6', // Blue
    '#06B6D4', // Cyan
    '#10B981', // Green
    '#EC4899', // Pink
    '#F59E0B', // Yellow
    '#F97316', // Orange
    '#EF4444', // Red
    '#B45309', // Brown
    '#8B5CF6'  // Purple
  ];

  const shapes = [
    { id: 'circle', icon: '○' },
    { id: 'square', icon: '□' }
  ];

  interface NewMenuState {
    name: string;
    location: string;
    locationName: string;
    locationNames?: string[];
  }

  const [newMenu, setNewMenu] = useState<NewMenuState>({
    name: '',
    location: 'sedave',
    locationName: 'Main Branch',
    locationNames: []
  });
  const [menus, setMenus] = useState<Menu[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [showCreateMenuModal, setShowCreateMenuModal] = useState(false);
  const [showCreateMenuForm, setShowCreateMenuForm] = useState(false);
  const navigate = useNavigate();
  const [showLocationsModal, setShowLocationsModal] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load locations from localStorage on component mount and sync with Locations page
  useEffect(() => {
    const loadLocations = () => {
      try {
        const savedLocations = localStorage.getItem('locations');

        if (savedLocations) {
          const parsedLocations = JSON.parse(savedLocations);

          if (Array.isArray(parsedLocations)) {
            // Get array of selected location IDs from newMenu.location (comma-separated)
            const selectedLocationIds = newMenu.location ? newMenu.location.split(',') : [];

            const mappedLocations = parsedLocations.map((loc: any) => ({
              id: loc.id || '',
              name: loc.name || 'Unnamed Location',
              type: loc.type || 'Dine-in',
              address: loc.address || '',
              city: loc.city || '',
              phone: loc.phone || '',
              email: loc.email || '',
              selected: selectedLocationIds.includes(loc.id)
            }));

            setLocations(mappedLocations);

            // If no location is selected and we have locations available, select the first one by default
            if (mappedLocations.length > 0 && !mappedLocations.some(loc => loc.selected) && !newMenu.location) {
              setNewMenu(prev => ({
                ...prev,
                location: mappedLocations[0].id,
                locationName: mappedLocations[0].name
              }));
            }
          } else {
            setLocations([]);
          }
        } else {
          setLocations([]);
        }
      } catch (error) {
        console.error('Error loading locations:', error);
        setLocations([]);
      }
    };

    // Load locations immediately
    loadLocations();

    // Set up storage event listener to sync across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'locations') {
        loadLocations();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [newMenu.location]);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  // Load menus from localStorage on component mount
  useEffect(() => {
    const loadMenus = () => {
      try {
        const savedMenus = localStorage.getItem(MENU_STORAGE_KEY);
        console.log('Saved menus from localStorage:', savedMenus ? JSON.parse(savedMenus) : 'No saved menus');
        if (savedMenus) {
          const parsedMenus = JSON.parse(savedMenus);
          // Ensure isNew is set for menus created in the last 24 hours
          const updatedMenus = parsedMenus.map((menu: any) => {
            if (!menu.createdAt) return menu;
            const menuDate = new Date(menu.createdAt);
            const twentyFourHoursAgo = new Date();
            twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
            return {
              ...menu,
              isNew: menuDate > twentyFourHoursAgo
            };
          });
          setMenus(updatedMenus);
          console.log('Updated menus with isNew flag:', updatedMenus);
        } else {
          setMenus(SAMPLE_MENUS);
          setIsFirstVisit(true);
          setShowWelcomePopup(true);
        }
      } catch (error) {
        console.error('Error loading menus:', error);
        setMenus(SAMPLE_MENUS);
      } finally {
        setIsLoading(false);
        setShowWelcomePopup(true);
      }
    };

    loadMenus();
  }, []);

  // Save menus to localStorage when they change
  useEffect(() => {
    if (menus.length > 0) {
      localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menus));
    }
  }, [menus]);

  // Handle creating a new menu
  // const handleCreateMenu = () => {
  //   if (!newMenuName.trim()) return;

  //   const newMenu: Menu = {
  //     id: Date.now().toString(),
  //     name: newMenuName.trim(),
  //     location: newMenuLocation,
  //     items: [],
  //     createdAt: new Date().toISOString(),
  //     updatedAt: new Date().toISOString()
  //   };

  //   setMenus([newMenu, ...menus]);
  //   setNewMenuName('');
  //   setNewMenuLocation('Main Dining');
  //   setShowCreateMenuModal(false);
  // };

  const handleSaveMenu = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (!newMenu.name.trim()) {
      alert('Please enter a menu name');
      return;
    }

    if (!newMenu.location) {
      alert('Please select at least one location');
      return;
    }

    // Generate a random ID for the new menu (in a real app, this would come from the server)
    const menuId = generateRandomId();

    // Create menu with multiple locations support
    const menu: Menu = {
      id: menuId,
      name: newMenu.name,
      description: 'A new menu',
      location: newMenu.location, // This is a comma-separated string of location IDs
      locationName: newMenu.locationName || 'Multiple Locations',
      locationNames: newMenu.locationNames || [],
      items: [],
      groups: [],
      modifiers: [],
      isActive: true,
      isNew: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedMenus = [...menus, menu];
    console.log('New menu created:', menu);
    console.log('All menus:', updatedMenus);
    setMenus(updatedMenus);
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(updatedMenus));

    // Close the form and reset state
    setShowCreateMenuForm(false);
    setNewMenu({ name: '', location: '', locationName: '' });

    // Redirect to the new menu's details page
    navigate(`/items/menus/${menuId}`);
  };


  const isSaveDisabled = !newMenu.name.trim();

  // Helper function to generate random ID
  const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const handleCreateMenu = (type: string) => (e: any) => {
    e.preventDefault();
    if (type === 'blank') {
      const selectedLocations = locations.filter(loc => loc.selected);
      const defaultLocation = selectedLocations.length > 0 ? selectedLocations : [locations[0]];

      setNewMenu({
        name: '',
        location: defaultLocation.map(loc => loc.id).join(','),
        locationName: defaultLocation.length === 1
          ? defaultLocation[0].name
          : `${defaultLocation.length} locations`,
        locationNames: defaultLocation.map(loc => loc.name)
      });
      setShowCreateMenuModal(false);
      setShowCreateMenuForm(true);
    } else if (type === 'duplicate' || type === 'template') {
      // Handle duplicate/template logic here
      console.log('Menu type:', type);
    } else if (type === 'import' || type === 'upload') {
      // Handle import/upload logic here if needed
      console.log('Menu import/upload:', type);
    }
  };

  // Handle updating an existing menu
  const handleUpdateMenu = (menu: Menu) => {
    const updatedMenus = menus.map(m =>
      m.id === menu.id
        ? {
          ...m,
          name: menu.name,
          location: menu.location,
          locationName: menu.locationName,
          locationNames: menu.locationNames || [],
          updatedAt: new Date().toISOString()
        }
        : m
    );
    setMenus(updatedMenus);
    setShowCreateMenuModal(false);
    setSelectedMenu(null);
  };

  const handleMenuNameChange = (e: any) => {
    setNewMenu(prev => ({
      ...prev,
      name: e.currentTarget.value
    }));
  };

  // Handle menu delete
  const handleDeleteMenu = (menu: Menu) => {
    if (confirm(`Are you sure you want to delete the menu "${menu.name}"?`)) {
      const updatedMenus = menus.filter(m => m.id !== menu.id);
      setMenus(updatedMenus);
      // Update localStorage
      localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(updatedMenus));

      if (selectedMenu?.id === menu.id) {
        setSelectedMenu(updatedMenus[0] || null);
      }
    }
  };

  // Handle menu selection
  const handleMenuSelect = (menu: Menu) => {
    return (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      navigate(`/items/menus/${menu.id}`);
    };
  };

  // Handle menu edit
  const handleMenuEdit = (menu: Menu) => {
    setSelectedMenu(menu);
    setNewMenu({
      name: menu.name || '',
      location: menu.location || '',
      locationName: menu.locationName || menu.location || ''
    });
    setShowCreateMenuModal(true);
  };

  // Toggle location selection
  const toggleLocationSelect = (locationId: string) => {
    setLocations(prevLocations =>
      prevLocations.map(loc =>
        loc.id === locationId
          ? { ...loc, selected: !loc.selected }
          : loc
      )
    );
  };

  // Handle select all locations
  const handleSelectAllLocations = (e: any) => {
    const checked = (e.target as HTMLInputElement).checked;
    const updatedLocations = locations.map(loc => ({
      ...loc,
      selected: checked
    }));
    setLocations(updatedLocations);
  };

  // Check if all locations are selected
  const allLocationsSelected = locations.length > 0 && locations.every(loc => loc.selected);

  // Initialize with default location selected
  useEffect(() => {
    if (locations.length > 0) {
      const defaultLocation = locations.find(loc => loc.selected) || locations[0];
      if (defaultLocation && !newMenu.location) {
        setNewMenu(prev => ({
          ...prev,
          location: defaultLocation.id,
          locationName: defaultLocation.name
        }));
      }
    }
  }, [locations]);

  // Save selected locations
  const handleSaveLocations = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const selectedLocations = locations.filter(loc => loc.selected);
    if (selectedLocations.length > 0) {
      // If only one location is selected, use its name, otherwise show count
      const locationText = selectedLocations.length === 1
        ? selectedLocations[0].name
        : `${selectedLocations.length} locations selected`;

      // Save all selected location IDs in a comma-separated string
      const locationIds = selectedLocations.map(loc => loc.id).join(',');

      setNewMenu(prev => ({
        ...prev,
        location: locationIds,
        locationName: locationText,
        locationNames: selectedLocations.map(loc => loc.name)
      }));
    } else {
      // If no locations are selected, clear the location
      setNewMenu(prev => ({
        ...prev,
        location: '',
        locationName: '',
        locationNames: []
      }));
    }
  };

  // Handle done button in locations modal
  const handleLocationDone = (e: any) => {
    handleSaveLocations(e);
    setShowLocationsModal(false);
  };

  // Handle location modal open
  const handleOpenLocationsModal = () => {
    // Initialize locations with selected state based on current selection
    if (newMenu.location) {
      const selectedLocationIds = newMenu.location.split(',');
      setLocations(prevLocations =>
        prevLocations.map(loc => ({
          ...loc,
          selected: selectedLocationIds.includes(loc.id)
        }))
      );
    } else {
      // If no location is selected, reset all to unselected
      setLocations(prevLocations =>
        prevLocations.map(loc => ({
          ...loc,
          selected: false
        }))
      );
    }
    setShowLocationsModal(true);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Debug menu data
  useEffect(() => {
    console.log('Current menus state:', menus.map(m => ({
      id: m.id,
      name: m.name,
      isNew: m.isNew,
      createdAt: m.createdAt
    })));
  }, [menus]);

  // Show menu list view if no specific menu is selected
  if (!selectedMenu) {
    return (
      <div className="min-h-screen bg-white">
        <style dangerouslySetInnerHTML={{ __html: animationStyles }} />

        <main className="">
          <div className="max-w-7xl mx-auto">
            <MenuList
              menus={menus}
              onMenuSelect={handleMenuSelect}
              onMenuEdit={handleMenuEdit}
              onMenuDelete={handleDeleteMenu}
              onCreateNew={() => {
                setSelectedMenu(null);
                setNewMenu({
                  name: '',
                  location: locations[0]?.id || '',
                  locationName: locations[0]?.name || 'Main Dining'
                });
                setShowCreateMenuModal(true);
              }}
            />
          </div>
        </main>

        {/* Create Menu Modal */}
        <Modal
          isOpen={showCreateMenuModal}
          onClose={() => setShowCreateMenuModal(false)}
          title="Create a menu"
          description="How would you like to start build menu?"
          size="lg"
          textAlign="left">
          <div className="mb-2 space-y-4">
            <button
              className="w-full text-left border border-gray-200 rounded-lg p-4 hover:border-blue-400 hover:bg-blue-50 transition-colors"
              onClick={handleCreateMenu('blank')}
            >
              <div className="flex items-center">
                <span className="inline-flex items-center justify-center p-3.5 mr-3 bg-gray-100 rounded">
                  <svg role="img" viewBox="0 0 14 14" className="w-3 h-3">
                    <path d="M8 14V8H14V6H8V0H6V6H0V8H6V14H8Z" fill="black"></path>
                  </svg>
                </span>

                <div>
                  <div className="font-medium text-gray-900">Start from scratch</div>
                  <div className="text-sm text-gray-400">Add and organise items as you build a menu.</div>
                </div>
              </div>
            </button>

            <button
            className={`w-full text-left border rounded-lg p-4 transition-colors ${menus.length === 0
              ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            onClick={() => menus.length > 0 && handleCreateMenu('import')}
            disabled={menus.length === 0}
          >
              <div className="flex items-center">
                <svg role="img" viewBox="0 0 24 24" height="40" width="40" id="" className=" p-2 mr-3 bg-gray-100 rounded inline-flex">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.71 7.7098L16.71 11.7098L15.3 10.2898L17.59 7.9998H4V5.9998H17.59L15.3 3.7098L16.71 2.2998L20.71 6.2998C21.1 6.6898 21.1 7.3198 20.71 7.7098ZM8.70006 20.2998L7.29006 21.7098L3.29006 17.7098C2.90006 17.3198 2.90006 16.6898 3.29006 16.2998L7.29006 12.2998L8.70006 13.7098L6.41006 15.9998H20.0001V17.9998H6.41006L8.70006 20.2998Z" fill="black"></path>
                </svg>
                <div>
                  <div className="font-medium text-gray-900">Import your menu from another platform</div>
                  <div className="text-sm text-gray-400">Import from other platforms, such as another POS or delivery service.</div>
                </div>
              </div>
            </button>

            <button
              className="w-full  text-left border border-gray-200 rounded-lg p-4 hover:border-blue-400 hover:bg-blue-50 transition-colors"
              onClick={handleCreateMenu('upload')}
            >
              <div className="flex items-center">
                <svg role="img" viewBox="0 0 24 24" height="40" width="40" id="" className=" p-2 mr-3 bg-gray-100 rounded inline-flex">
                  <path d="M13 2H11H8C6.34 2 5 3.34 5 5V19C5 20.66 6.34 22 8 22H16C17.66 22 19 20.66 19 19V10V8L13 2ZM16.17 8H13V4.83L16.17 8ZM17 19C17 19.55 16.55 20 16 20H8C7.45 20 7 19.55 7 19V5C7 4.45 7.45 4 8 4H11V8V10H13H17V19Z" fill="black"></path>
                </svg>
                <div>
                  <div className="font-medium text-gray-900">Upload a file or photo of your existing menu</div>
                  <div className="text-sm text-gray-400">We'll automatically detect the format and convert it for you.</div>
                </div>
              </div>
            </button>
          </div>
        </Modal>

        {/* Locations Modal - Higher z-index to appear above other modals */}
        <Modal
          isOpen={showLocationsModal}
          onClose={() => setShowLocationsModal(false)}
          title="Select Location"
          size="sm"
          width="400px"
          className="locations-modal">
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Select locations where you'd like to offer this menu to your customers.
            </p>

            <div className="relative">
              <input
                type="text"
                placeholder="Search locations..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e: any) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="border border-gray-200 rounded-md overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center">
                <input
                  id="select-all-locations"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  checked={allLocationsSelected}
                  onChange={handleSelectAllLocations}
                />
                <label
                  htmlFor="select-all-locations"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Select All ({locations.filter(loc => loc.selected).length} of {locations.length} selected)
                </label>
              </div>
              <div className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                {locations.length === 0 ? (
                  <div className="p-4 text-center text-sm text-gray-500">
                    No locations found. Please add locations in the
                    <a
                      href="/settings/business/locations"
                      className="text-blue-600 hover:underline ml-1"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/settings/business/locations');
                      }}
                    >
                      Locations
                    </a> page first.
                  </div>
                ) : (
                  locations
                    .filter(loc =>
                      loc.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((location) => (
                      <div
                        key={location.id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${location.selected ? 'bg-blue-50' : ''}`}
                        onClick={() => toggleLocationSelect(location.id)}
                      >
                        <div className="flex items-center">
                          <span className={`mr-3 h-5 w-5 flex items-center justify-center ${location.selected ? 'text-blue-600' : 'text-gray-400'}`}>
                            {location.selected ? (
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                              </svg>
                            )}
                          </span>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{location.name}</div>
                            <div className="text-xs text-gray-500">{location.type} • {location.address}</div>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowLocationsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={(e: any) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleLocationDone(e);
                }}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Done
              </button>
            </div>
          </div>
        </Modal>

        {/* Create Menu Form Modal */}
        <Modal
          isOpen={showCreateMenuForm}
          onClose={() => setShowCreateMenuForm(false)}
          title="Create Menu"
          size="sm"
          width="500px"
          showCloseButton={false}>
          <div className="space-y-6">
            <div className="border border-gray-200  overflow-hidden">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="w-1/3 bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">
                      Menu Name
                    </td>
                    <td className="w-2/3">
                      <input
                        type="text"
                        id="menu-name"
                        className="w-full px-3 py-2 focus:outline-none bg-white"
                        placeholder="e.g., Coffee Menu"
                        value={newMenu.name}
                        onInput={handleMenuNameChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="w-1/3 bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200">
                      Location
                    </td>
                    <td className="w-2/3">
                      <div className="flex items-center justify-between w-full px-3 py-2">
                        <div className="flex items-center w-full">
                          <div className="flex items-center flex-1">
                            <span className="text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                            </span>
                            <span className="ml-2 text-gray-700">
                              {newMenu.locationName || 'Select location'}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenLocationsModal();
                            }}
                            className="ml-2 text-sm text-blue-600 hover:text-blue-800 whitespace-nowrap"
                          >
                            {newMenu.location ? 'Change' : 'Select'}
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setShowCreateMenuForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveMenu}
                disabled={isSaveDisabled}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSaveDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                Save
              </button>
            </div>
          </div>
        </Modal>

        {/* First Time Welcome Popup */}
        <FirstTimeMenuPopup
          isOpen={showWelcomePopup && isFirstVisit}
          onClose={() => setShowWelcomePopup(false)}
          onCreateMenu={() => {
            setShowWelcomePopup(false);
            setShowCreateMenuModal(true);
          }}
        />
      </div>
    );
  }

  // Show menu detail view if a menu is selected
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{selectedMenu.name}</h1>
            <p className="text-sm text-gray-500">{selectedMenu.location}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleMenuEdit(selectedMenu)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Edit Menu
            </button>
            <button
              onClick={() => setSelectedMenu(null)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back to Menus
            </button>
          </div>
        </div>

        {/* Menu items list will go here */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Menu Items</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {selectedMenu.items?.length || 0} items in this menu
            </p>
          </div>
          <div className="border-t border-gray-200">
            {!selectedMenu.items || selectedMenu.items.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No items</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by adding a new item to this menu.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg
                      className="-ml-1 mr-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    New Item
                  </button>
                </div>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {(selectedMenu.items || []).map((item) => (
                  <li key={item.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-blue-600 truncate">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          ${item.price?.toFixed(2) || '0.00'}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menus;
