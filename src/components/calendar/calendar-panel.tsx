import { useState } from "react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addWeeks, subWeeks, addDays, subDays } from "date-fns"
import { ChevronLeft, ChevronRight, Menu, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useIsMobile } from "@/hooks/use-mobile"
import type { Event } from "./calendar-sidebar"

interface CalendarPanelProps {
  selectedDate: Date | undefined
  onDateSelect: (date: Date | undefined) => void
  events: Event[]
  isAddEventOpen: boolean
  onCloseAddEvent: () => void
  onSaveEvent: (eventData: any) => void
  editingEvent: Event | null
  onOpenAddEvent: () => void
  onEventSelect?: (event: Event) => void
  onAddEvent?: () => void
  isMobile?: boolean
  showEventsDrawer?: boolean
  onToggleEventsDrawer?: () => void
  onCloseEventsDrawer?: () => void
}

const CalendarPanel = ({ 
  selectedDate, 
  onDateSelect, 
  events,
  // isAddEventOpen,
  // onCloseAddEvent,
  // onSaveEvent,
  // editingEvent,
  onOpenAddEvent,
  onEventSelect,
  // onAddEvent,
  // isMobile = false,
  // showEventsDrawer = false,
  onToggleEventsDrawer,
  // onCloseEventsDrawer
}: CalendarPanelProps) => {
  const isMobileView = useIsMobile()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [currentDay, setCurrentDay] = useState(new Date())
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)

  const getCalendarDays = () => {
    if (viewMode === 'month') {
      const monthStart = startOfMonth(currentMonth)
      const monthEnd = endOfMonth(monthStart)
      const startDate = startOfWeek(monthStart)
      const endDate = endOfWeek(monthEnd)
      return eachDayOfInterval({ start: startDate, end: endDate })
    } else if (viewMode === 'week') {
      const weekStart = startOfWeek(currentWeek)
      const weekEnd = endOfWeek(currentWeek)
      return eachDayOfInterval({ start: weekStart, end: weekEnd })
    } else if (viewMode === 'day') {
      return [currentDay]
    }
    return []
  }

  const getDisplayDate = () => {
    if (viewMode === 'month') {
      return format(currentMonth, 'MMMM yyyy')
    } else if (viewMode === 'week') {
      const weekStart = startOfWeek(currentWeek)
      const weekEnd = endOfWeek(currentWeek)
      return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`
    } else if (viewMode === 'day') {
      return format(currentDay, 'EEEE, MMMM d, yyyy')
    }
    return ''
  }

  const handlePrevious = () => {
    if (viewMode === 'month') {
      setCurrentMonth(subMonths(currentMonth, 1))
    } else if (viewMode === 'week') {
      setCurrentWeek(subWeeks(currentWeek, 1))
    } else if (viewMode === 'day') {
      setCurrentDay(subDays(currentDay, 1))
    }
  }

  const handleNext = () => {
    if (viewMode === 'month') {
      setCurrentMonth(addMonths(currentMonth, 1))
    } else if (viewMode === 'week') {
      setCurrentWeek(addWeeks(currentWeek, 1))
    } else if (viewMode === 'day') {
      setCurrentDay(addDays(currentDay, 1))
    }
  }

  const handleViewModeChange = (mode: 'month' | 'week' | 'day') => {
    setViewMode(mode)
    if (mode === 'week') {
      setCurrentWeek(currentMonth)
    } else if (mode === 'day') {
      setCurrentDay(currentMonth)
    }
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date))
  }

  const calendarDays = getCalendarDays()
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const timeSlots = [
    '6am', '7am', '8am', '9am', '10am', '11am', 
    '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', 
    '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'
  ]

  const handleDateClick = (day: Date) => {
    onDateSelect(day)
    onOpenAddEvent()
  }

  const renderWeekView = () => {
    const weekDays = getCalendarDays()
    
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* All-day row */}
        <div className="grid grid-cols-8 border-b border-gray-200">
          <div className="p-2 bg-gray-50 border-r border-gray-200 text-sm font-medium text-gray-700">
            all-day
          </div>
          {weekDays.map((day) => (
            <div 
              key={day.toString()}
              className="p-2 bg-gray-50 border-r border-gray-200 text-center cursor-pointer hover:bg-gray-100"
              onClick={() => handleDateClick(day)}
            >
              <div className="text-sm font-bold text-gray-700">
                {format(day, 'EEE')}
              </div>
              <div className="text-xs text-gray-600">
                {format(day, 'M/d')}
              </div>
            </div>
          ))}
        </div>

        {/* Time grid */}
        <div className="grid grid-cols-8">
          {/* Time column */}
          <div className="border-r border-gray-200">
            {timeSlots.map((time) => (
              <div key={time} className="h-12 border-b border-gray-200 flex items-start justify-end pr-2 pt-1">
                <span className="text-xs text-gray-600">{time}</span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {weekDays.map((day) => {
            const isToday = isSameDay(day, new Date())
            // const dayEvents = getEventsForDate(day)
            
            return (
              <div key={day.toString()} className="border-r border-gray-200">
                {timeSlots.map((time) => (
                  <div 
                    key={`${day.toString()}-${time}`}
                    className={`h-12 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                      isToday ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleDateClick(day)}
                  >
                    {/* Events would be rendered here */}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderDayView = () => {
    // const dayEvents = getEventsForDate(currentDay)
    
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Day header */}
        <div className="p-4 bg-gray-50 border-b border-gray-200 text-center">
          <div className="text-lg font-semibold text-gray-900">
            {format(currentDay, 'EEEE')}
          </div>
          <div className="text-sm text-gray-600">
            {format(currentDay, 'MMMM d, yyyy')}
          </div>
        </div>

        {/* Time grid */}
        <div className="grid grid-cols-2">
          {/* Time column */}
          <div className="border-r border-gray-200">
            {timeSlots.map((time) => (
              <div key={time} className="h-12 border-b border-gray-200 flex items-start justify-end pr-2 pt-1">
                <span className="text-xs text-gray-600">{time}</span>
              </div>
            ))}
          </div>

          {/* Event column */}
          <div>
            {timeSlots.map((time) => (
              <div 
                key={time}
                className="h-12 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                onClick={() => handleDateClick(currentDay)}
              >
                {/* Events would be rendered here */}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isMobileView) {
    return (
      <div className="flex-1 flex flex-col bg-white">
        <div className="">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleEventsDrawer}
              className="h-8 w-8 p-0 border border-gray-200"
            >
              <Menu className="h-6 w-6" />
            </Button>
            
            <h1 className="text-lg font-normal">{getDisplayDate()}</h1>
         
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 border border-gray-200"
                >
                  <SlidersHorizontal className="h-6 w-6" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2" align="end">
                <div className="flex items-center gap-2">
                 
                  <div className="flex items-center gap-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevious}
                      className="h-8 w-8 p-0 rounded-r-none border-r-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNext}
                      className="h-8 w-8 p-0 rounded-l-none"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* View Toggles */}
                  <div className="flex items-center gap-0 ml-2">
                    {(['month', 'week', 'day'] as const).map((mode, index) => (
                      <Button
                        key={mode}
                        variant={viewMode === mode ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleViewModeChange(mode)}
                        className={`capitalize h-8 ${
                          index === 0 ? 'rounded-r-none border-r-0' : 
                          index === 2 ? 'rounded-l-none' : 
                          'rounded-none border-r-0'
                        }`}
                      >
                        {mode}
                      </Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Mobile Calendar Grid */}
        <div className="flex-1 pb-4 mt-4">
          {viewMode === 'day' ? (
            // Day view
            <div className="h-[500px] overflow-auto">
              {renderDayView()}
            </div>
          ) : viewMode === 'week' ? (
            // Week view
            <div className="h-[500px] overflow-auto">
              {renderWeekView()}
            </div>
          ) : (
            // Month view - keep original custom grid
            <div className="grid grid-cols-7 h-[500px] border border-gray-200">
              {weekDays.map((day) => (
                <div key={day} className="text-center text-sm font-bold text-gray-700 max-h-[30px] border-b border-r border-gray-200">
                  {day}
                </div>
              ))}
              
              {calendarDays.map((day) => {
                const isCurrentMonth = isSameMonth(day, currentMonth)
                const isSelected = selectedDate && isSameDay(day, selectedDate)
                const isHovered = hoveredDate && isSameDay(day, hoveredDate)
                const isToday = isSameDay(day, new Date())
                const dayEvents = getEventsForDate(day)
                
                return (
                  <div
                    key={day.toString()}
                    className={`
                      border-r border-b border-gray-200 p-1 min-h-[90px] cursor-pointer relative
                      ${isHovered ? 'bg-gray-100' : ''}
                      ${isToday ? 'bg-blue-50' : ''}
                      ${isSelected ? 'bg-blue-100' : ''}
                    `}
                    onClick={() => handleDateClick(day)}
                    onMouseEnter={() => setHoveredDate(day)}
                    onMouseLeave={() => setHoveredDate(null)}
                  >
                    <div className={`
                      text-xs font-normal absolute top-2 right-2
                      ${!isCurrentMonth ? 'text-gray-400' : 'text-gray-900'}
                      ${isToday ? 'font-bold' : ''}
                      ${isSelected ? 'font-bold' : ''}
                    `}>
                      {format(day, 'd')}
                    </div>
                    {dayEvents.length > 0 && (
                      <div className="absolute bottom-1 left-1 right-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className="text-xs p-1 bg-blue-100 text-blue-800 rounded cursor-pointer hover:bg-blue-200 mb-1"
                            onClick={(e) => {
                              e.stopPropagation()
                              onEventSelect?.(event)
                            }}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    )
  }

  {/* Desktop view */}
  return (
    <div className="flex-1 flex flex-col">
      <div className="px-4 mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0">
            <Button
              variant="outline"
              size="default"
              onClick={handlePrevious}
              className="rounded-r-none border-r-0"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="default"
              onClick={handleNext}
              className="rounded-l-none"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="default"
              onClick={() => {
                const today = new Date()
                if (viewMode === 'month') {
                  setCurrentMonth(today)
                } else if (viewMode === 'week') {
                  setCurrentWeek(today)
                } else if (viewMode === 'day') {
                  setCurrentDay(today)
                }
              }}
              className="ml-2"
            >
              Today
            </Button>
          </div>
          
          <div className="text-center">
            <h1 className="text-xl font-normal">{getDisplayDate()}</h1>
          </div>
          
          <div className="flex items-center gap-0">
            {(['month', 'week', 'day'] as const).map((mode, index) => (
              <Button
                key={mode}
                variant={viewMode === mode ? 'default' : 'outline'}
                size="default"
                onClick={() => handleViewModeChange(mode)}
                className={`capitalize ${
                  index === 0 ? 'rounded-r-none border-r-0' : 
                  index === 2 ? 'rounded-l-none' : 
                  'rounded-none border-r-0'
                }`}
              >
                {mode}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="pl-4">
          {viewMode === 'day' ? (
            // Day view
            <div className="h-[600px] overflow-auto">
              {renderDayView()}
            </div>
          ) : viewMode === 'week' ? (
            // Week view
            <div className="h-[600px] overflow-auto">
              {renderWeekView()}
            </div>
          ) : (
            // Month view - keep original custom grid
            <div className="grid grid-cols-7 h-[600px] border border-gray-200">
              {weekDays.map((day) => (
                <div key={day} className="text-center text-md font-bold text-gray-700 mt-1 max-h-[100px] border-b border-r border-gray-200">
                  {day}
                </div>
              ))}
              
              {calendarDays.map((day) => {
                const isCurrentMonth = isSameMonth(day, currentMonth)
                const isSelected = selectedDate && isSameDay(day, selectedDate)
                const isHovered = hoveredDate && isSameDay(day, hoveredDate)
                const isToday = isSameDay(day, new Date())
                const dayEvents = getEventsForDate(day)
                
                return (
                  <div
                    key={day.toString()}
                    className={`
                      border-r border-b border-gray-200 min-h-[100px] cursor-pointer relative
                      ${isHovered ? 'bg-gray-100' : ''}
                      ${isToday ? 'bg-blue-50' : ''}
                      ${isSelected ? 'bg-blue-100' : ''}
                    `}
                    onClick={() => handleDateClick(day)}
                    onMouseEnter={() => setHoveredDate(day)}
                    onMouseLeave={() => setHoveredDate(null)}
                  >
                    <div className={`
                      text-sm font-normal absolute right-2
                      ${!isCurrentMonth ? 'text-gray-400' : 'text-gray-900'}
                      ${isToday ? 'font-bold' : ''}
                      ${isSelected ? 'font-bold' : ''}
                    `}>
                      {format(day, 'd')}
                    </div>
                    {dayEvents.length > 0 && (
                      <div className="absolute bottom-2 left-2 right-2">
                        {dayEvents.slice(0, 3).map((event) => (
                          <div
                            key={event.id}
                            className="text-xs p-2 bg-blue-100 text-blue-800 rounded cursor-pointer hover:bg-blue-200 mb-1"
                            onClick={(e) => {
                              e.stopPropagation()
                              onEventSelect?.(event)
                            }}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="text-xs text-gray-500">+{dayEvents.length - 3} more</div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default CalendarPanel

