
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, MessageSender, ChatMessageContent } from './types';
import { generateSections, generateContentForSection } from './services/geminiService';
import ChatMessageComponent from './components/ChatMessage';
import TopicInput from './components/TopicInput';
import { LoadingSpinner } from './components/icons/LoadingSpinner';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      sender: MessageSender.BOT,
      content: "Hello! I'm EduGenius Bot. What topic would you like to create a curriculum for? (e.g., 'Data Science', 'React Native Development')"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (sender: MessageSender, content: ChatMessageContent) => {
    setMessages(prev => [...prev, { id: crypto.randomUUID(), sender, content, topic: currentTopic }]);
  };

  const handleTopicSubmit = async (topic: string) => {
    if (!topic.trim() || isLoading) return;

    setIsLoading(true);
    setCurrentTopic(topic);
    addMessage(MessageSender.USER, topic);
    
    // Add a temporary thinking message
    const thinkingMessageId = crypto.randomUUID();
    setMessages(prev => [...prev, { id: thinkingMessageId, sender: MessageSender.BOT, content: "Finding key sections..." }]);

    try {
      const sections = await generateSections(topic);
      setMessages(prev => prev.filter(m => m.id !== thinkingMessageId)); // remove thinking message
      addMessage(MessageSender.BOT, { sections });
    } catch (error) {
      console.error("Error generating sections:", error);
      setMessages(prev => prev.filter(m => m.id !== thinkingMessageId)); // remove thinking message
      addMessage(MessageSender.BOT, "Sorry, I had trouble finding sections for that topic. Please try another one.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSectionSelect = async (section: string, topic: string) => {
    if (isLoading) return;

    setIsLoading(true);
    addMessage(MessageSender.USER, `Tell me more about "${section}"`);

    // Add a temporary thinking message
    const thinkingMessageId = crypto.randomUUID();
    setMessages(prev => [...prev, { id: thinkingMessageId, sender: MessageSender.BOT, content: "Creating lesson plans and interview questions..." }]);

    try {
      const content = await generateContentForSection(topic, section);
      setMessages(prev => prev.filter(m => m.id !== thinkingMessageId));
      addMessage(MessageSender.BOT, { content });
    } catch (error) {
      console.error("Error generating content:", error);
      setMessages(prev => prev.filter(m => m.id !== thinkingMessageId));
      addMessage(MessageSender.BOT, "I couldn't generate the content for that section. Please try another one.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white font-sans">
      <header className="bg-slate-950/70 backdrop-blur-md p-4 shadow-lg border-b border-slate-700 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-sky-500">EduGenius Bot</h1>
        <p className="text-center text-sm text-slate-400">Your AI Assistant for Curriculum Development</p>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg) => (
          <ChatMessageComponent key={msg.id} message={msg} onSectionSelect={handleSectionSelect} />
        ))}
        {isLoading && messages[messages.length-1]?.sender !== MessageSender.BOT && (
          <div className="flex justify-start items-center space-x-3">
             <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-teal-400 to-sky-600 rounded-full flex items-center justify-center">
               <LoadingSpinner />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </main>

      <footer className="p-4 bg-slate-900 sticky bottom-0">
        <TopicInput onSubmit={handleTopicSubmit} isLoading={isLoading} />
      </footer>
    </div>
  );
};

export default App;
