import { MessageCircle, Users, Settings, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChatMobileNavProps {
  activeTab: 'chats' | 'calls' | 'groups' | 'settings'
  onTabChange: (tab: 'chats' | 'calls' | 'groups' | 'settings') => void
}

export function ChatMobileNav({ activeTab, onTabChange }: ChatMobileNavProps) {
  const tabs = [
    { id: 'chats' as const, label: 'Chats', icon: MessageCircle },
    { id: 'calls' as const, label: 'Calls', icon: Phone },
    { id: 'groups' as const, label: 'Groups', icon: Users },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 md:hidden z-50">
      <div className="flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 h-auto py-2 px-3 text-xs font-medium transition-colors",
                isActive
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}

