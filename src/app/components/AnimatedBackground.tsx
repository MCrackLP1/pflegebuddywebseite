import React from 'react';
import './AnimatedBackground.css';

const AnimatedBackground: React.FC = () => (
  <div className="animated-bg">
    <svg className="blob blob1" viewBox="0 0 600 600">
      <g transform="translate(300,300)">
        <path d="M120,-156.6C153.2,-120.2,170.2,-76.2,172.2,-34.2C174.2,7.8,161.2,47.8,137.2,80.2C113.2,112.6,78.2,137.4,38.2,154.2C-1.8,171,-46.8,179.8,-85.2,165.2C-123.6,150.6,-155.4,112.6,-170.2,70.2C-185,27.8,-182.8,-19,-163.2,-57.2C-143.6,-95.4,-106.6,-125,-65.2,-157.2C-23.8,-189.4,22,-224.2,62.2,-217.2C102.4,-210.2,136.8,-161.8,120,-156.6Z" fill="#a0c4ff" opacity="0.4" />
      </g>
    </svg>
    <svg className="blob blob2" viewBox="0 0 600 600">
      <g transform="translate(300,300)">
        <path d="M120,-156.6C153.2,-120.2,170.2,-76.2,172.2,-34.2C174.2,7.8,161.2,47.8,137.2,80.2C113.2,112.6,78.2,137.4,38.2,154.2C-1.8,171,-46.8,179.8,-85.2,165.2C-123.6,150.6,-155.4,112.6,-170.2,70.2C-185,27.8,-182.8,-19,-163.2,-57.2C-143.6,-95.4,-106.6,-125,-65.2,-157.2C-23.8,-189.4,22,-224.2,62.2,-217.2C102.4,-210.2,136.8,-161.8,120,-156.6Z" fill="#bdb2ff" opacity="0.3" />
      </g>
    </svg>
  </div>
);

export default AnimatedBackground; 