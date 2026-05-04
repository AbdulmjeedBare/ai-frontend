import { motion } from 'motion/react';
import { Brain, Zap } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-24 h-24">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 border-4 border-purple-500/20 border-t-purple-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />

        {/* Inner ring */}
        <motion.div
          className="absolute inset-3 border-4 border-blue-500/20 border-b-blue-500 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Brain className="w-8 h-8 text-purple-400" />
          </motion.div>
        </div>

        {/* Floating particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            style={{
              top: '50%',
              left: '50%',
            }}
            animate={{
              x: [0, Math.cos((i * Math.PI) / 2) * 40, 0],
              y: [0, Math.sin((i * Math.PI) / 2) * 40, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="mt-6 text-center"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <p className="text-gray-300 font-medium flex items-center gap-2 justify-center">
          <Zap className="w-4 h-4 text-yellow-400" />
          جاري التحليل...
        </p>
        <p className="text-gray-500 text-sm mt-1">الذكاء الاصطناعي يعمل الآن</p>
      </motion.div>
    </div>
  );
}
