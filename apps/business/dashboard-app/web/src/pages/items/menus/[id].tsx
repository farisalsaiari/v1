import { h } from 'preact';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'preact/hooks';
import { Menu } from '../../../components/MenuList';
import Modal from '../../../components/Modal';

interface Location {
  id: string;
  name: string;
  selected?: boolean;
}

const LOCAL_STORAGE_KEY = 'menus';
const LOCATIONS_STORAGE_KEY = 'locations';

interface MenuDetailsProps {
    // Props will be passed via route state or fetched
}

export default function MenuDetails({ }: MenuDetailsProps) {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [menu, setMenu] = useState<Menu | null>(null);
    const [showMenuActions, setShowMenuActions] = useState(false);
    const [showAddDropdown, setShowAddDropdown] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showLocationsModal, setShowLocationsModal] = useState(false);
    const [locations, setLocations] = useState<Location[]>([]);

    // Fetch menu and locations
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                
                // Get menus and locations from localStorage
                const savedMenus = localStorage.getItem(LOCAL_STORAGE_KEY);
                const savedLocations = localStorage.getItem(LOCATIONS_STORAGE_KEY);
                
                const menus: Menu[] = savedMenus ? JSON.parse(savedMenus) : [];
                const allLocations: Location[] = savedLocations ? JSON.parse(savedLocations) : [];
                
                // Find the current menu
                const currentMenu = menus.find(menu => menu.id === id);
                
                if (currentMenu) {
                    setMenu(currentMenu);
                    
                    // If we have locations in the menu, use them to set the selected state
                    if (currentMenu.location) {
                        const selectedIds = currentMenu.location.split(',');
                        const updatedLocations = allLocations.map(loc => ({
                            ...loc,
                            selected: selectedIds.includes(loc.id)
                        }));
                        setLocations(updatedLocations);
                    } else if (allLocations.length > 0) {
                        // If no location is set but we have locations, select the first one by default
                        const updatedLocations = allLocations.map((loc, index) => ({
                            ...loc,
                            selected: index === 0
                        }));
                        setLocations(updatedLocations);
                        
                        // Update the menu with the default location
                        const updatedMenu = {
                            ...currentMenu,
                            location: allLocations[0].id,
                            locationName: allLocations[0].name,
                            locationNames: [allLocations[0].name]
                        };
                        setMenu(updatedMenu);
                        
                        // Save the updated menu
                        const updatedMenus = menus.map(m => 
                            m.id === updatedMenu.id ? updatedMenu : m
                        );
                        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMenus));
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleBack = () => {
        navigate('/items/menus');
    };

    const handleEditMenu = () => {
        // Navigate to edit page or open edit modal
        navigate(`/items/menus/${id}/edit`);
        setShowMenuActions(false);
    };

    const handleDeleteMenu = () => {
        setShowMenuActions(false);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        try {
            // Get current menus
            const savedMenus = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedMenus) {
                const menus: Menu[] = JSON.parse(savedMenus);
                const updatedMenus = menus.filter(menu => menu.id !== id);
                
                // Save updated menus
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMenus));
                
                // Navigate back to menus list
                navigate('/items/menus');
            }
        } catch (error) {
            console.error('Error deleting menu:', error);
        } finally {
            setShowDeleteConfirm(false);
        }
    };

    const updateMenuLocations = async () => {
        try {
            if (!menu) return;
            
            const selectedLocations = locations.filter(loc => loc.selected);
            if (selectedLocations.length === 0) return;
            
            // Get current menus
            const savedMenus = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedMenus) {
                const menus: Menu[] = JSON.parse(savedMenus);
                
                let locationName = '';
                if (selectedLocations.length === 1) {
                    locationName = selectedLocations[0].name;
                } else if (selectedLocations.length > 1) {
                    locationName = `${selectedLocations.length} locations`;
                }
                
                const updatedMenu = { 
                    ...menu, 
                    location: selectedLocations.map(loc => loc.id).join(','),
                    locationName: locationName,
                    locationNames: selectedLocations.map(loc => loc.name),
                    updatedAt: new Date().toISOString()
                };
                
                const updatedMenus = menus.map(m => 
                    m.id === menu.id ? updatedMenu : m
                );
                
                // Save updated menus
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMenus));
                
                // Update current menu
                setMenu(updatedMenu);
                setShowLocationsModal(false);
            }
        } catch (error) {
            console.error('Error updating menu locations:', error);
        }
    };

    const handleAddMenuGroup = () => {
        // TODO: Implement add menu group
        console.log('Add menu group');
        setShowAddDropdown(false);
    };

    const handleAddModifier = () => {
        // TODO: Implement add modifier
        console.log('Add modifier');
        setShowAddDropdown(false);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!menu) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Menu not found</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleBack}
                        className="p-2 rounded-full hover:bg-gray-100"
                        aria-label="Back to menus"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <h1 className="text-2xl font-semibold text-gray-900">{menu.name}</h1>

                    {/* Three dots menu */}
                    <div className="relative">
                        <button
                            onClick={() => setShowMenuActions(!showMenuActions)}
                            className="p-1 rounded-full hover:bg-gray-100"
                            aria-label="Menu actions"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                        </button>

                        {showMenuActions && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                <button
                                    onClick={handleEditMenu}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Edit Menu
                                </button>
                                <button
                                    onClick={handleDeleteMenu}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    Delete Menu
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Add button with dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowAddDropdown(!showAddDropdown)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add
                    </button>

                    {showAddDropdown && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-10">
                            <button
                                onClick={handleAddMenuGroup}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Menu Group
                            </button>
                            <button
                                onClick={handleAddModifier}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Modifier
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Locations */}
            <div className="mb-8">
                <div className="flex items-center text-sm text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Locations:</span>
                    <div className="ml-2 flex items-center flex-wrap gap-2">
                        {menu?.locationNames && menu.locationNames.length > 0 ? (
                            <div className="flex flex-col space-y-1">
                                {menu.locationNames?.map((name: string, index: number) => (
                                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {name}
                                    </span>
                                ))}
                            </div>
                        ) : menu?.locationName ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {menu.locationName}
                            </span>
                        ) : (
                            <span className="text-sm text-gray-500 italic">No location selected</span>
                        )}
                    </div>
                    <button 
                        onClick={() => setShowLocationsModal(true)}
                        className="ml-2 text-blue-600 hover:text-blue-800 text-sm"
                    >
                        Edit
                    </button>
                </div>
            </div>

            {/* Locations Modal */}
            <Modal
                isOpen={showLocationsModal}
                onClose={() => setShowLocationsModal(false)}
                title="Update Menu Locations"
            >
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">Select locations where this menu should be available:</p>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        {locations.map((location) => (
                            <label key={location.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                                <input
                                    type="checkbox"
                                    checked={location.selected || false}
                                    onChange={() => {
                                        const updatedLocations = locations.map(loc => 
                                            loc.id === location.id 
                                                ? { ...loc, selected: !loc.selected } 
                                                : loc
                                        );
                                        setLocations(updatedLocations);
                                    }}
                                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">{location.name}</span>
                            </label>
                        ))}
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setShowLocationsModal(false)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={updateMenuLocations}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Empty state */}
            <div className="mt-16 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">Your menu is empty</h3>
                <p className="mt-1 text-sm text-gray-500">Create a menu group to get started</p>
                <div className="mt-6">
                    <button
                        onClick={handleAddMenuGroup}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Create Menu Group
                    </button>
                </div>
            </div>

            {/* Delete confirmation modal */}
            <Modal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                title="Delete Menu"
                size="sm"
            >
                <p className="text-sm text-gray-600 mb-6">
                    Are you sure you want to delete this menu? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={confirmDelete}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </Modal>
        </div>
    );
}
