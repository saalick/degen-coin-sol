
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, MessageSquare, Heart, Users } from 'lucide-react';

const TerminalHero = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedText, setDisplayedText] = useState<string[]>([]);

  const lines = [
    '> Welcome to the DegenCoin.',
    '> Mental Health for Crypto Degens.',
    '> No BS. No judgment. Just raw support.',
    '> Enter when ready...'
  ];

  useEffect(() => {
    if (currentLine < lines.length) {
      const timer = setTimeout(() => {
        if (currentChar < lines[currentLine].length) {
          setDisplayedText(prev => {
            const newText = [...prev];
            if (!newText[currentLine]) newText[currentLine] = '';
            newText[currentLine] = lines[currentLine].substring(0, currentChar + 1);
            return newText;
          });
          setCurrentChar(prev => prev + 1);
        } else {
          setCurrentLine(prev => prev + 1);
          setCurrentChar(0);
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar, lines]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-black relative ascii-noise px-4 sm:px-6">
      <div className="terminal-border p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto relative scanlines">
        <div className="mb-6 sm:mb-8">
          <div className="terminal-text text-xs sm:text-sm mb-4">
            <span className="text-gray-400">degenOS v2.1.0</span>
          </div>
          
          <div className="space-y-2 mb-6 sm:mb-8">
            {displayedText.map((line, index) => (
              <div key={index} className="terminal-text text-lg sm:text-2xl md:text-3xl lg:text-4xl break-words">
                {line}
                {index === currentLine - 1 && currentLine < lines.length && (
                  <span className="cursor"></span>
                )}
              </div>
            ))}
          </div>

          {currentLine >= lines.length && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-8 sm:mt-12">
                <Link to="/degen-shrink" className="terminal-button p-4 sm:p-6 text-left hover:animate-glitch block">
                  <div className="flex items-center text-base sm:text-xl mb-1 sm:mb-2">
                    <Brain className="w-5 h-5 mr-2" />
                    /degen_shrink
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">AI therapist for crypto PTSD</div>
                </Link>
                
                <Link to="/confessions" className="terminal-button p-4 sm:p-6 text-left hover:animate-glitch block">
                  <div className="flex items-center text-base sm:text-xl mb-1 sm:mb-2">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    /anonymous_confess
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">Vent your degen sins safely</div>
                </Link>
                
                <Link to="/breathing" className="terminal-button p-4 sm:p-6 text-left hover:animate-glitch block">
                  <div className="flex items-center text-base sm:text-xl mb-1 sm:mb-2">
                    <Heart className="w-5 h-5 mr-2" />
                    /blackout_breathe
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">Meditation for chart addicts</div>
                </Link>
                
                <Link to="/chat" className="terminal-button p-4 sm:p-6 text-left hover:animate-glitch block">
                  <div className="flex items-center text-base sm:text-xl mb-1 sm:mb-2">
                    <Users className="w-5 h-5 mr-2" />
                    /live_terminal
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">Anonymous degen chat</div>
                </Link>
              </div>

              <div className="text-center mt-8 sm:mt-12">
                <div className="terminal-text text-gray-400 text-sm">
                  <span className="animate-blink">_</span> Type /help for commands
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TerminalHero;
