import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useIsMobile } from "@/hooks/use-mobile"
import SettingsHeader from "@/components/settings/settings-header"
import SettingsContainer from "@/components/settings/settings-container"
import SettingsRightPanel from "@/components/settings/settings-right-panel"
import SettingsMobileNav from "@/components/settings/settings-mobile-nav"

export default function Appearance() {
  const isMobile = useIsMobile()
  const [font, setFont] = useState("Inter")
  const [theme, setTheme] = useState("light")

  return (
    <div className="">
      <SettingsHeader />
      
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} ${isMobile ? 'gap-4' : 'gap-6'} ${isMobile ? 'pb-20' : ''}`}>
        <SettingsContainer>
          <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="font">Font</Label>
                <Select value={font} onValueChange={setFont}>
                  <SelectTrigger className={`${isMobile ? 'w-full' : 'w-70'}`}>
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                    <SelectItem value="Open Sans">Open Sans</SelectItem>
                    <SelectItem value="Lato">Lato</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Set the font you want to use in the dashboard.
                </p>
              </div>
{/* add custom theme */}
              <div className="space-y-2">
                <Label>Theme</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Select the theme for the dashboard.
                </p>
                <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4`}>
                  <div 
                    className={`relative cursor-pointer border-2 rounded-lg p-2 transition-all ${
                      theme === 'light' ? 'border-foreground' : 'border-border'
                    }`}
                    onClick={() => setTheme('light')}
                  >
                    <div className={`${isMobile ? 'w-full h-20' : 'w-40 h-30'} bg-white border rounded flex flex-col gap-2 p-2`}>
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                      <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                      <div className="flex gap-1 mt-2">
                        <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                        <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-sm font-medium mt-2 text-center">Light</p>
                  </div>
                  
                  <div 
                    className={`relative cursor-pointer border-2 rounded-lg p-2 transition-all ${
                      theme === 'dark' ? 'border-foreground' : 'border-border'
                    }`}
                    onClick={() => setTheme('dark')}
                  >
                    <div className={`${isMobile ? 'w-full h-20' : 'w-40 h-30'} bg-slate-900 border rounded flex flex-col gap-2 p-2`}>
                      <div className="h-2 bg-slate-700 rounded w-full"></div>
                      <div className="h-2 bg-slate-700 rounded w-3/4"></div>
                      <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                      <div className="flex gap-1 mt-2">
                        <div className="w-4 h-4 bg-slate-700 rounded-full"></div>
                        <div className="w-4 h-4 bg-slate-700 rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-sm font-medium mt-2 text-center">Dark</p>
                  </div>
                </div>
              </div>

              <Button className={`${isMobile ? 'w-full' : ''}`}>
                Update preferences
              </Button>
          </div>
        </SettingsContainer>
        
        {!isMobile && <SettingsRightPanel />}
      </div>
      
      {isMobile && <SettingsMobileNav />}
    </div>
  )
}