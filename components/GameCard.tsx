import React from 'react';
import { CardItem } from '../types';

interface GameCardProps {
  card: CardItem;
  isSelected: boolean;
  isMatched: boolean;
  isWrong: boolean;
  onClick: (card: CardItem) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ card, isSelected, isMatched, isWrong, onClick }) => {
  if (isMatched) {
    // Maintain height for layout stability but invisible
    return <div className="h-12 sm:h-16 w-full invisible pointer-events-none" />;
  }

  // Reduced height: h-12 (48px) on mobile, h-16 (64px) on larger screens
  const baseStyles = "h-12 sm:h-16 w-full rounded-lg sm:rounded-xl flex items-center justify-center px-2 py-1 cursor-pointer transition-all duration-200 transform active:scale-95 shadow-md select-none border-2 relative overflow-hidden";
  
  let stateStyles = "bg-slate-800 border-slate-700 hover:bg-slate-750 hover:border-slate-500 text-slate-100";
  
  if (isSelected) {
    stateStyles = "bg-indigo-600 border-indigo-400 text-white shadow-indigo-500/50 scale-[1.02]";
  }
  
  if (isWrong) {
    stateStyles = "bg-red-900/80 border-red-500 text-white animate-shake";
  }

  const handleClick = () => {
    if (isWrong) return;

    // Text-to-Speech logic for English cards
    if (card.lang === 'en') {
      // Cancel any currently playing audio
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(card.text);
      utterance.lang = 'en-US';
      utterance.rate = 1.0;

      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      const enVoices = voices.filter(v => v.lang.startsWith('en'));

      // Randomly decide gender profile for this click, but consistently pick the SAME voice for that gender
      const useMaleProfile = Math.random() > 0.5;

      if (enVoices.length > 0) {
        let targetVoice: SpeechSynthesisVoice | undefined;

        if (useMaleProfile) {
          // Priority list for Male voices (iOS: Daniel, Win: David/Mark, Android: may vary)
          // We search for these specific high-quality names first.
          targetVoice = enVoices.find(v => 
            v.name.includes('Daniel') || 
            v.name.includes('David') || 
            v.name.includes('Mark') ||
            (v.name.includes('Male') && !v.name.includes('Female'))
          );
          utterance.pitch = 0.9; 
        } else {
          // Priority list for Female voices (iOS: Samantha, Win: Zira, Android: Google US English)
          targetVoice = enVoices.find(v => 
            v.name.includes('Samantha') || 
            v.name.includes('Zira') || 
            v.name.includes('Google US English') ||
            v.name.includes('Female')
          );
          utterance.pitch = 1.0; // Standard pitch for female
        }

        // Strict Fallback: If no specific gender match found, use the FIRST English voice (System Default).
        // DO NOT pick a random one to avoid "strange" voices like "Bells" or "Fred".
        if (!targetVoice) {
          targetVoice = enVoices[0];
          // If we fell back to default, we can try to influence pitch slightly to mimic gender
          utterance.pitch = useMaleProfile ? 0.9 : 1.0;
        }

        utterance.voice = targetVoice;
      } 

      window.speechSynthesis.speak(utterance);
    }

    onClick(card);
  };

  // Adjusted text sizes for smaller cards
  return (
    <div 
      onClick={handleClick} 
      className={`${baseStyles} ${stateStyles}`}
    >
      <div className="text-center w-full">
        <span className={`block truncate ${card.lang === 'ja' ? 'text-sm sm:text-lg font-bold font-jp' : 'text-xs sm:text-base font-semibold'}`}>
          {card.text}
        </span>
      </div>
    </div>
  );
};