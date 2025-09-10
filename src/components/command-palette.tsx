import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  dashboards,
  mainItems, 
  pageItems, 
  componentItems, 
  chartsComponents, 
  errorComponents, 
  settingsComponents, 
  authenticationComponents, 
//   iconComponents,
//   allNavigationItems
} from "@/data/navigation-data"

interface CommandPaletteProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const CommandPalette = ({ isOpen, onOpenChange }: CommandPaletteProps) => {
  const navigate = useNavigate()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!isOpen)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [isOpen, onOpenChange])

  return (
    <CommandDialog open={isOpen} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <ScrollArea className="max-h-[300px]">
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Dashboards">
            {dashboards.map((dashboard) => (
              <CommandItem
                key={dashboard.name}
                value={dashboard.name}
                onSelect={() => {
                  onOpenChange(false)
                }}
              >
                <dashboard.icon className="text-gray-400 h-4 w-4 mr-2" />
                <span>{dashboard.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Navigation">
            {mainItems.map((item) => (
              <CommandItem
                key={item.title}
                value={item.title}
                onSelect={() => {
                  navigate(item.url)
                  onOpenChange(false)
                }}
              >
                <item.icon className="text-gray-400 h-4 w-4 mr-2" />
                <span>{item.title}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Pages">
            {pageItems.map((item) => (
              <CommandItem
                key={item.title}
                value={item.title}
                onSelect={() => {
                  navigate(item.url)
                  onOpenChange(false)
                }}
              >
                <item.icon className="text-gray-400 h-4 w-4 mr-2" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="UI Components">
            {componentItems.map((item) => (
              <CommandItem
                key={item.title}
                value={item.title}
                onSelect={() => {
                  navigate(item.url)
                  onOpenChange(false)
                }}
              >
                <item.icon className="text-gray-400 h-4 w-4 mr-2" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>


          <CommandGroup heading="Charts">
            {chartsComponents.map((item) => (
              <CommandItem
                key={item.title}
                value={item.title}
                onSelect={() => {
                  navigate(item.url)
                  onOpenChange(false)
                }}
              >
                <item.icon className="text-gray-400 h-4 w-4 mr-2" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Error Pages">
            {errorComponents.map((item) => (
              <CommandItem
                key={item.title}
                value={item.title}
                onSelect={() => {
                  navigate(item.url)
                  onOpenChange(false)
                }}
              >
                <item.icon className="text-gray-400 h-4 w-4 mr-2" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Settings">
            {settingsComponents.map((item) => (
              <CommandItem
                key={item.title}
                value={item.title}
                onSelect={() => {
                  navigate(item.url)
                  onOpenChange(false)
                }}
              >
                <item.icon className="text-gray-400 h-4 w-4 mr-2" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Authentication">
            {authenticationComponents.map((item) => (
              <CommandItem
                key={item.title}
                value={item.title}
                onSelect={() => {
                  navigate(item.url)
                  onOpenChange(false)
                }}
              >
                <item.icon className="text-gray-400 h-4 w-4 mr-2" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </ScrollArea>
    </CommandDialog>
  )
}

export default CommandPalette