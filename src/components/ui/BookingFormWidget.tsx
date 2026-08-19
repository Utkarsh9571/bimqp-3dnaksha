import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  Calendar as CalendarIcon,
  ArrowRight,
  Sparkles,
  Building2,
  Mail,
  Phone,
  User
} from 'lucide-react';
import { gsap, prefersReducedMotion } from '../../lib/animations';

interface BookingFormWidgetProps {
  onBookingComplete?: (details: {
    fullName: string;
    workEmail: string;
    mobileNumber: string;
    projectName: string;
    date: Date;
    timeSlot: string;
  }) => void;
  className?: string;
}

const TIME_SLOTS = [
  '10:00 AM',
  '11:30 AM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM',
  '06:30 PM'
];

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const BookingFormWidget: React.FC<BookingFormWidgetProps> = ({
  onBookingComplete,
  className = ''
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Step 1: User Details
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [projectName, setProjectName] = useState('');

  // Step 2: Date & Time
  const [currentMonthDate, setCurrentMonthDate] = useState(() => new Date(2026, 7, 1)); // August 2026 baseline
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  // Submission / Success state
  const [isBooked, setIsBooked] = useState(false);

  // Validation
  const isStep1Valid =
    fullName.trim().length >= 2 &&
    workEmail.includes('@') &&
    mobileNumber.trim().length >= 7 &&
    projectName.trim().length >= 2;

  const isBookingReady = isStep1Valid && selectedDate !== null && selectedTimeSlot !== null;

  // 4. GSAP ScrollTrigger Entrance Animation (opacity 0->1, scale 0.96->1, ~0.5s ease-out)
  useEffect(() => {
    const isReduced = prefersReducedMotion();
    const card = cardRef.current;
    if (!card) return;

    if (isReduced) {
      gsap.set(card, { opacity: 1, scale: 1 });
      return;
    }

    gsap.set(card, { opacity: 0, scale: 0.96 });

    const tween = gsap.to(card, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  // Calendar Calculation Helpers
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const monthName = currentMonthDate.toLocaleString('default', { month: 'long' });

  const handleDateSelect = (dayNum: number) => {
    const newDate = new Date(year, month, dayNum);
    setSelectedDate(newDate);
    // Auto-select first slot if none selected yet
    if (!selectedTimeSlot) {
      setSelectedTimeSlot(TIME_SLOTS[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isBookingReady || !selectedDate || !selectedTimeSlot) return;

    setIsBooked(true);
    onBookingComplete?.({
      fullName,
      workEmail,
      mobileNumber,
      projectName,
      date: selectedDate,
      timeSlot: selectedTimeSlot
    });
  };

  return (
    <div
      ref={cardRef}
      className={`rounded-2xl bg-white border border-gray-200/90 p-6 sm:p-10 md:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.06)] relative overflow-hidden corner-crosshairs ${className}`}
    >
      {/* Blueprint Ambient Grid Accent */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

      {/* Decorative Warm Corner Glow */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-bl from-[#D4A373]/15 to-transparent blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-[#0284C7]/10 to-transparent blur-[80px] rounded-full pointer-events-none" />

      {isBooked ? (
        /* Booking Confirmation Success State */
        <div className="relative z-10 py-12 text-center max-w-xl mx-auto space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 mx-auto flex items-center justify-center text-[#059669] shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <div className="font-mono-tech text-xs text-[#059669] tracking-widest uppercase mb-1 font-bold">
              CONSULTATION CONFIRMED
            </div>
            <h3 className="font-display font-bold text-3xl text-[#0A0A0A] tracking-tight">
              We&apos;re Ready for Your Project
            </h3>
          </div>

          <div className="p-6 rounded-lg bg-gray-50 border border-gray-200 text-left space-y-3 font-mono-tech text-xs">
            <div className="flex justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-500">Client:</span>
              <span className="text-gray-900 font-bold">{fullName}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-500">Project:</span>
              <span className="text-gray-900 font-bold">{projectName}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-500">Date & Time:</span>
              <span className="text-[#9A6A38] font-bold">
                {selectedDate?.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}{' '}
                @ {selectedTimeSlot}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Confirmation Sent To:</span>
              <span className="text-[#0284C7] font-semibold">{workEmail}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setIsBooked(false);
              setSelectedDate(null);
              setSelectedTimeSlot(null);
            }}
            className="px-6 py-2.5 rounded-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 font-mono-tech text-xs tracking-wider uppercase transition-all cursor-pointer font-semibold"
          >
            Book Another Consultation Session
          </button>
        </div>
      ) : (
        /* 2-Column Booking Form Widget (Light Theme) */
        <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* =========================================================
                LEFT COLUMN: STEP 1 - Your Details
               ========================================================= */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                {/* Step Tag */}
                <div className="flex items-center gap-2 mb-2 font-mono-tech text-xs text-[#9A6A38] tracking-[0.2em] uppercase font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9A6A38]" />
                  <span>STEP 1 OF 2</span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#0A0A0A] tracking-tight mb-2">
                  Your Details
                </h3>

                <p className="text-xs text-[#4B5563] font-mono-tech mb-6 leading-relaxed">
                  Provide your contact details so our visualization team can prepare for your project discussion.
                </p>

                {/* Input Fields */}
                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block font-mono-tech text-xs text-gray-700 font-semibold mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#9A6A38]" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ar. Vikram Malhotra"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-sm bg-[#F9FAFB] border border-gray-300 focus:border-[#9A6A38] text-[#0A0A0A] text-sm font-sans placeholder-gray-400 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Work Email */}
                  <div>
                    <label className="block font-mono-tech text-xs text-gray-700 font-semibold mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#0284C7]" />
                      <span>Work Email *</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@firm.com"
                      value={workEmail}
                      onChange={(e) => setWorkEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-sm bg-[#F9FAFB] border border-gray-300 focus:border-[#0284C7] text-[#0A0A0A] text-sm font-sans placeholder-gray-400 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block font-mono-tech text-xs text-gray-700 font-semibold mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#059669]" />
                      <span>Mobile Number *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full px-4 py-3 rounded-sm bg-[#F9FAFB] border border-gray-300 focus:border-[#059669] text-[#0A0A0A] text-sm font-sans placeholder-gray-400 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Project Name */}
                  <div>
                    <label className="block font-mono-tech text-xs text-gray-700 font-semibold mb-1.5 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>Project Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Skyline Residence & BIM Review"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full px-4 py-3 rounded-sm bg-[#F9FAFB] border border-gray-300 focus:border-[#D97706] text-[#0A0A0A] text-sm font-sans placeholder-gray-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Status Validation Pill */}
              <div className="pt-4 mt-4 border-t border-gray-200 font-mono-tech text-xs flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isStep1Valid ? 'bg-[#059669]' : 'bg-gray-400'
                  }`}
                />
                <span className={isStep1Valid ? 'text-[#059669] font-bold' : 'text-gray-500'}>
                  {isStep1Valid ? 'Step 1 Completed' : 'Complete all fields to proceed'}
                </span>
              </div>
            </div>

            {/* =========================================================
                RIGHT COLUMN: STEP 2 - Date & Time Calendar
               ========================================================= */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Step Tag */}
                <div className="flex items-center gap-2 mb-2 font-mono-tech text-xs text-[#0284C7] tracking-[0.2em] uppercase font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                  <span>STEP 2 OF 2</span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#0A0A0A] tracking-tight mb-2">
                  Select Date & Time
                </h3>

                <p className="text-xs text-[#4B5563] font-mono-tech mb-6 leading-relaxed">
                  Choose your preferred consultation date and live virtual walkthrough session slot.
                </p>

                {/* Sub-grid: Month Calendar (Left) & Time Slots (Right) */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 p-5 rounded-lg bg-[#F9FAFB] border border-gray-200">
                  {/* Functional Month Calendar */}
                  <div className="sm:col-span-7">
                    {/* Calendar Month Navigation Header */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-200 font-mono-tech text-xs text-gray-900">
                      <span className="font-bold text-sm">
                        {monthName} {year}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={prevMonth}
                          className="w-7 h-7 rounded-sm border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer shadow-2xs"
                          aria-label="Previous Month"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={nextMonth}
                          className="w-7 h-7 rounded-sm border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer shadow-2xs"
                          aria-label="Next Month"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Day of Week Headers */}
                    <div className="grid grid-cols-7 gap-1 text-center font-mono-tech text-[10px] text-gray-500 mb-2 uppercase font-semibold">
                      {DAYS_OF_WEEK.map((d) => (
                        <div key={d} className="py-1">
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Day Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center font-mono-tech text-xs">
                      {/* Empty padding cells for first week offset */}
                      {Array.from({ length: firstDayIndex }).map((_, idx) => (
                        <div key={`empty-${idx}`} className="h-8 w-8" />
                      ))}

                      {/* Month Days */}
                      {Array.from({ length: totalDaysInMonth }).map((_, idx) => {
                        const dayNum = idx + 1;
                        const isSelected =
                          selectedDate?.getDate() === dayNum &&
                          selectedDate?.getMonth() === month &&
                          selectedDate?.getFullYear() === year;

                        return (
                          <button
                            key={`day-${dayNum}`}
                            type="button"
                            onClick={() => handleDateSelect(dayNum)}
                            className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#D4A373] to-[#E5A93B] text-[#08090B] font-bold shadow-md scale-110'
                                : 'text-gray-800 hover:bg-gray-200/70'
                            }`}
                          >
                            {dayNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots Panel / Placeholder */}
                  <div className="sm:col-span-5 sm:border-l sm:border-gray-200 sm:pl-5 flex flex-col justify-center">
                    {selectedDate ? (
                      /* Revealed Time Slots */
                      <div className="space-y-3 animate-fadeIn">
                        <div className="flex items-center justify-between font-mono-tech text-[11px] text-gray-600">
                          <span className="flex items-center gap-1 font-semibold">
                            <Clock className="w-3.5 h-3.5 text-[#9A6A38]" />
                            <span>Available Slots</span>
                          </span>
                          <span className="text-[#9A6A38] font-bold">
                            {selectedDate.toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
                          {TIME_SLOTS.map((slot) => {
                            const isSlotActive = selectedTimeSlot === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedTimeSlot(slot)}
                                className={`py-2 px-3 rounded-sm text-xs font-mono-tech transition-all text-center cursor-pointer border ${
                                  isSlotActive
                                    ? 'bg-blue-50 border-[#0284C7] text-[#0284C7] font-bold shadow-2xs'
                                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      /* Placeholder State */
                      <div className="h-full min-h-[140px] flex flex-col items-center justify-center p-4 text-center border border-dashed border-gray-300 rounded-sm">
                        <CalendarIcon className="w-6 h-6 text-gray-400 mb-2 animate-pulse" />
                        <span className="font-mono-tech text-[11px] text-gray-500 tracking-wider uppercase leading-tight font-medium">
                          SELECT A DATE TO VIEW SLOTS
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Date Selection Pill */}
              <div className="pt-4 mt-4 border-t border-gray-200 font-mono-tech text-xs flex items-center justify-between text-gray-600">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      selectedDate && selectedTimeSlot ? 'bg-[#059669]' : 'bg-gray-400'
                    }`}
                  />
                  <span>
                    {selectedDate && selectedTimeSlot
                      ? `Selected: ${selectedDate.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })} @ ${selectedTimeSlot}`
                      : 'Pick a date and session slot'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================
              3. FULL-WIDTH "BOOK CONSULTATION →" BUTTON
             ========================================================= */}
          <div className="pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={!isBookingReady}
              className={`w-full py-4 px-8 rounded-sm font-display font-bold text-sm sm:text-base tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-3 ${
                isBookingReady
                  ? 'opacity-100 bg-gradient-to-r from-[#D4A373] via-[#E5A93B] to-[#F4D06F] text-[#08090B] shadow-[0_4px_25px_rgba(212,163,115,0.4)] hover:scale-[1.02] cursor-pointer'
                  : 'opacity-40 bg-gray-100 border border-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>BOOK CONSULTATION →</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BookingFormWidget;
