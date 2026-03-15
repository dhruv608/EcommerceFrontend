'use client'

import { useState } from 'react'
import api from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { Pencil } from 'lucide-react'

export default function EditCategoryDialog({
  category,
  onSuccess,
}: {
  category: {
    id: number
    name: string
    description: string
  }
  onSuccess: () => void
}) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(category.name)
  const [description, setDescription] = useState(category.description || '')
  const [loading, setLoading] = useState(false)

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault()

    try {
      setLoading(true)

      await api.put(`/categories/${category.id}`, {
        name,
        description,
      })

      toast.success('Category updated')
      setOpen(false)
      onSuccess()
    } catch {
      toast.error('Failed to update category')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Pencil />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-4">
          <Input value={name} onChange={e => setName(e.target.value)} />
          <Textarea rows={4} value={description} onChange={e => setDescription(e.target.value)} />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
