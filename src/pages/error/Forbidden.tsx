import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import { Link } from "react-router-dom"
import { useLoadingState } from "@/hooks/loading-state"
import { Skeleton } from "@/components/ui/skeleton"

export default function Forbidden() {
  const isLoading = useLoadingState(200)

  return (
    <div className="flex items-center justify-center p-10">
      <div className="w-full max-w-5xl space-y-8">
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
          <CardContent className="relative text-center p-8">
            <div className="">
              {isLoading ? (
                <Skeleton className="h-64 w-64 mx-auto" />
              ) : (
                <img 
                  src="/403.svg" 
                  alt="403 Forbidden" 
                  className="h-64 w-64 mx-auto"
                />
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              No Authorization
            </h1>
            
            <p className="text-gray-600 mb-8">
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