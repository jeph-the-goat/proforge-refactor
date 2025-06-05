import React from 'react'

const SpotlightSVG: React.FC = () => {
  return (
    <svg viewBox="0 0 1440 780" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 right-0 bottom-0 z-[-1] w-full h-full">
        <g style={{ mixBlendMode: 'plus-lighter' }} filter="url(#filter0_f_8060_145685)">
        <path d="M719.5 -424L1187 371H252L719.5 -424Z" fill="url(#paint0_linear_8060_145685)"/>
        </g>
        <g style={{ mixBlendMode: 'plus-lighter' }} filter="url(#filter1_f_8060_145685)">
        <path d="M719.5 -424L1032 371H407L719.5 -424Z" fill="url(#paint1_linear_8060_145685)"/>
        </g>
        <g style={{ mixBlendMode: 'plus-lighter' }} filter="url(#filter2_f_8060_145685)">
        <path d="M719.5 -424L916 371H523L719.5 -424Z" fill="url(#paint2_linear_8060_145685)"/>
        </g>
        <defs>
        <filter id="filter0_f_8060_145685" x="128" y="-548" width="1183" height="1043" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="62" result="effect1_foregroundBlur_8060_145685"/>
        </filter>
        <filter id="filter1_f_8060_145685" x="283" y="-548" width="873" height="1043" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="62" result="effect1_foregroundBlur_8060_145685"/>
        </filter>
        <filter id="filter2_f_8060_145685" x="435" y="-512" width="569" height="971" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="44" result="effect1_foregroundBlur_8060_145685"/>
        </filter>
        <linearGradient id="paint0_linear_8060_145685" x1="719" y1="-424" x2="719" y2="371" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6C52FF"/>
        <stop offset="1" stopColor="#6C52FF" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="paint1_linear_8060_145685" x1="719" y1="-424" x2="708.274" y2="212.017" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6C52FF"/>
        <stop offset="1" stopColor="#6C52FF" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="paint2_linear_8060_145685" x1="718.999" y1="-459.488" x2="718.999" y2="370.614" gradientUnits="userSpaceOnUse">
        <stop stopColor="white"/>
        <stop offset="0.35442" stopColor="white" stopOpacity="0.45"/>
        <stop offset="1" stopColor="#6C52FF" stopOpacity="0"/>
        </linearGradient>
        </defs>
      </svg>
  )
}

export { SpotlightSVG }