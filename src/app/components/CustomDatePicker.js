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
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
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
      <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#7c5a62]">
        <CalendarIcon className="h-4 w-4 text-[#d80621]" aria-hidden />
        {label}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-2xl border border-red-100/70 bg-white/85 px-4 py-3 text-left shadow-md shadow-red-500/5 outline-none transition-colors hover:border-red-200 hover:bg-white focus:ring-2 focus:ring-[#d80621]/30"
      >
        <div className="flex items-center justify-between gap-3">
          <span className={`text-[15px] ${selectedDate ? 'text-[#1d1d1f]' : 'text-[#86868b]'}`}>
            {selectedDate ? formatDisplayDate(selectedDate) : 'Select date'}
          </span>
          <CalendarIcon className="h-5 w-5 flex-shrink-0 text-[#6e6e73]" aria-hidden />
        </div>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-auto min-w-full overflow-hidden rounded-2xl border border-red-100/60 bg-white/95 shadow-maple backdrop-blur-md sm:min-w-[280px]">
          <div className="flex items-center justify-between border-b border-red-100/50 bg-gradient-to-r from-red-50/80 to-teal-50/80 px-3 py-3">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="rounded-full p-2 text-[#1d1d1f] hover:bg-black/[0.05]"
              aria-label="Previous month"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            
            <h3 className="text-sm font-semibold text-[#1d1d1f]">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            
            <button
              type="button"
              onClick={handleNextMonth}
              className="rounded-full p-2 text-[#1d1d1f] hover:bg-black/[0.05]"
              aria-label="Next month"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-0.5 bg-[#fafafa] px-2 py-2">
            {weekDays.map((day) => (
              <div key={day} className="p-1.5 text-center text-[11px] font-semibold uppercase tracking-wide text-[#86868b]">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5 p-2">
            {days.map((day, index) => {
              if (!day) {
                return <div key={index} className="p-2" />;
              }

              const isCurrentDay = isToday(day);
              const isSelectedDay = isSelected(day);

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  onClick={() => handleDateSelect(day)}
                  className={`
                    rounded-full p-2 text-xs font-medium transition-colors
                    ${isSelectedDay 
                      ? 'bg-gradient-to-br from-[#d80621] to-[#ff5c7a] text-white shadow-md shadow-red-500/25' 
                      : isCurrentDay
                      ? 'bg-teal-100/80 text-[#0f766e] font-semibold'
                      : 'text-[#424245] hover:bg-red-50/60'
                    }
                  `}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>

          <div className="border-t border-red-100/50 bg-white/90 px-2 py-2">
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                handleDateSelect(today);
              }}
              className="w-full rounded-xl px-3 py-2 text-sm font-semibold text-[#0d9488] hover:bg-teal-50/80"
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
