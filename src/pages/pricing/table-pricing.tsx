import { useState } from "react"
import { Check, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import MainLayout from "@/components/layout/main-layout"

const pricingPlans = {
  monthly: [
    {
      name: "Student",
      description: "Perfect for learning and personal projects",
      price: "$9.99",
      period: "/month",
      features: {
        "Projects": "1 project",
        "Templates": "Basic only",
        "Support": "Community",
        "GitHub integration": true,
        "API access": false,
        "Team collaboration": false,
        "Custom branding": false
      },
      buttonText: "Start Learning",
      badge: undefined
    },
    {
      name: "Developer",
      description: "Advanced tools for professional development",
      price: "$19.99",
      period: "/month",
      features: {
        "Projects": "5 projects",
        "Templates": "All templates",
        "Support": "Priority",
        "GitHub integration": true,
        "API access": true,
        "Team collaboration": true,
        "Custom branding": false
      },
      buttonText: "Go Pro",
      badge: undefined
    },
    {
      name: "Team",
      description: "Complete solution for development teams",
      price: "$49.99",
      period: "/month",
      features: {
        "Projects": "Unlimited projects",
        "Templates": "All templates",
        "Support": "24/7 support",
        "GitHub integration": true,
        "API access": true,
        "Team collaboration": true,
        "Custom branding": true
      },
      buttonText: "Scale Up",
      badge: undefined
    }
  ],
  yearly: [
    {
      name: "Student",
      description: "Perfect for learning and personal projects",
      price: "$79.99",
      period: "/year",
      features: {
        "Projects": "2 projects",
        "Templates": "Basic + Premium",
        "Support": "Community",
        "GitHub integration": true,
        "API access": false,
        "Team collaboration": false,
        "Custom branding": false
      },
      buttonText: "Start Learning",
      badge: "Save 33%"
    },
    {
      name: "Developer",
      description: "Advanced tools for professional development",
      price: "$159.99",
      period: "/year",
      features: {
        "Projects": "10 projects",
        "Templates": "All templates",
        "Support": "Priority",
        "GitHub integration": true,
        "API access": true,
        "Team collaboration": true,
        "Custom branding": true
      },
      buttonText: "Go Pro",
      badge: "Save 33%"
    },
    {
      name: "Team",
      description: "Complete solution for development teams",
      price: "$399.99",
      period: "/year",
      features: {
        "Projects": "Unlimited projects",
        "Templates": "All templates",
        "Support": "24/7 support",
        "GitHub integration": true,
        "API access": true,
        "Team collaboration": true,
        "Custom branding": true
      },
      buttonText: "Scale Up",
      badge: "Save 33%"
    }
  ]
}

const features = [
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


export default function TablePricing() {
  const [isYearly, setIsYearly] = useState(false)
  const currentPlans = isYearly ? pricingPlans.yearly : pricingPlans.monthly

  return (
    <MainLayout
      title="Pricing"
      description="Choose the perfect plan for your needs with Klio Solutions."
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-4xl font-bold text-gray-900">Choose Your Plan</h1>
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
              Yearly
            </span>
          </div>
        </div>

        <Card className="mb-12 rounded-sm">
          <CardContent className="">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] text-left text-gray-500 font-medium">Features</TableHead>
                  {currentPlans.map((plan) => (
                    <TableHead key={plan.name} className="text-center relative">
                      <div className="py-4">
                        <div className="flex items-center justify-center">
                          <h3 className="text-md font-medium text-gray-500">{plan.name}</h3>
                          {plan.badge && (
                            <Badge className="bg-green-100 ml-2 rounded-xs text-green-600 border-green-200">
                              {plan.badge}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-gray-500 font-medium">Price</TableCell>
                  {currentPlans.map((plan) => (
                    <TableCell key={plan.name} className="text-center">
    <div>
                        <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-500">{plan.period}</span>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="text-gray-500 font-medium">Projects</TableCell>
                  {currentPlans.map((plan) => (
                    <TableCell key={plan.name} className="text-center">
                      {plan.features.Projects}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="text-gray-500 font-medium">Templates</TableCell>
                  {currentPlans.map((plan) => (
                    <TableCell key={plan.name} className="text-center">
                      {plan.features.Templates}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="text-gray-500 font-medium">Support</TableCell>
                  {currentPlans.map((plan) => (
                    <TableCell key={plan.name} className="text-center">
                      {plan.features.Support}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="text-gray-500   font-medium">GitHub Integration</TableCell>
                  {currentPlans.map((plan) => (
                    <TableCell key={plan.name} className="text-center">
                      {plan.features["GitHub integration"] ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-400 mx-auto" />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="text-gray-500 font-medium">API Access</TableCell>
                  {currentPlans.map((plan) => (
                    <TableCell key={plan.name} className="text-center">
                      {plan.features["API access"] ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-400 mx-auto" />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="text-gray-500 font-medium">Team Collaboration</TableCell>
                  {currentPlans.map((plan) => (
                    <TableCell key={plan.name} className="text-center">
                      {plan.features["Team collaboration"] ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-400 mx-auto" />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="text-gray-500   font-medium">Custom Branding</TableCell>
                  {currentPlans.map((plan) => (
                    <TableCell key={plan.name} className="text-center">
                      {plan.features["Custom branding"] ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-400 mx-auto" />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  {currentPlans.map((plan) => (
                    <TableCell key={plan.name} className="text-center py-6">
                      <Button className="w-50 bg-blue-600 hover:bg-blue-700 text-white rounded-xs">
                        {plan.buttonText}
                      </Button>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="mb-12">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
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