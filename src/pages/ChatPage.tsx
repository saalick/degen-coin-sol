
import Navigation from '../components/Navigation';

const ChatPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <div className="pt-24 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="terminal-text text-3xl mb-8">Live Terminal Chat</h1>
          <div className="terminal-border p-6 h-96">
            <div className="terminal-text text-gray-400 mb-4">
              {'>'} Anonymous chat room for degens
            </div>
            <div className="flex-1 mb-4">
              <div className="terminal-text text-sm mb-2">
                [23:42] anon_degen: anyone else feeling dead inside?
              </div>
              <div className="terminal-text text-sm mb-2">
                [23:43] crypto_ghost: same bro, portfolio down 80%
              </div>
              <div className="terminal-text text-sm mb-2">
                [23:44] diamond_hands: we're all gonna make it... right?
              </div>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                className="terminal-input flex-1"
                placeholder="Type your message..."
              />
              <button className="terminal-button px-6">
                SEND
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
