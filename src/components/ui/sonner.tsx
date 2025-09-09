import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      toastOptions={{
        style: {
          background: 'black',
          color: 'white',
          border: '--border',
        },
      }}
      style={
        {
          "--normal-bg": "white",
          "--normal-text": "black",
          "--normal-border": "#e5e7eb",
          "--success-bg": "white",
          "--success-text": "black",
          "--success-border": "#e5e7eb",
          "--error-bg": "white",
          "--error-text": "black",
          "--error-border": "#e5e7eb",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }