import React from 'react'

interface LogoProps {
  type: 'icon' | 'icon-text';
  color?: string;
  className?: string;
  ariaLabel?: string;
}

function Logo({ type, color = 'currentColor', className = '', ariaLabel = 'Nexora logo' }: LogoProps) {
  // Generate a unique id for clipPath to avoid duplicate ids if multiple logos are rendered
  const clipPathId = React.useId();

  const svg = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
      className="inline-block align-middle"
    >
      <g clipPath={`url(#${clipPathId})`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.0189 0.75C23.0189 0.335786 22.6831 0 22.2689 0H17.7112C17.297 0 16.9612 0.335787 16.9612 0.75V10.9423C16.9612 11.3565 16.6254 11.6923 16.2112 11.6923H12.8653C12.4511 11.6923 12.1153 11.3565 12.1153 10.9423V6.90381C12.1153 6.48959 11.7795 6.15381 11.3653 6.15381H6.80762C6.3934 6.15381 6.05762 6.4896 6.05762 6.90381V10.9423C6.05762 11.3565 5.72183 11.6923 5.30762 11.6923H1.35547C0.941255 11.6923 0.605469 12.0281 0.605469 12.4423V23.25C0.605469 23.6642 0.941255 24 1.35547 24H5.91316C6.32737 24 6.66316 23.6642 6.66316 23.25V13.0577C6.66316 12.6434 6.99895 12.3077 7.41316 12.3077H10.7594C11.1736 12.3077 11.5094 12.6434 11.5094 13.0577V17.0961C11.5094 17.5104 11.8452 17.8461 12.2594 17.8461H16.8171C17.2313 17.8461 17.5671 17.5104 17.5671 17.0961V13.0577C17.5671 12.6435 17.9029 12.3077 18.3171 12.3077H22.2689C22.6831 12.3077 23.0189 11.9719 23.0189 11.5577V0.75Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id={clipPathId}>
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  if (type === 'icon') {
    return <span className={`inline-flex items-center justify-center w-6 h-6 ${className}`}>{svg}</span>;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 w-24 ${className}`}>
      {svg}
      <span className="text-neutral-0 text-lg font-semibold font-['Inter'] leading-loose">Nexora</span>
    </span>
  );
}

export default Logo