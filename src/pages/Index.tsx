
import Navigation from '../components/Navigation';
import TerminalHero from '../components/TerminalHero';
import SocialLinks from '../components/SocialLinks';
import FounderBio from '../components/FounderBio';

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
      
      <section className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="terminal-border p-8 mb-12">
            <h2 className="terminal-text text-3xl mb-6 text-center">
              {'>'} DegenTerminal Overview
            </h2>
            <div className="terminal-text text-gray-300 leading-relaxed space-y-4">
              <p>
                Welcome to the underground mental health support network for crypto degens. 
                This is a judgment-free zone where you can get real help without the BS.
              </p>
              <p>
                Whether you're dealing with portfolio PTSD, chart addiction, or just need someone 
                who understands the degen life, we're here 24/7.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="terminal-border p-4">
                  <h3 className="text-xl mb-2">DegenShrink</h3>
                  <p className="text-gray-400 text-sm">AI-powered therapy designed specifically for crypto trauma</p>
                </div>
                <div className="terminal-border p-4">
                  <h3 className="text-xl mb-2">Anonymous Confessions</h3>
                  <p className="text-gray-400 text-sm">Share your darkest degen moments safely</p>
                </div>
                <div className="terminal-border p-4">
                  <h3 className="text-xl mb-2">Blackout Breathing</h3>
                  <p className="text-gray-400 text-sm">Meditation techniques for chart-addicted minds</p>
                </div>
                <div className="terminal-border p-4">
                  <h3 className="text-xl mb-2">Live Chat</h3>
                  <p className="text-gray-400 text-sm">Connect with other degens in real-time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-gray-600 my-12" />
      
      <section className="p-6">
        <div className="text-center py-8">
          <div className="terminal-text text-gray-400 mb-8">
            ------- JOIN THE COMMUNITY -------
          </div>
          <SocialLinks />
        </div>
      </section>

      <div className="border-t border-gray-600 my-12" />
      
      <FounderBio />
      
      <footer className="border-t border-gray-600 p-8 text-center mt-12">
        <div className="terminal-text text-gray-400">
          <div className="mb-2"># echo "Built by degens, for degens"</div>
          <div className="text-sm">DegenTerminal v2.1.0 | No financial advice | DYOR | WAGMI</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
