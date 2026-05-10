import React from 'react';

/**
 * Logo.jsx — AquaIA Branding Isotype
 * 
 * Minimalist design combining a leaf and a water drop.
 * Emerald Green (#10B981) + Sky Blue (#0EA5E9)
 */
const Logo = ({ size = 32, className = "" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Drop Shape */}
      <path 
        d="M16 2.5C16 2.5 6 13 6 20.5C6 26.3 10.48 31 16 31C21.52 31 26 26.3 26 20.5C26 13 16 2.5 16 2.5Z" 
        fill="url(#logo_gradient)" 
      />
      
      {/* Leaf Detail (Right Side) */}
      <path 
        d="M16 2.5C16 2.5 16 13 26 20.5C26 13 16 2.5 16 2.5Z" 
        fill="#10B981" 
        fillOpacity="0.4"
      />
      
      {/* Central Vein / Divider */}
      <path 
        d="M16 31V2.5" 
        stroke="white" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeOpacity="0.3" 
      />
      
      {/* Subtle Leaf Vein */}
      <path 
        d="M16 15L22 10" 
        stroke="white" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeOpacity="0.2" 
      />

      <defs>
        <linearGradient id="logo_gradient" x1="16" y1="2.5" x2="16" y2="31" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0EA5E9" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
