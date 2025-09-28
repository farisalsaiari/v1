import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, PopupModal } from '@b1/ui-shared';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChevronDown, ChevronUp, MoreHorizontal, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { DatePicker } from './DatePicker';
import { DatePicker2 } from './DatePicker2';
import { ModernDatePicker } from './ModernDatePicker';

interface HeaderProps {
    title: string
    icon?: string
}
// Sample chart data
const chartData = [
    { name: 'Jan', value: 4000, volume: 2400 },
    { name: 'Feb', value: 3000, volume: 1398 },
    { name: 'Mar', value: 5000, volume: 9800 },
    { name: 'Apr', value: 2780, volume: 3908 },
    { name: 'May', value: 4890, volume: 4800 },
    { name: 'Jun', value: 6390, volume: 3800 },
];

export function DashboardContent({ }: HeaderProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isActivityCollapsed, setIsActivityCollapsed] = useState(false);
    const [isBillsDropdownOpen, setIsBillsDropdownOpen] = useState(false);
    const [billsFilter, setBillsFilter] = useState('Closed');
    const [priorToDropdownOpen, setPriorToDropdownOpen] = useState(false);
    const [priorToOption, setPriorToOption] = useState('day');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateRange, setDateRange] = useState('Today');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setShowDatePicker(false);
    };

    const datePickerRef = useRef<HTMLDivElement>(null);
    const priorDropdownRef = useRef<HTMLDivElement>(null);
    const billsDropdownRef = useRef<HTMLDivElement>(null);

    // Close date picker when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
                setShowDatePicker(false);
            }
            if (priorDropdownRef.current && !priorDropdownRef.current.contains(event.target as Node)) {
                setPriorToDropdownOpen(false);
            }
            if (billsDropdownRef.current && !billsDropdownRef.current.contains(event.target as Node)) {
                setIsBillsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleConfirm = () => {
        console.log('Confirmed!');
        handleCloseModal();
    };

    // Mock data for dashboard cards
    const stats = [
        {
            title: 'Gross sales',
            value: '$45,231.89',
            change: '+20.1%',
            icon: 'DollarSign',
            iconColor: 'text-green-500',
        },
        {
            title: 'Transactions',
            value: '4',
            change: '+180.1%',
            icon: 'Users',
            iconColor: 'text-blue-500',
        },
        {
            title: 'Comps & discounts',
            value: '0',
            change: 'N/A',
            icon: 'BarChart3',
            iconColor: 'text-orange-500',
        },
        {
            title: 'Labour % of net sales',
            value: '12.43%',
            change: '+19%',
            icon: 'ShoppingBag',
            iconColor: 'text-purple-500',
        },
        {
            title: 'Average sale',
            value: '$573',
            change: '+201 since last hour',
            icon: 'BarChart3',
            iconColor: 'text-orange-500',
        },
        {
            title: 'New Feature',
            value: '0',
            change: 'N/A',
            icon: 'BarChart3',
            iconColor: 'text-gray-500',
            isUnknown: true
        }
    ];

    const [selected, setSelected] = useState(["ffff"]);
    const options = ["Heemeeh", "sedav", "sedav2"];

    const toggle = (value: string) => {
        setSelected(prev =>
            prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value]
        );
    };

    const allSelected = selected.length === options.length;
    const someSelected = selected.length > 0 && !allSelected;
    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
    const locationDropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target as Node)) {
                setIsLocationDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [locationDropdownRef]);



    return (
        <div className="flex flex-col flex-1 overflow-hidden">
            <main className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="hidden md:flex items-center justify-between mb-0">
                    <div className="mb-0">
                        <h2 className="text-[20px] font-semibold text-gray-800">Welcome back, Faris 👋</h2>
                        <p className="text-[13px] font-light text-gray-400 mb-2">Here's your content operations.</p>
                    </div>
                    {/* <Button
                        variant="bordered"
                        size="sm"
                        rounded={true}
                        onClick={handleOpenModal}
                        className="mb-2">
                        + Write content
                    </Button> */}
                </div>

                <div className="hidden md:block border-t border-gray-100 w-full mb-2 mt-3"></div>


                {/* Location Dropdown */}
                <div className="relative inline-block mb-3 ms-1 " ref={locationDropdownRef}>
                    <div className='flex items-baseline gap-2'>
                        <span className="text-[16px] md:text-[17px] font-semibold text-gray-400">Home:</span>
                        <button
                            className="flex items-center py-1.5 text-[16px] md:text-[17px] font-semibold text-gray-700 bg-white hover:text-blue-500 focus:outline-none"
                            onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}>
                            <span>
                                {selected.length === 0
                                    ? 'Select Location'
                                    : selected.length === options.length
                                        ? 'All locations'
                                        : selected.length === 1
                                            ? selected[0]
                                            : `${selected.length} locations`}
                            </span>
                            <svg
                                className={`w-4 h-4 ml-1.5 text-gray-400 transition-transform ${isLocationDropdownOpen ? 'transform rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>

                    {isLocationDropdownOpen && (
                        <div className="absolute z-10 left-0 w-56 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                            {/* Search */}
                            <div className="p-2 border-b">
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">
                                        🔍
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="w-full pl-8 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Options */}
                            <div className="divide-y max-h-60 overflow-auto">
                                {/* Select all */}
                                <label className="flex justify-between items-center px-3 py-2 cursor-pointer hover:bg-gray-50">
                                    <span className="text-sm font-medium">Select all</span>
                                    <input
                                        type="checkbox"
                                        checked={allSelected}
                                        ref={(el) => {
                                            if (el) el.indeterminate = someSelected;
                                        }}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            setSelected(allSelected ? [] : [...options]);
                                        }}
                                        className="w-4 h-4 accent-blue-600 cursor-pointer"
                                    />
                                </label>

                                {/* Each option */}
                                {options.map((opt) => (
                                    <label
                                        key={opt}
                                        className="flex justify-between items-center px-3 py-2 cursor-pointer hover:bg-gray-50"
                                    >
                                        <span className="text-sm">{opt}</span>
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(opt)}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                toggle(opt);
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                            className="w-4 h-4 accent-blue-600 cursor-pointer"
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>


                <div className="rounded-xl border border-gray-100 px-5 py-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-800">Performance</h2>
                        <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <div className="relative">
                                    <button
                                        type="button"
                                        className="flex items-center border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium bg-white hover:bg-gray-50 transition-colors h-10"
                                        onClick={() => setShowDatePicker(!showDatePicker)}
                                    >
                                        <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                                        <span className="font-semibold text-gray-800">{format(selectedDate, 'd MMM yyyy')}</span>
                                        <svg
                                            className={`w-4 h-4 ml-2 text-gray-400 transition-transform ${showDatePicker ? 'transform rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {showDatePicker && (
                                        <div className="absolute left-0 md:left-auto md:right-0 mt-1 z-50" ref={datePickerRef}>
                                            <div className="w-[calc(100vw-2rem)] sm:w-[400px] max-w-[85vw]">
                                                <ModernDatePicker
                                                    selectedDate={selectedDate}
                                                    onSelectDate={handleDateSelect}
                                                    onClose={() => setShowDatePicker(false)}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="relative" ref={priorDropdownRef}>
                                    <button
                                        className="flex items-center border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium bg-white hover:bg-gray-50 transition-colors h-10"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setPriorToDropdownOpen(!priorToDropdownOpen);
                                        }}
                                    >
                                        {/* <span className="text-gray-500">vs</span> */}
                                        <span className="font-semibold text-gray-800 ml-1">Prior to {priorToOption === 'day' ? 'day' : priorToOption === 'monday' ? 'Monday' : priorToOption === 'weeks' ? '4 weeks' : priorToOption === 'year' ? 'year' : '52 weeks'}</span>
                                        <svg
                                            className={`w-4 h-4 ml-2 text-gray-400 transition-transform ${priorToDropdownOpen ? 'transform rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {priorToDropdownOpen && (
                                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                            <button
                                                className={`block w-full text-left px-4 py-2 text-sm ${priorToOption === 'day' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                                                onClick={() => {
                                                    setPriorToOption('day');
                                                    setPriorToDropdownOpen(false);
                                                }}
                                            >
                                                <div className="font-medium">Prior to day</div>
                                                <div className="text-xs text-gray-500">Sun, 21 Sep</div>
                                            </button>
                                            <button
                                                className={`block w-full text-left px-4 py-2 text-sm ${priorToOption === 'monday' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                                                onClick={() => {
                                                    setPriorToOption('monday');
                                                    setPriorToDropdownOpen(false);
                                                }}
                                            >
                                                <div className="font-medium">Prior to Monday</div>
                                                <div className="text-xs text-gray-500">Mon, 15 Sep</div>
                                            </button>
                                            <button
                                                className={`block w-full text-left px-4 py-2 text-sm ${priorToOption === 'weeks' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                                                onClick={() => {
                                                    setPriorToOption('weeks');
                                                    setPriorToDropdownOpen(false);
                                                }}
                                            >
                                                <div className="font-medium">4 weeks prior</div>
                                                <div className="text-xs text-gray-500">Mon, 25 Aug</div>
                                            </button>
                                            <button
                                                className={`block w-full text-left px-4 py-2 text-sm ${priorToOption === 'fiftytwo_weeks' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                                                onClick={() => {
                                                    setPriorToOption('fiftytwo_weeks');
                                                    setPriorToDropdownOpen(false);
                                                }}
                                            >
                                                <div className="font-medium">52 weeks prior</div>
                                                <div className="text-xs text-gray-500">23 Sep 2024</div>
                                            </button>
                                            <button
                                                className={`block w-full text-left px-4 py-2 text-sm ${priorToOption === 'year' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                                                onClick={() => {
                                                    setPriorToOption('year');
                                                    setPriorToDropdownOpen(false);
                                                }}
                                            >
                                                <div className="font-medium">Prior to year</div>
                                                <div className="text-xs text-gray-500">22 Sep 2024</div>
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="relative" ref={billsDropdownRef}>
                                    <button
                                        className="flex items-center border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium bg-white hover:bg-gray-50 transition-colors h-10"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsBillsDropdownOpen(!isBillsDropdownOpen);
                                        }}
                                    >
                                        <span className="text-gray-500">Bills:</span>
                                        <span className="font-semibold text-gray-800 ml-1">{billsFilter}</span>
                                        <svg
                                            className={`w-4 h-4 ml-2 text-gray-400 transition-transform ${isBillsDropdownOpen ? 'transform rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {isBillsDropdownOpen && (
                                        <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                            {['All', 'Open', 'Closed'].map((option) => (
                                                <button
                                                    key={option}
                                                    className={`block w-full text-left px-4 py-2 text-sm ${billsFilter === option ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                                                    onClick={() => {
                                                        setBillsFilter(option);
                                                        setIsBillsDropdownOpen(false);
                                                    }}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-0 items-start mb-3'>
                        <div className="w-full md:w-auto">
                            <div className="flex flex-col px-4 py-2 rounded-lg">
                                <div className="text-sm font-medium text-gray-500 mb-1">Net sales</div>
                                <div className="flex items-baseline">
                                    <span className="text-2xl font-bold text-gray-900">US$0.00</span>
                                    <span className="ml-2 text-sm font-medium text-gray-500">0.00%</span>
                                </div>
                                <div className="mt-2 flex items-center text-xs">
                                    <span className="text-gray-500">vs prior day:</span>
                                    <span className="ml-1 font-medium text-green-600">US$0.00 (0.00%)</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex-1">
                            <div className="w-full h-40">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={[
                                            { time: '8 AM', today: 0, yesterday: 0 },
                                            { time: '9 AM', today: 150, yesterday: 100 },
                                            { time: '10 AM', today: 300, yesterday: 250 },
                                            { time: '11 AM', today: 450, yesterday: 400 },
                                            { time: '12 PM', today: 300, yesterday: 500 },
                                            { time: '1 PM', today: 600, yesterday: 400 },
                                            { time: '2 PM', today: 700, yesterday: 450 },
                                        ]}
                                        margin={{ top: 15, right: 15, left: 0, bottom: 0 }}
                                    >
                                        <defs>
                                            <linearGradient id="todayColor" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.1} />
                                                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="yesterdayColor" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#9CA3AF" stopOpacity={0.1} />
                                                <stop offset="100%" stopColor="#9CA3AF" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            vertical={false}
                                            stroke="#F3F4F6"
                                        />
                                        <XAxis
                                            dataKey="time"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: '#6B7280' }}
                                            tickMargin={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={false}
                                            width={0}
                                            domain={[0, 'dataMax + 100']}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'white',
                                                borderRadius: '6px',
                                                border: '1px solid #E5E7EB',
                                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                                padding: '8px 12px',
                                                fontSize: '12px',
                                                fontWeight: 500,
                                            }}
                                            labelStyle={{
                                                color: '#4B5563',
                                                fontSize: '12px',
                                                fontWeight: 600,
                                                marginBottom: '4px',
                                            }}
                                            formatter={(value, name) => {
                                                const isToday = name === 'today';
                                                return [
                                                    <span className="text-gray-900 font-medium">${value}</span>,
                                                    <span className={`inline-flex items-center ${isToday ? 'text-blue-600' : 'text-gray-500'}`}>
                                                        {isToday ? 'Today' : 'Yesterday'}
                                                    </span>
                                                ];
                                            }}
                                            labelFormatter={(label) => `Time: ${label}`}
                                        />
                                        <ReferenceLine y={0} stroke="#E5E7EB" />
                                        <Area
                                            name="Today"
                                            type="monotone"
                                            dataKey="today"
                                            stroke="#3B82F6"
                                            strokeWidth={2}
                                            fillOpacity={1}
                                            fill="url(#todayColor)"
                                            dot={false}
                                            activeDot={{
                                                r: 4,
                                                stroke: '#fff',
                                                strokeWidth: 2,
                                                fill: '#3B82F6',
                                            }}
                                            animationDuration={800}
                                            animationEasing="ease-out"
                                        />
                                        <Area
                                            name="Yesterday"
                                            type="monotone"
                                            dataKey="yesterday"
                                            stroke="#9CA3AF"
                                            strokeWidth={2}
                                            strokeDasharray="4 2"
                                            fillOpacity={1}
                                            fill="url(#yesterdayColor)"
                                            dot={false}
                                            activeDot={{
                                                r: 4,
                                                stroke: '#fff',
                                                strokeWidth: 2,
                                                fill: '#9CA3AF',
                                            }}
                                            animationDuration={800}
                                            animationEasing="ease-out"
                                            animationBegin={150}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex justify-end space-x-4 text-xs mt-4">
                                <span className="flex items-center bg-blue-50 px-3 py-1.5 rounded-md">
                                    <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                                    <span className="font-medium text-blue-700">Today</span>
                                </span>
                                <span className="flex items-center bg-gray-50 px-3 py-1.5 rounded-md">
                                    <span className="inline-block w-3 h-3 rounded-full border-2 border-gray-400 mr-2"></span>
                                    <span className="font-medium text-gray-600">Yesterday</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full border-t border-gray-200 my-0" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1 py-0">
                        {stats.map((stat, index) => {
                            const isFirstInRow = index === 0;
                            const isFirstInMdRow = index % 2 === 0;
                            const isFirstInLgRow = index % 3 === 0;

                            return (
                                <div key={index} className="relative">
                                    {/* Vertical separator for md screens (2 columns) */}
                                    {!isFirstInMdRow && index > 0 && (
                                        <div className="hidden md:block lg:hidden absolute left-[-16px] top-1/2 h-1/2 w-px bg-gray-200 -translate-y-1/2"></div>
                                    )}
                                    {/* Vertical separator for lg screens (3 columns) */}
                                    {!isFirstInLgRow && index > 0 && (
                                        <div className="hidden lg:block absolute left-[-16px] top-1/2 h-1/2 w-px bg-gray-200 -translate-y-1/2"></div>
                                    )}
                                    {/* Horizontal separator for mobile */}
                                    {index > 0 && (
                                        <div className="md:hidden absolute top-0 left-0 w-full h-px bg-gray-200 -translate-y-1/2"></div>
                                    )}
                                    <div className={`bg-white py-3 px-4 hover:bg-blue-100 hover:bg-opacity-40 cursor-pointer rounded-md mt-2 
                                        ${isFirstInMdRow ? 'md:border-l-0' : ''} 
                                        ${isFirstInLgRow ? 'lg:border-l-0' : ''}`}>
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                                        </div>
                                        <div className="mt-2">
                                            {stat.isUnknown ? (
                                                <>
                                                    <div className="text-[18px] font-bold">0</div>
                                                    <div className="text-xs mt-1 text-gray-400 bg-gray-100 inline-flex items-center px-2 py-0.5 rounded-full">
                                                        ▲ N/A
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="text-[18px] font-bold">{stat.value}</p>
                                                    <p className={`text-[13px] mt-0 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                                        {stat.change} {stat.title === 'Active Now' ? '' : 'vs last month'}
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>



                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
                    {/* Total Revenue Widget */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                                <p className="text-xs text-gray-400">12 January 2024 - 12 January 2025</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-green-500">↑ 18.45%</span>
                                <span className="text-sm text-gray-500">vs last year</span>
                            </div>
                        </div>

                        <div className="flex items-baseline mb-6">
                            <span className="text-2xl font-bold text-gray-800">$58,587.32</span>
                        </div>

                        <div className="h-24 mb-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={chartData}
                                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                                >
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#3B82F6"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorRevenue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Avg. Occupancy Rate</p>
                                <p className="text-sm font-medium">93%</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">On-Time Payments</p>
                                <p className="text-sm font-medium">88%</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Maintenance</p>
                                <p className="text-sm font-medium">0.72</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Tenants</p>
                                <p className="text-sm font-medium">82/100</p>
                            </div>
                        </div>
                    </div>

                    {/* Banking Widget */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Banking</h3>
                                <p className="text-xs text-gray-400">Available Balance</p>
                            </div>
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9m3-9l-6-2m0 0l-3 9m3-9l3-1m0 0l3 1m-3-1l-3 9" />
                                </svg>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-3xl font-bold text-gray-800">$875.00</p>
                            <div className="flex items-center mt-2">
                                <span className="text-xs text-green-500 font-medium bg-green-50 px-2 py-1 rounded-full">
                                    +2.5% from last month
                                </span>
                            </div>
                        </div>

                        <div className="h-24 mb-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={chartData}
                                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                                >
                                    <defs>
                                        <linearGradient id="colorBanking" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#10B981" stopOpacity={0.05} />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#10B981"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorBanking)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Income</p>
                                <p className="text-sm font-medium text-green-600">$1,250.00</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Expenses</p>
                                <p className="text-sm font-medium text-red-600">$375.00</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Savings</p>
                                <p className="text-sm font-medium text-blue-600">15%</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Restaurant POS Metrics Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-4">
                    {/* Today's Sales */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-500">Today's Sales</h3>
                            <div className="p-2 bg-green-50 rounded-lg">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-baseline">
                            <span className="text-2xl font-bold text-gray-800">$2,845</span>
                            <span className="ml-2 text-sm font-medium text-green-500">+12.5%</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">vs. yesterday</p>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>Orders: 87</span>
                                <span>Avg. Order: $32.70</span>
                            </div>
                        </div>
                    </div>

                    {/* Top Selling Items */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-500">Top Sellers</h3>
                            <div className="p-2 bg-purple-50 rounded-lg">
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {[
                                { name: 'Cappuccino', sales: 42, revenue: '$315' },
                                { name: 'Avocado Toast', sales: 28, revenue: '$196' },
                                { name: 'Iced Latte', sales: 35, revenue: '$175' }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{item.name}</p>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                            <div
                                                className="bg-purple-600 h-1.5 rounded-full"
                                                style={{ width: `${(item.sales / 42) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <span className="ml-2 text-sm font-medium text-gray-700">{item.sales}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Table Status */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-500">Table Status</h3>
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="text-center p-2 bg-green-50 rounded-lg">
                                <p className="text-2xl font-bold text-green-600">8</p>
                                <p className="text-xs text-gray-500">Available</p>
                            </div>
                            <div className="text-center p-2 bg-amber-50 rounded-lg">
                                <p className="text-2xl font-bold text-amber-600">5</p>
                                <p className="text-xs text-gray-500">Occupied</p>
                            </div>
                            <div className="text-center p-2 bg-red-50 rounded-lg">
                                <p className="text-2xl font-bold text-red-600">2</p>
                                <p className="text-xs text-gray-500">Needs Cleaning</p>
                            </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Total Tables: 15</span>
                                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                                    View All
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Staff On Duty */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-500">Staff On Duty</h3>
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {[
                                { name: 'Alex Johnson', role: 'Manager', status: 'active' },
                                { name: 'Jamie Smith', role: 'Barista', status: 'active' },
                                { name: 'Taylor Wilson', role: 'Server', status: 'break' },
                                { name: 'Jordan Lee', role: 'Chef', status: 'active' }
                            ].map((staff, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="flex-shrink-0 h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm">
                                        {staff.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="ml-3 flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 truncate">{staff.name}</p>
                                        <div className="flex items-center">
                                            <span className="text-xs text-gray-500">{staff.role}</span>
                                            {staff.status === 'break' && (
                                                <span className="ml-2 px-1.5 py-0.5 text-xxs font-medium bg-amber-100 text-amber-800 rounded-full">
                                                    On Break
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className={`h-2.5 w-2.5 rounded-full ${staff.status === 'active' ? 'bg-green-500' : 'bg-amber-400'}`}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {/* Total Revenue Card */}
                    <div className="bg-white rounded-lg border border-gray-100 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">$48,569</p>
                                <div className="flex items-center mt-1">
                                    <span className="text-xs font-medium text-green-500 flex items-center">
                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M12 7a1 1 0 01.707.293l4 4a1 1 0 01-1.414 1.414L13 9.414V17a1 1 0 11-2 0V9.414l-2.293 2.293a1 1 0 01-1.414-1.414l4-4A1 1 0 0112 7z" clipRule="evenodd" />
                                        </svg>
                                        12.5%
                                    </span>
                                    <span className="text-xs text-gray-500 ml-1">vs last month</span>
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-blue-50">
                                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* New Users Card */}
                    <div className="bg-white rounded-lg border border-gray-100 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">New Users</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">1,284</p>
                                <div className="flex items-center mt-1">
                                    <span className="text-xs font-medium text-green-500 flex items-center">
                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M12 7a1 1 0 01.707.293l4 4a1 1 0 01-1.414 1.414L13 9.414V17a1 1 0 11-2 0V9.414l-2.293 2.293a1 1 0 01-1.414-1.414l4-4A1 1 0 0112 7z" clipRule="evenodd" />
                                        </svg>
                                        8.2%
                                    </span>
                                    <span className="text-xs text-gray-500 ml-1">vs last month</span>
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-green-50">
                                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Tasks Completed */}
                    <div className="bg-white rounded-lg border border-gray-100 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Tasks Completed</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">342</p>
                                <div className="flex items-center mt-1">
                                    <span className="text-xs font-medium text-green-500 flex items-center">
                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M12 7a1 1 0 01.707.293l4 4a1 1 0 01-1.414 1.414L13 9.414V17a1 1 0 11-2 0V9.414l-2.293 2.293a1 1 0 01-1.414-1.414l4-4A1 1 0 0112 7z" clipRule="evenodd" />
                                        </svg>
                                        5.3%
                                    </span>
                                    <span className="text-xs text-gray-500 ml-1">vs last week</span>
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-purple-50">
                                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Active Projects */}
                    <div className="bg-white rounded-lg border border-gray-100 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Active Projects</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">24</p>
                                <div className="flex items-center mt-1">
                                    <span className="text-xs font-medium text-red-500 flex items-center">
                                        <svg className="w-3 h-3 mr-1 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M12 7a1 1 0 01.707.293l4 4a1 1 0 01-1.414 1.414L13 9.414V17a1 1 0 11-2 0V9.414l-2.293 2.293a1 1 0 01-1.414-1.414l4-4A1 1 0 0112 7z" clipRule="evenodd" />
                                        </svg>
                                        2.1%
                                    </span>
                                    <span className="text-xs text-gray-500 ml-1">vs last month</span>
                                </div>
                            </div>
                            <div className="p-3 rounded-lg bg-amber-50">
                                <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Feed */}
                <div className="bg-white rounded-lg border border-gray-100 p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
                        <div className="flex items-center">
                            <button
                                onClick={() => setIsActivityCollapsed(!isActivityCollapsed)}
                                className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 mr-2"
                            >
                                {/* {isActivityCollapsed ? 'Show' : 'Hide'} Activity */}
                                <svg
                                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${isActivityCollapsed ? 'transform rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
                        </div>
                    </div>
                    <div className={`space-y-4 transition-all duration-300 overflow-hidden ${isActivityCollapsed ? 'max-h-0' : 'max-h-[500px]'}`}>
                        {[
                            {
                                id: 1,
                                user: 'Sarah Johnson',
                                action: 'uploaded a new document',
                                time: '2 mins ago',
                                avatar: 'SJ',
                                color: 'bg-purple-100 text-purple-600',
                                link: '/documents/doc-123',
                                linkText: ''
                            },
                            {
                                id: 2,
                                user: 'Mike Chen',
                                action: 'commented on Project X',
                                time: '1 hour ago',
                                avatar: 'MC',
                                color: 'bg-blue-100 text-blue-600',
                                link: '/projects/project-x#comments',
                                linkText: ''
                            },
                            {
                                id: 3,
                                user: 'Alex Morgan',
                                action: 'completed the website redesign',
                                time: '3 hours ago',
                                avatar: 'AM',
                                color: 'bg-green-100 text-green-600',
                                completed: true,
                                link: '/projects/website-redesign',
                                linkText: ''
                            },
                            {
                                id: 4,
                                user: 'Team',
                                action: 'scheduled a meeting for tomorrow',
                                time: '5 hours ago',
                                avatar: 'T',
                                color: 'bg-amber-100 text-amber-600',
                                link: '/calendar',
                                linkText: ''
                            },
                            {
                                id: 5,
                                user: 'System',
                                action: 'new update available',
                                time: '1 day ago',
                                avatar: 'S',
                                color: 'bg-gray-100 text-gray-600',
                                system: true,
                                link: '/settings/updates',
                                linkText: ''
                            },
                        ].map((activity) => (
                            <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center font-medium ${activity.color} ${activity.system ? 'text-lg' : 'text-sm'}`}>
                                    {activity.avatar}
                                </div>
                                <div className="ml-3 flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Link
                                                to={activity.link}
                                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                            >
                                                {activity.user}
                                            </Link>
                                            {activity.completed && (
                                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                    Completed
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-xs text-gray-500">{activity.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-0.5">
                                        {activity.action}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Locations Table */}
                <div className="p-6 bg-white rounded-lg shadow-md mt-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Locations</h2>
                        <div className="flex items-center border border-gray-300 rounded px-3 py-1.5 bg-white">
                            <svg
                                className="w-5 h-5 text-gray-400 mr-2"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search"
                                className="bg-white placeholder-gray-400 text-sm focus:outline-none"
                            />
                        </div>
                    </div>

                    <table className="w-full text-sm text-gray-800">
                        <thead>
                            <tr className="text-gray-500 border-b">
                                <th className="text-left py-2">Name <span className="text-gray-300">↑↓</span></th>
                                <th className="text-left py-2">Net sales <span className="text-gray-300">↑↓</span></th>
                                <th className="text-left py-2">Transactions <span className="text-gray-300">↑↓</span></th>
                                <th className="text-left py-2">Labour % <span className="text-gray-300">↑↓</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="py-3">Heemeeh</td>

                                <td>
                                    <div className="font-medium">US$0.00</div>
                                    <div className="text-xs text-gray-500 flex items-center">▲ N/A</div>
                                </td>
                                <td>
                                    <div className="font-medium">0</div>
                                    <div className="text-xs text-gray-500 flex items-center">▲ N/A</div>
                                </td>
                                <td>
                                    <div className="font-medium">0.00%</div>
                                    <div className="text-xs text-gray-500 flex items-center">▲ N/A</div>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3">ffff</td>
                                <td>
                                    <div className="font-medium">US$0.00</div>
                                    <div className="text-xs text-gray-500 flex items-center">▲ N/A</div>
                                </td>
                                <td>
                                    <div className="font-medium">0</div>
                                    <div className="text-xs text-gray-500 flex items-center">▲ N/A</div>
                                </td>
                                <td>
                                    <div className="font-medium">0.00%</div>
                                    <div className="text-xs text-gray-500 flex items-center">▲ N/A</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="flex items-center justify-between mt-6">
                        <div>
                            <button className="border border-gray-300 rounded px-4 py-1.5 text-sm text-gray-600">
                                Results per page <span className="text-black font-semibold ml-1">10</span>
                            </button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="text-gray-400 bg-gray-100 rounded px-2 py-1">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <span className="text-sm text-gray-600 border border-gray-300 rounded px-3 py-1">
                                Page <span className="font-semibold text-black">1</span> of <span className="text-black">1</span>
                            </span>
                            <button className="text-gray-400 bg-gray-100 rounded px-2 py-1">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Key Metrics Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
                    {/* Quick Stats Widget */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-500">Quick Stats</h3>
                            <div className="p-2 bg-purple-50 rounded-lg">
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Avg. Daily Revenue</span>
                                <span className="text-sm font-medium">$2,450</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Active Projects</span>
                                <span className="text-sm font-medium">12</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Tasks Completed</span>
                                <span className="text-sm font-medium">87%</span>
                            </div>
                        </div>
                    </div>

                    {/* Performance Widget */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-500">Performance</h3>
                            <div className="p-2 bg-amber-50 rounded-lg">
                                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">This Month</span>
                                    <span className="font-medium">$24,500</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Last Month</span>
                                    <span className="font-medium">$18,750</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Transactions Widget */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-500">Recent Transactions</h3>
                            <div className="p-2 bg-green-50 rounded-lg">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {[
                                { id: 1, name: 'Payment Received', amount: '+$1,250', status: 'Completed', time: '2h ago', icon: '💰' },
                                { id: 2, name: 'Office Supplies', amount: '-$89.99', status: 'Pending', time: '5h ago', icon: '🖊️' },
                                { id: 3, name: 'Subscription Renewal', amount: '-$29.99', status: 'Completed', time: '1d ago', icon: '🔄' },
                            ].map((tx) => (
                                <div key={tx.id} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <span className="mr-3 text-lg">{tx.icon}</span>
                                        <div>
                                            <p className="text-sm font-medium">{tx.name}</p>
                                            <p className="text-xs text-gray-500">{tx.time} • <span className={tx.status === 'Completed' ? 'text-green-500' : 'text-amber-500'}>{tx.status}</span></p>
                                        </div>
                                    </div>
                                    <span className={`text-sm font-medium ${tx.amount.startsWith('+') ? 'text-green-600' : 'text-gray-800'}`}>
                                        {tx.amount}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-4">
                    {/* Revenue Chart */}
                    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-800">Revenue Overview</h3>
                                <div className="flex items-center space-x-3">
                                    <span className="flex items-center text-xs text-gray-500">
                                        <span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span>
                                        Revenue
                                    </span>
                                    <span className="flex items-center text-xs text-gray-500">
                                        <span className="w-2 h-2 rounded-full bg-green-100 mr-1.5"></span>
                                        Target
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-b-lg">
                            <div className="h-48 flex items-end justify-between px-4 pt-4">
                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((month, i) => {
                                    const revenue = Math.floor(20 + Math.random() * 80);
                                    return (
                                        <div key={month} className="flex flex-col items-center h-full">
                                            <div className="flex items-end h-full w-5 space-x-0.5">
                                                <div
                                                    className="w-2.5 bg-blue-500 rounded-t-sm"
                                                    style={{ height: `${revenue}%` }}
                                                ></div>
                                                <div
                                                    className="w-2.5 bg-green-100 rounded-t-sm"
                                                    style={{ height: `${Math.max(20, revenue * 0.8 + Math.random() * 20)}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-gray-500 mt-2">{month}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="p-4 pt-6 border-t border-gray-100 mt-auto">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 p-3 rounded-lg border border-blue-100">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs font-medium text-blue-600">TOTAL REVENUE</p>
                                            <div className="flex items-center bg-blue-100 text-blue-600 text-[10px] font-medium px-1.5 py-0.5 rounded">
                                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M12 7a1 1 0 01.707.293l4 4a1 1 0 01-1.414 1.414L13 9.414V17a1 1 0 11-2 0V9.414l-2.293 2.293a1 1 0 01-1.414-1.414l4-4A1 1 0 0112 7z" clipRule="evenodd" />
                                                </svg>
                                                12.5%
                                            </div>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-800 mt-1">$48,569</p>
                                        <p className="text-xs text-gray-500 mt-1">From $43,200 last month</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-gray-50 to-gray-50/50 p-3 rounded-lg border border-gray-100">
                                        <p className="text-xs font-medium text-gray-500">TARGET</p>
                                        <p className="text-2xl font-bold text-gray-800 mt-1">$52,000</p>
                                        <div className="flex items-center mt-1">
                                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '93.4%' }}></div>
                                            </div>
                                            <span className="text-xs text-green-500 font-medium ml-2">+7.1%</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">$3,431 to target</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* User Activity Chart */}
                    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-800">User Activity</h3>
                                <div className="flex items-center space-x-3">
                                    <span className="flex items-center text-xs text-gray-500">
                                        <span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span>
                                        This Week
                                    </span>
                                    <span className="flex items-center text-xs text-gray-500">
                                        <span className="w-2 h-2 rounded-full bg-gray-200 mr-1.5"></span>
                                        Last Week
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-b-lg">
                            <div className="h-48 flex items-end justify-between px-4 pt-4">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                                    <div key={day} className="flex flex-col items-center h-full">
                                        <div className="flex items-end h-full w-5 space-x-0.5">
                                            <div
                                                className="w-2.5 bg-blue-100 rounded-t-sm"
                                                style={{ height: `${Math.max(20, Math.random() * 100)}%` }}
                                            ></div>
                                            <div
                                                className="w-2.5 bg-gray-100 rounded-t-sm"
                                                style={{ height: `${Math.max(10, Math.random() * 90)}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-500 mt-2">{day}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 pt-6 border-t border-gray-100 mt-auto">
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                                        <p className="text-gray-500 text-xs">Active Users</p>
                                        <p className="text-sm font-semibold text-gray-800">1,234</p>
                                    </div>
                                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                                        <p className="text-gray-500 text-xs">Weekly Growth</p>
                                        <p className="text-sm font-semibold text-green-500">+12.5%</p>
                                    </div>
                                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                                        <p className="text-gray-500 text-xs">Total Visits</p>
                                        <p className="text-sm font-semibold text-gray-800">4.2m</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <PopupModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Confirm Action"
                width="55%"
                position="top"
                animation="slide"
                showCloseButton={true}
                closeOnOverlayClick={true}
                closeOnEscape={true}
                showCancelButton={true}
                showConfirmButton={true}
                onConfirm={handleConfirm}
                buttonAlignment="left"
                confirmButtonVariant="primary">
                <p>Are you sure you want to proceed?</p>
            </PopupModal>
        </div>
    );

}