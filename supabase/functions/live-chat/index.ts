
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  message: string;
  username?: string;
}

const generateRandomUsername = (): string => {
  const adjectives = ['degen', 'diamond', 'paper', 'moon', 'rocket', 'ape', 'bull', 'bear'];
  const nouns = ['hands', 'brain', 'trader', 'holder', 'flipper', 'whale', 'shrimp', 'chad'];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 9999);
  return `${adj}_${noun}_${num}`;
};

const generateAIResponse = async (message: string): Promise<string> => {
  if (!openAIApiKey) {
    return "AI is currently offline, but your message was heard anon.";
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an anonymous crypto degen in a terminal chat room. Keep responses short (under 50 words), use crypto slang, and be supportive but realistic about the pain of trading. Sometimes respond with just emojis or brief reactions.'
          },
          { role: 'user', content: message }
        ],
        max_tokens: 100,
        temperature: 0.9,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI response error:', error);
    return "💀 AI is having issues rn";
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, username }: ChatMessage = await req.json();
    console.log('Chat message received:', { message, username });

    const finalUsername = username || generateRandomUsername();

    // Store the message (you could add this to a database table later)
    console.log(`[${new Date().toISOString()}] ${finalUsername}: ${message}`);

    // Sometimes generate an AI response (30% chance)
    let aiResponse = null;
    if (Math.random() < 0.3) {
      aiResponse = await generateAIResponse(message);
      console.log(`[${new Date().toISOString()}] ai_degen: ${aiResponse}`);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      username: finalUsername,
      aiResponse: aiResponse ? {
        username: 'ai_degen',
        message: aiResponse
      } : null
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error in live-chat function:', error);
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
