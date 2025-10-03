import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";

interface SelectScrollableProps {
  options: { value: string; label: string }[];
  placeholder?: string;
  label: string;
  onChange: (value: string) => void;
  name?: string;
  required?: boolean;
}

export function SelectScrollable({
  options,
  placeholder,
  label,
  onChange,
  name,
  required=false,
}: SelectScrollableProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <Label>{label}</Label>
      <Select
        name={name}
        disabled={options.length === 0}
        onValueChange={onChange}
        required={required}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
