
import Navigation from '../components/Navigation';
import TerminalHero from '../components/TerminalHero';
import DegenShrink from '../components/DegenShrink';
import ConfessionFeed from '../components/ConfessionFeed';
import BreathingRoom from '../components/BreathingRoom';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />
      <TerminalHero />
      
      <div className="border-t border-gray-600 my-12">
        <div className="text-center py-8">
          <div className="terminal-text text-gray-400">
            ------- DEGEN SUPPORT MODULES LOADED -------
          </div>
        </div>
      </div>
      
      <div id="degen-shrink">
        <DegenShrink />
      </div>
      
      <div className="border-t border-gray-600 my-12" />
      
      <div id="confessions">
        <ConfessionFeed />
      </div>
      
      <div className="border-t border-gray-600 my-12" />
      
      <div id="breathing">
        <BreathingRoom />
      </div>
      
      <footer className="border-t border-gray-600 p-8 text-center">
        <div className="terminal-text text-gray-400">
          <div className="mb-2"># echo "Built by degens, for degens"</div>
          <div className="text-sm">DegenTerminal v2.1.0 | No financial advice | DYOR | WAGMI</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
