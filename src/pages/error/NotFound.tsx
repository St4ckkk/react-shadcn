import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useIsMobile } from "@/hooks/use-mobile"

export default function NotFound() {
  const isMobile = useIsMobile()

  return (
    <div className={`flex items-center justify-center ${isMobile ? 'p-4' : 'p-30'}`}>
      <div className={`w-full space-y-8 ${isMobile ? 'max-w-sm' : 'max-w-xl'}`}>
        <Card className="bg-gray-50 border border-gray-200 relative overflow-hidden rounded-md">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />
          <CardContent className={`relative text-center ${isMobile ? 'p-6' : 'p-12'}`}>
            <h1 className={`font-bold text-black mb-4 ${isMobile ? 'text-6xl' : 'text-8xl'}`}>404</h1>
            <p className={`font-medium text-black ${isMobile ? 'text-lg' : 'text-2xl'}`}>Page Not Found</p>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <Button asChild className="bg-white border border-gray-300 text-black hover:bg-gray-50">
            <Link to="/" className="flex items-center gap-2">
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}