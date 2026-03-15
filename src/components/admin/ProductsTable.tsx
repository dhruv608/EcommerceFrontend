'use client'

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Product, ProductContent } from '@/lib/types'
import ProductRow from './ProductRow'
import { PageNotFound } from './PageNotFound'
import { ArrowDown, ArrowUp, ArrowUpDown, Package } from 'lucide-react'

export default function ProductsTable({
  products,
  sortBy,
  direction,
  onSort,
}: {
  products: ProductContent[]
  sortBy: 'price' | 'stock' | null
  direction: 'asc' | 'desc' | null
  onSort: (field: 'price' | 'stock') => void
}) {
  return (
    <div className="bg-white rounded-lg overflow-hidden overflow-x-hidden w-full max-w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs uppercase tracking-wide text-gray-500 font-medium">
              Product
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-gray-500 font-medium">
              Category
            </TableHead>
            <TableHead
              className="text-xs uppercase tracking-wide text-gray-500 font-medium cursor-pointer select-none"
              onClick={() => onSort('price')}
            >
              <div className="flex items-center gap-1">
                Price
                <ArrowUpDown
                  size={14}
                  className={sortBy === 'price' ? 'hidden' : 'text-gray-400'}
                />
                <ArrowUp
                  size={14}
                  className={sortBy === 'price' && direction === 'asc' ? 'text-gray-900' : 'hidden'}
                />
                <ArrowDown
                  size={14}
                  className={
                    sortBy === 'price' && direction === 'desc' ? 'text-gray-900' : 'hidden'
                  }
                />
              </div>
            </TableHead>
            <TableHead
              className="text-xs uppercase tracking-wide text-gray-500 font-medium cursor-pointer select-none"
              onClick={() => onSort('stock')}
            >
              <div className="flex items-center gap-1">
                Stock
                <ArrowUpDown
                  size={14}
                  className={sortBy === 'stock' ? 'hidden' : 'text-gray-400'}
                />
                <ArrowUp
                  size={14}
                  className={sortBy === 'stock' && direction === 'asc' ? 'text-gray-900' : 'hidden'}
                />
                <ArrowDown
                  size={14}
                  className={
                    sortBy === 'stock' && direction === 'desc' ? 'text-gray-900' : 'hidden'
                  }
                />
              </div>
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-gray-500 font-medium hidden md:table-cell">
              Gallery
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-gray-500 font-medium hidden md:table-cell">
              Status
            </TableHead>
            <TableHead className="text-xs uppercase tracking-wide text-gray-500 font-medium text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-16">
                <div className="w-20 h-20 bg-[#e5e5ce] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="h-10 w-10 text-[#6c6c2e]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Start by adding your first product</p>
                <Button className="bg-[#acac49] hover:bg-[#98983e] text-white rounded-lg px-4 py-2">
                  Create Product
                </Button>
              </TableCell>
            </TableRow>
          ) : (
            products.map(product => <ProductRow key={product.id} product={product} />)
          )}
        </TableBody>
      </Table>
    </div>
  )
}
