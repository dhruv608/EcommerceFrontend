import { create } from 'zustand'
import * as React from 'react'

interface FilterState {
  categoryId: string | null
  minPrice: number
  maxPrice: number
  dynamicMaxPrice?: number
  sortBy: string
  direction: string
  search: string | null
  page: number
  isFeatured: boolean
  _isInitializing: boolean
  _userClearedCategory: boolean
}

interface FilterActions {
  setCategoryId: (categoryId: string | null) => void
  setPriceRange: (min: number, max: number) => void
  setDynamicMaxPrice: (maxPrice: number) => void
  setSort: (sortBy: string, direction: string) => void
  setSearch: (search: string | null) => void
  setPage: (page: number) => void
  setFeatured: (isFeatured: boolean) => void
  clearAllFilters: () => void
  updateFromURL: () => void
  syncWithURL: () => void
  _initializeFromURL: () => void // Private method for initialization
}

type FilterStore = FilterState & FilterActions

const DEFAULT_FILTERS: FilterState = {
  categoryId: null,
  minPrice: 0,
  maxPrice: 5000,
  sortBy: 'createdAt',
  direction: 'desc',
  search: null,
  page: 0,
  isFeatured: false,
  _isInitializing: false,
  _userClearedCategory: false,
}

export const useFilterStore = create<FilterStore>((set, get) => ({
  ...DEFAULT_FILTERS,

  setCategoryId: categoryId => {
    set({ categoryId, page: 0, _userClearedCategory: categoryId === null })
    get().syncWithURL()
    
    // Reset the flag after a short delay to allow for navigation
    if (categoryId !== null) {
      setTimeout(() => {
        set({ _userClearedCategory: false })
      }, 100)
    }
  },

  setPriceRange: (minPrice, maxPrice) => {
    set({ minPrice, maxPrice, page: 0 })
    get().syncWithURL()
  },

  setDynamicMaxPrice: (dynamicMaxPrice) => {
    set({ dynamicMaxPrice })
  },

  setSort: (sortBy, direction) => {
    set({ sortBy, direction, page: 0 })
    get().syncWithURL()
  },

  setSearch: search => {
    set({ search, page: 0 })
    get().syncWithURL()
  },

  setPage: page => {
    set({ page })
    get().syncWithURL()
  },

  setFeatured: isFeatured => {
    set({ isFeatured, page: 0 })
    get().syncWithURL()
  },

  clearAllFilters: () => {
    set(DEFAULT_FILTERS)
    get().syncWithURL()
  },

  updateFromURL: () => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const state: Partial<FilterState> = {}

    const categoryId = params.get('categoryId')
    state.categoryId = categoryId || null

    const minPrice = params.get('minPrice')
    if (minPrice) state.minPrice = Number(minPrice)

    const maxPrice = params.get('maxPrice')
    if (maxPrice && Number(maxPrice) !== DEFAULT_FILTERS.maxPrice) {
      state.maxPrice = Number(maxPrice)
    }

    const sortBy = params.get('sortBy')
    if (sortBy) state.sortBy = sortBy

    const direction = params.get('direction')
    if (direction) state.direction = direction

    const search = params.get('search')
    if (search) state.search = search

    const page = params.get('page')
    if (page) state.page = Number(page)

    // Update state without triggering URL sync
    set(state)
  },

  _initializeFromURL: () => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const state: Partial<FilterState> = {}

    const categoryId = params.get('categoryId')
    state.categoryId = categoryId || null

    const minPrice = params.get('minPrice')
    if (minPrice) state.minPrice = Number(minPrice)

    const maxPrice = params.get('maxPrice')
    if (maxPrice && Number(maxPrice) !== DEFAULT_FILTERS.maxPrice) {
      state.maxPrice = Number(maxPrice)
    }

    const sortBy = params.get('sortBy')
    if (sortBy) state.sortBy = sortBy

    const direction = params.get('direction')
    if (direction) state.direction = direction

    const search = params.get('search')
    if (search) state.search = search

    const page = params.get('page')
    if (page) state.page = Number(page)

    const isFeatured = params.get('isFeatured')
    if (isFeatured) state.isFeatured = isFeatured === 'true'

    console.log('Store _initializeFromURL - URL params:', Object.fromEntries(params.entries()))
    console.log('Store _initializeFromURL - Setting state:', state)
    console.log('Store _initializeFromURL - Current URL:', window.location.search)

    // Set initialization flag and update state without triggering URL sync
    set({ ...state, _isInitializing: true })

    // Clear initialization flag after a short delay
    setTimeout(() => {
      set({ _isInitializing: false })
    }, 200)
  },

  syncWithURL: () => {
    if (typeof window === 'undefined') return

    const state = get()

    // Don't sync URL during initialization
    if (state._isInitializing) return

    const params = new URLSearchParams()

    if (state.categoryId) params.set('categoryId', state.categoryId)
    if (state.minPrice !== DEFAULT_FILTERS.minPrice)
      params.set('minPrice', state.minPrice.toString())
    
    // Only include maxPrice if it's different from the default
    const defaultMaxPrice = state.dynamicMaxPrice || DEFAULT_FILTERS.maxPrice
    if (state.maxPrice !== defaultMaxPrice)
      params.set('maxPrice', state.maxPrice.toString())
    if (state.sortBy !== DEFAULT_FILTERS.sortBy) params.set('sortBy', state.sortBy)
    if (state.direction !== DEFAULT_FILTERS.direction) params.set('direction', state.direction)
    if (state.search) params.set('search', state.search)
    if (state.page !== DEFAULT_FILTERS.page) params.set('page', state.page.toString())
    if (state.isFeatured !== DEFAULT_FILTERS.isFeatured)
      params.set('isFeatured', state.isFeatured.toString())

    const newUrl = params.toString() ? `/products?${params.toString()}` : '/products'

    if (window.location.pathname + window.location.search !== newUrl) {
      window.history.pushState({}, '', newUrl)
    }
  },
}))

// Hook to initialize store from URL on client side
export const useInitializeFilters = () => {
  const initializeFromURL = useFilterStore(state => state._initializeFromURL)

  React.useEffect(() => {
    // Initialize immediately and also after a small delay to ensure URL is fully loaded
    initializeFromURL()

    const timer = setTimeout(() => {
      initializeFromURL()
    }, 50)

    return () => clearTimeout(timer)
  }, [initializeFromURL])

  // Clean up unnecessary URL parameters after initialization
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const state = useFilterStore.getState()
      const params = new URLSearchParams(window.location.search)
      
      // Remove unnecessary parameters
      if (params.get('maxPrice') === '5000') {
        params.delete('maxPrice')
        const newUrl = params.toString() ? `/products?${params.toString()}` : '/products'
        if (window.location.pathname + window.location.search !== newUrl) {
          window.history.replaceState({}, '', newUrl)
        }
      }
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  // Listen for popstate events (browser back/forward)
  React.useEffect(() => {
    const handlePopState = () => {
      initializeFromURL()
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [initializeFromURL])
}
