import type { ReactNode } from "react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { useLocation } from "react-router-dom"

interface MainLayoutProps {
  children: ReactNode
  title?: string
  description?: string
}

const MainLayout = ({ children, title, description }: MainLayoutProps) => {
  const location = useLocation()
  
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean)
    const breadcrumbs = []
    
   
    if (location.pathname !== '/') {
      breadcrumbs.push({
        label: 'Home',
        href: '/',
        isCurrentPage: false
      })
    }
    
    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const isLast = index === pathSegments.length - 1
      
      breadcrumbs.push({
        label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
        href: currentPath,
        isCurrentPage: isLast
      })
    })
    
    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {title || 'Dashboard'}
          </h1>
          {description && (
            <p className="text-muted-foreground mt-2">
              {description}
            </p>
          )}
        </div>
        {/* Only show breadcrumbs if there are any */}
        {breadcrumbs.length > 0 && (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.href} className="flex items-center">
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {crumb.isCurrentPage ? (
                      <BreadcrumbPage className="font-medium">
                        {crumb.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={crumb.href}>
                        {crumb.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>
      
      {children}
    </div>
  )
}

export default MainLayout