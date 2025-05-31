import React from 'react';

interface TooltipIconProps extends React.SVGProps<SVGSVGElement> {}

const TooltipIcon: React.FC<TooltipIconProps> = (props) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M7 9.4V7M7 4.6H7.00533M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z" stroke="#99A0AE" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default TooltipIcon;
