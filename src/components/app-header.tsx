import { useState } from "react"
import { Search, Bell, Sun, Settings, Clock, Star, CheckCircle, CreditCard, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

const AppHeader = () => {
  const [searchValue, setSearchValue] = useState("")

  const notifications = [
    {
      id: 1,
      title: "Your order is placed",
      description: "Amet minim mollit non deser unt ullamco e...",
      time: "2 days ago",
      avatar: "https://github.com/shadcn.png",
      isRead: true,
      hasActions: false
    },
    {
      id: 2,
      title: "Congratulations Darlene",
      description: "Won the monthly best seller badge",
      time: "11 am",
      avatar: "https://github.com/vercel.png",
      isRead: false,
      hasActions: false,
      icon: "🏆"
    },
    {
      id: 3,
      title: "Joaquina Weisenborn",
      description: "Requesting access permission",
      time: "12 pm",
      avatar: "https://github.com/nextjs.png",
      isRead: false,
      hasActions: true
    },
    {
      id: 4,
      title: "Brooklyn Simmons",
      description: "Added you to Top Secret Project...",
      time: "1 pm",
      avatar: "https://github.com/react.png",
      isRead: false,
      hasActions: false
    }
  ]

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <div className="border-r border-gray-200 h-[20px]"></div>
      <div className="flex flex-1 items-center justify-start">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10 pr-20 h-9 rounded-md"
          />
          <div className="absolute right-2 top-4 -translate-y-1/2">
            <Badge variant="secondary" className="h-5 px-1.5  text-xs font-semibold rounded-sm font-mono">
              ⌘K
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 relative">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-0.5 -right-0.5 h-2 w-2 p-0"
                />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="flex items-center justify-between px-5 py-2 border-b">
              <h3 className="text-[13px] font-[500]">Notifications</h3>
              <Button variant="ghost" size="sm" className="font-normal font-[500] text-[13px] hover:text-blue-700">
                View all
              </Button>
            </div>
            <ScrollArea className="h-80">
              <div className="">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start border-b border-gray-200 gap-3 p-3 hover:bg-gray-200 relative">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={notification.avatar} alt={notification.title} />
                      <AvatarFallback>
                        {notification.title.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm">{notification.title}</p>
                        {notification.icon && <span>{notification.icon}</span>}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{notification.description}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                      {notification.hasActions && (
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" className="h-7 px-3 text-xs">
                            Accept
                          </Button>
                          <Button size="sm" variant="destructive" className="h-7 px-3 text-xs">
                            Decline
                          </Button>
                        </div>
                      )}
                    </div>
                    {!notification.isRead && (
                      <div className="absolute right-3 top-3 h-2 w-2 bg-red-500 rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
        
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Sun className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Settings className="h-4 w-4" />
        </Button>
        
        <div className="border-l border-gray-200 h-[20px]"></div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <Avatar className="h-8 w-8 border border-gray-200">
                <AvatarImage src="/klio-logo.svg" alt="User" />
                <AvatarFallback>TB</AvatarFallback>
              </Avatar>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0" align="end">
            <div className="p-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border border-gray-200">
                  <AvatarImage src="/klio-logo.svg" alt="Klio Solutions" />
                  <AvatarFallback>TB</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">Klio Solutions</p>
                  <p className="text-xs text-gray-600">hello@klio.solutions</p>
                </div>
              </div>
            </div>
            
            <div className="">
              <Button variant="ghost" className="w-full justify-start gap-3 h-9 text-sm text-gray-600 rounded-none hover:bg-gray-100">
                <Star className="h-4 w-4" />
                Upgrade to Pro
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 h-9 text-sm text-gray-600 rounded-none hover:bg-gray-100">
                <CheckCircle className="h-4 w-4" />
                Account
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 h-9 text-sm text-gray-600 rounded-none hover:bg-gray-100">
                <CreditCard className="h-4 w-4" />
                Billing
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 h-9 text-sm text-gray-600 rounded-none hover:bg-gray-100">
                <Bell className="h-4 w-4" />
                Notifications
              </Button>
            </div>
            <Separator />
            <Button variant="ghost" className="w-full justify-start gap-3 h-9 text-sm text-gray-600 hover:text-red-700 hover:bg-red-50 rounded-none">
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  )
}

export default AppHeader