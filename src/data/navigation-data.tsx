import {
  Home,
  Inbox,
  Calendar,
  ImageIcon,
  FolderClosed,
  Kanban,
  StickyNote,
  //   Sparkles,
  //   AlertTriangle,
  //   User
} from "lucide-react"


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
  }
]

export const appItems: NavigationItem[] = [
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
  },
  {
    title: "Notes",
    url: "/notes",
    icon: StickyNote
  }
]


export const pageItems: NavigationItem[] = [
  // {
  //   title: "Users List",
  //   url: "/users-list",
  //   icon: ImageIcon,
  // },
]

export const emptyStatesComponents: NavigationItem[] = [
  {
    title: "Empty States",
    url: "/pages/empty-states",
    icon: ImageIcon
  }
]

export const pricingComponents: NavigationItem[] = [
  {
    title: "Column Pricing",
    url: "/pages/pricing/column",
    icon: ImageIcon
  },
  {
    title: "Table Pricing",
    url: "/pages/pricing/table",
    icon: ImageIcon
  },
  {
    title: "Single Pricing",
    url: "/pages/pricing/single",
    icon: ImageIcon
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






// All navigation items combined for search
export const allNavigationItems: NavigationItem[] = [
  ...mainItems,
  ...appItems,
  ...pageItems,
  ...errorComponents,
  ...settingsComponents,
  ...authenticationComponents,
]
