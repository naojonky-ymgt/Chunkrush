import React from 'react';
import { Player } from '../types';

interface ProgressBarProps {
  player: Player;
  rank: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ player, rank }) => {
  return (
    <div className="flex items-center gap-3 w-full mb-2 animate-pop">
      <div className="w-8 text-right font-bold text-slate-400 text-sm">#{rank}</div>
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg shrink-0"
        style={{ backgroundColor: player.avatarColor }}
      >
        {player.name.substring(0, 2).toUpperCase()}
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-xs text-slate-300 mb-1">
          <span>{player.name} {player.isBot && '(AI)'}</span>
          <span>{Math.round(player.progress)}%</span>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden relative">
          <div 
            className="h-full transition-all duration-500 ease-out relative"
            style={{ 
              width: `${player.progress}%`,
              backgroundColor: player.avatarColor
            }}
          >
            {/* Shine effect */}
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-white/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};