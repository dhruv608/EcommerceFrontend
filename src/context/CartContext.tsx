'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import api from '@/lib/api'
import { useAuth } from './AuthContext'

export interface CartItem {
  cartId: number
  productId: number
  productName: string
  productDescription: string
  productPrice: number
  quantity: number
  subtotal: number
  addedAt: string
  imageUrl?: string
}

interface CartContextType {
  cartItems: CartItem[]
  cartCount: number
  cartTotal: number
  loading: boolean
  fetchCart: () => Promise<void>
  addToCart: (productId: number, quantity: number) => Promise<void>
  updateQuantity: (productId: number, quantity: number) => Promise<void>
  removeFromCart: (productId: number) => Promise<void>
  clearCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const { user, isLoggedIn } = useAuth()

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0)

  // Fetch cart items
  const fetchCart = async () => {
    if (!isLoggedIn || !user) {
      setCartItems([])
      return
    }

    try {
      setLoading(true)
      const res = await api.get(`/cart?userId=${user.userId}`)
      const cartData = res.data || []

      // Ensure all items have required properties with defaults
      const processedItems = cartData.map((item: Record<string, unknown>) => ({
        cartId: item.cartId || 0,
        productId: item.productId || 0,
        productName: item.productName || 'Unknown Product',
        productDescription: item.productDescription || '',
        productPrice: item.productPrice || 0,
        quantity: item.quantity || 1,
        subtotal: (item.subtotal as number) || ((item.productPrice as number) || 0) * ((item.quantity as number) || 1),
        addedAt: item.addedAt || new Date().toISOString(),
        imageUrl: item.imageUrl || item.productImage || null,
      }))

      setCartItems(processedItems)
    } catch (error) {
      console.error('Failed to fetch cart:', error)
      setCartItems([])
    } finally {
      setLoading(false)
    }
  }

  // Add item to cart
  const addToCart = async (productId: number, quantity: number) => {
    // Authentication check is handled in the component (SmartAddToCart.tsx)
    // This function assumes user is authenticated when called

    if (!user?.userId) {
      throw new Error('User not authenticated')
    }

    try {
      setLoading(true)
      await api.post(`/cart/add?userId=${user!.userId}`, {
        productId,
        quantity,
      })

      await fetchCart() // Refresh cart
    } catch (error: unknown) {
      console.error('Failed to add to cart:', error)
      // Don't show toast here - let the component handle error display
      throw error // Re-throw to let component handle the error
    } finally {
      setLoading(false)
    }
  }

  // Update item quantity
  const updateQuantity = async (productId: number, quantity: number) => {
    if (!isLoggedIn || !user) return

    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    try {
      setLoading(true)
      console.log('Updating cart using remove and re-add method:', {
        userId: user.userId,
        productId,
        quantity,
      })

      // Try different API formats for add endpoint
      try {
        // First remove the item
        await api.delete(`/cart/remove?userId=${user.userId}&productId=${productId}`)

        // Then re-add with new quantity - try format 1
        await api.post(`/cart/add?userId=${user.userId}`, {
          productId: productId,
          quantity: quantity,
        })
      } catch (addError) {
        console.log('Format 1 failed, trying format 2...')
        // Try format 2 - different parameter names
        await api.post(`/cart/add?userId=${user.userId}`, {
          product_id: productId,
          qty: quantity,
        })
      }

      console.log('Cart updated successfully')
      await fetchCart() // Refresh cart
      toast.success('Cart updated successfully')
    } catch (error: unknown) {
      console.error('Failed to update cart:', error)
      console.error('Error response:', error && typeof error === 'object' && 'response' in error ? (error as { response?: { data?: { message?: string }, status?: number } }).response?.data : 'No response data')
      console.error('Error status:', error && typeof error === 'object' && 'response' in error ? (error as { response?: { data?: { message?: string }, status?: number } }).response?.status : 'No status')
      console.error('Request data:', { userId: user.userId, productId, quantity })

      // Show specific error message
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { message?: string }, status?: number } }
        if (err.response?.data?.message) {
          toast.error(err.response.data.message)
        } else if (err.response?.status === 400) {
          toast.error('Invalid request format. Please try again.')
        } else if (err.response?.status === 500) {
          toast.error('Server error while updating cart. Please try again.')
        } else if (err.response?.status === 404) {
          toast.error('Cart item not found.')
        } else {
          toast.error('Failed to update cart quantity')
        }
      }
    } finally {
      setLoading(false)
    }
  }

  // Remove item from cart
  const removeFromCart = async (productId: number) => {
    if (!isLoggedIn || !user) return

    try {
      setLoading(true)
      await api.delete(`/cart/remove?userId=${user.userId}&productId=${productId}`)

      toast.success('Item removed from cart')
      await fetchCart() // Refresh cart
    } catch (error: unknown) {
      console.error('Failed to remove from cart:', error)
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } }
        if (err.response?.data?.message) {
          toast.error(err.response.data.message)
        } else {
          toast.error('Failed to remove item from cart')
        }
      }
    } finally {
      setLoading(false)
    }
  }

  // Clear entire cart
  const clearCart = async () => {
    if (!isLoggedIn || !user) return

    try {
      setLoading(true)
      await api.delete(`/cart/clear?userId=${user.userId}`)

      toast.success('Cart cleared')
      await fetchCart() // Refresh cart
    } catch (error: unknown) {
      console.error('Failed to clear cart:', error)
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } }
        if (err.response?.data?.message) {
          toast.error(err.response.data.message)
        } else {
          toast.error('Failed to clear cart')
        }
      }
    } finally {
      setLoading(false)
    }
  }

  // Fetch cart when user logs in
  useEffect(() => {
    if (isLoggedIn && user) {
      fetchCart()
    } else {
      setCartItems([])
    }
  }, [isLoggedIn, user])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
