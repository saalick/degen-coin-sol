
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Confession {
  id: string;
  content: string;
  created_at: string;
  reactions: {
    cope: number;
    same: number;
    gm: number;
  };
  user_reactions?: string[];
}

const ConfessionFeed = () => {
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [newConfession, setNewConfession] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchConfessions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('confessions')
        .select(`
          id,
          content,
          created_at,
          reactions
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setConfessions(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading confessions",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfessions();
  }, []);

  const handleSubmitConfession = async () => {
    if (!newConfession.trim()) return;
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You need to be logged in to submit a confession",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('confessions')
        .insert({
          user_id: user.id,
          content: newConfession.trim()
        });

      if (error) throw error;

      setNewConfession('');
      toast({
        title: "Confession submitted",
        description: "Your anonymous confession has been shared"
      });
      fetchConfessions();
    } catch (error: any) {
      toast({
        title: "Error submitting confession",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReaction = async (confessionId: string, reactionType: 'cope' | 'same' | 'gm') => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You need to be logged in to react",
        variant: "destructive"
      });
      return;
    }

    try {
      // Check if user already reacted with this type
      const { data: existingReaction } = await supabase
        .from('confession_reactions')
        .select('id')
        .eq('confession_id', confessionId)
        .eq('user_id', user.id)
        .eq('reaction_type', reactionType)
        .single();

      if (existingReaction) {
        // Remove reaction
        await supabase
          .from('confession_reactions')
          .delete()
          .eq('id', existingReaction.id);
      } else {
        // Add reaction
        await supabase
          .from('confession_reactions')
          .insert({
            confession_id: confessionId,
            user_id: user.id,
            reaction_type: reactionType
          });
      }

      fetchConfessions();
    } catch (error: any) {
      toast({
        title: "Error updating reaction",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const minutes = Math.floor((Date.now() - new Date(timestamp).getTime()) / (1000 * 60));
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (!user) {
    return (
      <section className="min-h-screen bg-black p-6 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="terminal-border p-8">
            <h2 className="terminal-text text-2xl mb-4">Access Denied</h2>
            <p className="text-gray-400 terminal-text mb-6">
              {'>'} You need to be authenticated to view confessions
            </p>
            <Link to="/auth" className="terminal-button inline-block px-6 py-3">
              /login
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black p-6 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="terminal-text text-3xl mb-4">Anonymous Confessions</h2>
          <p className="text-gray-400 terminal-text">
            {'>'} Raw degen stories. No judgment zone. Type /anon to stay hidden.
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
            disabled={submitting}
            className="terminal-button"
          >
            {submitting ? 'Submitting...' : '/submit_anon'}
          </button>
        </div>

        {loading ? (
          <div className="text-center terminal-text text-gray-400">
            Loading confessions...
          </div>
        ) : (
          <div className="space-y-6">
            {confessions.map((confession, index) => (
              <div key={confession.id} className="terminal-border p-6 hover:bg-gray-900 transition-colors">
                <div className="terminal-text mb-2">
                  <span className="text-gray-400">anon#{String(index + 1).padStart(6, '0')}:</span>
                </div>
                
                <div className="terminal-text text-gray-300 mb-4 leading-relaxed">
                  {'>'} {confession.content}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-gray-500 text-sm terminal-text">
                    {formatTimeAgo(confession.created_at)}
                  </div>
                  
                  <div className="flex space-x-4">
                    <button 
                      onClick={() => handleReaction(confession.id, 'cope')}
                      className="terminal-text text-gray-400 hover:text-white transition-colors"
                    >
                      /cope ({confession.reactions.cope})
                    </button>
                    <button 
                      onClick={() => handleReaction(confession.id, 'same')}
                      className="terminal-text text-gray-400 hover:text-white transition-colors"
                    >
                      /same ({confession.reactions.same})
                    </button>
                    <button 
                      onClick={() => handleReaction(confession.id, 'gm')}
                      className="terminal-text text-gray-400 hover:text-white transition-colors"
                    >
                      /gm ({confession.reactions.gm})
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ConfessionFeed;
