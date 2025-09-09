import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface OTPFormProps {
  email: string
  onBack: () => void
  onNext: () => void
}

export default function OTPForm({ email, onBack, onNext }: OTPFormProps) {
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)
  const [canResend, setCanResend] = useState(false)
  const [resendCount, setResendCount] = useState(0)

  // Progressive timer: 60s, 120s, 300s
  const getTimerDuration = (count: number) => {
    if (count === 0) return 60
    if (count === 1) return 120
    return 300
  }

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [resendTimer])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length === 6) {
      setIsVerifying(true)
      setTimeout(() => {
        setIsVerifying(false)
        onNext()
      }, 1500)
    }
  }

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setOtp(value)
  }

  const handleResendCode = () => {
    if (canResend && resendCount < 5) {
      const newCount = resendCount + 1
      const timerDuration = getTimerDuration(newCount)
      
      setResendCount(newCount)
      setResendTimer(timerDuration)
      setCanResend(false)
      
      toast.success("Verification code sent!", {
        description: `A new 6-digit code has been sent to your email.${newCount > 2 ? ' Please check your spam folder.' : ''}`,
        duration: 4000,
      })
    } else if (resendCount >= 5) {
      toast.error("Maximum resend attempts reached", {
        description: "You've reached the daily limit. Please try again tomorrow or contact support.",
        duration: 5000,
      })
    }
  }

  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split('@')
    if (localPart.length <= 2) {
      return email
    }
    const maskedLocal = localPart[0] + '*'.repeat(localPart.length - 2) + localPart[localPart.length - 1]
    return `${maskedLocal}@${domain}`
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Card className="w-full max-w-md bg-gray-900 border-gray-700">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Lock className="w-6 h-6 text-white" />
          <CardTitle className="text-2xl text-white">Enter Verification Code</CardTitle>
        </div>
        <p className="text-gray-300 text-sm">
          We've sent a 6-digit code to <span className="text-white font-medium">{maskEmail(email)}</span>
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
          <p className="text-blue-200 text-sm">
            Enter the 6-digit verification code sent to your email address.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp" className="text-white font-medium">Verification Code</Label>
            <Input
              id="otp"
              type="text"
              placeholder="000000"
              value={otp}
              onChange={handleOtpChange}
              className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-white focus:ring-white/20 text-center text-2xl tracking-widest font-mono"
              maxLength={6}
              required
            />
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
              disabled={otp.length !== 6 || isVerifying}
              className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-100 font-medium disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify Code
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
        
        <div className="text-center space-y-2">
          <p className="text-gray-400 text-sm">
            Didn't receive the code?{" "}
            {canResend && resendCount < 5 ? (
              <Button 
                variant="link" 
                onClick={handleResendCode}
                className="p-0 h-auto text-sm text-blue-400 hover:text-blue-300"
              >
                Resend code
              </Button>
            ) : resendCount >= 5 ? (
              <span className="text-red-400 text-sm">
                Daily limit reached
              </span>
            ) : (
              <span className="text-gray-500 text-sm">
                Resend in {formatTime(resendTimer)}
              </span>
            )}
          </p>
          <p className="text-gray-500 text-xs">
            Check your spam folder if you don't see it in your inbox
          </p>
        </div>
      </CardContent>
    </Card>
  )
}