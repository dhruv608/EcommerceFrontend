"use client";

import { Switch } from "@/components/ui/switch";
import api from "@/lib/api";
import { toast } from "sonner";

interface ToggleFeaturedButtonProps {
  id: number;
  isFeatured: boolean;
  setIsFeatured: (value: boolean) => void;
}

export default function ToggleFeaturedButton({
  id,
  isFeatured,
  setIsFeatured,
}: ToggleFeaturedButtonProps) {

  async function toggleFeatured(val: boolean) {
    // optimistic UI update
    setIsFeatured(val);

    try {
      await api.patch(`/products/${id}`, { isFeatured: val });
      toast.success("Featured status updated");
    } catch {
      // rollback
      setIsFeatured(!val);
      toast.error("Failed to update featured status");
    }
  }

  return (
    <Switch
 
      checked={isFeatured}
      onCheckedChange={toggleFeatured}
      onClick={(e) => e.stopPropagation()} // table row click se bachane ke liye
    />
  );
}
