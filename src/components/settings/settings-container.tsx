import {type  ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface SettingsContainerProps {
  children: ReactNode
}

export default function SettingsContainer({ children }: SettingsContainerProps) {
  return (
    <div className="flex gap-6 mt-6 md:px-0">
      <div className="w-full max-w-[600px]">
        <Card className="rounded-sm border border-gray-200">
          <CardContent className="px-4 py-4">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}