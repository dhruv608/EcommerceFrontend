'use client'

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group toast-premium"
      position="top-right"
      expand={false}
      richColors
      icons={{
        success: <CircleCheckIcon className="size-4 text-white" />,
        info: <InfoIcon className="size-4 text-blue-500" />,
        warning: <TriangleAlertIcon className="size-4 text-white" />,
        error: <OctagonXIcon className="size-4 text-white" />,
        loading: <Loader2Icon className="size-4 animate-spin text-white" />,
      }}
      style={
        {
          '--normal-bg': '#acac49',
          '--normal-text': '#ffffff',
          '--normal-border': '#acac49',
          '--success-bg': '#acac49',
          '--success-text': '#ffffff',
          '--success-border': '#acac49',
          '--warning-bg': '#f59e0b',
          '--warning-text': '#ffffff',
          '--warning-border': '#f59e0b',
          '--error-bg': '#ef4444',
          '--error-text': '#ffffff',
          '--error-border': '#ef4444',
          '--border-radius': '0.75rem',
          '--shadow': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        } as React.CSSProperties
      }
      toastOptions={{
        className: 'toast-premium',
        classNames: {
          success: 'toast-success bg-[#acac49] text-white border-[#acac49] shadow-md rounded-lg',
          error: 'toast-error bg-red-500 text-white border-red-500 shadow-md rounded-lg',
          warning: 'toast-warning bg-amber-500 text-white border-amber-500 shadow-md rounded-lg',
          info: 'toast-info bg-blue-500 text-white border-blue-500 shadow-md rounded-lg',
          loading: 'toast-loading bg-[#acac49] text-white border-[#acac49] shadow-md rounded-lg',
        },
        style: {
          animation: 'slideIn 0.3s ease-out',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
