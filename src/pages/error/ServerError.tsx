import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Home, RefreshCw } from "lucide-react"
import { Link } from "react-router-dom"

export default function ServerError() {
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="flex items-center justify-center p-30">
      <div className="w-full max-w-xl space-y-8">
        <Card className="bg-red-50 border border-red-200 relative overflow-hidden rounded-md">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(239, 68, 68, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(239, 68, 68, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />
          <CardContent className="relative p-12 text-center">
            <h1 className="text-8xl font-bold text-red-600 mb-4">500</h1>
            <p className="text-2xl font-medium text-gray-800">Server Error</p>
          </CardContent>
        </Card>
        
        <div className="text-center space-y-4">
          <p className="text-gray-600 text-sm">
            Something went wrong on our end. We're working to fix it.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={handleRefresh}
              variant="outline" 
              className="bg-white border border-gray-300 text-black hover:bg-gray-50"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            
            <Button asChild className="bg-white border border-gray-300 text-black hover:bg-gray-50">
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}