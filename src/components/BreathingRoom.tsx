
import { useState, useEffect } from 'react';

const BreathingRoom = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [countdown, setCountdown] = useState(4);
  const [ventText, setVentText] = useState('');

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          if (phase === 'inhale') {
            setPhase('hold');
            return 2;
          } else if (phase === 'hold') {
            setPhase('exhale');
            return 6;
          } else {
            setPhase('inhale');
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  const getCircleScale = () => {
    if (!isActive) return 'scale-50';
    if (phase === 'inhale') return 'scale-100';
    if (phase === 'hold') return 'scale-100';
    return 'scale-50';
  };

  const handleVentSubmit = () => {
    setVentText('');
    // Text disappears immediately after typing - therapeutic effect
  };

  return (
    <section className="min-h-screen bg-black flex items-center justify-center p-6 relative">
      <div className="text-center max-w-2xl w-full">
        <h2 className="terminal-text text-3xl mb-8">Blackout Breathing Room</h2>
        <p className="text-gray-400 terminal-text mb-12">
          > For when the charts are too much. Breathe through the pain.
        </p>

        <div className="mb-12">
          <div 
            className={`w-48 h-48 mx-auto rounded-full border-2 border-white transition-transform duration-1000 ease-in-out ${getCircleScale()}`}
          />
          
          <div className="mt-8 space-y-4">
            {isActive ? (
              <>
                <div className="terminal-text text-2xl">
                  {phase === 'inhale' && 'Inhale...'}
                  {phase === 'hold' && 'Hold...'}
                  {phase === 'exhale' && 'Exhale...'}
                </div>
                <div className="terminal-text text-4xl font-bold">
                  {countdown}
                </div>
                <button 
                  onClick={() => setIsActive(false)}
                  className="terminal-button"
                >
                  /stop
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsActive(true)}
                className="terminal-button text-xl px-8 py-4"
              >
                /start_breathing
              </button>
            )}
          </div>
        </div>

        <div className="terminal-border p-6 max-w-lg mx-auto">
          <div className="terminal-text text-lg mb-4">Rage Vent (disappears after typing)</div>
          <textarea
            value={ventText}
            onChange={(e) => setVentText(e.target.value)}
            className="terminal-input w-full h-32 resize-none mb-4"
            placeholder="Type your rage... it will vanish when you're done"
          />
          <button 
            onClick={handleVentSubmit}
            className="terminal-button"
          >
            /release_rage
          </button>
          <div className="text-gray-500 text-sm mt-2 terminal-text">
            Nothing is saved. This is just for you.
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreathingRoom;
