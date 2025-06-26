
import { Users, MessageCircle, Heart } from 'lucide-react';

const CoinDescription = () => {
  return (
    <div className="terminal-border p-8 max-w-4xl mx-auto mb-12">
      <div className="terminal-text text-2xl mb-6 text-center">
        {'>'} DegenCoin Description
      </div>
      
      <div className="text-center mb-6">
        <div className="terminal-text text-xl text-gray-300 leading-relaxed">
          Need someone to talk to? A community where Degens stand by each other, 
          united to help heal the trenches
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="terminal-border p-4 text-center">
          <div className="flex justify-center mb-2">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg mb-2">Community</h3>
          <p className="text-gray-400 text-sm">Degens supporting degens through thick and thin</p>
        </div>
        <div className="terminal-border p-4 text-center">
          <div className="flex justify-center mb-2">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg mb-2">Support</h3>
          <p className="text-gray-400 text-sm">Always someone ready to listen and help</p>
        </div>
        <div className="terminal-border p-4 text-center">
          <div className="flex justify-center mb-2">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg mb-2">Healing</h3>
          <p className="text-gray-400 text-sm">Together we heal from the trenches</p>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <div className="terminal-text text-gray-500 text-sm">
          # Building bridges, not walls | Together we rise
        </div>
      </div>
    </div>
  );
};

export default CoinDescription;
