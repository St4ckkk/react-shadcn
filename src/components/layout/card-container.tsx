import { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CardContainerProps {
  children: ReactNode
  title?: string
  description?: string
  className?: string
}

const CardContainer = ({ 
  children, 
  title, 
  description, 
  className 
}: CardContainerProps) => {
  return (
    <Card className={cn("w-full", className)}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

export default CardContainer