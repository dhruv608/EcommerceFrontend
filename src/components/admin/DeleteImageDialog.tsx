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

import { toast } from "sonner";
import api from "@/lib/api";

interface Props {
  productId: number;
  imageUrl: string;
  onSuccess: () => void;
}

export default function DeleteImageDialog({
  productId,
  imageUrl,
  onSuccess,
}: Props) {
  async function handleDelete() {
    try {
      await api.delete(`/products/${productId}/images`, {
        params: { imageUrl },
      });
      toast.success("Image deleted");
      onSuccess();
    } catch {
      toast.error("Failed to delete image");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="absolute top-1 right-1 bg-black/60 text-white h-6 w-6 rounded-full"
        >
          ✕
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete this image?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This image will be permanently removed from the product.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
