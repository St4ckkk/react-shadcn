import { Link, useLocation } from "react-router-dom"
import { 
  Calendar, 
  Home, 
  Inbox, 
  Settings, 
  ChevronRight,
  Layers,
  Badge,
  Navigation,
  MousePointer,
  CreditCard,
  ImageIcon,
  List,
  Square,
  Layout,
  FileText,
  CircleDot,
  Loader2,
  HelpCircle,
  Table,
  ChartBar,
  ChartArea,
  ChartBarBig,
  ChartPie,
  FolderClosed,
  Palette,
  Database,
  BarChart3,
  Sparkles,
  AlertTriangle,
  User
} from "lucide-react"
import { useState } from "react"

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

const mainItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
    badge: 19,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "File Manager",
    url: "/file-manager",
    icon: FolderClosed,
  },
]

const pageItems = [
  {
    title: "Blank",
    url: "/blank",
    icon: ImageIcon,
  },
  {
    title: "Pricing",
    url: "/pricing",
    icon: ImageIcon,
  },
  {
    title: "Contact",
    url: "/contact",
    icon: ImageIcon,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: ImageIcon
  }
]

const componentItems = [
  {
    title: "Accordion",
    url: "/pages/components/accordion",
    icon: Layers,
  },
  {
    title: "Badges",
    url: "/pages/components/badges",
    icon: Badge,
  },
  {
    title: "Breadcrumbs",
    url: "/pages/components/breadcrumbs",
    icon: Navigation,
  },
  {
    title: "Buttons",
    url: "/pages/components/buttons",
    icon: MousePointer,
  },
  {
    title: "Cards",
    url: "/pages/components/cards",
    icon: CreditCard,
  },
  {
    title: "Carousel",
    url: "/pages/components/carousel",
    icon: ImageIcon,
  },
  {
    title: "List group",
    url: "/pages/components/list-group",
    icon: List,
  },
  {
    title: "Modal",
    url: "/pages/components/modal",
    icon: Square,
  },
  {
    title: "Tabs",
    url: "/pages/components/tabs",
    icon: Layout,
  },
  {
    title: "Pagination",
    url: "/pages/components/pagination",
    icon: FileText,
  },
  {
    title: "Progress",
    url: "/pages/components/progress",
    icon: CircleDot,
  },
  {
    title: "Spinners",
    url: "/pages/components/spinners",
    icon: Loader2,
  },
  {
    title: "Tooltips",
    url: "/pages/components/tooltips",
    icon: HelpCircle,
  },
]

const tablesComponents = [
  {
    title: "General Tables",
    url: "/pages/tables/general",
    icon: Table,
  },
  {
    title: "Data Tables",
    url: "/pages/tables/data",
    icon: Table,
  },
]

const chartsComponents = [
  {
    title: "Chart.js",
    url: "/pages/charts/chartjs",
    icon: ChartBar
  },
  {
    title: "Recharts",
    url: "/pages/charts/recharts",
    icon: ChartArea
  },
  {
    title: "ApexCharts",
    url: "/pages/charts/apexcharts",
    icon: ChartBarBig
  },
  {
    title: "ECharts",
    url: "/pages/charts/echarts",
    icon: ChartPie
  }
]

const errorComponents = [
  {
    title: "404",
    url: "/pages/error/404",
    icon: ImageIcon
  },
  {
    title: "500",
    url: "/pages/error/500",
    icon: ImageIcon
  },
  {
    title: "403",
    url: "/pages/error/403",
    icon: ImageIcon
  },
  {
    title: "401",
    url: "/pages/error/401",
    icon: ImageIcon
  }
]

const settingsComponents = [
  {
    title: "Profile",
    url: "/pages/settings/profile",
    icon: ImageIcon
  },
  {
    title: 'Account',
    url: "/pages/settings/account",
    icon: ImageIcon
  },
  {
    title: 'Appearances',
    url: "/pages/settings/appearance",
    icon: ImageIcon
  },
  {
    title: 'Notifications',
    url: "/pages/settings/notifications",
    icon: ImageIcon
  },
]

const authenticationComponents = [
  {
    title: "Login",
    url: "/pages/authentication/login",
    icon: ImageIcon
  },
  {
    title: "Register",
    url: "/pages/authentication/register",
    icon: ImageIcon
  },
  {
    title: "Forgot Password",
    url: "/pages/authentication/forgot-password",
    icon: ImageIcon
  }
]

const iconComponents = [
  {
    title: "Lucide",
    url: "/pages/icons/lucide",
    icon: ImageIcon
  },
  {
    title: "Bootstrap Icons",
    url: "/pages/icons/bootstrap",
    icon: ImageIcon
  }
] 

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
      id: 'tables',
      title: 'Tables', 
      items: tablesComponents,
      icon: Database,
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