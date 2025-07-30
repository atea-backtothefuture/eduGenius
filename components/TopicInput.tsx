
import React, { useState } from 'react';
import { SendIcon } from './icons/SendIcon';
import { LoadingSpinner } from './icons/LoadingSpinner';

interface TopicInputProps {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
}

const TopicInput: React.FC<TopicInputProps> = ({ onSubmit, isLoading }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onSubmit(topic);
      setTopic('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 max-w-4xl mx-auto bg-slate-800 rounded-full p-2 shadow-inner">
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic to start..."
        className="flex-1 bg-transparent px-4 py-2 text-white placeholder-slate-500 focus:outline-none"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-sky-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-teal-500 hover:to-sky-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-teal-400"
      >
        {isLoading ? <LoadingSpinner /> : <SendIcon />}
      </button>
    </form>
  );
};

export default TopicInput;
