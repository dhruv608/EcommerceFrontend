import React from 'react'
import { Switch } from '../ui/switch'
import api from '@/lib/api';
import { toast } from 'sonner';
interface ToggleActiveButtonProps {
  id: number;
  isActive: boolean;
  setIsActive: (value: boolean) => void;
}
const ToggleActiveButton = ({ setIsActive, isActive, id }: ToggleActiveButtonProps) => {
  async function toggleActive(val: boolean) {
    setIsActive(val);

    try {
      await api.patch(`/products/${id}`, { isActive: val });
      toast.success("Status updated");
    } catch {
      setIsActive(!val);
      toast.error("Failed to update status");
    }
  }
  return (
    <div>
      <Switch
        className="
    data-[state=checked]:bg-green-600
  "
        checked={isActive}
        onCheckedChange={toggleActive}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

export default ToggleActiveButton