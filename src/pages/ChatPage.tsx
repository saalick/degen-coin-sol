
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  isAI?: boolean;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      username: 'anon_degen',
      message: 'anyone else feeling dead inside?',
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: '2',
      username: 'crypto_ghost',
      message: 'same bro, portfolio down 80%',
      timestamp: new Date(Date.now() - 180000),
    },
    {
      id: '3',
      username: 'diamond_hands',
      message: "we're all gonna make it... right?",
      timestamp: new Date(Date.now() - 60000),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      username: user?.user_metadata?.username || 'anon',
      message: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    const currentMessage = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      console.log('Sending chat message:', currentMessage);
      
      const { data, error } = await supabase.functions.invoke('live-chat', {
        body: { 
          message: currentMessage, 
          username: user?.user_metadata?.username 
        }
      });

      if (error) {
        console.error('Chat function error:', error);
        throw error;
      }

      console.log('Chat response:', data);

      // Add AI response if one was generated
      if (data.aiResponse) {
        const aiMessage: ChatMessage = {
          id: Date.now().toString() + '_ai',
          username: data.aiResponse.username,
          message: data.aiResponse.message,
          timestamp: new Date(),
          isAI: true,
        };

        setTimeout(() => {
          setMessages(prev => [...prev, aiMessage]);
        }, 1000 + Math.random() * 2000);
      }
    } catch (error: any) {
      console.error('Error sending chat message:', error);
      toast({
        title: "Chat Error",
        description: "Failed to send message. Terminal connection unstable.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate some random chat activity
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every 10 seconds
        const randomMessages = [
          { username: 'moon_boy_420', message: 'wen lambo?' },
          { username: 'rekt_trader', message: '📉📉📉' },
          { username: 'hopium_dealer', message: 'this is just a dip bro' },
          { username: 'paper_hands', message: 'i sold the bottom again' },
          { username: 'diamond_hodler', message: '💎🙌 never selling' },
        ];
        
        const randomMsg = randomMessages[Math.floor(Math.random() * randomMessages.length)];
        const simulatedMessage: ChatMessage = {
          id: Date.now().toString() + '_sim',
          username: randomMsg.username,
          message: randomMsg.message,
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, simulatedMessage]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <div className="pt-24 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="terminal-text text-3xl mb-8">Live Terminal Chat</h1>
          <div className="terminal-border p-6 h-96 flex flex-col">
            <div className="terminal-text text-gray-400 mb-4">
              {'>'} Anonymous chat room for degens • {messages.length} messages
            </div>
            
            <div className="flex-1 overflow-y-auto mb-4 space-y-2">
              {messages.map((msg) => (
                <div key={msg.id} className="terminal-text text-sm">
                  <span className="text-gray-500">
                    [{msg.timestamp.toLocaleTimeString()}]
                  </span>
                  <span className={`ml-2 ${msg.isAI ? 'text-green-400' : 'text-white'}`}>
                    {msg.username}:
                  </span>
                  <span className="ml-2 text-gray-300">
                    {msg.message}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="terminal-text text-sm">
                  <span className="text-gray-500">
                    [{new Date().toLocaleTimeString()}]
                  </span>
                  <span className="ml-2 text-gray-400 animate-pulse">
                    sending message...
                  </span>
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
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <button 
                onClick={handleSendMessage}
                className="terminal-button px-6"
                disabled={isLoading || !inputValue.trim()}
              >
                {isLoading ? 'SENDING...' : 'SEND'}
              </button>
            </div>
          </div>
          
          {!user && (
            <div className="terminal-text text-gray-400 mt-4 text-center">
              {'>'} <a href="/auth" className="text-white hover:underline">Login</a> to chat with a persistent username
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
