import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import { 
  Palette,
  BarChart3,
  Sparkles,
  AlertTriangle,
  User,
  Settings
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge as UIBadge } from "@/components/ui/badge"
import { useLoadingState } from "@/hooks/loading-state"
import { ChevronRight } from "lucide-react"
import { 
  mainItems, 
  pageItems, 
  componentItems, 
  chartsComponents, 
  errorComponents, 
  settingsComponents, 
  authenticationComponents, 
  iconComponents 
} from "@/data/navigation-data"

function CollapsibleSection({ 
  section, 
  isOpen, 
  setIsOpen
}: { 
  section: { id: string; title: string; items: typeof componentItems; icon: any }
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}) {
  const location = useLocation()

  if (!section || !section.items) {
    return null
  }

  return (
    <SidebarGroup className="-my-2">
      <SidebarGroupContent className="px-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer w-full justify-between"
            >
              <div className="flex items-center gap-2">
                <section.icon className="h-4 w-4" />
                <span>{section.title}</span>
              </div>
              <ChevronRight 
                className={`h-4 w-4 transition-transform duration-200 ${
                  isOpen ? 'rotate-90' : ''
                }`} 
              />
            </SidebarMenuButton>
            {isOpen && (
              <SidebarMenuSub>
                {section.items.map((item) => (
                  <SidebarMenuSubItem key={item.title}>
                    <SidebarMenuSubButton 
                      asChild
                      isActive={location.pathname === item.url}
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>    
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export function AppSidebar() {
  const location = useLocation()
  const [isComponentsOpen, setIsComponentsOpen] = useState(false)
  const [isTablesOpen, setIsTablesOpen] = useState(false)
  const [isChartsOpen, setIsChartsOpen] = useState(false)
  const [isIconsOpen, setIsIconsOpen] = useState(false)
  const [isErrorOpen, setIsErrorOpen] = useState(false)
  const [isAuthenticationOpen, setIsAuthenticationOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const isLoading = useLoadingState(200)
  
  const collapsibleSections = [
    {
      id: 'components',
      title: 'UI Components',
      items: componentItems,
      icon: Palette,
    },
    {
      id: 'charts',
      title: 'Charts', 
      items: chartsComponents,
      icon: BarChart3,
    },
    {
      id: 'icons',
      title: 'Icons', 
      items: iconComponents,
      icon: Sparkles,
    },
    {
      id: 'error',
      title: 'Error', 
      items: errorComponents,
      icon: AlertTriangle,
    },
    {
      id: 'authentication',
      title: 'Authentication', 
      items: authenticationComponents,
      icon: User,
    },
    {
      id: 'settings',
      title: 'Settings', 
      items: settingsComponents,
      icon: Settings,
    }
  ]

  if (isLoading) {
    return (
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </SidebarHeader>
        
        <ScrollArea className="h-[calc(100vh-4rem)] smooth-scrollbar">
          <SidebarContent className="gap-1">
            <SidebarGroup className="py-1">
              <SidebarGroupLabel className="px-2 py-1">Main Navigation</SidebarGroupLabel>
              <SidebarGroupContent className="px-1">
                <SidebarMenu>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <SidebarMenuItem key={i}>
                      <SidebarMenuButton>
                        <Skeleton className="h-4 w-4 rounded" />
                        <Skeleton className="h-4 w-20" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {Array.from({ length: 4 }).map((_, i) => (
              <SidebarGroup key={i} className="-my-2">
                <SidebarGroupContent className="px-1">
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Skeleton className="h-4 w-4 rounded" />
                        <Skeleton className="h-4 w-24" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}

            <SidebarGroup className="py-1">
              <SidebarGroupLabel className="px-2 py-1">Pages</SidebarGroupLabel>
              <SidebarGroupContent className="px-1">
                <SidebarMenu>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <SidebarMenuItem key={i}>
                      <SidebarMenuButton>
                        <Skeleton className="h-4 w-4 rounded" />
                        <Skeleton className="h-4 w-16" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </ScrollArea>
      </Sidebar>
    )
  }
    
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <img 
            src="/klio-logo.svg" 
            alt="Klio Logo" 
            className="h-8 w-8 rounded-lg border border-sidebar-border"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Klio</span>
            <span className="text-xs text-sidebar-foreground/70">Solutions</span>
          </div>
        </div>
      </SidebarHeader>
      
      <ScrollArea className="h-[calc(100vh-4rem)] smooth-scrollbar">
        <SidebarContent className="gap-1">
          <SidebarGroup className="py-1">
            <SidebarGroupLabel className="px-2 py-1">Main Navigation</SidebarGroupLabel>
            <SidebarGroupContent className="px-1">
              <SidebarMenu>
                {mainItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild
                      isActive={location.pathname === item.url}
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        {item.badge && item.badge > 0 && (
                          <UIBadge className="ml-auto bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center p-0">
                            {item.badge}
                          </UIBadge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {collapsibleSections.map((section, index) => {
            const stateMap = [isComponentsOpen, isTablesOpen, isChartsOpen, isIconsOpen, isErrorOpen, isAuthenticationOpen, isSettingsOpen]
            const setStateMap = [setIsComponentsOpen, setIsTablesOpen, setIsChartsOpen, setIsIconsOpen, setIsErrorOpen, setIsAuthenticationOpen, setIsSettingsOpen]
  
            return (
              <CollapsibleSection 
                key={section.id}
                section={section} 
                isOpen={stateMap[index]} 
                setIsOpen={setStateMap[index]}
              />
            )
          })}

          <SidebarGroup className="py-1">
            <SidebarGroupLabel className="px-2 py-1">Pages</SidebarGroupLabel>
            <SidebarGroupContent className="px-1">
              <SidebarMenu>
                {pageItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild
                      isActive={location.pathname === item.url}
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </ScrollArea>
    </Sidebar>
  )
}