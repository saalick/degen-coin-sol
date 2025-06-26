
import { useState } from 'react';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const DegenShrink = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "DegenShrink v1.0 initialized. I understand your portfolio pain. What's eating you?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState('brutally_honest');

  const modes = [
    { id: 'brutally_honest', label: 'Brutally Honest' },
    { id: 'cope_mode', label: 'Cope Mode' },
    { id: 'gm_therapy', label: 'GM Therapy' },
    { id: 'fomo_detox', label: 'FOMO Detox' }
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        brutally_honest: [
          "Listen anon, that 90% portfolio drawdown isn't a bug, it's a feature of this space. You're still here, which means you're tougher than you think.",
          "Your dopamine receptors are fried from chart watching. Time to touch grass and reset your reward system.",
          "Stop checking your bags every 5 minutes. The market doesn't care about your feelings or your rent money."
        ],
        cope_mode: [
          "We're all gonna make it, anon. This is just temporary. The best traders are forged in bear markets.",
          "Remember: every rug you survive makes you stronger. You're building anti-fragility.",
          "The market is testing your diamond hands. Don't let it win."
        ],
        gm_therapy: [
          "GM anon. Today is a new day with new opportunities. Your past trades don't define your future.",
          "Take a moment to appreciate what you've learned. Every loss taught you something valuable.",
          "The sun rises on both winners and losers. What matters is how you show up today."
        ],
        fomo_detox: [
          "That 1000x token everyone's shilling? It's probably going to zero. Your FOMO is not alpha.",
          "Real wealth is built slowly. Stop chasing every pump or you'll stay poor forever.",
          "The best trade you can make right now might be no trade at all."
        ]
      };

      const modeResponses = responses[mode as keyof typeof responses] || responses.brutally_honest;
      const randomResponse = modeResponses[Math.floor(Math.random() * modeResponses.length)];

      const aiMessage: Message = {
        text: randomResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 1000 + Math.random() * 2000);
  };

  return (
    <section className="min-h-screen bg-black p-6 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="terminal-border p-6 h-[600px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="terminal-text text-2xl">DegenShrink Terminal</h2>
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
                  > {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="terminal-input flex-1"
              placeholder="Tell me what's really bothering you..."
            />
            <button 
              onClick={handleSendMessage}
              className="terminal-button px-6"
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DegenShrink;
