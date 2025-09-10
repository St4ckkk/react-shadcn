import { format } from "date-fns";
import { CalendarPlus, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: "meeting" | "deadline" | "event" | "personal";
  attendees?: number;
  location?: string;
}

interface CalendarSidebarProps {
  events: Event[];
  onEventSelect: (event: Event) => void;
  onAddEvent: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const CalendarSidebar = ({ 
  events, 
  onEventSelect,
  onAddEvent,
  isMobile = false,
  onClose
}: CalendarSidebarProps) => {
  const getAllEvents = () => {
    return events
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 15);
  };

  const getEventTypeColor = (type: Event["type"]) => {
    switch (type) {
      case "meeting":
        return "bg-orange-500";
      case "deadline":
        return "bg-blue-600";
      case "event":
        return "bg-green-500";
      case "personal":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const allEvents = getAllEvents();

  if (isMobile) {
    return (
      <>
        {/* Mobile overlay */}
        <div 
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ease-in-out"
          onClick={onClose}
        />
        {/* Mobile sidebar */}
        <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 animate-in slide-in-from-right duration-300">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 p-4">
              <Button 
                className="w-full mb-4 bg-black text-white hover:bg-black/90 cursor-pointer rounded-md"
                onClick={onAddEvent}
              >
                <CalendarPlus className="h-4 w-4" />
                Add Event
              </Button>

              <div className="mb-3">
                <div className="flex items-center mb-2">
                  <h3 className="text-md font-medium text-gray-900">All Events</h3>
                  <Badge
                    variant="secondary"
                    className="bg-white border border-gray-200 text-black text-[.8rem] ml-2 px-2 py-0.3 rounded-sm"
                  >
                    {allEvents.length} Events
                  </Badge>
                </div>
              </div>
              
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="border border-gray-200 rounded-md">
                  <div className="">
                    {allEvents.length > 0 ? (
                      allEvents.map((event, index) => (
                        <div key={event.id}>
                          <div
                            className="flex items-start gap-2 py-4 px-4 hover:bg-gray-50 cursor-pointer transition-colors"
                            onClick={() => onEventSelect(event)}
                          >
                            <div
                              className={`w-4 h-4 rounded-full ${getEventTypeColor(
                                event.type
                              )} flex-shrink-0 mt-1`}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 leading-tight">
                                {event.title}
                              </p>
                              <div className="flex items-center gap-1 mt-2">
                                <Clock className="h-3.5 w-3.5 text-gray-400" />
                                <p className="text-xs font-medium text-gray-500">
                                  {format(event.date, "MMM d, yyyy")} {event.time}
                                </p>
                              </div>
                            </div>
                          </div>
                          {index < allEvents.length - 1 && (
                            <div className="border-b border-gray-100" />
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p className="text-sm">No events</p>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="w-70 bg-white flex flex-col h-[650px]">
      <div className="flex flex-col h-full">
        <Button 
          className="w-full mb-3 bg-black text-white hover:bg-black/90 cursor-pointer rounded-sm"
          onClick={onAddEvent}
        >
          <CalendarPlus className="h-4 w-4" />
          Add Event
        </Button>

        <div className="mb-3">
          <div className="flex items-center mb-2">
            <h2 className="text-md font-medium text-gray-900">All Events</h2>
            <Badge
              variant="secondary"
              className="bg-white border border-gray-200 text-black text-[.8rem] ml-2 px-2 py-0.3 rounded-sm"
            >
              {allEvents.length} Events
            </Badge>
          </div>
        </div>
        <ScrollArea className="flex-1 h-0">
          <div className="border border-gray-200 rounded-md">
            <div className="">
              {allEvents.length > 0 ? (
                allEvents.map((event, index) => (
                  <div key={event.id}>
                    <div
                      className="flex items-start gap-2 py-4 px-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => onEventSelect(event)}
                    >
                      <div
                        className={`w-4 h-4 rounded-full ${getEventTypeColor(
                          event.type
                        )} flex-shrink-0 mt-1`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 leading-tight">
                          {event.title}
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                          <Clock className="h-3.5 w-3.5 text-gray-400" />
                          <p className="text-xs font-medium text-gray-500">
                            {format(event.date, "MMM d, yyyy")} {event.time}
                          </p>
                        </div>
                      </div>
                    </div>
                    {index < allEvents.length - 1 && (
                      <div className="border-b border-gray-100" />
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No events</p>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CalendarSidebar;
export type { Event };
