
import Navigation from '../components/Navigation';
import DegenShrink from '../components/DegenShrink';

const DegenShrinkPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <div className="pt-20">
        <DegenShrink />
      </div>
    </div>
  );
};

export default DegenShrinkPage;
