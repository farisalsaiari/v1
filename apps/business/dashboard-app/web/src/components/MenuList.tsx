import { h, JSX } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

// Simple text-based icons
const IconWrapper = ({ children, className = '' }: { children: string, className?: string }) => (
  <span className={`inline-block ${className}`} style={{ lineHeight: '1em' }}>{children}</span>
);

const FiSearch = ({ className = '' }: { className?: string }) => <IconWrapper className={className}>🔍</IconWrapper>;
const FiGrid = ({ className = '' }: { className?: string }) => <IconWrapper className={className}>⏹️</IconWrapper>;
const FiList = ({ className = '' }: { className?: string }) => <IconWrapper className={className}>☰</IconWrapper>;
const FiChevronDown = ({ className = '' }: { className?: string }) => <IconWrapper className={className}>▼</IconWrapper>;
const FiX = ({ className = '' }: { className?: string }) => <IconWrapper className={className}>✕</IconWrapper>;
const FiPlus = ({ className = '' }: { className?: string }) => <IconWrapper className={className}>＋</IconWrapper>;

interface MenuItem {
  id: string;
  name: string;
  description: string;
  itemsCount: number;
  updatedAt: string;
  price?: number;
  color?: string;
  kitchenName?: string;
  category?: string;
  autoAddToCheck?: boolean;
  showInHomeScreen?: boolean;
  showInMenu?: boolean;
}

export interface Menu {
  id: string;
  name: string;
  description?: string;
  location?: string;
  locationName?: string;
  locationNames?: string[];
  items?: MenuItem[];
  groups?: any[];
  modifiers?: any[];
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  isNew?: boolean;
}

interface MenuListProps {
  menus: Menu[];
  onMenuSelect: (menu: Menu) => (e: Event) => void;
  onMenuEdit: (menu: Menu) => void;
  onMenuDelete: (menu: Menu) => void;
  onCreateNew: () => void;
  onUpdateMenus?: (menus: Menu[]) => void;
}

type ViewMode = 'grid' | 'list';

const ITEMS_PER_PAGE = 10;

