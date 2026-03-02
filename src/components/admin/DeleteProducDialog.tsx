"use client";

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
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export function DeleteProductDialog({
  productId,
  productName,
  redirectAfter = false,
}: {
  productId: number;
  productName: string;
  redirectAfter?: boolean;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    console.log("qorking")
    try {
      await api.delete(`/products/${productId}`)
      toast.success(`${productName} deleted`);

      if (redirectAfter) {
        router.push("/admin/products");
      }

      router.refresh();
    } catch {
      toast.error("Product not deleted");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="ghost">
          {redirectAfter ? <div className="hover:bg-red-900 hover:text-white rounded px-4 py-2">Delete</div> : <Trash2 size={16} />}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete {productName}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently
            remove the product from your store.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
