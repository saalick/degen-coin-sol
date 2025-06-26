
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const DegenShrink = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "DegenShrink v2.0 initialized with real AI. I understand your portfolio pain. What's eating you?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState('brutally_honest');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const modes = [
    { id: 'brutally_honest', label: 'Brutally Honest' },
    { id: 'cope_mode', label: 'Cope Mode' },
    { id: 'gm_therapy', label: 'GM Therapy' },
    { id: 'fomo_detox', label: 'FOMO Detox' }
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      console.log('Sending message to DegenShrink AI:', { message: currentMessage, mode });
      
      const { data, error } = await supabase.functions.invoke('degen-shrink-ai', {
        body: { message: currentMessage, mode }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('AI response received:', data);

      const aiMessage: Message = {
        text: data.response || "Something went wrong with my neural networks. Try again?",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error: any) {
      console.error('Error getting AI response:', error);
      
      const errorMessage: Message = {
        text: "My AI brain is temporarily fried. The markets have me stressed too. Try again in a moment.",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "AI Error",
        description: "DegenShrink is having technical difficulties. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black p-6 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="terminal-border p-6 h-[600px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="terminal-text text-2xl">DegenShrink Terminal v2.0</h2>
            <select 
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="terminal-input text-sm"
            >
              {modes.map(m => (
                <option key={m.id} value={m.id} className="bg-black text-white">
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 overflow-y-auto mb-4 space-y-3">
            {messages.map((message, index) => (
              <div key={index} className="terminal-text">
                <div className="text-gray-400 text-xs mb-1">
                  [{message.timestamp.toLocaleTimeString()}] {message.isUser ? 'anon' : 'DegenShrink'}:
                </div>
                <div className={message.isUser ? 'text-gray-300' : 'text-white'}>
                  {'>'} {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="terminal-text">
                <div className="text-gray-400 text-xs mb-1">
                  [{new Date().toLocaleTimeString()}] DegenShrink:
                </div>
                <div className="text-white">
                  {'>'} <span className="animate-pulse">Processing your degeneracy...</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="terminal-input flex-1"
              placeholder="Tell me what's really bothering you..."
              disabled={isLoading}
            />
            <button 
              onClick={handleSendMessage}
              className="terminal-button px-6"
              disabled={isLoading || !inputValue.trim()}
            >
              {isLoading ? 'PROCESSING...' : 'SEND'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DegenShrink;
