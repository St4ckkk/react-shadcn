import type { ReactNode } from "react"
import { useState } from "react"

interface ImageBannerProps {
  onClose: () => void
  action: ReactNode
  title: ReactNode
  image: ReactNode
  renderInteractiveArea?: (props: { children: ReactNode }) => ReactNode
  className?: string
}

const ImageBanner = ({
  onClose,
  action,
  title,
  image,
  renderInteractiveArea,
  className = ""
}: ImageBannerProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const content = (
    <div 
      className={`relative h-[550px] overflow-hidden rounded-lg shadow-lg cursor-pointer transition-all duration-500 ease-out ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`absolute inset-0 transition-transform duration-500 ease-out ${isHovered ? 'scale-105' : 'scale-100'}`}
      >
        {image}
      </div>
      
      <div 
        className={`absolute inset-0 transition-all duration-500 ease-out ${isHovered ? 'bg-black/30' : 'bg-black/20'}`} 
      />
      
      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        <div className="text-white">
          {title}
        </div>
        
        <div className="flex justify-end">
          <div 
            className={`transition-transform duration-500 ease-out ${isHovered ? 'scale-105' : 'scale-100'}`}
          >
            {action}
          </div>
        </div>
      </div>
    </div>
  )

  if (renderInteractiveArea) {
    return renderInteractiveArea({ children: content })
  }

  return content
}

export default ImageBanner