
import { Instagram, Twitter } from 'lucide-react';

const SocialLinks = () => {
  return (
    <div className="flex justify-center space-x-8 mb-8">
      <a 
        href="https://instagram.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="terminal-button p-4 flex items-center space-x-2 hover:animate-glitch"
      >
        <Instagram size={20} />
        <span>Instagram</span>
      </a>
      <a 
        href="https://x.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="terminal-button p-4 flex items-center space-x-2 hover:animate-glitch"
      >
        <Twitter size={20} />
        <span>X (Twitter)</span>
      </a>
      <a 
        href="https://t.me" 
        target="_blank" 
        rel="noopener noreferrer"
        className="terminal-button p-4 flex items-center space-x-2 hover:animate-glitch"
      >
        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
          <span className="text-black text-xs font-bold">T</span>
        </div>
        <span>Telegram</span>
      </a>
    </div>
  );
};

export default SocialLinks;
