import React from 'react'

// Utility hook for keyboard navigation
export function useKeyboardNavigation(
  items: HTMLElement[],
  onSelect?: (item: HTMLElement, index: number) => void,
  onClose?: () => void
) {
  const [activeIndex, setActiveIndex] = React.useState(-1)

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          setActiveIndex(prev => {
            const next = (prev + 1) % items.length
            items[next]?.focus()
            return next
          })
          break
        case 'ArrowUp':
          event.preventDefault()
          setActiveIndex(prevIndex => {
            const newIndex = prevIndex - 1 < 0 ? items.length - 1 : prevIndex - 1
            items[newIndex]?.focus()
            return newIndex
          })
          break
        case 'Enter':
        case ' ':
          event.preventDefault()
          if (activeIndex >= 0 && items[activeIndex]) {
            onSelect?.(items[activeIndex], activeIndex)
          }
          break
        case 'Escape':
          event.preventDefault()
          onClose?.()
          break
      }
    },
    [items, activeIndex, onSelect, onClose]
  )

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return { activeIndex, setActiveIndex }
}

// Utility for generating ARIA labels
export function generateAriaLabel(
  elementType: 'button' | 'link' | 'input' | 'select' | 'dialog',
  label: string,
  description?: string,
  required?: boolean
) {
  let ariaLabel = label

  if (required) {
    ariaLabel += ' (required)'
  }

  if (description) {
    ariaLabel += `, ${description}`
  }

  switch (elementType) {
    case 'button':
      return ariaLabel + ', button'
    case 'link':
      return ariaLabel + ', link'
    case 'input':
      return ariaLabel + ', input field'
    case 'select':
      return ariaLabel + ', dropdown'
    case 'dialog':
      return ariaLabel + ', dialog'
    default:
      return ariaLabel
  }
}

// Utility for focus management
export function useFocusManagement(isOpen: boolean) {
  const previousFocusRef = React.useRef<HTMLElement | null>(null)
  const containerRef = React.useRef<HTMLElement>(null)

  const trapFocus = React.useCallback(() => {
    if (!containerRef.current) return

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>

    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    }
  }, [])

  const restoreFocus = React.useCallback(() => {
    if (previousFocusRef.current) {
      previousFocusRef.current.focus()
    }
  }, [])

  React.useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement
      trapFocus()
    } else {
      restoreFocus()
    }
  }, [isOpen, trapFocus, restoreFocus])

  return { containerRef, trapFocus, restoreFocus }
}
