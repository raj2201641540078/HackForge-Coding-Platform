import React from 'react';

const Icon = ({
  d,
  isOutline = true,
  className = "w-6 h-6",
  viewBox = "0 0 24 24",
  pathProps,
  svgProps,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={viewBox}
    className={className}
    fill={isOutline ? 'none' : 'currentColor'}
    stroke={isOutline ? 'currentColor' : 'none'}
    strokeWidth={isOutline ? "1.5" : undefined}
    {...svgProps}
  >
    <path 
      strokeLinecap={isOutline ? "round" : undefined} 
      strokeLinejoin={isOutline ? "round" : undefined} 
      d={d} 
      {...pathProps}
    />
  </svg>
);

export default Icon;