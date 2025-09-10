import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import { Link } from "react-router-dom"
import { useLoadingState } from "@/hooks/loading-state"
import { Skeleton } from "@/components/ui/skeleton"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Forbidden() {
  const isMobile = useIsMobile()
  const isLoading = useLoadingState(200)

  return (
    <div className={`flex items-center justify-center ${isMobile ? 'p-4' : 'p-10'}`}>
      <div className={`w-full space-y-8 ${isMobile ? 'max-w-sm' : 'max-w-5xl'}`}>
        <Card className="bg-orange-50 border border-orange-200 relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />
          <CardContent className={`relative text-center ${isMobile ? 'p-6' : 'p-8'}`}>
            <div className="">
              {isLoading ? (
                <Skeleton className={`mx-auto ${isMobile ? 'h-48 w-48' : 'h-64 w-64'}`} />
              ) : (
                <img 
                  src="/403.svg" 
                  alt="403 Forbidden" 
                  className={`mx-auto ${isMobile ? 'h-48 w-48' : 'h-64 w-64'}`}
                />
              )}
            </div>
            
            <h1 className={`font-bold text-gray-800 mb-4 ${isMobile ? 'text-xl' : 'text-3xl'}`}>
              No Authorization
            </h1>
            
            <p className={`text-gray-600 mb-8 ${isMobile ? 'text-sm' : 'text-base'}`}>
              You do not appear to have permission to access this page
            </p>
            
            <Button asChild className="bg-black hover:bg-gray-800 text-white">
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Go to home
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}