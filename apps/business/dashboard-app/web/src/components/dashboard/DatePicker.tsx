import { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, isToday, isBefore, isAfter, addYears, subYears } from 'date-fns';

interface DatePickerProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onClose: () => void;
}

export function DatePicker({ selectedDate, onSelectDate, onClose }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(selectedDate);
  const [view, setView] = useState<'days' | 'months' | 'years'>('days');
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const startDay = monthStart.getDay();
  const daysFromPrevMonth = startDay === 0 ? 6 : startDay - 1;
  
  const prevMonthDays = daysFromPrevMonth > 0 
    ? eachDayOfInterval({
        start: subMonths(monthStart, 1),
        end: subMonths(monthStart, 1).setDate(daysFromPrevMonth)
      })
    : [];
  
  const allDays = [
    ...prevMonthDays.map(day => ({ date: day, isCurrentMonth: false })),
    ...daysInMonth.map(day => ({ date: day, isCurrentMonth: true }))
  ];

  const months = Array.from({ length: 12 }, (_, i) => new Date(2023, i, 1));
  const currentYear = currentMonth.getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

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

  const renderDaysView = () => (
    <div className="flex-1 pl-4 sm:pl-6 w-full min-w-0 max-w-full overflow-hidden">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center space-x-4">
          <button 
            type="button"
            onClick={handlePrevMonth}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-1.5">
            <button 
              onClick={() => setView('months')}
              className="px-2 py-1 text-sm font-medium text-gray-800 hover:bg-gray-100 rounded"
            >
              {format(currentMonth, 'MMM')}
            </button>
            <div className="text-gray-400">/</div>
            <button 
              onClick={() => setView('years')}
              className="px-2 py-1 text-sm font-medium text-gray-800 hover:bg-gray-100 rounded"
            >
              {format(currentMonth, 'yyyy')}
            </button>
          </div>
          <button 
            type="button"
            onClick={handleNextMonth}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-3 gap-x-1">
        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
          <div key={day} className="py-2 px-1 font-medium">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center text-sm font-medium gap-y-2 sm:gap-y-3 gap-x-1 sm:gap-x-2">
        {allDays.map(({ date, isCurrentMonth }, index) => {
          const isSelected = isSameDay(date, selectedDate);
          const isTodayDate = isToday(date);
          const isDisabled = !isCurrentMonth;
          
          return (
            <button
              key={index}
              type="button"
              onClick={() => isCurrentMonth && handleDateSelect(date)}
              disabled={isDisabled}
              className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full mx-auto transition-colors duration-150 text-sm sm:text-base aspect-square ${
                isSelected
                  ? 'bg-black text-white hover:bg-gray-800'
                  : isTodayDate
                  ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  : isDisabled
                  ? 'text-gray-300 cursor-default'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {format(date, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderMonthsView = () => (
    <div className="flex-1 pl-4 sm:pl-6 w-full min-w-0 max-w-full overflow-hidden">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setView('years')}
            className="px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-100 rounded"
          >
            {currentYear}
          </button>
          <button 
            onClick={() => setView('days')}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3 p-2">
        {months.map((month, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              const newDate = new Date(currentMonth);
              newDate.setMonth(index);
              setCurrentMonth(newDate);
              setView('days');
            }}
            className="py-2 text-sm font-medium rounded hover:bg-gray-100"
          >
            {format(month, 'MMM')}
          </button>
        ))}
      </div>
    </div>
  );

  const renderYearsView = () => (
    <div className="flex-1 pl-4 sm:pl-6 w-full min-w-0 max-w-full overflow-hidden">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center space-x-4">
          <span className="px-3 py-1.5 text-sm font-medium text-gray-800">
            {`${years[0]} - ${years[years.length - 1]}`}
          </span>
          <button 
            onClick={() => setView('days')}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 hover:text-gray-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3 p-2">
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
            className={`py-2 text-sm font-medium rounded hover:bg-gray-100 ${
              year === currentYear ? 'font-semibold text-blue-600' : ''
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-full md:max-w-4xl lg:max-w-5xl shadow-lg border border-gray-200">
      <div className="flex w-full">
        <div className="flex-shrink-0 flex flex-col space-y-1 text-xs font-medium pr-1.5 border-r border-gray-200 w-24 sm:w-28">
          <button 
            onClick={() => handleDateSelect(new Date())}
            className="text-left py-0.5 px-1 rounded hover:bg-gray-100 text-gray-800 text-xs whitespace-nowrap truncate"
          >
            Today
          </button>
          <button 
            onClick={() => {
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              handleDateSelect(yesterday);
            }}
            className="text-left py-0.5 px-1 rounded hover:bg-gray-100 text-gray-800 text-xs whitespace-nowrap truncate"
          >
            Yesterday
          </button>
          <button 
            onClick={() => {
              const startOfWeek = new Date();
              startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + (startOfWeek.getDay() === 0 ? -6 : 1));
              handleDateSelect(startOfWeek);
            }}
            className="text-left py-0.5 px-1 rounded hover:bg-gray-100 text-gray-800 text-xs whitespace-nowrap truncate"
          >
            This week
          </button>
          <button 
            onClick={() => {
              const startOfLastWeek = new Date();
              startOfLastWeek.setDate(startOfLastWeek.getDate() - startOfLastWeek.getDay() - 6);
              handleDateSelect(startOfLastWeek);
            }}
            className="text-left py-0.5 px-1 rounded hover:bg-gray-100 text-gray-800 text-xs whitespace-nowrap truncate"
          >
            Last week
          </button>
          <button 
            onClick={() => {
              const startOfMonth = new Date();
              startOfMonth.setDate(1);
              handleDateSelect(startOfMonth);
            }}
            className="text-left py-0.5 px-1 rounded hover:bg-gray-100 text-gray-800 text-xs whitespace-nowrap truncate"
          >
            This month
          </button>
          <button 
            onClick={() => {
              const startOfLastMonth = new Date();
              startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1, 1);
              handleDateSelect(startOfLastMonth);
            }}
            className="text-left py-0.5 px-1 rounded hover:bg-gray-100 text-gray-500 text-xs whitespace-nowrap truncate"
          >
            Last month
          </button>
          <button 
            onClick={() => {
              const startOfYear = new Date();
              startOfYear.setMonth(0, 1);
              handleDateSelect(startOfYear);
            }}
            className="text-left py-0.5 px-1 rounded hover:bg-gray-100 text-gray-500 text-xs whitespace-nowrap truncate"
          >
            This year
          </button>
          <button 
            onClick={() => {
              const startOfLastYear = new Date();
              startOfLastYear.setFullYear(startOfLastYear.getFullYear() - 1, 0, 1);
              handleDateSelect(startOfLastYear);
            }}
            className="text-left py-0.5 px-1 rounded hover:bg-gray-100 text-gray-500 text-xs whitespace-nowrap truncate"
          >
            Last year
          </button>
        </div>
        
        {view === 'days' && renderDaysView()}
        {view === 'months' && renderMonthsView()}
        {view === 'years' && renderYearsView()}
      </div>
    </div>
  );
}
