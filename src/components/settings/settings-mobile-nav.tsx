import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

const settingsSections = [
  { id: "profile", label: "Profile", path: "/pages/settings/profile" },
  { id: "account", label: "Account", path: "/pages/settings/account" },
  { id: "appearance", label: "Appearance", path: "/pages/settings/appearance" },
  { id: "notifications", label: "Notifications", path: "/pages/settings/notifications" },
]

export default function SettingsMobileNav() {
  const location = useLocation()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 md:hidden z-50">
      <div className="flex justify-around">
        {settingsSections.map((section) => {
          const isActive = location.pathname === section.path
          
          return (
            <Link
              key={section.id}
              to={section.path}
              className={cn(
                "flex-1 text-center px-3 py-2 text-xs font-medium transition-colors rounded-lg",
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              {section.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
