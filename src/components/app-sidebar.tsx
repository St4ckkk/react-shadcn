import { Link, useLocation } from "react-router-dom"
import { 
  Calendar, 
  Home, 
  Inbox, 
  Search, 
  Settings, 
  ChevronRight,
  AlertTriangle,
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
} from "lucide-react"
import { useState, useEffect } from "react"

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
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

const pageItems = [
  {
    title: "Login",
    url: "/login",
    icon: ImageIcon,
  },
  {
    title: "Register",
    url: "/register",
    icon: ImageIcon,
  },
  {
    title: "Forgot Password",
    url: "/forgot-password",
    icon: ImageIcon,
  },
  {
    title: "404",
    url: "/404",
    icon: ImageIcon,
  },
  {
    title: "500",
    url: "/500",
    icon: ImageIcon,
  },
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
    title: "Alerts",
    url: "/components/alerts",
    icon: AlertTriangle,
  },
  {
    title: "Accordion",
    url: "/components/accordion",
    icon: Layers,
  },
  {
    title: "Badges",
    url: "/components/badges",
    icon: Badge,
  },
  {
    title: "Breadcrumbs",
    url: "/components/breadcrumbs",
    icon: Navigation,
  },
  {
    title: "Buttons",
    url: "/components/buttons",
    icon: MousePointer,
  },
  {
    title: "Cards",
    url: "/components/cards",
    icon: CreditCard,
  },
  {
    title: "Carousel",
    url: "/components/carousel",
    icon: ImageIcon,
  },
  {
    title: "List group",
    url: "/components/list-group",
    icon: List,
  },
  {
    title: "Modal",
    url: "/components/modal",
    icon: Square,
  },
  {
    title: "Tabs",
    url: "/components/tabs",
    icon: Layout,
  },
  {
    title: "Pagination",
    url: "/components/pagination",
    icon: FileText,
  },
  {
    title: "Progress",
    url: "/components/progress",
    icon: CircleDot,
  },
  {
    title: "Spinners",
    url: "/components/spinners",
    icon: Loader2,
  },
  {
    title: "Tooltips",
    url: "/components/tooltips",
    icon: HelpCircle,
  },
]

const tablesComponents = [
  {
    title: "General Tables",
    url: "/tables/general",
    icon: Table,
  },
  {
    title: "Data Tables",
    url: "/tables/data",
    icon: Table,
  },
]

const chartsComponents = [
  {
    title: "Chart.js",
    url: "/charts/chartjs",
    icon: ChartBar
  },
  {
    title: "Recharts",
    url: "/charts/recharts",
    icon: ChartArea
  },
  {
    title: "ApexCharts",
    url: "/charts/apexcharts",
    icon: ChartBarBig
  },
  {
    title: "ECharts",
    url: "/charts/echarts",
    icon: ChartPie
  }
]

const iconComponents = [
  {
    title: "Lucide",
    url: "/icons/lucide",
    icon: ImageIcon
  },
  {
    title: "Bootstrap Icons",
    url: "/icons/bootstrap",
    icon: ImageIcon
  }
]

function CollapsibleSection({ 
  section, 
  isOpen, 
  setIsOpen
}: { 
  section: { id: string; title: string; items: typeof componentItems }
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
              className="cursor-pointer w-full justify-start"
            >
              <ChevronRight 
                className={`transition-transform duration-200 ${
                  isOpen ? 'rotate-90' : ''
                }`} 
              />
              <span>{section.title}</span>
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
  const [isLoading, setIsLoading] = useState(true)
  const [isComponentsOpen, setIsComponentsOpen] = useState(false)
  const [isTablesOpen, setIsTablesOpen] = useState(false)
  const [isChartsOpen, setIsChartsOpen] = useState(false)
  const [isIconsOpen, setIsIconsOpen] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])
  
  const collapsibleSections = [
    {
      id: 'components',
      title: 'UI Components',
      items: componentItems,
    },
    {
      id: 'tables',
      title: 'Tables', 
      items: tablesComponents,
    },
    {
      id: 'charts',
      title: 'Charts', 
      items: chartsComponents,
    },
    {
      id: 'icons',
      title: 'Icons', 
      items: iconComponents,
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
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {collapsibleSections.map((section, index) => {
            const stateMap = [isComponentsOpen, isTablesOpen, isChartsOpen, isIconsOpen]
            const setStateMap = [setIsComponentsOpen, setIsTablesOpen, setIsChartsOpen, setIsIconsOpen]
            
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