import React from 'react'

// Enhanced Button component with accessibility
export function AccessibleButton({
  children,
  onClick,
  disabled = false,
  className = '',
  ariaLabel,
  ariaDescribedBy,
  ...props
}: {
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
  disabled?: boolean
  className?: string
  ariaLabel?: string
  ariaDescribedBy?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      {...props}
    >
      {children}
    </button>
  )
}

// Enhanced Link component with accessibility
export function AccessibleLink({
  children,
  href,
  className = '',
  ariaLabel,
  ...props
}: {
  children: React.ReactNode
  href: string
  className?: string
  ariaLabel?: string
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} className={className} aria-label={ariaLabel} role="link" {...props}>
      {children}
    </a>
  )
}

// Skip to main content link for accessibility
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
    >
      Skip to main content
    </a>
  )
}

// Announcer for screen readers
export function LiveRegion() {
  return <div aria-live="polite" aria-atomic="true" className="sr-only" id="live-region" />
}

// Hook to announce messages to screen readers
export function useAnnouncer() {
  const announce = (message: string) => {
    const liveRegion = document.getElementById('live-region')
    if (liveRegion) {
      liveRegion.textContent = message
      setTimeout(() => {
        liveRegion.textContent = ''
      }, 1000)
    }
  }

  return { announce }
}
