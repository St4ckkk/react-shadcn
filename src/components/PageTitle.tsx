import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/inbox': 'Inbox',
  '/calendar': 'Calendar',
  '/login': 'Sign In',
  '/register': 'Sign Up',
  '/forgot-password': 'Reset Password',
  '/pages/error/404': 'Page Not Found',
  '/pages/error/500': 'Internal Server Error',
  '/file-manager': 'File Manager',
  '/settings': 'Settings',
  '/pricing': 'Pricing',
  '/contact': 'Contact',
  '/profile': 'Profile',
}

export default function PageTitle() {
  const location = useLocation()
  const baseTitle = 'Klio Solutions'
  
  useEffect(() => {
    const pageTitle = pageTitles[location.pathname] || 'Dashboard'
    const fullTitle = `${pageTitle} - ${baseTitle}`
    document.title = fullTitle
  }, [location.pathname])

  return null
}
