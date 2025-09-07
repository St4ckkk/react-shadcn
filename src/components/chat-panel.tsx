import { Phone, Video, MoreHorizontal, Paperclip, Mic, Send, Smile, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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

interface Message {
  id: string
  content: string
  timestamp: string
  isOwn: boolean
  type: 'text' | 'audio' | 'video' | 'image'
  duration?: string
  images?: string[]
}

interface ChatPanelProps {
  selectedChat: Chat | null
  messages: Message[]
  messageInput: string
  onMessageInputChange: (value: string) => void
  onSendMessage: () => void
}

export function ChatPanel({ 
  selectedChat, 
  messages, 
  messageInput, 
  onMessageInputChange, 
  onSendMessage 
}: ChatPanelProps) {
  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="text-4xl">��</div>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Select a chat to start messaging</h3>
          <p className="text-gray-500">Choose a conversation from the sidebar to begin</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedChat.avatar} />
              <AvatarFallback className="bg-gray-200 text-gray-700 text-sm font-medium">
                {selectedChat.initials}
              </AvatarFallback>
            </Avatar>
            {selectedChat.isOnline && (
              <div className="absolute -bottom-1 -right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
            )}
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">{selectedChat.name}</h2>
            <p className="text-sm text-green-600">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Video className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Phone className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md ${message.isOwn ? 'order-2' : 'order-1'}`}>
                {message.type === 'text' && (
                  <div className={`rounded-lg p-3 ${
                    message.isOwn 
                      ? 'bg-gray-800 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                )}
                
                <div className={`flex items-center gap-1 mt-1 ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                  {message.isOwn && (
                    <CheckCheck className="h-3 w-3 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4">
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Smile className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Enter message..."
            value={messageInput}
            onChange={(e) => onMessageInputChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
            className="flex-1 bg-gray-50 border-gray-200 focus:bg-white rounded-lg"
          />
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Mic className="h-4 w-4" />
          </Button>
          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}