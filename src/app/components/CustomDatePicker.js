"use client";
import { useState, useRef, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from '@heroicons/react/24/outline';

const CustomDatePicker = ({ value, onChange, label, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  const pickerRef = useRef(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
      setCurrentMonth(new Date(value));
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onChange(date.toISOString().split('T')[0]);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const formatDisplayDate = (date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const isToday = (date) => {
    const today = new Date();
    return date && date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return selectedDate && date && date.toDateString() === selectedDate.toDateString();
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className={`relative ${className}`} ref={pickerRef}>
      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
        <CalendarIcon className="w-4 h-4 text-indigo-600" />
        {label}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 sm:px-5 py-2.5 sm:py-4 text-left bg-white border-2 border-indigo-200 rounded-xl shadow-sm hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
      >
        <div className="flex items-center justify-between">
          <span className={`text-sm sm:text-base lg:text-lg ${selectedDate ? 'text-gray-900' : 'text-gray-500'}`}>
            {selectedDate ? formatDisplayDate(selectedDate) : 'Select date'}
          </span>
          <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-indigo-600 flex-shrink-0" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-auto min-w-full sm:w-80 lg:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-5 lg:p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 sm:p-2 lg:p-3 hover:bg-white/20 rounded-lg transition-colors duration-150"
            >
              <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </button>
            
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 sm:p-2 lg:p-3 hover:bg-white/20 rounded-lg transition-colors duration-150"
            >
              <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </button>
          </div>

          {/* Week days */}
          <div className="grid grid-cols-7 gap-0.5 sm:gap-1 lg:gap-1 p-1.5 sm:p-2 lg:p-2 bg-gray-50">
            {weekDays.map((day) => (
              <div key={day} className="p-1 sm:p-1.5 lg:p-2 text-center text-xs sm:text-sm lg:text-sm font-semibold text-gray-600">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-0.5 sm:gap-1 lg:gap-1 p-1.5 sm:p-2 lg:p-2">
            {days.map((day, index) => {
              if (!day) {
                return <div key={index} className="p-1 sm:p-1.5 lg:p-2"></div>;
              }

              const isCurrentDay = isToday(day);
              const isSelectedDay = isSelected(day);

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => handleDateSelect(day)}
                  className={`
                    p-1 sm:p-1.5 lg:p-2 text-xs sm:text-sm lg:text-sm font-medium rounded-lg transition-all duration-150
                    ${isSelectedDay 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105' 
                      : isCurrentDay
                      ? 'bg-indigo-100 text-indigo-700 font-semibold'
                      : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
                    }
                  `}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-2 sm:p-3 lg:p-4 bg-gray-50 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                handleDateSelect(today);
              }}
              className="w-full px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-3 text-xs sm:text-sm lg:text-base font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors duration-150"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
