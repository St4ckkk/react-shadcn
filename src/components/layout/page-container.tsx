import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageContainerProps {
  children: ReactNode
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
}

const PageContainer = ({ 
  children, 
  className, 
  maxWidth = "full" 
}: PageContainerProps) => {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md", 
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full"
  }

  return (
    <div className={cn(
      "mx-auto w-full",
      maxWidthClasses[maxWidth],
      className
    )}>
      {children}
    </div>
  )
}

export default PageContainer