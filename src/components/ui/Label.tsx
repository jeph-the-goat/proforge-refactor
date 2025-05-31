import React from 'react'
import Tooltip from '@/components/ui/Tooltip'

interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  label: string;
  required?: boolean;
  tooltip: string;
}

const Label = ({ label, required, tooltip, ...props }: LabelProps) => {
  return (
    <div className="inline-flex items-center">
      <label {...props} className="inline-flex items-center">
        <span className="text-md font-semibold text-neutral-0">{label}</span>
        {required ? (
          <span className="text-md font-semibold text-error-500" style={{ marginLeft: 2 }}>*</span>
        ) : (
          <span className="text-md font-semibold text-neutral-500" style={{ marginLeft: 2 }}>(Optional)</span>
        )}
      </label>
      <Tooltip description={tooltip} />
    </div>
  )
}

export default Label