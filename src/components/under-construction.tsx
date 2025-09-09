import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function UnderConstruction() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-xl overflow-hidden p-4">
        <div className="h-60 bg-cover bg-center relative" style={{backgroundImage: 'url(/klio-banner.svg)'}}>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Under Construction</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
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