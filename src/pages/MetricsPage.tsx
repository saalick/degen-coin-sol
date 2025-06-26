
import Navigation from '../components/Navigation';

const MetricsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <div className="pt-24 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="terminal-text text-3xl mb-8">Degen Metrics Dashboard</h1>
          <div className="terminal-border p-6">
            <div className="terminal-text text-gray-400 mb-4">
              {'>'} System Status: Online
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="terminal-border p-4">
                <div className="terminal-text text-xl mb-2">Active Degens</div>
                <div className="text-3xl font-bold">247</div>
              </div>
              <div className="terminal-border p-4">
                <div className="terminal-text text-xl mb-2">Confessions Today</div>
                <div className="text-3xl font-bold">18</div>
              </div>
              <div className="terminal-border p-4">
                <div className="terminal-text text-xl mb-2">Therapy Sessions</div>
                <div className="text-3xl font-bold">34</div>
              </div>
              <div className="terminal-border p-4">
                <div className="terminal-text text-xl mb-2">Breathing Sessions</div>
                <div className="text-3xl font-bold">61</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsPage;
