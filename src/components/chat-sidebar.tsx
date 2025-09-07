import { Search, Plus, Check, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface Chat {
  id: string
  name: string
  avatar?: string
  initials: string
  lastMessage: string
  timestamp: string
  unreadCount?: number
  isOnline?: boolean
}

interface ChatSidebarProps {
  chats: Chat[]
  selectedChat: Chat | null
  onChatSelect: (chat: Chat) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function ChatSidebar({ 
  chats, 
  selectedChat, 
  onChatSelect, 
  searchQuery, 
  onSearchChange 
}: ChatSidebarProps) {
  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-85 border border-gray-200 rounded-lg flex flex-col bg-white h-[650px]">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">Chats</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-full">
                <Plus className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-30">
              <DropdownMenuItem>
                New chat
              </DropdownMenuItem>
              <DropdownMenuItem>
                Create group
              </DropdownMenuItem>
              <DropdownMenuItem>
                Add contact
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Chats search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 bg-gray-50 border-gray-200 focus:bg-white rounded-md"
          />
        </div>
      </div>

      <ScrollArea className="flex-1 h-0">
        <div className="">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onChatSelect(chat)}
              className={`group p-3 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 relative ${
                selectedChat?.id === chat.id 
                  ? "bg-gray-100" 
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3 relative">
                <div className="relative overflow-visible">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback className="bg-gray-200 text-gray-700 text-sm font-medium">
                      {chat.initials}
                    </AvatarFallback>
                  </Avatar>
                  {chat.isOnline && (
                    <div className="absolute -bottom-1 -right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0 pr-20">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                    <span className="absolute top-1 right-7 text-xs text-gray-500">{chat.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1 flex-1 min-w-0">
                      <Check className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      <p className="text-sm text-gray-600 truncate max-w-[180px]">
                        {chat.lastMessage}
                      </p>
                    </div>
                    {chat.unreadCount && (
                      <Badge className="absolute bottom-0 right-6 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-green-500 text-white">
                        {chat.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
     
              <div className="absolute top-1/2 right-7 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 rounded-full bg-white border border-gray-200 hover:bg-gray-50 shadow-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-4 w-4 text-gray-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem>
                      View profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Add to archive
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      Block
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}