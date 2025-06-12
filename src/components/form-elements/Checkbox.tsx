import React from 'react'


interface CheckboxProps {
  size: 'sm' | 'md'
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  disabled?: boolean;
}

export const Checkbox = ({ size, isChecked, onChange, disabled }: CheckboxProps) => {
  return (
    <div>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => onChange(!isChecked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <span
          className={`
            ${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'}
            border-2 rounded-xs flex items-center justify-center transition-colors
            bg-neutral-950 border-neutral-700
            hover:border-neutral-500
            active:border-primary-500 active:[box-shadow:0_0_0_1.5px_rgba(108,82,255,0.1)]
            ${isChecked ? 'bg-primary-500' : ''}
            ${isChecked ? 'hover:bg-primary-400 active:[box-shadow:0_0_0_1.5px_rgba(108,82,255,0.1)]' : ''}
            ${isChecked ? 'border-primary-500 hover:border-primary-400 active:border-primary-500' : ''}
            ${isChecked ? 'hover:bg-primary-400 active:bg-primary-500' : ''}
          `}
        >
          {isChecked && (
            <svg className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} text-white`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </span>
      </label>
    </div>
  )
}
