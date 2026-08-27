import React from 'react';
import { THEMES } from '../data/defaultData';
import { ThemeType, ThemeConfig } from '../types';
import { Palette, Check } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: ThemeConfig;
  onSelectTheme: (themeId: ThemeType) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onSelectTheme,
}) => {
  return (
    <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl shadow-xs border border-stone-200">
      <div className="px-2 text-xs text-stone-500 flex items-center gap-1 font-serif-sc hidden sm:flex">
        <Palette className="w-3.5 h-3.5 text-stone-600" />
        <span>书卷装帧:</span>
      </div>

      <div className="flex items-center gap-1">
        {Object.values(THEMES).map((th) => {
          const isSelected = currentTheme.id === th.id;
          return (
            <button
              key={th.id}
              type="button"
              onClick={() => onSelectTheme(th.id)}
              className={`group flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-serif-sc transition-all cursor-pointer ${
                isSelected
                  ? 'bg-stone-900 text-white shadow-xs font-bold'
                  : 'hover:bg-stone-100 text-stone-700'
              }`}
              title={th.name}
            >
              <span
                className="w-3 h-3 rounded-full border border-black/20 shrink-0"
                style={{ backgroundColor: th.accentColor }}
              />
              <span className="truncate text-xs max-w-[80px] sm:max-w-none">{th.name.split(' ')[0]}</span>
              {isSelected && <Check className="w-3 h-3 ml-0.5" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
