
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import TerminalHero from '../components/TerminalHero';
import SocialLinks from '../components/SocialLinks';
import CoinDescription from '../components/CoinDescription';
import FounderBio from '../components/FounderBio';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <TerminalHero />
      
      {!user && (
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="terminal-border p-6 sm:p-8 mb-6 sm:mb-8">
              <h2 className="terminal-text text-xl sm:text-2xl mb-3 sm:mb-4">Join the Terminal</h2>
              <p className="text-gray-400 terminal-text mb-4 sm:mb-6 text-sm sm:text-base">
                {'>'} Authenticate to access confessions and live chat
              </p>
              <Link to="/auth" className="terminal-button inline-block px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base">
                /authenticate
              </Link>
            </div>
          </div>
        </section>
      )}
      
      <SocialLinks />
      <CoinDescription />
      <FounderBio />
    </div>
  );
};

export default Index;
