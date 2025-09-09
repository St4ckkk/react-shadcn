import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, ArrowRight, CheckCircle } from "lucide-react"
import OTPForm from "@/components/forgot-password/otp-form"
import NewPasswordForm from "@/components/forgot-password/new-password-form"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const [currentForm, setCurrentForm] = useState<'email' | 'otp' | 'password'>('email')

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Password reset request:", { email })
    setCurrentForm('otp')
    setCurrentStep(2)
  }

  const handleOTPBack = () => {
    setCurrentForm('email')
    setCurrentStep(1)
  }

  const handleOTPNext = () => {
    setCurrentForm('password')
    setCurrentStep(3)
    console.log("OTP verified, moving to password reset")
  }

  const handlePasswordBack = () => {
    setCurrentForm('otp')
    setCurrentStep(2)
  }

  const handlePasswordComplete = () => {
    console.log("Password reset completed successfully")
    setCurrentStep(4)
  }

  const steps = [
    {
      number: 1,
      title: "Verify Email",
      description: "Enter your account email",
      active: currentStep >= 1,
      completed: currentStep > 1
    },
    {
      number: 2,
      title: "Enter OTP",
      description: "Enter the 6-digit code sent to your email",
      active: currentStep >= 2,
      completed: currentStep > 2
    },
    {
      number: 3,
      title: "New Password",
      description: "Create a new secure password",
      active: currentStep >= 3,
      completed: currentStep > 3
    }
  ]

  const renderForm = () => {
    switch (currentForm) {
      case 'otp':
        return (
          <OTPForm 
            email={email}
            onBack={handleOTPBack}
            onNext={handleOTPNext}
          />
        )
      case 'password':
        return (
          <NewPasswordForm 
            email={email}
            onBack={handlePasswordBack}
            onComplete={handlePasswordComplete}
          />
        )
      default:
        return (
          <Card className="w-full max-w-md bg-gray-900 border-gray-700">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Lock className="w-6 h-6 text-white" />
                <CardTitle className="text-2xl text-white">Reset Password</CardTitle>
              </div>
              <p className="text-gray-300 text-sm">Secure your account with a new password</p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
                <p className="text-blue-200 text-sm">
                  Enter the email address associated with your account. We'll send you a verification code.
                </p>
              </div>
              
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-white focus:ring-white/20 pl-10"
                      required
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gray-200 text-gray-800 hover:bg-gray-100 font-medium"
                >
                  Send Verification Code
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
              
              <div className="text-center pt-4">
                <p className="text-gray-400 text-sm">
                  Remember your password?{" "}
                  <Button variant="link" className="p-0 h-auto text-sm text-blue-400 hover:text-blue-300">
                    <Link to="/login">Sign in</Link>
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <div className="min-h-screen flex bg-black rounded-lg">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Account Recovery</h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                Securely reset your password in three simple steps. We'll send you a one-time password to verify your email, then you can set a new password for your account.
              </p>
            </div>
            
            <div className="space-y-6">
              {steps.map((step, _index) => (
                <div key={step.number} className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed 
                      ? 'bg-green-500' 
                      : step.active 
                        ? 'bg-white text-black' 
                        : 'bg-gray-700 text-gray-400'
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <span className="text-sm font-bold">{step.number}</span>
                    )}
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${
                      step.active ? 'text-white' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center">
            {renderForm()}
          </div>
        </div>
      </div>
    </div>
  )
}