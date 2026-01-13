"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface MultiSelectDropdownProps {
  label: string
  required?: boolean
  placeholder?: string
  options: string[]
  value: string[]
  onChange: (values: string[]) => void
  disabled?: boolean
  error?: string
}

export function MultiSelectDropdown({
  label,
  required,
  placeholder = "Select...",
  options,
  value,
  onChange,
  disabled,
  error,
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleToggle = (option: string) => {
    if (disabled) return

    const newValue = value.includes(option) ? value.filter((v) => v !== option) : [...value, option]
    onChange(newValue)
  }

  const displayText =
    value.length === 0 ? placeholder : value.length === 1 ? value[0] : `${value.length} ${label} Selected`

  return (
    <div className="space-y-2" ref={dropdownRef}>
      <Label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </Label>
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "w-full h-10 px-3 py-2 text-left bg-white border rounded-lg flex items-center justify-between",
            "hover:border-gray-400 transition-colors",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error ? "border-red-500" : "border-gray-300",
            isOpen && "border-primary",
          )}
        >
          <span className={cn("text-sm", value.length === 0 ? "text-gray-500" : "text-gray-900")}>{displayText}</span>
          <ChevronDown className={cn("h-4 w-4 text-gray-500 transition-transform", isOpen && "transform rotate-180")} />
        </button>

        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="py-2 px-1 max-h-60 overflow-y-auto">
              {options.map((option) => (
                <label
                  key={option}
                  className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer rounded transition-colors"
                >
                  <Checkbox
                    checked={value.includes(option)}
                    onCheckedChange={() => handleToggle(option)}
                    className="mr-3"
                  />
                  <span className="text-sm text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
