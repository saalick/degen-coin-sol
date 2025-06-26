
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
      // Fetch confessions with reaction counts
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

      // For each confession, get the actual reaction counts from confession_reactions table
      const confessionsWithCounts = await Promise.all(
        (data || []).map(async (confession) => {
          const { data: reactionCounts } = await supabase
            .from('confession_reactions')
            .select('reaction_type')
            .eq('confession_id', confession.id);

          const counts = { cope: 0, same: 0, gm: 0 };
          reactionCounts?.forEach((reaction) => {
            if (reaction.reaction_type in counts) {
              counts[reaction.reaction_type as keyof typeof counts]++;
            }
          });

          return {
            ...confession,
            reactions: counts
          };
        })
      );

      setConfessions(confessionsWithCounts);
    } catch (error: any) {
      console.error('Error fetching confessions:', error);
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
      console.error('Error submitting confession:', error);
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
      console.log(`Handling reaction: ${reactionType} for confession: ${confessionId}`);
      
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
        console.log('Removing existing reaction');
        const { error } = await supabase
          .from('confession_reactions')
          .delete()
          .eq('id', existingReaction.id);
        
        if (error) throw error;
        
        toast({
          title: "Reaction removed",
          description: `Removed your /${reactionType} reaction`
        });
      } else {
        // Add reaction
        console.log('Adding new reaction');
        const { error } = await supabase
          .from('confession_reactions')
          .insert({
            confession_id: confessionId,
            user_id: user.id,
            reaction_type: reactionType
          });
        
        if (error) throw error;
        
        toast({
          title: "Reaction added",
          description: `Added /${reactionType} reaction`
        });
      }

      // Refresh confessions to update counts
      fetchConfessions();
    } catch (error: any) {
      console.error('Error updating reaction:', error);
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
      <section className="min-h-screen bg-black p-4 sm:p-6 pt-20 sm:pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="terminal-border p-6 sm:p-8">
            <h2 className="terminal-text text-xl sm:text-2xl mb-4">Access Denied</h2>
            <p className="text-gray-400 terminal-text mb-4 sm:mb-6 text-sm sm:text-base">
              {'>'} You need to be authenticated to view confessions
            </p>
            <Link to="/auth" className="terminal-button inline-block px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
              /login
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black p-4 sm:p-6 pt-20 sm:pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h2 className="terminal-text text-2xl sm:text-3xl mb-3 sm:mb-4">Anonymous Confessions</h2>
          <p className="text-gray-400 terminal-text text-sm sm:text-base">
            {'>'} Raw degen stories. No judgment zone. Type /anon to stay hidden.
          </p>
        </div>

        <div className="terminal-border p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="terminal-text text-base sm:text-lg mb-3 sm:mb-4">Submit Anonymous Confession:</div>
          <textarea
            value={newConfession}
            onChange={(e) => setNewConfession(e.target.value)}
            className="terminal-input w-full h-24 sm:h-32 resize-none mb-3 sm:mb-4 text-sm sm:text-base"
            placeholder="Tell your truth... hash will be generated for anonymity"
          />
          <button 
            onClick={handleSubmitConfession}
            disabled={submitting}
            className="terminal-button text-sm sm:text-base px-4 sm:px-6 py-2"
          >
            {submitting ? 'Submitting...' : '/submit_anon'}
          </button>
        </div>

        {loading ? (
          <div className="text-center terminal-text text-gray-400 text-sm sm:text-base">
            Loading confessions...
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {confessions.map((confession, index) => (
              <div key={confession.id} className="terminal-border p-4 sm:p-6 hover:bg-gray-900 transition-colors">
                <div className="terminal-text mb-2 text-sm sm:text-base">
                  <span className="text-gray-400">anon#{String(index + 1).padStart(6, '0')}:</span>
                </div>
                
                <div className="terminal-text text-gray-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                  {'>'} {confession.content}
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                  <div className="text-gray-500 text-xs sm:text-sm terminal-text">
                    {formatTimeAgo(confession.created_at)}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 sm:gap-4">
                    <button 
                      onClick={() => handleReaction(confession.id, 'cope')}
                      className="terminal-text text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                    >
                      /cope ({confession.reactions.cope})
                    </button>
                    <button 
                      onClick={() => handleReaction(confession.id, 'same')}
                      className="terminal-text text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                    >
                      /same ({confession.reactions.same})
                    </button>
                    <button 
                      onClick={() => handleReaction(confession.id, 'gm')}
                      className="terminal-text text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
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
