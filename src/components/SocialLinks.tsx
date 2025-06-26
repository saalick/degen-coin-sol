
import { Instagram, Twitter, Send } from 'lucide-react';

const SocialLinks = () => {
  return (
    <div className="px-4 sm:px-6 mb-8">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 max-w-4xl mx-auto">
        <a 
          href="https://ig.me/j/Abae0X_HVsJv3Hg0/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="terminal-button p-3 sm:p-4 flex items-center justify-center space-x-2 hover:animate-glitch w-full sm:w-auto max-w-xs"
        >
          <Instagram size={18} className="sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Instagram</span>
        </a>
        <a 
          href="https://x.com/degencoinofsol" 
          target="_blank" 
          rel="noopener noreferrer"
          className="terminal-button p-3 sm:p-4 flex items-center justify-center space-x-2 hover:animate-glitch w-full sm:w-auto max-w-xs"
        >
          <Twitter size={18} className="sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">X (Twitter)</span>
        </a>
        <a 
          href="https://t.me/degencoinofsol" 
          target="_blank" 
          rel="noopener noreferrer"
          className="terminal-button p-3 sm:p-4 flex items-center justify-center space-x-2 hover:animate-glitch w-full sm:w-auto max-w-xs"
        >
          <Send size={18} className="sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Telegram</span>
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
