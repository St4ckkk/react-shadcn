import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X } from "lucide-react"
import SettingsHeader from "@/components/settings/settings-header"
import SettingsRightPanel from "@/components/settings/settings-right-panel"

export default function Profile() {
  const [username, setUsername] = useState("Klio Solutions")
  const [bio, setBio] = useState("I own a computer.")
  const [urls, setUrls] = useState([
    "https://klio.solutions",
    "http://twitter.com/klio.solutions"
  ])
  const [newUrl, setNewUrl] = useState("")

  const addUrl = () => {
    if (newUrl.trim()) {
      setUrls([...urls, newUrl.trim()])
      setNewUrl("")
    }
  }

  const removeUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index))
  }

  return (
    <div className="">
      <SettingsHeader />
      
      <div className="flex gap-6 mt-6">
        <div className="max-w-2xl">
          <Card>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shadcn@example.com">klio@example.com</SelectItem>
                    <SelectItem value="contact@shadcn.com">contact@klio.com</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  You can manage verified email addresses in your email settings.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">
                  You can @mention other users and organizations to link to them.
                </p>
              </div>

              <div className="space-y-2">
                <Label>URLs</Label>
                <p className="text-sm text-muted-foreground">
                  Add links to your website, blog, or social media profiles.
                </p>
                <div className="space-y-2">
                  {urls.map((url, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input value={url} readOnly />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeUrl(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Enter URL"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                    />
                    <Button variant="outline" onClick={addUrl}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add URL
                    </Button>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                Update profile
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <SettingsRightPanel />
      </div>
    </div>
  )
}