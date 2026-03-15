'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
import { Category, Product, ProductContent } from '@/lib/types'
import ProductsTable from '@/components/admin/ProductsTable'
import Link from 'next/link'
import { toast } from 'sonner'
import { getCategories } from '@/lib/getCategories'
import api from '@/lib/api'
import LightStorePagination from '@/components/ui/LightStorePagination'

export default function ProductsClient({ initialData }: { initialData: Product }) {
  // 🧠 state (abhi sirf store kar rahe hain)
  const [products, setProducts] = useState<ProductContent[]>(initialData.content)
  const [categories, setCategories] = useState<Category[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')
  const [feature, setFeature] = useState('all')
  const [page, setPage] = useState(initialData.number)
  const [totalPages, setTotalPages] = useState(initialData.totalPages)
  const [isFirst, setIsFirst] = useState(initialData.first)
  const [isLast, setIsLast] = useState(initialData.last)
  const [sortBy, setSortBy] = useState<'price' | 'stock' | null>(null)
  const [direction, setDirection] = useState<'asc' | 'desc' | null>(null)

  function handleSort(field: 'price' | 'stock') {
    if (sortBy !== field) {
      setSortBy(field)
      setDirection('asc')
      return
    }

    if (direction === 'asc') {
      setDirection('desc')
      return
    }

    // third click → reset
    setSortBy(null)
    setDirection(null)
  }

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (err) {
        toast.error('Failed to load categories')
      }
    }

    fetchCategories()
  }, [])

  function mapStatus(status: string): boolean | null {
    if (status === 'active') return true
    if (status === 'inactive') return false
    return null // all
  }

  function mapFeatured(feature: string): boolean | null {
    if (feature === 'feature') return true
    if (feature === 'unfeature') return false
    return null // all
  }

  useEffect(() => {
    setPage(0)
  }, [search, category, status, feature])

  useEffect(() => {
    async function fetchFilteredProducts() {
      try {
        const res = await api.get('/products', {
          params: {
            page,
            search: search || null,
            categoryId: category === 'all' ? null : Number(category),
            isActive: mapStatus(status),
            isFeatured: mapFeatured(feature),
            sortBy,
            direction,
          },
        })
        setProducts(res.data.content)
        setTotalPages(res.data.totalPages)
        setIsFirst(res.data.first)
        setIsLast(res.data.last)
      } catch (err) {
        toast.error('Failed to load products')
      }
    }
    fetchFilteredProducts()
  }, [search, category, status, feature, page, sortBy, direction])

  return (
    <div className="p-8 bg-[#f8f9fb] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
              <p className="text-gray-500">Manage your product catalog</p>
            </div>
            <Link href="/admin/products/addProduct">
              <Button className="bg-[#acac49] hover:bg-[#98983e] text-white border-0 rounded-lg px-4 py-2.5 transition-colors duration-150">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl p-3.5 mb-6 border border-[#eeeeee] overflow-visible">
          <div className="flex flex-col lg:flex-row gap-2.5">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search products by name..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#acac49]/20 focus:border-[#acac49] transition-all duration-150"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2.5">
              <div className="w-44 relative">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full border-gray-300 bg-white hover:border-gray-400 focus:border-[#acac49] focus:ring-[#acac49]/20">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent
                    className="bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 min-w-[176px]"
                    position="popper"
                    side="bottom"
                    align="start"
                  >
                    <SelectItem
                      value="all"
                      className="px-4 py-2 text-sm hover:bg-[#f8f8f8] focus:bg-[#f8f8f8] cursor-pointer rounded-md mx-1"
                    >
                      All Categories
                    </SelectItem>
                    {categories.map(category => (
                      <SelectItem
                        key={category.id}
                        value={String(category.id)}
                        className="px-4 py-2 text-sm hover:bg-[#f8f8f8] focus:bg-[#f8f8f8] cursor-pointer rounded-md mx-1"
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-36 relative">
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-full border-gray-300 bg-white hover:border-gray-400 focus:border-[#acac49] focus:ring-[#acac49]/20">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent
                    className="bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 min-w-[144px]"
                    position="popper"
                    side="bottom"
                    align="start"
                  >
                    <SelectItem
                      value="all"
                      className="px-4 py-2 text-sm hover:bg-[#f8f8f8] focus:bg-[#f8f8f8] cursor-pointer rounded-md mx-1"
                    >
                      All
                    </SelectItem>
                    <SelectItem
                      value="active"
                      className="px-4 py-2 text-sm hover:bg-[#f8f8f8] focus:bg-[#f8f8f8] cursor-pointer rounded-md mx-1"
                    >
                      Active
                    </SelectItem>
                    <SelectItem
                      value="inactive"
                      className="px-4 py-2 text-sm hover:bg-[#f8f8f8] focus:bg-[#f8f8f8] cursor-pointer rounded-md mx-1"
                    >
                      Inactive
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-36 relative">
                <Select value={feature} onValueChange={setFeature}>
                  <SelectTrigger className="w-full border-gray-300 bg-white hover:border-gray-400 focus:border-[#acac49] focus:ring-[#acac49]/20">
                    <SelectValue placeholder="All Featured" />
                  </SelectTrigger>
                  <SelectContent
                    className="bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 min-w-[144px]"
                    position="popper"
                    side="bottom"
                    align="start"
                  >
                    <SelectItem
                      value="all"
                      className="px-4 py-2 text-sm hover:bg-[#f8f8f8] focus:bg-[#f8f8f8] cursor-pointer rounded-md mx-1"
                    >
                      All
                    </SelectItem>
                    <SelectItem
                      value="feature"
                      className="px-4 py-2 text-sm hover:bg-[#f8f8f8] focus:bg-[#f8f8f8] cursor-pointer rounded-md mx-1"
                    >
                      Featured
                    </SelectItem>
                    <SelectItem
                      value="unfeature"
                      className="px-4 py-2 text-sm hover:bg-[#f8f8f8] focus:bg-[#f8f8f8] cursor-pointer rounded-md mx-1"
                    >
                      UnFeatured
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl border border-[#ececec] overflow-hidden shadow-[0_3px_10px_rgba(0,0,0,0.04)] relative z-0">
          <ProductsTable
            products={products}
            sortBy={sortBy}
            direction={direction}
            onSort={handleSort}
          />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <LightStorePagination
            currentPage={page + 1} // Convert 0-based to 1-based
            totalPages={totalPages}
            onPageChange={newPage => setPage(newPage - 1)} // Convert 1-based to 0-based
          />
        )}
      </div>
    </div>
  )
}
