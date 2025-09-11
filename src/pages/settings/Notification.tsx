import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { useIsMobile } from "@/hooks/use-mobile"
import SettingsHeader from "@/components/settings/settings-header"
import SettingsContainer from "@/components/settings/settings-container"
import SettingsRightPanel from "@/components/settings/settings-right-panel"
import SettingsMobileNav from "@/components/settings/settings-mobile-nav"

export default function Notification() {
  const isMobile = useIsMobile()
  const [messagePreference, setMessagePreference] = useState("")
  const [communicationEmails, setCommunicationEmails] = useState(false)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [socialEmails, setSocialEmails] = useState(true)
  const [securityEmails, setSecurityEmails] = useState(false)
  const [mobileSettings, setMobileSettings] = useState(false)

  return (
    <div className="">
      <SettingsHeader />
      
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} ${isMobile ? 'gap-4' : 'gap-6'} ${isMobile ? 'pb-20' : ''}`}>
        <SettingsContainer>
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Notify me about...</h3>
              <RadioGroup value={messagePreference} onValueChange={setMessagePreference}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all" className="text-sm font-normal">All new messages</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="direct" id="direct" />
                  <Label htmlFor="direct" className="text-sm font-normal">Direct messages and mentions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nothing" id="nothing" />
                  <Label htmlFor="nothing" className="text-sm font-normal">Nothing</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Email Notifications</h3>
              <div className="space-y-3">
                <Card className="rounded-md">
                  <CardContent className={`${isMobile ? 'p-3' : 'pr-2 pl-2'}`}>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm">Communication emails</h4>
                        <p className="text-xs text-muted-foreground">
                          Receive emails about your account activity.
                        </p>
                      </div>
                      <Switch
                        checked={communicationEmails}
                        onCheckedChange={setCommunicationEmails}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-md">
                  <CardContent className={`${isMobile ? 'p-3' : 'pr-2 pl-2'}`}>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm">Marketing emails</h4>
                        <p className="text-xs text-muted-foreground">
                          Receive emails about new products, features, and more.
                        </p>
                      </div>
                      <Switch
                        checked={marketingEmails}
                        onCheckedChange={setMarketingEmails}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-md">
                  <CardContent className={`${isMobile ? 'p-3' : 'pr-2 pl-2'}`}>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm">Social emails</h4>
                        <p className="text-xs text-muted-foreground">
                          Receive emails for friend requests, follows, and more.
                        </p>
                      </div>
                      <Switch
                        checked={socialEmails}
                        onCheckedChange={setSocialEmails}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-md">
                  <CardContent className={`${isMobile ? 'p-3' : 'pr-2 pl-2'}`}>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm">Security emails</h4>
                        <p className="text-xs text-muted-foreground">
                          Receive emails about your account activity and security.
                        </p>
                      </div>
                      <Switch
                        checked={securityEmails}
                        onCheckedChange={setSecurityEmails}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex space-x-2">
                <Checkbox
                  id="mobile"
                  checked={mobileSettings}
                  onCheckedChange={(checked) => setMobileSettings(checked === "indeterminate" ? false : checked)}
                />
                <div className="space-y-1">
                  <Label htmlFor="mobile">Use different settings for my mobile devices</Label>
                  <p className="text-sm text-muted-foreground">
                    You can manage your mobile notifications in the mobile settings page.
                  </p>
                </div>
              </div>
            </div>

            <div className="">
              <Button className={`${isMobile ? 'w-full' : ''}`}>Update notifications</Button>
            </div>
          </div>
        </SettingsContainer>
        
        {!isMobile && <SettingsRightPanel />}
      </div>
      
      {isMobile && <SettingsMobileNav />}
      {/* add sonner */}
    </div>
  )
}