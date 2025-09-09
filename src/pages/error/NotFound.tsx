import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center p-30">
      <div className="w-full max-w-xl space-y-8">
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
          <CardContent className="relative p-12 text-center">
            <h1 className="text-8xl font-bold text-black mb-4">404</h1>
            <p className="text-2xl font-medium text-black">Page Not Found</p>
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