
import { useState } from 'react';

interface Confession {
  id: string;
  text: string;
  timestamp: Date;
  reactions: {
    cope: number;
    same: number;
    gm: number;
  };
}

const ConfessionFeed = () => {
  const [confessions] = useState<Confession[]>([
    {
      id: '1',
      text: "Lost 80% of my portfolio to a rug pull last week. Can't tell my family. Pretending everything is fine while dying inside.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      reactions: { cope: 23, same: 45, gm: 12 }
    },
    {
      id: '2', 
      text: "Been awake for 72 hours straight watching charts. My girlfriend left. Mom's worried. But I can feel the next pump coming...",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      reactions: { cope: 67, same: 34, gm: 8 }
    },
    {
      id: '3',
      text: "Sold my wedding ring to buy the dip. It kept dipping. Now I'm sleeping on my friend's couch and my wife won't answer my calls.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      reactions: { cope: 89, same: 156, gm: 23 }
    },
    {
      id: '4',
      text: "Made 50k in one day, lost 80k the next. The highs don't feel as good as the lows feel bad. Considering quitting but I can't stop.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
      reactions: { cope: 45, same: 78, gm: 34 }
    }
  ]);

  const [newConfession, setNewConfession] = useState('');

  const handleSubmitConfession = () => {
    if (!newConfession.trim()) return;
    console.log('New confession:', newConfession);
    setNewConfession('');
  };

  const formatTimeAgo = (timestamp: Date) => {
    const minutes = Math.floor((Date.now() - timestamp.getTime()) / (1000 * 60));
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <section className="min-h-screen bg-black p-6 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="terminal-text text-3xl mb-4">Anonymous Confessions</h2>
          <p className="text-gray-400 terminal-text">
            > Raw degen stories. No judgment zone. Type /anon to stay hidden.
          </p>
        </div>

        <div className="terminal-border p-6 mb-8">
          <div className="terminal-text text-lg mb-4">Submit Anonymous Confession:</div>
          <textarea
            value={newConfession}
            onChange={(e) => setNewConfession(e.target.value)}
            className="terminal-input w-full h-32 resize-none mb-4"
            placeholder="Tell your truth... hash will be generated for anonymity"
          />
          <button 
            onClick={handleSubmitConfession}
            className="terminal-button"
          >
            /submit_anon
          </button>
        </div>

        <div className="space-y-6">
          {confessions.map((confession) => (
            <div key={confession.id} className="terminal-border p-6 hover:bg-gray-900 transition-colors">
              <div className="terminal-text mb-2">
                <span className="text-gray-400">anon#{confession.id.padStart(6, '0')}:</span>
              </div>
              
              <div className="terminal-text text-gray-300 mb-4 leading-relaxed">
                > {confession.text}
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-gray-500 text-sm terminal-text">
                  {formatTimeAgo(confession.timestamp)}
                </div>
                
                <div className="flex space-x-4">
                  <button className="terminal-text text-gray-400 hover:text-white transition-colors">
                    /cope ({confession.reactions.cope})
                  </button>
                  <button className="terminal-text text-gray-400 hover:text-white transition-colors">
                    /same ({confession.reactions.same})
                  </button>
                  <button className="terminal-text text-gray-400 hover:text-white transition-colors">
                    /gm ({confession.reactions.gm})
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConfessionFeed;
