import { useState } from "react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Event } from "./calendar-sidebar"
import CalendarRightSidebar from "./calendar-right-sidebar"

interface CalendarPanelProps {
  selectedDate: Date | undefined
  onDateSelect: (date: Date | undefined) => void
  events: Event[]
  isAddEventOpen: boolean
  onCloseAddEvent: () => void
  onSaveEvent: (eventData: any) => void
  editingEvent: Event | null
  onOpenAddEvent: () => void
}

const CalendarPanel = ({ 
  selectedDate, 
  onDateSelect, 
  isAddEventOpen,
  onCloseAddEvent,
  onSaveEvent,
  editingEvent,
  onOpenAddEvent
}: CalendarPanelProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate
  })

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const handleDateClick = (day: Date) => {
    onDateSelect(day)
    onOpenAddEvent()
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0">
            <Button
              variant="outline"
              size="default"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="rounded-r-none border-r-0"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="default"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="rounded-l-none"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="default"
              onClick={() => setCurrentMonth(new Date())}
              className="ml-2"
            >
              Today
            </Button>
          </div>
          
          <div className="text-center">
            <h1 className="text-xl font-normal">{format(currentMonth, 'MMMM yyyy')}</h1>
          </div>
          
          <div className="flex items-center gap-0">
            {(['month', 'week', 'day'] as const).map((mode, index) => (
              <Button
                key={mode}
                variant={viewMode === mode ? 'default' : 'outline'}
                size="default"
                onClick={() => setViewMode(mode)}
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
          <div className="grid grid-cols-7 h-[580px] border border-gray-200">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-md font-bold text-gray-700 mt-1 max-h-[30px] border-b border-r border-gray-200">
                {day}
              </div>
            ))}
            
            {calendarDays.map((day) => {
              const isCurrentMonth = isSameMonth(day, currentMonth)
              const isSelected = selectedDate && isSameDay(day, selectedDate)
              const isHovered = hoveredDate && isSameDay(day, hoveredDate)
              const isToday = isSameDay(day, new Date())
              
              return (
                <div
                  key={day.toString()}
                  className={`
                    border-r border-b border-gray-200 p-2 min-h-[100px] cursor-pointer relative
                    ${isHovered ? 'bg-gray-100' : ''}
                    ${isToday ? 'bg-blue-50' : ''}
                    ${isSelected ? 'bg-blue-100' : ''}
                  `}
                  onClick={() => handleDateClick(day)}
                  onMouseEnter={() => setHoveredDate(day)}
                  onMouseLeave={() => setHoveredDate(null)}
                >
                  <div className={`
                    text-sm font-normal absolute top-2 right-2
                    ${!isCurrentMonth ? 'text-gray-400' : 'text-gray-900'}
                    ${isToday ? 'font-bold' : ''}
                    ${isSelected ? 'font-bold' : ''}
                  `}>
                    {format(day, 'd')}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <CalendarRightSidebar
        isOpen={isAddEventOpen}
        onClose={onCloseAddEvent}
        onSave={onSaveEvent}
        editingEvent={editingEvent}
        selectedDate={selectedDate}
      />
    </div>
  )
}

export default CalendarPanel