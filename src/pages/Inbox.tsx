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
    content: "Hey! How are you doing today?",
    timestamp: "10:30 AM",
    isOwn: false,
    type: "text"
  },
  {
    id: "2",
    content: "I'm doing great! Just working on some projects. How about you?",
    timestamp: "10:32 AM",
    isOwn: true,
    type: "text"
  },
  {
    id: "3",
    content: "Same here! I've been really busy with the new design system. It's taking longer than expected.",
    timestamp: "10:35 AM",
    isOwn: false,
    type: "text"
  },
  {
    id: "4",
    content: "I know how important this file is to you. You can trust me ;)",
    timestamp: "10:37 AM",
    isOwn: true,
    type: "text"
  },
  {
    id: "5",
    content: "Thanks! That means a lot. I've been working on it for weeks now.",
    timestamp: "10:40 AM",
    isOwn: false,
    type: "text"
  },
  {
    id: "6",
    content: "No problem at all! I'm here to help whenever you need it.",
    timestamp: "10:42 AM",
    isOwn: true,
    type: "text"
  },
  {
    id: "7",
    content: "Actually, could you take a look at the color scheme? I'm not sure if it's working well.",
    timestamp: "10:45 AM",
    isOwn: false,
    type: "text"
  },
  {
    id: "8",
    content: "Of course! Send me the files and I'll review them right away.",
    timestamp: "10:47 AM",
    isOwn: true,
    type: "text"
  },
  {
    id: "9",
    content: "Perfect! I'll send them over in a few minutes. Thanks again!",
    timestamp: "10:50 AM",
    isOwn: false,
    type: "text"
  },
  {
    id: "10",
    content: "No worries! Take your time. I'll be here when you're ready.",
    timestamp: "10:52 AM",
    isOwn: true,
    type: "text"
  },
  {
    id: "11",
    content: "By the way, did you see the new updates to the framework? They added some really cool features.",
    timestamp: "11:00 AM",
    isOwn: false,
    type: "text"
  },
  {
    id: "12",
    content: "Yes! I've been experimenting with them. The new animation system is amazing!",
    timestamp: "11:05 AM",
    isOwn: true,
    type: "text"
  },
  {
    id: "13",
    content: "I know right? I can't wait to implement it in our project. It's going to look so smooth.",
    timestamp: "11:08 AM",
    isOwn: false,
    type: "text"
  },
  {
    id: "14",
    content: "Absolutely! We should schedule a meeting to discuss how to integrate it properly.",
    timestamp: "11:10 AM",
    isOwn: true,
    type: "text"
  },
  {
    id: "15",
    content: "Great idea! How about tomorrow at 2 PM? I'll send you a calendar invite.",
    timestamp: "11:12 AM",
    isOwn: false,
    type: "text"
  },
  {
    id: "16",
    content: "Perfect! I'll be there. Looking forward to it!",
    timestamp: "11:15 AM",
    isOwn: true,
    type: "text"
  },
  {
    id: "17",
    content: "Me too! This is going to be a game changer for our user experience.",
    timestamp: "11:18 AM",
    isOwn: false,
    type: "text"
  },
  {
    id: "18",
    content: "Definitely! I'll prepare some mockups to show you during the meeting.",
    timestamp: "11:20 AM",
    isOwn: true,
    type: "text"
  },
  {
    id: "19",
    content: "That would be fantastic! I love seeing your design process.",
    timestamp: "11:25 AM",
    isOwn: false,
    type: "text"
  },
  {
    id: "20",
    content: "Thanks! I'll make sure to include all the different states and interactions.",
    timestamp: "11:28 AM",
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