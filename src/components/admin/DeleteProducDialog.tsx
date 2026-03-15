'use client'

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { Trash2, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

export function DeleteProductDialog({
  productId,
  productName,
  redirectAfter = false,
}: {
  productId: number
  productName: string
  redirectAfter?: boolean
}) {
  const router = useRouter()

  const handleDelete = async () => {
    console.log('qorking')
    try {
      await api.delete(`/products/${productId}`)
      toast.success(`${productName} deleted`)

      if (redirectAfter) {
        router.push('/admin/products')
      }

      router.refresh()
    } catch {
      toast.error('Product not deleted')
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="p-1.5 rounded hover:bg-gray-100 transition-colors duration-150 cursor-pointer">
          <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500" />
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4">
        <AlertDialogHeader className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#acac49]" />
            <AlertDialogTitle className="text-lg font-semibold text-gray-900">
              Delete product?
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-sm text-gray-600 leading-relaxed">
            This action cannot be undone. This will permanently remove the product from your store.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex justify-end gap-3 pt-4">
          <AlertDialogCancel className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-[#acac49] hover:bg-[#9a9a42] text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
