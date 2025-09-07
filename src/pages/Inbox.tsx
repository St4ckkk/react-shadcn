import { useState } from "react"
import { ChatSidebar } from "@/components/chat-sidebar"
import { ChatPanel } from "@/components/chat-panel"

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

const mockChats: Chat[] = [
  {
    id: "1",
    name: "Jacquenetta Slowgrave",
    initials: "JS",
    lastMessage: "Great! Looking forward to it. See you later!",
    timestamp: "10 min",
    unreadCount: 8,
    isOnline: true
  },
  {
    id: "2", 
    name: "Nickola Peever",
    initials: "NP",
    lastMessage: "Sounds perfect! I've been wanting to try that place. See you there!",
    timestamp: "40 min",
    unreadCount: 2
  },
  {
    id: "3",
    name: "Farand Hume", 
    initials: "FH",
    lastMessage: "How about 7 PM at the new Italian place downtown?",
    timestamp: "Yesterday"
  },
  {
    id: "4",
    name: "Ossie Peasey",
    initials: "OP", 
    lastMessage: "Hey Bonnie, yes, definitely! What time should we meet?",
    timestamp: "13 days"
  },
  {
    id: "5",
    name: "Hall Negri",
    initials: "HN",
    lastMessage: "No worries at all! I'll grab a table and wait for you. Drive safe!",
    timestamp: "2 days"
  },
  {
    id: "6",
    name: "Elyssa Segot",
    initials: "ES",
    lastMessage: "She just told me today.",
    timestamp: "Yesterday"
  },
  {
    id: "7",
    name: "Gil Wilfing",
    initials: "GW",
    lastMessage: "See you in 5 minutes!",
    timestamp: "1 day"
  },
  {
    id: "8",
    name: "Alice Johnson",
    initials: "AJ",
    lastMessage: "Thanks for the help with the project!",
    timestamp: "2 hours",
    unreadCount: 3,
    isOnline: true
  },
  {
    id: "9",
    name: "Bob Smith",
    initials: "BS",
    lastMessage: "Can we reschedule our meeting?",
    timestamp: "5 hours"
  },
  {
    id: "10",
    name: "Carol Davis",
    initials: "CD",
    lastMessage: "The presentation went great!",
    timestamp: "1 day",
    unreadCount: 1
  },
  {
    id: "11",
    name: "David Wilson",
    initials: "DW",
    lastMessage: "I'll send you the files tomorrow.",
    timestamp: "2 days"
  },
  {
    id: "12",
    name: "Emma Brown",
    initials: "EB",
    lastMessage: "Happy birthday! ",
    timestamp: "3 days",
    isOnline: true
  },
  {
    id: "13",
    name: "Frank Miller",
    initials: "FM",
    lastMessage: "Let's catch up soon!",
    timestamp: "1 week"
  },
  {
    id: "14",
    name: "Grace Taylor",
    initials: "GT",
    lastMessage: "The new design looks amazing!",
    timestamp: "1 week",
    unreadCount: 5
  },
  {
    id: "15",
    name: "Henry Anderson",
    initials: "HA",
    lastMessage: "Thanks for the feedback!",
    timestamp: "2 weeks"
  }
]

const mockMessages: Message[] = [
  {
    id: "1",
    content: "I know how important this file is to you. You can trust me ;)",
    timestamp: "05:23 PM",
    isOwn: true,
    type: "text"
  },
  {
    id: "2",
    content: "I know how important this file is to you. You can trust me ;)",
    timestamp: "05:23 PM",
    isOwn: true,
    type: "text"
  },
  {
    id: "3",
    content: "I know how important this file is to you. You can trust me ;)",
    timestamp: "05:23 PM",
    isOwn: true,
    type: "text"
  }
]

export default function InboxPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [messageInput, setMessageInput] = useState("")

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessageInput("")
    }
  }

  return (
    <div className="flex h-full">
      <ChatSidebar
        chats={mockChats}
        selectedChat={selectedChat}
        onChatSelect={setSelectedChat}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
/>
      <ChatPanel
        selectedChat={selectedChat}
        messages={mockMessages}
        messageInput={messageInput}
        onMessageInputChange={setMessageInput}
        onSendMessage={handleSendMessage}
      />
    </div>

  )
}