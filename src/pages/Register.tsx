import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Github, Gitlab } from "lucide-react"

export default function Register() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Register attempt:", { firstName, lastName, email, password, confirmPassword, agreeToTerms })
  }

  return (
    <div className="min-h-screen flex bg-black rounded-lg">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-white">Create your account</h1>
            <p className="text-gray-400 mt-2">Join us today and get started</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white font-medium">First name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-white focus:ring-white/20"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white font-medium">Last name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-white focus:ring-white/20"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-white focus:ring-white/20"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-white focus:ring-white/20"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white font-medium">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-white focus:ring-white/20"
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                id="agreeToTerms"
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-white focus:ring-white/20"
                required
              />
              <Label htmlFor="agreeToTerms" className="text-sm text-gray-300">
                I agree to the{" "}
                <Button variant="link" className="p-0 h-auto text-sm text-gray-300 hover:text-white">
                  Terms of Service
                </Button>{" "}
                and{" "}
                <Button variant="link" className="p-0 h-auto text-sm text-gray-300 hover:text-white">
                  Privacy Policy
                </Button>
              </Label>
            </div>
            
            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-100 font-medium">
              Create account
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-gray-400 font-medium">
                or continue with
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full border-gray-600 bg-gray-800 text-white hover:bg-gray-700 hover:border-gray-500">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
            
            <Button variant="outline" className="w-full border-gray-600 bg-gray-800 text-white hover:bg-gray-700 hover:border-gray-500">
              <Github className="w-4 h-4 mr-1" />
              Continue with GitHub
            </Button>
            
            <Button variant="outline" className="w-full border-gray-600 bg-gray-800 text-white hover:bg-gray-700 hover:border-gray-500">
              <Gitlab className="w-4 h-4 mr-2" />
              Continue with GitLab
            </Button>
          </div>
          
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Button variant="link" className="p-0 h-auto text-sm text-white hover:text-gray-300">
                <Link to="/login">Sign in</Link>
              </Button>
            </p>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:flex lg:flex-1">
        <div 
          className="w-full bg-cover bg-center rounded-tr-lg rounded-br-lg"
          style={{
            backgroundImage: 'url(/klio-logo.jpg)'
          }}
        >
          <div className="h-full bg-black/20 rounded-tr-lg rounded-br-lg"></div>
        </div>
      </div>
    </div>
  )
}