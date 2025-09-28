import { useState, useEffect, useRef } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, isToday, isBefore, isAfter, addYears, subYears, getDay } from 'date-fns';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface DatePicker2Props {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onClose: () => void;
}

export const DatePicker2 = ({ selectedDate, onSelectDate, onClose }: DatePicker2Props) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(selectedDate));
  const [view, setView] = useState<'days' | 'months' | 'years'>('days');
  const [isVisible, setIsVisible] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const currentYear = currentMonth.getFullYear();
  const currentMonthName = format(currentMonth, 'MMMM');
  
  // Generate days for the current month view
  const allDays = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  // Add padding days to start the week on Monday
  const startDay = getDay(startOfMonth(currentMonth));
  const paddingDays = startDay === 0 ? 6 : startDay - 1; // Convert Sunday (0) to 6, Monday (1) to 0, etc.
  const paddedDays = [
    ...Array(paddingDays).fill(null),
    ...allDays
  ];

  // Generate years for the years view (20-year range, 10 before and 10 after current year)
  const years = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i);
  const months = Array.from({ length: 12 }, (_, i) => new Date(currentYear, i, 1));

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateSelect = (date: Date) => {
    onSelectDate(date);
    onClose();
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const renderDaysView = () => (
    <div className="w-full">
      {/* Header with month/year and navigation */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setView('months')}
            className="text-sm font-medium text-gray-800 hover:bg-gray-100 px-2 py-1 rounded"
          >
            {currentMonthName}
          </button>
          <button 
            onClick={() => setView('years')}
            className="text-sm font-medium text-gray-800 hover:bg-gray-100 px-2 py-1 rounded"
          >
            {currentYear}
          </button>
        </div>
        <div className="flex items-center space-x-1">
          <button 
            onClick={handlePrevMonth}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={handleNextMonth}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 text-center text-xs text-gray-500 py-2">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day} className="py-1 font-medium">{day}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 text-center text-sm">
        {paddedDays.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="h-10" />;
          }
          
          const isSelected = isSameDay(date, selectedDate);
          const isTodayDate = isToday(date);
          const isCurrentMonth = isSameMonth(date, currentMonth);
          
          return (
            <button
              key={date.toString()}
              type="button"
              onClick={() => isCurrentMonth && handleDateSelect(date)}
              disabled={!isCurrentMonth}
              className={`h-10 flex items-center justify-center mx-auto transition-colors duration-150 relative
                ${isSelected 
                  ? 'bg-blue-600 text-white rounded-full w-10' 
                  : isTodayDate 
                    ? 'font-semibold text-blue-600' 
                    : !isCurrentMonth 
                      ? 'text-gray-300' 
                      : 'text-gray-700 hover:bg-gray-100 rounded-full w-10'}`}
            >
              {date.getDate()}
              {isTodayDate && !isSelected && (
                <span className="absolute bottom-1 w-1 h-1 bg-blue-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="p-3 border-t">
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => handleDateSelect(new Date())}
            className="px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded"
          >
            Today
          </button>
          <button 
            onClick={onClose}
            className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const renderMonthsView = () => (
    <div className="w-full p-3">
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => setView('years')}
          className="text-sm font-medium text-gray-800 hover:bg-gray-100 px-3 py-1.5 rounded"
        >
          {currentYear}
        </button>
        <button 
          onClick={() => setView('days')}
          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {months.map((month) => {
          const monthName = format(month, 'MMM');
          const isCurrent = isSameMonth(month, currentMonth);
          return (
            <button
              key={monthName}
              type="button"
              onClick={() => {
                setCurrentMonth(month);
                setView('days');
              }}
              className={`py-2.5 text-sm rounded transition-colors ${
                isCurrent 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {monthName}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderYearsView = () => (
    <div className="w-full p-3">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-800 px-3 py-1.5">
          {`${years[0]} - ${years[years.length - 1]}`}
        </span>
        <button 
          onClick={() => setView('days')}
          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {years.map((year) => (
          <button
            key={year}
            type="button"
            onClick={() => {
              const newDate = new Date(currentMonth);
              newDate.setFullYear(year);
              setCurrentMonth(newDate);
              setView('months');
            }}
            className={`py-2 text-sm rounded transition-colors ${
              year === currentYear 
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

  return (
    <div 
      ref={pickerRef}
      className="bg-white rounded-lg shadow-xl border border-gray-200 w-full max-w-xs overflow-hidden"
    >
      {view === 'days' && renderDaysView()}
      {view === 'months' && renderMonthsView()}
      {view === 'years' && renderYearsView()}
    </div>
  );
};
