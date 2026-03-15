'use client'

import api from '@/lib/api'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'
import axios from 'axios'

export default function DeleteCategoryDialog({
  categoryId,
  categoryName,
  onSuccess,
}: {
  categoryId: number
  categoryName: string
  onSuccess: () => void
}) {
  async function handleDelete() {
    try {
      await api.delete(`/categories/${categoryId}`)
      toast.success('Category deleted')
      onSuccess()
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast.error(`${categoryName} has some products. Delete products first!`)
        return
      }

      toast.error('Failed to delete category')
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive">
          <Trash2 size={16} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Category</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <b>{categoryName}</b>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>

          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
