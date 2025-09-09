import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays } from "lucide-react"
import { format } from "date-fns"
import SettingsHeader from "@/components/settings/settings-header"
import SettingsContainer from "@/components/settings/settings-container"
import SettingsRightPanel from "@/components/settings/settings-right-panel"

export default function Account() {
  const [name, setName] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState<Date>()
  const [language, setLanguage] = useState("")

  return (
    <div className="">
      <SettingsHeader />
      <div className="flex gap-6">
        <SettingsContainer>
          <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">
                  This is the name that will be displayed on your profile and in emails.
                           
                </p>
              </div>
@
              <div className="space-y-2">
                <Label>Date of birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative w-64">
                      <Input
                        placeholder="Pick a date"
                        value={dateOfBirth ? format(dateOfBirth, "PPP") : ""}
                        readOnly
                        className="cursor-pointer"
                      />
                      <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateOfBirth}
                      onSelect={setDateOfBirth}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-sm text-muted-foreground">
                  Your date of birth is used to calculate your age.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                    <SelectItem value="pt">Portuguese</SelectItem>
                    <SelectItem value="ru">Russian</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                    <SelectItem value="ko">Korean</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  This is the language that will be used in the dashboard.
                </p>
              </div>

              <Button className="">
                Update account
              </Button>
          </div>
        </SettingsContainer>
        
        <SettingsRightPanel />
      </div>
    </div>
  )
}