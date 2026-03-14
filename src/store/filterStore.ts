import { create } from 'zustand';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';

interface FilterState {
  categoryId: string | null;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
  direction: string;
  search: string | null;
  page: number;
}

interface FilterActions {
  setCategoryId: (categoryId: string | null) => void;
  setPriceRange: (min: number, max: number) => void;
  setSort: (sortBy: string, direction: string) => void;
  setSearch: (search: string | null) => void;
  setPage: (page: number) => void;
  clearAllFilters: () => void;
  updateFromURL: () => void;
  syncWithURL: () => void;
}

type FilterStore = FilterState & FilterActions;

const DEFAULT_FILTERS: FilterState = {
  categoryId: null,
  minPrice: 0,
  maxPrice: 5000,
  sortBy: 'createdAt',
  direction: 'desc',
  search: null,
  page: 0,
};

export const useFilterStore = create<FilterStore>((set, get) => ({
  ...DEFAULT_FILTERS,

  setCategoryId: (categoryId) => {
    set({ categoryId, page: 0 });
    get().syncWithURL();
  },

  setPriceRange: (minPrice, maxPrice) => {
    set({ minPrice, maxPrice, page: 0 });
    get().syncWithURL();
  },

  setSort: (sortBy, direction) => {
    set({ sortBy, direction, page: 0 });
    get().syncWithURL();
  },

  setSearch: (search) => {
    set({ search, page: 0 });
    get().syncWithURL();
  },

  setPage: (page) => {
    set({ page });
    get().syncWithURL();
  },

  clearAllFilters: () => {
    set(DEFAULT_FILTERS);
    get().syncWithURL();
  },

  updateFromURL: () => {
    if (typeof window === 'undefined') return;
    
    const params = new URLSearchParams(window.location.search);
    const state: Partial<FilterState> = {};

    const categoryId = params.get('categoryId');
    if (categoryId) state.categoryId = categoryId;

    const minPrice = params.get('minPrice');
    if (minPrice) state.minPrice = Number(minPrice);

    const maxPrice = params.get('maxPrice');
    if (maxPrice) state.maxPrice = Number(maxPrice);

    const sortBy = params.get('sortBy');
    if (sortBy) state.sortBy = sortBy;

    const direction = params.get('direction');
    if (direction) state.direction = direction;

    const search = params.get('search');
    if (search) state.search = search;

    const page = params.get('page');
    if (page) state.page = Number(page);

    set(state);
  },

  syncWithURL: () => {
    if (typeof window === 'undefined') return;
    
    const state = get();
    const params = new URLSearchParams();

    if (state.categoryId) params.set('categoryId', state.categoryId);
    if (state.minPrice !== DEFAULT_FILTERS.minPrice) params.set('minPrice', state.minPrice.toString());
    if (state.maxPrice !== DEFAULT_FILTERS.maxPrice) params.set('maxPrice', state.maxPrice.toString());
    if (state.sortBy !== DEFAULT_FILTERS.sortBy) params.set('sortBy', state.sortBy);
    if (state.direction !== DEFAULT_FILTERS.direction) params.set('direction', state.direction);
    if (state.search) params.set('search', state.search);
    if (state.page !== DEFAULT_FILTERS.page) params.set('page', state.page.toString());

    const newUrl = params.toString() ? `/products?${params.toString()}` : '/products';
    
    if (window.location.pathname + window.location.search !== newUrl) {
      window.history.pushState({}, '', newUrl);
    }
  },
}));

// Hook to initialize store from URL on client side
export const useInitializeFilters = () => {
  const updateFromURL = useFilterStore((state) => state.updateFromURL);

  React.useEffect(() => {
    updateFromURL();
  }, [updateFromURL]);

  // Listen for popstate events (browser back/forward)
  React.useEffect(() => {
    const handlePopState = () => {
      updateFromURL();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [updateFromURL]);
};
