import React, { useState } from 'react';
import { ClipboardCopyIcon } from './icons/ClipboardCopyIcon';
import { CheckIcon } from './icons/CheckIcon';

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (!code || isCopied) return;
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }).catch(err => {
      console.error("Failed to copy text: ", err);
    });
  };

  return (
    <div className="relative bg-slate-950/70 rounded-lg group">
      <button 
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-slate-700/50 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:cursor-not-allowed"
        disabled={isCopied}
        aria-label={isCopied ? 'Copied' : 'Copy code'}
      >
        {isCopied ? <CheckIcon /> : <ClipboardCopyIcon />}
      </button>
      <pre className="p-4 overflow-x-auto text-sm text-slate-300 language-javascript">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;