'use client'
import React, { useState } from 'react'
import TooltipIcon from '@/icons/TooltipIcon'

interface TooltipProps {
  description: string;
}

function Tooltip({ description }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {visible && (
        <span
          className="text-md font-semibold text-neutral-0"
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '100%',
            transform: 'translateX(-50%)',
            marginBottom: 8,
            background: '#222',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: 4,
            whiteSpace: 'nowrap',
            zIndex: 1000,
            fontSize: 16,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}
        >
          {description}
        </span>
      )}
      <TooltipIcon style={{ marginLeft: 2, cursor: 'pointer' }} />
    </span>
  )
}

export default Tooltip