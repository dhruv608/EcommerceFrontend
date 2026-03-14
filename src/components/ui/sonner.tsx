"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group toast-premium"
      icons={{
        success: <CircleCheckIcon className="size-4 text-[#acac49]" />,
        info: <InfoIcon className="size-4 text-blue-500" />,
        warning: <TriangleAlertIcon className="size-4 text-yellow-500" />,
        error: <OctagonXIcon className="size-4 text-red-500" />,
        loading: <Loader2Icon className="size-4 animate-spin text-[#acac49]" />,
      }}
      style={
        {
          "--normal-bg": "#f7f7ec",
          "--normal-text": "#111827",
          "--normal-border": "#acac49",
          "--border-radius": "0.75rem",
        } as React.CSSProperties
      }
      toastOptions={{
        className: "toast-premium",
        classNames: {
          success: "toast-success",
          error: "toast-error", 
          warning: "toast-warning",
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
