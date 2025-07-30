
import React from 'react';

interface SectionListProps {
  sections: string[];
  onSelect: (section: string) => void;
}

const SectionList: React.FC<SectionListProps> = ({ sections, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {sections.map((section, index) => (
        <button
          key={index}
          onClick={() => onSelect(section)}
          className="text-left p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <span className="font-medium text-teal-300 mr-2">{index + 1}.</span>
          <span className="text-slate-200">{section}</span>
        </button>
      ))}
    </div>
  );
};

export default SectionList;
