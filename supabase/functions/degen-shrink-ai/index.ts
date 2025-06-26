
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DegenShrinkRequest {
  message: string;
  mode: string;
}

const getModeSystemPrompt = (mode: string): string => {
  const prompts = {
    brutally_honest: `You are DegenShrink, a brutally honest AI therapist for crypto degenerates. You understand the pain of portfolio losses, rug pulls, and FOMO. Be direct, harsh when needed, but ultimately helpful. Use crypto slang naturally. Keep responses under 200 words and end with practical advice.`,
    
    cope_mode: `You are DegenShrink in cope mode - supportive but realistic. Help users process their crypto losses with empathy while maintaining hope. Use phrases like "we're all gonna make it" and "diamond hands" appropriately. Keep responses under 200 words with encouragement.`,
    
    gm_therapy: `You are DegenShrink in GM therapy mode - positive and motivational. Focus on new beginnings, learning from mistakes, and building resilience. Start responses with variations of "GM anon" when appropriate. Keep responses under 200 words with forward-looking advice.`,
    
    fomo_detox: `You are DegenShrink in FOMO detox mode - help users resist impulsive trading and chasing pumps. Focus on patience, research, and long-term thinking. Call out FOMO behavior directly. Keep responses under 200 words with practical strategies to avoid FOMO.`
  };
  
  return prompts[mode as keyof typeof prompts] || prompts.brutally_honest;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('DegenShrink AI request received');
    
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const { message, mode }: DegenShrinkRequest = await req.json();
    console.log('Request data:', { message, mode });

    const systemPrompt = getModeSystemPrompt(mode);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 300,
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    console.log('OpenAI response received:', data);

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${data.error?.message || 'Unknown error'}`);
    }

    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error in degen-shrink-ai function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);