const MenuList = ({
  menus,
  onMenuSelect,
  onMenuEdit,
  onMenuDelete,
  onCreateNew,
  onUpdateMenus,
}: MenuListProps) => {
  // State management
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Get unique locations for the filter
  const locationOptions = Array.from(
    new Set(menus.flatMap(menu => menu.locationNames || []))
  ).map(location => ({
    id: location.toLowerCase().replace(/\s+/g, '-'),
    name: location
  }));

  // Filter menus based on search term and location
  const filteredMenus = menus.filter(menu => {
    const matchesSearch = menu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (menu.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesLocation = locationFilter === 'all' ||
      (menu.locationNames && menu.locationNames.includes(locationFilter));
    return matchesSearch && matchesLocation;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMenus.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentMenus = filteredMenus.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle row click
  const handleRowClick = (e: Event, menu: Menu) => {
    if ((e.target as HTMLElement).closest('button, a, [role="menuitem"]')) {
      return;
    }
    onMenuSelect(menu)(e);
  };

  // Toggle dropdown
  const toggleDropdown = (menuId: string) => {
    setDropdownOpen(dropdownOpen === menuId ? null : menuId);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Set button refs
  const setButtonRef = (el: HTMLButtonElement | null, id: string) => {
    buttonRefs.current[id] = el;
  };

  // Save view mode to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('menuViewMode', viewMode);
    }
  }, [viewMode]);

  return (
    <div className="bg-white min-h-screen p-0">
      {/* Header Section */}
      <div className="space-y-6">
        {/* Title and Create Button */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Menus</h1>
          <button
            onClick={onCreateNew}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiPlus className="-ml-1 mr-2 h-4 w-4" />
            Create Menu
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500">
          Use menus to sell your items on kiosks, delivery apps, online ordering sites and any restaurant POS modes.
        </p>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search menus..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.currentTarget.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <FiX className="h-4 w-4 text-gray-400 hover:text-gray-500" />
              </button>
            )}
          </div>

          {/* Location Filter */}
          <div className="w-full sm:w-48">
            <select
              value={locationFilter}
              onChange={(e: any) => {
                setLocationFilter(e.currentTarget.value);
                setCurrentPage(1); // Reset to first page when changing location
              }}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="all">All Locations</option>
              {locationOptions.map(({ id, name }) => (
                <option key={id} value={name}>{name}</option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${viewMode === 'grid' ? 'bg-gray-100 text-blue-600' : 'text-gray-500 hover:bg-gray-50'
                }`}
              aria-label="Grid view"
            >
              <FiGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-l-0 border-gray-300 bg-white text-sm font-medium ${viewMode === 'list' ? 'bg-gray-100 text-blue-600' : 'text-gray-500 hover:bg-gray-50'
                }`}
              aria-label="List view"
            >
              <FiList className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Content Area */}
      <div className="mt-6">
        {filteredMenus.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
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
                strokeWidth={1}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No menus found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || locationFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by creating a new menu.'}
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={onCreateNew}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiPlus className="-ml-1 mr-2 h-4 w-4" />
                New Menu
              </button>
            </div>
          </div>
        ) : viewMode === 'list' ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {/* Table View */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Menu Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentMenus.map((menu) => (
                    <tr
                      key={menu.id}
                      onClick={(e) => handleRowClick(e as unknown as Event, menu)}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-medium">
                            {menu.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{menu.name}</div>
                            <div className="text-sm text-gray-500">
                              {menu.items?.length || 0} {menu.items?.length === 1 ? 'item' : 'items'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {menu.locationName || menu.location || 'No location'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(menu.updatedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-6">
                          {menu.isNew && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              New
                            </span>
                          )}
                          <div className="relative" ref={dropdownRef}>
                            <button
                              type="button"
                              ref={(el) => setButtonRef(el, menu.id)}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleDropdown(menu.id);
                              }}
                              className="text-gray-400 hover:text-gray-500 focus:outline-none"
                              aria-haspopup="true"
                              aria-expanded={dropdownOpen === menu.id}
                            >
                              <span className="sr-only">Open options</span>
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </button>

                            {dropdownOpen === menu.id && (
                              <div
                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                              >
                                <div className="py-1" role="none">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onMenuEdit(menu);
                                      setDropdownOpen(null);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    role="menuitem"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onMenuDelete(menu);
                                      setDropdownOpen(null);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    role="menuitem"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(indexOfLastItem, filteredMenus.length)}
                      </span>{' '}
                      of <span className="font-medium">{filteredMenus.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                          }`}
                      >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>

                      {/* Page numbers */}
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        // Always show first page, last page, current page, and pages around current page
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        if (pageNum < 1 || pageNum > totalPages) return null;

                        return (
                          <button
                            key={pageNum}
                            onClick={() => paginate(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === pageNum
                              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                          }`}
                      >
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Grid View
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentMenus.map((menu) => (
              <div
                key={menu.id}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{menu.name}</h3>
                        {menu.isNew && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            New
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {menu.locationName || menu.location || 'No location'}
                      </p>
                      {/* <p className="mt-2 text-sm text-gray-500">
                        Updated {formatDate(menu.updatedAt)}
                      </p> */}
                      {/* <p className="mt-1 text-sm text-gray-500">
                        {menu.items?.length || 0} {menu.items?.length === 1 ? 'item' : 'items'}
                      </p> */}
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end relative z-10">
                    <div className="relative" ref={dropdownRef} style={{ position: 'relative', zIndex: dropdownOpen === `grid-${menu.id}` ? 1000 : 'auto' }}>
                      <button
                        type="button"
                        ref={(el) => setButtonRef(el, `grid-${menu.id}`)}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(`grid-${menu.id}`);
                        }}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        aria-haspopup="true"
                        aria-expanded={dropdownOpen === `grid-${menu.id}`}
                      >
                        <span className="sr-only">Open options</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>

                      {dropdownOpen === `grid-${menu.id}` && (
                        <div
                          className="origin-top-right fixed right-4 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <div className="py-1" role="none">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onMenuEdit(menu);
                                setDropdownOpen(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              role="menuitem"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onMenuSelect(menu)(e as unknown as Event);
                                setDropdownOpen(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              role="menuitem"
                            >
                              View
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onMenuDelete(menu);
                                setDropdownOpen(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              role="menuitem"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


       {/* Content Area */}
       <div className="mt-6">
        {filteredMenus.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
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
                strokeWidth={1}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No menus found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || locationFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by creating a new menu.'}
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={onCreateNew}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiPlus className="-ml-1 mr-2 h-4 w-4" />
                New Menu
              </button>
            </div>
          </div>
        ) : viewMode === 'list' ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {/* Table View */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Menu Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentMenus.map((menu) => (
                    <tr
                      key={menu.id}
                      onClick={(e) => handleRowClick(e as unknown as Event, menu)}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-medium">
                            {menu.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{menu.name}</div>
                            <div className="text-sm text-gray-500">
                              {menu.items?.length || 0} {menu.items?.length === 1 ? 'item' : 'items'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {menu.locationName || menu.location || 'No location'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(menu.updatedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-6">
                          {menu.isNew && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              New
                            </span>
                          )}
                          <div className="relative" ref={dropdownRef}>
                            <button
                              type="button"
                              ref={(el) => setButtonRef(el, menu.id)}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleDropdown(menu.id);
                              }}
                              className="text-gray-400 hover:text-gray-500 focus:outline-none"
                              aria-haspopup="true"
                              aria-expanded={dropdownOpen === menu.id}
                            >
                              <span className="sr-only">Open options</span>
                              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </button>

                            {dropdownOpen === menu.id && (
                              <div
                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                              >
                                <div className="py-1" role="none">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onMenuEdit(menu);
                                      setDropdownOpen(null);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    role="menuitem"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onMenuDelete(menu);
                                      setDropdownOpen(null);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    role="menuitem"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(indexOfLastItem, filteredMenus.length)}
                      </span>{' '}
                      of <span className="font-medium">{filteredMenus.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                          }`}
                      >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>

                      {/* Page numbers */}
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        // Always show first page, last page, current page, and pages around current page
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        if (pageNum < 1 || pageNum > totalPages) return null;

                        return (
                          <button
                            key={pageNum}
                            onClick={() => paginate(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === pageNum
                              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                          }`}
                      >
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Grid View
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentMenus.map((menu) => (
              <div
                key={menu.id}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{menu.name}</h3>
                        {menu.isNew && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            New
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {menu.locationName || menu.location || 'No location'}
                      </p>
                      {/* <p className="mt-2 text-sm text-gray-500">
                        Updated {formatDate(menu.updatedAt)}
                      </p> */}
                      {/* <p className="mt-1 text-sm text-gray-500">
                        {menu.items?.length || 0} {menu.items?.length === 1 ? 'item' : 'items'}
                      </p> */}
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end relative z-10">
                    <div className="relative" ref={dropdownRef} style={{ position: 'relative', zIndex: dropdownOpen === `grid-${menu.id}` ? 1000 : 'auto' }}>
                      <button
                        type="button"
                        ref={(el) => setButtonRef(el, `grid-${menu.id}`)}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(`grid-${menu.id}`);
                        }}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        aria-haspopup="true"
                        aria-expanded={dropdownOpen === `grid-${menu.id}`}
                      >
                        <span className="sr-only">Open options</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>

                      {dropdownOpen === `grid-${menu.id}` && (
                        <div
                          className="origin-top-right fixed right-4 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <div className="py-1" role="none">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onMenuEdit(menu);
                                setDropdownOpen(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              role="menuitem"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onMenuSelect(menu)(e as unknown as Event);
                                setDropdownOpen(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              role="menuitem"
                            >
                              View
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onMenuDelete(menu);
                                setDropdownOpen(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              role="menuitem"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuList;
