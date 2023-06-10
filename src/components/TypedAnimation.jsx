import React, { useEffect, useState } from 'react';

const TypeAnimation = () => {
  const sequence = [" a Designer", 500, " a Web Developer", 500, " an App developer", 500, " a Software Engineer", 500];
  const style = { whiteSpace: 'nowrap', overflow: 'hidden', borderRight: '2px solid #915eff' };
  const repeat = Infinity;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      setIsTyping(false);
      setDisplayText(sequence[currentIndex]);
    }, sequence[currentIndex + 1]);

    const deletingTimer = setTimeout(() => {
      setIsTyping(true);
      setDisplayText('');
      setCurrentIndex((prevIndex) => (prevIndex + 2) % sequence.length);
    }, sequence[currentIndex + 1] + 500);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(deletingTimer);
    };
  }, [currentIndex, sequence]);

  useEffect(() => {
    if (isTyping) {
      const typingInterval = setInterval(() => {
        setDisplayText((prevText) => {
          const currentSequenceItem = sequence[currentIndex];
          const typedText = currentSequenceItem.substring(0, prevText.length + 1);
          return typedText;
        });
      }, 100);

      return () => clearInterval(typingInterval);
    }
  }, [currentIndex, isTyping, sequence]);

  useEffect(() => {
    if (currentIndex === sequence.length - 1 && repeat === Infinity) {
      setIsTyping(false);
    }
  }, [currentIndex, repeat, sequence.length]);

  return <span style={style}>{displayText}</span>;
};

export default TypeAnimation;
