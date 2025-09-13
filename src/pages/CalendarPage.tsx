import { useState } from "react"
import CalendarSidebar, { type Event } from "@/components/calendar/calendar-sidebar"
import CalendarPanel from "@/components/calendar/calendar-panel"
import CalendarEventSheet from "@/components/calendar/calendar-event-sheet"
import { useIsMobile } from "@/hooks/use-mobile"

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Marketing Strategy Meeting',
    date: new Date(2025, 0, 3),
    time: '9:00 AM',
    type: 'meeting',
    attendees: 8,
    location: 'Conference Room A'
  },
  {
    id: '2',
    title: 'Team Meeting',
    date: new Date(2025, 0, 4),
    time: '10:00 AM',
    type: 'meeting',
    attendees: 12
  },
  {
    id: '3',
    title: 'Product Brainstorming',
    date: new Date(2025, 0, 5),
    time: '11:00 AM',
    type: 'meeting',
    attendees: 6
  },
  {
    id: '4',
    title: 'Lunch with Investor',
    date: new Date(2025, 0, 6),
    time: '12:30 PM',
    type: 'meeting',
    attendees: 2,
    location: 'Downtown Restaurant'
  },
  {
    id: '5',
    title: 'Client Presentation',
    date: new Date(2025, 0, 7),
    time: '2:00 PM',
    type: 'meeting',
    attendees: 15,
    location: 'Main Auditorium'
  },
  {
    id: '6',
    title: 'Project Deadline',
    date: new Date(2025, 0, 8),
    time: '4:00 PM',
    type: 'deadline'
  },
  {
    id: '7',
    title: 'Tech Conference',
    date: new Date(2025, 0, 9),
    time: '9:00 AM',
    type: 'event',
    location: 'Convention Center'
  },
  {
    id: '8',
    title: 'Quarterly Sales Review',
    date: new Date(2025, 0, 10),
    time: '10:30 AM',
    type: 'meeting',
    attendees: 20
  },
  {
    id: '9',
    title: 'Team Building Activity',
    date: new Date(2025, 0, 11),
    time: '2:00 PM',
    type: 'event',
    attendees: 25,
    location: 'Company Park'
  },
  {
    id: '10',
    title: 'Networking Event',
    date: new Date(2025, 0, 12),
    time: '6:00 PM',
    type: 'event',
    location: 'Hotel Ballroom'
  },
  {
    id: '11',
    title: 'Product Launch Event',
    date: new Date(2025, 0, 13),
    time: '9:00 AM',
    type: 'event',
    attendees: 100,
    location: 'Grand Hall'
  },
  {
    id: '12',
    title: 'HR Policy Discussion',
    date: new Date(2025, 0, 14),
    time: '10:00 AM',
    type: 'meeting',
    attendees: 8
  },
  {
    id: '13',
    title: 'Investor Pitch',
    date: new Date(2025, 0, 15),
    time: '3:00 PM',
    type: 'meeting',
    attendees: 5,
    location: 'Boardroom'
  },
  {
    id: '14',
    title: 'UX/UI Workshop',
    date: new Date(2025, 0, 16),
    time: '1:00 PM',
    type: 'meeting',
    attendees: 12,
    location: 'Design Studio'
  },
  {
    id: '15',
    title: 'Customer Feedback Session',
    date: new Date(2025, 0, 17),
    time: '12:00 PM',
    type: 'meeting',
    attendees: 10
  }
]

const CalendarPage = () => {
  const isMobile = useIsMobile()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [showEventsDrawer, setShowEventsDrawer] = useState(false)

  const handleEventSelect = (event: Event) => {
    setSelectedDate(event.date)
    setEditingEvent(event)
    setIsAddEventOpen(true)
    // Don't close the events drawer on mobile
  }

  const handleAddEvent = () => {
    setEditingEvent(null)
    setIsAddEventOpen(true)
    // Don't close the events drawer on mobile
  }

  const handleOpenAddEvent = () => {
    setEditingEvent(null)
    setIsAddEventOpen(true)
    if (isMobile) {
      setShowEventsDrawer(false)
    }
  }

  const handleCloseAddEvent = () => {
    setIsAddEventOpen(false)
    setEditingEvent(null)
  }

  const handleSaveEvent = (eventData: any) => {
    if (editingEvent) {
      console.log('Event updated:', { ...editingEvent, ...eventData })
    } else {
      console.log('New event saved:', eventData)
    }
    setIsAddEventOpen(false)
    setEditingEvent(null)
  }

  const handleToggleEventsDrawer = () => {
    setShowEventsDrawer(!showEventsDrawer)
  }

  const handleCloseEventsDrawer = () => {
    setShowEventsDrawer(false)
  }

  if (isMobile) {
    return (
      <div className="flex h-full relative">

        <div className="flex-1">
          <CalendarPanel
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            events={mockEvents}
            isAddEventOpen={isAddEventOpen}
            onCloseAddEvent={handleCloseAddEvent}
            onSaveEvent={handleSaveEvent}
            editingEvent={editingEvent}
            onOpenAddEvent={handleOpenAddEvent}
            onEventSelect={handleEventSelect}
            onAddEvent={handleAddEvent}
            isMobile={true}
            showEventsDrawer={showEventsDrawer}
            onToggleEventsDrawer={handleToggleEventsDrawer}
            onCloseEventsDrawer={handleCloseEventsDrawer}
          />
        </div>
        
      
        {showEventsDrawer && (
          <CalendarSidebar
            events={mockEvents}
            onEventSelect={handleEventSelect}
            onAddEvent={handleAddEvent}
            isMobile={true}
            onClose={handleCloseEventsDrawer}
          />
        )}

        <CalendarEventSheet
          isOpen={isAddEventOpen}
          onClose={handleCloseAddEvent}
          onSave={handleSaveEvent}
          editingEvent={editingEvent}
          selectedDate={selectedDate}
          isMobile={true}
        />
      </div>
    )
  }

  return (
    <div className="flex h-full">
      <CalendarSidebar
        events={mockEvents}
        onEventSelect={handleEventSelect}
        onAddEvent={handleAddEvent}
      />
      
      <CalendarPanel
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        events={mockEvents}
        isAddEventOpen={isAddEventOpen}
        onCloseAddEvent={handleCloseAddEvent}
        onSaveEvent={handleSaveEvent}
        editingEvent={editingEvent}
        onOpenAddEvent={handleOpenAddEvent}
        onEventSelect={handleEventSelect}
        onAddEvent={handleAddEvent}
      />

      <CalendarEventSheet
        isOpen={isAddEventOpen}
        onClose={handleCloseAddEvent}
        onSave={handleSaveEvent}
        editingEvent={editingEvent}
        selectedDate={selectedDate}
        isMobile={false}
      />
    </div>
  )
}

export default CalendarPage