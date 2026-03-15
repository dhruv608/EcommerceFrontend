'use client'

import { useState } from 'react'
import api from '@/lib/api'
import { toast } from 'sonner'
import { Product, ProductContent } from '@/lib/types'
import ToggleSwitch from './ToggleSwitch'

interface VisibilityStatusProps {
  product: ProductContent
}

export default function VisibilityStatus({ product }: VisibilityStatusProps) {
  const [isActive, setIsActive] = useState(product.isActive)
  const [isFeatured, setIsFeatured] = useState(product.isFeatured)

  async function toggleActive(val: boolean) {
    setIsActive(val) // optimistic update

    // If deactivating, also uncheck featured
    if (!val && isFeatured) {
      setIsFeatured(false)

      try {
        // Update both isActive and isFeatured in one call
        await api.patch(`/products/${product.id}`, {
          isActive: val,
          isFeatured: false,
        })
        toast.success('Product deactivated and removed from featured')
      } catch {
        setIsActive(!val) // rollback active
        setIsFeatured(true) // rollback featured
        toast.error('Failed to update status')
      }
      return
    }

    try {
      await api.patch(`/products/${product.id}`, {
        isActive: val,
      })
      toast.success('Active status updated')
    } catch {
      setIsActive(!val) // rollback
      toast.error('Failed to update active status')
    }
  }

  async function toggleFeatured(val: boolean) {
    // Don't allow featuring if product is not active
    if (!isActive && val) {
      toast.error('Product must be active to be featured')
      return
    }

    setIsFeatured(val)

    try {
      await api.patch(`/products/${product.id}`, {
        isFeatured: val,
      })
      toast.success('Featured status updated')
    } catch {
      setIsFeatured(!val)
      toast.error('Failed to update featured status')
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
      <h2 className="font-medium">Visibility Status</h2>

      {/* Active */}
      <div className="flex items-center justify-between py-2">
        <span className="text-sm font-medium text-gray-700">Active Status</span>
        <ToggleSwitch checked={isActive} onChange={toggleActive} />
      </div>

      {/* Featured */}
      <div className="flex items-center justify-between py-2">
        <span className="text-sm font-medium text-gray-700">Featured Product</span>
        <div className="relative">
          <ToggleSwitch checked={isFeatured} onChange={toggleFeatured} disabled={!isActive} />
          {!isActive && (
            <div
              className="absolute inset-0 bg-gray-100/50 rounded-full cursor-not-allowed"
              title="Product must be active to be featured"
            />
          )}
        </div>
      </div>

      {/* Warning Message */}
      {!isActive && isFeatured && (
        <div className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-2">
          ⚠️ Inactive products cannot be featured. The featured status will be automatically removed
          when deactivated.
        </div>
      )}

      {/* Badges */}
      <div className="flex gap-2">
        {isActive && (
          <span className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded">
            Published
          </span>
        )}
        {isActive && isFeatured && (
          <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded">Featured</span>
        )}
        {!isActive && isFeatured && (
          <span className="px-3 py-1 text-xs bg-amber-100 text-amber-700 rounded">
            Featured (Inactive)
          </span>
        )}
      </div>
    </div>
  )
}
