import React from 'react';

const HackForgeLogo = ({ size = 8, className = "" }) => {
  const baseHeight = 40; 
  const baseBracketWidth = 15;
  const textBaseSize = 24; 

  const scale = size / 8; 
  const height = baseHeight * scale;
  const bracketWidth = baseBracketWidth * scale;
  const textFontSize = textBaseSize * scale;

  const leftBracketPath = `M${bracketWidth*0.9} 0 L0 ${height/2} L${bracketWidth*0.9} ${height} L${bracketWidth} ${height - height*0.15} L${bracketWidth*0.35} ${height/2} L${bracketWidth} ${height*0.15} Z`;
  const rightBracketPath = `M${bracketWidth*0.1} 0 L${bracketWidth} ${height/2} L${bracketWidth*0.1} ${height} L0 ${height - height*0.15} L${bracketWidth*0.65} ${height/2} L0 ${height*0.15} Z`;
  
  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        width={bracketWidth} 
        height={height} 
        viewBox={`0 0 ${baseBracketWidth} ${baseHeight}`} 
        className="fill-current text-gray-600" // Dark Grey
      >
        <path d={leftBracketPath} />
      </svg>
      <span
        className="font-extrabold text-orange-500 mx-1 select-none"
        style={{ fontSize: `${textFontSize}px`, lineHeight: '1' }}
      >
        HF
      </span>
      <svg 
        width={bracketWidth} 
        height={height} 
        viewBox={`0 0 ${baseBracketWidth} ${baseHeight}`} 
        className="fill-current text-gray-600" // Dark Grey
      >
        <path d={rightBracketPath} />
      </svg>
    </div>
  );
};

export default HackForgeLogo;