import { useState } from "react"
import { Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import MainLayout from "@/components/layout/main-layout"
import { Separator } from "@/components/ui/separator"

const features = [
  "Unlimited projects and templates",
  "Advanced developer tools", 
  "Priority support and assistance",
  "GitHub integration and API access",
  "Team collaboration features",
  "Custom branding and white-label options"
]

const platformFeatures = [
  {
    title: "Modern Templates",
    description: "Access hundreds of modern, responsive templates built with latest technologies"
  },
  {
    title: "Developer Tools", 
    description: "Built-in tools for code generation, component library, and project scaffolding"
  },
  {
    title: "Community Support",
    description: "Join our active developer community and get help from experienced developers"
  }
]

export default function SinglePricing() {
  const [isYearly, setIsYearly] = useState(false)
  
  const pricing = {
    monthly: {
      price: "$14.99",
      period: "/month",
      badge: undefined
    },
    yearly: {
      price: "$149.99", 
      period: "/year",
      badge: "Save 17%"
    }
  }

  const currentPricing = isYearly ? pricing.yearly : pricing.monthly

  return (
    <MainLayout
      title="Pricing"
      description="Choose the perfect plan for your development needs with Klio Solutions."
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-5">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">Choose Your Development Plan</h1>
          <p className="text-lg text-gray-600">Accelerate your development with our comprehensive template and tool platform</p>
        </div>

        <Card className="mb-12 rounded-sm border border-gray-200">
          <CardContent className="px-5 py-2">
            <div className="flex md:flex-row flex-col">
              <div className="space-y-6 md:pr-8 flex-1">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Pro Plan</h2>
                  <p className="text-gray-600">Everything you need to build amazing applications</p>
                </div>
                
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <p className="text-sm text-gray-500">
                  All subscriptions come with a 7-day free trial. Cancel anytime.
                </p>
              </div>

              <div className="hidden md:block">
                <Separator orientation="vertical" className="h-auto" />
              </div>

              <div className="flex flex-col items-center relative justify-center space-y-6 p-0 md:pl-8 flex-1">
                {currentPricing.badge && (
                  <Badge className="bg-green-500 text-white self-end rounded-xs">
                    {currentPricing.badge}
                  </Badge>
                )}
                
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {currentPricing.price}
                  </div>
                  <div className="text-gray-500">{currentPricing.period}</div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`text-sm font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
                    Monthly
                  </span>
                  <Switch
                    checked={isYearly}
                    onCheckedChange={setIsYearly}
                    className="data-[state=checked]:bg-blue-600"
                  />
                  <span className={`text-sm font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
                    Annual
                  </span>
                </div>

                <Button className="w-55 rounded-xs bg-blue-600 hover:bg-blue-700 text-white text-lg py-3">
                  Get Started
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-12">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {platformFeatures.map((feature, index) => (
              <Card key={index} className="border border-gray-200 rounded-sm">
                <CardContent className="px-4 py-4">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-md text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}