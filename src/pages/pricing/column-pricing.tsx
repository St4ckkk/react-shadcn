import { useState } from "react"
import { Check, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
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

const faqs = [
  {
    question: "What technologies are supported?",
    answer: "We support React, Vue, Angular, Next.js, Nuxt.js, and many other modern frameworks and libraries."
  },
  {
    question: "Can I use templates for commercial projects?",
    answer: "Yes, all our templates come with commercial licenses. You can use them for client work and commercial projects."
  },
  {
    question: "Is there a limit to how many projects I can create?",
    answer: "Project limits depend on your plan. Student plan allows 1 project, Developer plan allows 5 projects, and Team plan has unlimited projects."
  },
  {
    question: "Do you offer a free trial?",
    answer: "Yes, we offer a 7-day free trial for all new users to explore our templates and tools."
  },
  {
    question: "Can I get help with custom development?",
    answer: "Yes, our Team plan includes dedicated support and custom development services for complex projects."
  }
]

export default function ColumnPricing() {
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

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {currentPlans.map((plan, _index) => (
            <Card key={plan.name} className="relative rounded-sm border border-gray-200 flex flex-col">
              {plan.badge && (
                <Badge className="rounded-xs absolute top-2 right-2 border border-green-400 bg-green-100 text-green-400">
                  {plan.badge}
                </Badge>
              )}
              <CardHeader className="">
                <CardTitle className="text-lg text-gray-900">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600 text-sm">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 pb-2 flex flex-col flex-grow">
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-6 flex-grow">
                  {Object.entries(plan.features).map(([featureName, featureValue], featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      {typeof featureValue === 'string' ? (
                        <span className="text-gray-700 font-medium">{featureValue}</span>
                      ) : featureValue ? (
                        <>
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{featureName}</span>
                        </>
                      ) : (
                        <>
                          <X className="h-5 w-5 text-red-400 flex-shrink-0" />
                          <span className="text-gray-400 line-through">{featureName}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
                <Button className="w-full rounded-xs bg-blue-600 hover:bg-blue-700 text-white block mt-auto">
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Why Choose Klio Solutions?</h2>
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

        <div>
          <h2 className="text-xl font-medium text-gray-900 mb-4">Frequently Asked Questions?</h2>
          <Card className="max-w-2xl py-4 border border-gray-200 rounded-sm">
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-100 last:border-b-0">
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                      <span className="text-gray-900 font-medium">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}