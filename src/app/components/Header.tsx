import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Logo } from './Logo';

export function Header() {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 border-b border-purple-900/30 bg-black/60 backdrop-blur-xl"
    >
      <div className="container mx-auto px-6 py-4">
        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Logo size="md" animated={true} />

          <div className="text-right">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:via-purple-300 group-hover:to-pink-300 transition-all">
              AI Security Platform
            </h1>
            <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
              Powered by Deep Learning
            </p>
          </div>
        </motion.button>
      </div>
    </motion.header>
  );
}
