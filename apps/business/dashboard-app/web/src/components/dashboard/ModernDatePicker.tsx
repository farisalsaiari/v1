import { useState, useRef, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isSameMonth, addYears, subYears, getDay, subDays, startOfWeek, subWeeks, startOfYear, subYears as subYearsFn } from 'date-fns';
import { ChevronLeft, ChevronRight, X, Calendar as CalendarIcon } from 'lucide-react';

interface ModernDatePickerProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onClose: () => void;
}

const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const monthNames = Array.from({ length: 12 }, (_, i) =>
  format(new Date(0, i), 'MMMM')
);

export const ModernDatePicker = ({ selectedDate, onSelectDate, onClose }: ModernDatePickerProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(selectedDate));
  const [view, setView] = useState<'days' | 'months' | 'years'>('days');
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Navigation
  const handlePrev = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNext = () => {
    const nextMonth = addMonths(currentMonth, 1);
    // Don't allow navigating to future months
    if (!isAfterMonth(nextMonth, new Date())) {
      setCurrentMonth(nextMonth);
    }
  };

  // Helper function to check if a month is after current month
  const isAfterMonth = (date1: Date, date2: Date) => {
    return date1.getFullYear() > date2.getFullYear() ||
      (date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() > date2.getMonth());
  };

  const handleDateSelect = (date: Date) => {
    onSelectDate(date);
    onClose();
  };

  // Generate days for the current month view
  const generateDays = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const startDay = getDay(start) || 7; // Convert Sunday (0) to 7
    const days = eachDayOfInterval({ start, end });

    // Add empty cells for days before the 1st of the month
    const paddingDays = startDay - 1; // -1 because we want Monday as first day
    const paddedDays = [...Array(paddingDays).fill(null), ...days];

    return paddedDays;
  };

  // Render days view
  const renderDaysView = () => (
    <>
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setView('months')}
            className="px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
          >
            {format(currentMonth, 'MMMM')}
          </button>
          <button
            onClick={() => setView('years')}
            className="px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
          >
            {format(currentMonth, 'yyyy')}
          </button>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-3">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-xs font-medium text-center text-gray-500 py-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {generateDays().map((date, idx) => {
            if (!date) return <div key={`empty-${idx}`} className="h-8" />;

            const isSelected = isSameDay(date, selectedDate);
            const isTodayDate = isToday(date);
            const isCurrentMonth = isSameMonth(date, currentMonth);

            return (
              <button
                key={date.toString()}
                onClick={() => handleDateSelect(date)}
                disabled={!isCurrentMonth || isAfterMonth(date, new Date())}
                className={`h-8 w-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors
                  ${isSelected
                    ? 'bg-blue-600 text-white'
                    : isTodayDate
                      ? 'text-blue-600 font-semibold'
                      : !isCurrentMonth
                        ? 'text-gray-300'
                        : isAfterMonth(date, new Date())
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* <div className="p-3 border-t">
        <button
          onClick={() => handleDateSelect(new Date())}
          className="w-full py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md"
        >
          Today
        </button>
      </div> */}
    </>
  );

  // Render months view
  const renderMonthsView = () => (
    <div className="p-3">
      <div className="flex items-center justify-between mb-4 px-1">
        <button
          onClick={() => setView('years')}
          className="text-sm font-medium text-gray-700 hover:bg-gray-100 px-2 py-1 rounded"
        >
          {format(currentMonth, 'yyyy')}
        </button>
        <button
          onClick={() => setView('days')}
          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {monthNames.map((month, index) => (
          <button
            key={month}
            onClick={() => {
              const newDate = new Date(currentMonth);
              newDate.setMonth(index);
              setCurrentMonth(newDate);
              setView('days');
            }}
            disabled={isAfterMonth(new Date(currentMonth.getFullYear(), index), new Date())}
            className={`py-2 text-sm rounded-md ${index === currentMonth.getMonth()
              ? 'bg-blue-100 text-blue-700 font-medium'
              : isAfterMonth(new Date(currentMonth.getFullYear(), index), new Date())
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            {month.substring(0, 3)}
          </button>
        ))}
      </div>
    </div>
  );

  // Render years view
  const renderYearsView = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 2010;
    const years = Array.from(
      { length: currentYear - startYear + 1 },
      (_, i) => currentYear - i
    ).reverse();

    return (
      <div className="p-3">
        <div className="flex items-center justify-between mb-4 px-1">
          {/* <span className="text-sm font-medium text-gray-700">
            {years[0]} - {years[years.length - 1]}
          </span> */}
          <button
            onClick={() => setView('days')}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
          >
            {/* <X className="w-4 h-4" /> */}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => {
                const newDate = new Date(currentMonth);
                newDate.setFullYear(year);
                setCurrentMonth(newDate);
                setView('months');
              }}
              className={`py-2 text-sm rounded-md ${year === currentYear
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const quickSelections = [
    { label: 'Today', getDate: () => new Date() },
    { label: 'Yesterday', getDate: () => subDays(new Date(), 1) },
    { label: 'This week', getDate: () => startOfWeek(new Date()) },
    { label: 'Last week', getDate: () => startOfWeek(subWeeks(new Date(), 1)) },
    { label: 'This month', getDate: () => startOfMonth(new Date()) },
    { label: 'This year', getDate: () => startOfYear(new Date()) },
    { label: 'Last year', getDate: () => startOfYear(subYears(new Date(), 1)) },
  ];

  const handleQuickSelect = (getDate: () => Date) => {
    const date = getDate();
    onSelectDate(date);
    setCurrentMonth(startOfMonth(date));
    onClose();
  };

  return (
    <div
      ref={pickerRef}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden z-50 flex">
      {/* Quick Selection Panel */}
      <div className="w-40 border-r border-gray-200 items-center justify-center">
        {/* <div className="py-4 px-4 items-center justify-center text-[13px] border-b border-gray-200 bg-gray-100 font-semibold text-gray-500  tracking-wider">
          Quick Select
        </div> */}
        <div className="py-1">
          {quickSelections.map((item) => (
            <button
              key={item.label}
              onClick={() => handleQuickSelect(item.getDate)}
              className="w-full text-left px-4 font-medium py-2 text-[14px] text-gray-700 hover:bg-gray-100">
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar View */}
      <div className="w-60">
        {view === 'days' && renderDaysView()}
        {view === 'months' && renderMonthsView()}
        {view === 'years' && renderYearsView()}
      </div>
    </div>
  );
};
