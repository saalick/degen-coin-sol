
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [useWallet, setUseWallet] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);
  
  const { signIn, signUp, signInWithWallet, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        }
      } else {
        const { error } = await signUp(email, password, username);
        if (error) {
          setError(error.message);
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleWalletConnect = async () => {
    setError('');
    setWalletLoading(true);

    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        setError('Please install MetaMask or another Web3 wallet to continue');
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length === 0) {
        setError('No wallet accounts found. Please unlock your wallet.');
        return;
      }

      const walletAddress = accounts[0];
      console.log('Connected wallet address:', walletAddress);

      // Sign in with the wallet address
      const { error } = await signInWithWallet(walletAddress);
      if (error) {
        setError(error.message);
      }
    } catch (err: any) {
      console.error('Wallet connection error:', err);
      if (err.code === 4001) {
        setError('Wallet connection was rejected by user');
      } else {
        setError('Failed to connect wallet: ' + err.message);
      }
    } finally {
      setWalletLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="terminal-border p-8 w-full max-w-md">
        <div className="mb-6">
          <h1 className="terminal-text text-2xl mb-2">
            {useWallet ? '/connect_wallet' : (isLogin ? '/login' : '/signup')}
          </h1>
          <p className="text-gray-400 terminal-text">
            {'>'} {useWallet ? 'Connect your wallet to access the terminal' : (isLogin ? 'Welcome back, degen' : 'Join the anonymous confessions')}
          </p>
        </div>

        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => setUseWallet(false)}
            className={`terminal-text px-4 py-2 transition-colors ${
              !useWallet ? 'text-white border-b border-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Email/Password
          </button>
          <button
            onClick={() => setUseWallet(true)}
            className={`terminal-text px-4 py-2 transition-colors ${
              useWallet ? 'text-white border-b border-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Wallet
          </button>
        </div>

        {useWallet ? (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-gray-400 terminal-text mb-4">
                {'>'} Connect your Web3 wallet to authenticate
              </p>
              <Button
                onClick={handleWalletConnect}
                disabled={walletLoading}
                className="terminal-button w-full"
              >
                {walletLoading ? 'Connecting...' : 'CONNECT WALLET'}
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="username" className="terminal-text text-gray-300">
                  Username (optional)
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="terminal-input"
                  placeholder="anon_degen"
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="email" className="terminal-text text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="terminal-input"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="terminal-text text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="terminal-input"
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="terminal-button w-full"
            >
              {loading ? 'Processing...' : (isLogin ? 'LOGIN' : 'SIGN UP')}
            </Button>
          </form>
        )}

        {error && (
          <div className="terminal-text text-red-400 text-sm mt-4">
            {'>'} {error}
          </div>
        )}

        {!useWallet && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="terminal-text text-gray-400 hover:text-white transition-colors"
            >
              {isLogin ? "Don't have an account? /signup" : 'Already have an account? /login'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
