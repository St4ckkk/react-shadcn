import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, ArrowRight, ArrowLeft, CheckCircle, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { Link } from "react-router-dom"

interface NewPasswordFormProps {
  email: string
  onBack: () => void
  onComplete: () => void
}

export default function NewPasswordForm({ email, onBack, onComplete }: NewPasswordFormProps) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === confirmPassword && password.length >= 8) {
      setIsResetting(true)
      setTimeout(() => {
        setIsResetting(false)
        toast.success("Password Reset Successful!", {
          description: "Your password has been updated successfully. You can now sign in with your new password.",
          duration: 6000,
        })
        onComplete()
      }, 2000)
    } else {
      toast.error("Password Requirements Not Met", {
        description: "Please ensure your password meets all requirements and passwords match.",
        duration: 5000,
      })
    }
  }

  const passwordRequirements = [
    { text: "At least 8 characters", met: password.length >= 8 },
    { text: "One uppercase letter", met: /[A-Z]/.test(password) },
    { text: "One lowercase letter", met: /[a-z]/.test(password) },
    { text: "One number", met: /\d/.test(password) },
    { text: "One special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(password) }
  ]

  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0
  const isFormValid = password.length >= 8 && passwordsMatch

  return (
    <Card className="w-full max-w-md bg-gray-900 border-gray-700">
      <CardHeader className="text-center pt-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Lock className="w-6 h-6 text-white" />
          <CardTitle className="text-2xl text-white">Create New Password</CardTitle>
        </div>
        <p className="text-gray-300 text-sm">
          Set a strong password for <span className="text-white font-medium">{email}</span>
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6 p-8">
        <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
          <p className="text-green-200 text-sm">
            Your email has been verified. Now create a secure password for your account.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white font-medium">New Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-white focus:ring-white/20 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white font-medium">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-white focus:ring-white/20 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {confirmPassword.length > 0 && (
              <p className={`text-xs ${passwordsMatch ? 'text-green-400' : 'text-red-400'}`}>
                {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label className="text-white font-medium text-sm">Password Requirements</Label>
            <div className="space-y-1">
              {passwordRequirements.map((req, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    req.met ? 'bg-green-500' : 'bg-gray-600'
                  }`}>
                    {req.met && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`text-xs ${req.met ? 'text-green-400' : 'text-gray-400'}`}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1 border-gray-600 bg-gray-800 text-white hover:bg-gray-700 hover:border-gray-500"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button 
              type="submit" 
              disabled={!isFormValid || isResetting}
              className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-100 font-medium disabled:opacity-50"
            >
              {isResetting ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2 animate-spin" />
                  Resetting...
                </>
              ) : (
                <>
                  Reset Password
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
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