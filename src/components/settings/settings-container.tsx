import {type  ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface SettingsContainerProps {
  children: ReactNode
}

export default function SettingsContainer({ children }: SettingsContainerProps) {
  return (
    <div className="flex gap-6 mt-6">
      <div className="w-[600px]">
        <Card>
          <CardContent className="">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
