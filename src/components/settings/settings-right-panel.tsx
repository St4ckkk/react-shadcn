import { Link, useLocation } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const settingsSections = [
  { id: "profile", label: "Profile", path: "/pages/settings/profile" },
  { id: "account", label: "Account", path: "/pages/settings/account" },
  { id: "appearance", label: "Appearance", path: "/pages/settings/appearance" },
  { id: "notifications", label: "Notifications", path: "/pages/settings/notifications" },
  { id: "display", label: "Display", path: "/pages/settings/display" },
]

export default function SettingsRightPanel() {
  const location = useLocation()

  return (
    <div className="w-80">
      <Card>
        <CardContent className="">
          <nav className="space-y-1">
            {settingsSections.map((section) => {
              const isActive = location.pathname === section.path
              
              return (
                <Link
                  key={section.id}
                  to={section.path}
                  className={cn(
                    "flex w-full items-center rounded-sm px-2 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {section.label}
                </Link>
              )
            })}
          </nav>
        </CardContent>
      </Card>
    </div>
  )
}