"use client";

import { useState } from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export default function ToggleSwitch({ checked, onChange, disabled = false, onClick }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) {
          onClick(e);
        }
        onChange(!checked);
      }}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
        ${checked ? 'bg-[#acac49]' : 'bg-gray-300'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        focus:outline-none focus:ring-2 focus:ring-[#acac49]/20 focus:ring-offset-2
      `}
    >
      <span
        className={`
          absolute left-1 h-4 w-4 rounded-full bg-white transition-transform
          ${checked ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </button>
  );
}
