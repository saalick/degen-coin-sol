
const FounderBio = () => {
  return (
    <div className="terminal-border p-8 max-w-4xl mx-auto">
      <div className="terminal-text text-2xl mb-6 text-center">
        {'>'} Meet the Founder
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
        <div className="flex-shrink-0">
          <img 
            src="https://i.ibb.co/hJk32Q4Y/CF9-B7-E3-D-45-AB-41-F2-862-D-A2-D6-C282822-D.jpg" 
            alt="Tommy - Founder of DegenTerminal" 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-gray-600"
          />
        </div>
        
        <div className="flex-1">
          <div className="terminal-text text-lg mb-4 text-center md:text-left">
            <span className="text-gray-400">Tommy</span>
          </div>
          <div className="terminal-text text-gray-300 leading-relaxed text-center md:text-left">
            Tommy is a doxed content creator with a 2 million-follower presence across multiple platforms, 
            known for his motivational videos and public interviews, building his reputation in the crypto space.
          </div>
        </div>
      </div>
      
      <div className="text-center mt-6">
        <div className="terminal-text text-gray-500 text-sm">
          Not Financial Advice | DYOR | Find Entry | Don't FOMO
        </div>
      </div>
    </div>
  );
};

export default FounderBio;
