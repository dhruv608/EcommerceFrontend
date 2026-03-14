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
        <div className="p-1.5 rounded hover:bg-gray-100 transition-colors duration-150 cursor-pointer">
          <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500" />
        </div>
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
