import { 
  Home, 
  Inbox, 
  Calendar, 
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
  Kanban,
//   Palette,
//   Database,
  BarChart3,
//   Sparkles,
//   AlertTriangle,
//   User
} from "lucide-react"

// Define the type for navigation items
export interface NavigationItem {
  title: string
  url: string
  icon: any
  badge?: number
}

export const mainItems: NavigationItem[] = [
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
  {
    title: "Kanban",
    url: "/kanban",
    icon: Kanban,
  }
]

export const pageItems: NavigationItem[] = [
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

export const componentItems: NavigationItem[] = [
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
    title: "Tables",
    url: "/pages/components/tables",
    icon: Table,
  },
  {
    title: "Charts",
    url: "/pages/components/charts",
    icon: ChartBar,
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


export const chartsComponents: NavigationItem[] = [
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

export const errorComponents: NavigationItem[] = [
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

export const settingsComponents: NavigationItem[] = [
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

export const authenticationComponents: NavigationItem[] = [
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

export const iconComponents: NavigationItem[] = [
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

// Dashboard items for command palette
export interface DashboardItem {
  name: string
  icon: any
  description: string
}

export const dashboards: DashboardItem[] = [
  {
    name: "Default",
    icon: HelpCircle,
    description: "Default dashboard view"
  },
  {
    name: "E-commerce",
    icon: CreditCard,
    description: "E-commerce analytics dashboard"
  },
  {
    name: "Sales",
    icon: ChartBar,
    description: "Sales performance dashboard"
  },
  {
    name: "CRM",
    icon: List,
    description: "Customer relationship management"
  },
  {
    name: "Website Analytics",
    icon: BarChart3,
    description: "Website traffic and analytics"
  },
  {
    name: "Project Management",
    icon: FolderClosed,
    description: "Project tracking and management"
  }
]

// All navigation items combined for search
export const allNavigationItems: NavigationItem[] = [
  ...mainItems,
  ...pageItems,
  ...componentItems,
  ...chartsComponents,
  ...errorComponents,
  ...settingsComponents,
  ...authenticationComponents,
  ...iconComponents
]
