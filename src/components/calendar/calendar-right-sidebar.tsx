import { useState, useEffect } from "react"
import { X, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"
import type { Event } from "./calendar-sidebar"

interface CalendarRightSidebarProps {
  isOpen: boolean
  onClose: () => void
  onSave: (event: any) => void
  editingEvent?: Event | null
  selectedDate?: Date | undefined
  isMobile?: boolean
}

const DateTimePicker = ({ 
  value, 
  onChange, 
  placeholder,
  isMobile = false
}: { 
  value: { date: Date | undefined, time: string }, 
  onChange: (value: { date: Date | undefined, time: string }) => void,
  placeholder: string,
  isMobile?: boolean
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value.date)
  const [selectedTime, setSelectedTime] = useState(value.time)

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    onChange({ date, time: selectedTime })
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    onChange({ date: selectedDate, time })
  }

  const generateHours = () => {
    const hours = []
    for (let i = 1; i <= 12; i++) {
      hours.push(i.toString())
    }
    return hours
  }

  const generateMinutes = () => {
    const minutes = []
    for (let i = 0; i < 60; i += 5) {
      minutes.push(i.toString().padStart(2, '0'))
    }
    return minutes
  }

  const hours = generateHours()
  const minutes = generateMinutes()
  const periods = ['AM', 'PM']

  const currentHour = selectedTime ? selectedTime.split(':')[0] : '8'
  const currentMinute = selectedTime ? selectedTime.split(':')[1] : '20'
  const currentPeriod = selectedTime ? (parseInt(currentHour) >= 12 ? 'PM' : 'AM') : 'PM'

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          <CalendarDays className="mr-2 h-4 w-4" />
          {selectedDate && selectedTime 
            ? `${format(selectedDate, "MM/dd/yyyy")} ${selectedTime}` 
            : placeholder
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`${isMobile ? 'w-[90vw]' : 'w-auto'} p-0`} align="start">
        <div className={`${isMobile ? 'flex-col' : 'flex'}`}>
          <div className={`${isMobile ? 'border-b' : 'border-r'}`}>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              initialFocus
            />
          </div>
          <div className={`${isMobile ? 'flex justify-center' : 'flex'}`}>
            <ScrollArea className={`${isMobile ? 'w-20' : 'w-16'} h-64`}>
              <div className="space-y-0">
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className={`px-3 py-2 text-center cursor-pointer hover:bg-gray-100 ${
                      currentHour === hour ? 'bg-gray-200' : ''
                    }`}
                    onClick={() => {
                      const newTime = `${hour}:${currentMinute} ${currentPeriod}`
                      handleTimeSelect(newTime)
                    }}
                  >
                    {hour}
                  </div>
                ))}
              </div>
            </ScrollArea>
            <ScrollArea className={`${isMobile ? 'w-20' : 'w-16'} h-64 ${isMobile ? 'border-b' : 'border-r'}`}>
              <div className="space-y-0">
                {minutes.map((minute) => (
                  <div
                    key={minute}
                    className={`px-3 py-2 text-center cursor-pointer hover:bg-gray-100 ${
                      currentMinute === minute ? 'bg-gray-200' : ''
                    }`}
                    onClick={() => {
                      const newTime = `${currentHour}:${minute} ${currentPeriod}`
                      handleTimeSelect(newTime)
                    }}
                  >
                    {minute}
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className={`${isMobile ? 'w-20' : 'w-16'} h-64`}>
              <div className="space-y-0">
                {periods.map((period) => (
                  <div
                    key={period}
                    className={`px-3 py-2 text-center cursor-pointer hover:bg-gray-100 ${
                      currentPeriod === period ? 'bg-gray-200' : ''
                    }`}
                    onClick={() => {
                      const newTime = `${currentHour}:${currentMinute} ${period}`
                      handleTimeSelect(newTime)
                    }}
                  >
                    {period}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

const CalendarRightSidebar = ({ isOpen, onClose, onSave, editingEvent, selectedDate, isMobile = false }: CalendarRightSidebarProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDateTime: { date: undefined as Date | undefined, time: "" },
    endDateTime: { date: undefined as Date | undefined, time: "" },
    color: ""
  })

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title,
        description: editingEvent.location || "",
        startDateTime: { 
          date: editingEvent.date, 
          time: editingEvent.time 
        },
        endDateTime: { 
          date: editingEvent.date, 
          time: editingEvent.time 
        },
        color: editingEvent.type
      })
    } else if (selectedDate) {
      setFormData({
        title: "",
        description: "",
        startDateTime: { 
          date: selectedDate, 
          time: "9:00 AM" 
        },
        endDateTime: { 
          date: selectedDate, 
          time: "10:00 AM" 
        },
        color: ""
      })
    } else {
      setFormData({
        title: "",
        description: "",
        startDateTime: { date: undefined, time: "" },
        endDateTime: { date: undefined, time: "" },
        color: ""
      })
    }
  }, [editingEvent, selectedDate])

  const handleSave = () => {
    onSave(formData)
    setFormData({
      title: "",
      description: "",
      startDateTime: { date: undefined, time: "" },
      endDateTime: { date: undefined, time: "" },
      color: ""
    })
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={onClose}
      />
      
      {/* Right Sidebar - positioned to appear alongside the events drawer */}
      <div 
        className={`fixed right-0 top-0 h-full ${isMobile ? 'w-[70vw]' : 'w-96'} bg-white shadow-lg transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {editingEvent ? 'Edit Event' : 'Add Event'}
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Form Content */}
          <div className="flex-1 p-4 space-y-6 overflow-y-auto">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">Title</Label>
              <Input
                id="title"
                placeholder="Enter event title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter event description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="min-h-[80px] w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Start date</Label>
              <DateTimePicker
                value={formData.startDateTime}
                onChange={(value) => setFormData({ ...formData, startDateTime: value })}
                placeholder="MM/DD/YYYY hh:mm aa"
                isMobile={isMobile}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">End date</Label>
              <DateTimePicker
                value={formData.endDateTime}
                onChange={(value) => setFormData({ ...formData, endDateTime: value })}
                placeholder="MM/DD/YYYY hh:mm aa"
                isMobile={isMobile}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="color" className="text-sm font-medium text-gray-700">Color</Label>
              <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Footer with Save Button */}
          <div className="p-4 border-t border-gray-200">
            <Button 
              onClick={handleSave} 
              className="w-full bg-black text-white hover:bg-black/90 h-10"
            >
              {editingEvent ? 'Update Event' : 'Save Event'}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CalendarRightSidebar
