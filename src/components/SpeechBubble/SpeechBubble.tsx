import React, { FunctionComponent } from 'react';

import './style.css';

interface SpeechBubbleProps {
  position: 'left' | 'right';
}

const SpeechBubble: FunctionComponent<SpeechBubbleProps> = ({ position, children }) => {
  return (
    <div className="bubble" data-placement={`bottom-${position}`}>
      {children}
    </div>
  );
};

export default SpeechBubble;
