import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SettingsHeader from "@/components/settings/settings-header"
import SettingsContainer from "@/components/settings/settings-container"
import SettingsRightPanel from "@/components/settings/settings-right-panel"

export default function Appearance() {
  const [font, setFont] = useState("Inter")
  const [theme, setTheme] = useState("light")

  return (
    <div className="">
      <SettingsHeader />
      
      <div className="flex gap-6">
        <SettingsContainer>
          <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="font">Font</Label>
                <Select value={font} onValueChange={setFont}>
                  <SelectTrigger className="w-70">
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

              <div className="space-y-2">
                <Label>Theme</Label>
                <p className="text-sm text-muted-foreground">
                  Select the theme for the dashboard.
                </p>
                <div className="flex gap-4">
                  <div 
                    className={`relative cursor-pointer border-2 rounded-lg p-4 transition-all ${
                      theme === 'light' ? 'border-foreground' : 'border-border'
                    }`}
                    onClick={() => setTheme('light')}
                  >
                    <div className="w-32 h-20 bg-white border rounded flex flex-col gap-2 p-2">
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
                    className={`relative cursor-pointer border-2 rounded-lg p-4 transition-all ${
                      theme === 'dark' ? 'border-foreground' : 'border-border'
                    }`}
                    onClick={() => setTheme('dark')}
                  >
                    <div className="w-32 h-20 bg-slate-900 border rounded flex flex-col gap-2 p-2">
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

              <Button className="">
                Update preferences
              </Button>
          </div>
        </SettingsContainer>
        
        <SettingsRightPanel />
      </div>
    </div>
  )
}