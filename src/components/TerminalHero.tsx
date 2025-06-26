
import { useState, useEffect } from 'react';

const TerminalHero = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedText, setDisplayedText] = useState<string[]>([]);

  const lines = [
    '> Welcome to the Terminal.',
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
    <section className="min-h-screen flex items-center justify-center bg-black relative ascii-noise">
      <div className="terminal-border p-8 max-w-4xl w-full mx-4 relative scanlines">
        <div className="mb-8">
          <div className="terminal-text text-sm mb-4">
            <span className="text-gray-400">degenOS v2.1.0</span>
          </div>
          
          <div className="space-y-2 mb-8">
            {displayedText.map((line, index) => (
              <div key={index} className="terminal-text text-2xl md:text-4xl">
                {line}
                {index === currentLine - 1 && currentLine < lines.length && (
                  <span className="cursor"></span>
                )}
              </div>
            ))}
          </div>

          {currentLine >= lines.length && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                <button className="terminal-button p-6 text-left hover:animate-glitch">
                  <div className="text-xl mb-2">/degen_shrink</div>
                  <div className="text-gray-400 text-sm">AI therapist for crypto PTSD</div>
                </button>
                
                <button className="terminal-button p-6 text-left hover:animate-glitch">
                  <div className="text-xl mb-2">/anonymous_confess</div>
                  <div className="text-gray-400 text-sm">Vent your degen sins safely</div>
                </button>
                
                <button className="terminal-button p-6 text-left hover:animate-glitch">
                  <div className="text-xl mb-2">/blackout_breathe</div>
                  <div className="text-gray-400 text-sm">Meditation for chart addicts</div>
                </button>
                
                <button className="terminal-button p-6 text-left hover:animate-glitch">
                  <div className="text-xl mb-2">/live_terminal</div>
                  <div className="text-gray-400 text-sm">Anonymous degen chat</div>
                </button>
              </div>

              <div className="text-center mt-12">
                <div className="terminal-text text-gray-400">
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
