import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"
import { useLoadingState } from "@/hooks/loading-state"
import { useIsMobile } from "@/hooks/use-mobile"

export default function UnderConstruction() {
  const isLoading = useLoadingState(200)
  const isMobile = useIsMobile()
  
  return (
    <div className={`flex items-center justify-center ${isMobile ? 'p-4' : 'p-30'}`}>
      <Card className={`w-full overflow-hidden p-3 ${isMobile ? 'max-w-sm' : 'max-w-xl'}`}>
        {isLoading ? (
          <Skeleton className={`w-full ${isMobile ? 'h-40' : 'h-60'}`} />
        ) : (
          <div className={`bg-cover bg-center relative ${isMobile ? 'h-40' : 'h-60'}`} style={{backgroundImage: 'url(/klio-banner.svg)'}}>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        )}
        <CardHeader className="text-center">
          <CardTitle className={`${isMobile ? 'text-xl' : 'text-2xl'}`}>Under Construction</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className={`text-muted-foreground ${isMobile ? 'text-sm' : 'text-base'}`}>
            This page is currently being developed.
          </p>
          
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}