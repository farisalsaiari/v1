import { useState, useRef, useEffect } from 'preact/hooks'

interface HeaderProps {
    title: string
    subtitle?: string
    onToggleSidebar: () => void
    onToggleCollapse: () => void
    isCollapsed: boolean
}
export function Header({ title, subtitle, onToggleSidebar, onToggleCollapse, isCollapsed }: HeaderProps) {

    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    const toggleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen);
    };

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-white  border-gray-200  ">
            <div className="flex items-center justify-between h-[60px] px-3 sm:px-5">
                <div className="flex items-center gap-2 sm:gap-2">
                    <button
                        onClick={onToggleSidebar}
                        className="p-1.5 hover:bg-gray-100 rounded-lg lg:hidden">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <button
                        onClick={onToggleCollapse}
                        className="p-1.5 hover:bg-gray-100 rounded-lg hidden lg:block">
                        <svg className="w-5 h-5 text-gray-600" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <title>app-menu</title>
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="app-main-menu" fill="#919191" transform="translate(42.666667, 106.666667)">
                                    <path d="M3.55271368e-14,4.26325641e-14 L426.666667,4.26325641e-14 L426.666667,42.6666667 L3.55271368e-14,42.6666667 L3.55271368e-14,4.26325641e-14 Z M3.55271368e-14,128 L426.666667,128 L426.666667,170.666667 L3.55271368e-14,170.666667 L3.55271368e-14,128 Z M3.55271368e-14,256 L426.666667,256 L426.666667,298.666667 L3.55271368e-14,298.666667 L3.55271368e-14,256 Z" id="Combined-Shape">
                                    </path>
                                </g>
                            </g>
                        </svg>
                    </button>

                    <div className="flex items-center min-w-0">
                        <div className="">
                            <h1 className="text-[16px] sm:text-[17px] font-semibold text-gray-900 truncate">{title}</h1>
                            {/* <p className="text-xs sm:text-[12px] text-gray-500 truncate">{subtitle}</p> */}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 gap-2">
                        <button
                            className="p-2 hover:bg-gray-100 rounded-lg">
                            <svg className="w-[21px] h-[21px] sm:w-[23px] sm:h-[23px] text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>

                    {/* <div className="w-[34px] h-[34px] bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-blue-600 transition-colors">
                        <span className="text-white text-sm font-medium">FA</span>
                    </div> */}


                    <div className="relative" ref={userMenuRef}>
                        <button
                            onClick={toggleUserMenu}
                            className="hidden md:flex items-center focus:outline-none"
                            aria-label="User menu"
                        >
                            <div className="w-[34px] h-[34px] bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-blue-600 transition-colors">
                                U
                            </div>
                        </button>

                        {/* User Profile Dropdown */}
                        {userMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                                <div className="px-4 py-3 border-b border-gray-200">
                                    <p className="text-sm font-medium text-gray-900">User Name</p>
                                    <p className="text-xs text-gray-500">user@example.com</p>
                                </div>
                                <div className="py-1">
                                    <a
                                        href="#"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        user
                                        Profile
                                    </a>
                                    <a
                                        href="#"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >

                                        Settings
                                    </a>
                                    <a
                                        href="#"
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-200"
                                    >

                                        Sign out
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <div className="mx-3 border-t border-dashed border-gray-400 border-opacity-30" />

            {/* Search Modal */}


            {/* <div
        className="mx-4 h-px text-gray-400"
        style={{
          backgroundImage: 'radial-gradient(currentColor 4px, transparent 1px)',
          backgroundSize: '12px 1px',
          backgroundRepeat: 'repeat-x'
        }}
      /> */}
        </div>
    )

}