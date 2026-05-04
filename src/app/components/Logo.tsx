import { Shield, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export function Logo({ size = 'md', animated = true }: LogoProps) {
  const sizes = {
    sm: { container: 'w-8 h-8', icon: 'w-4 h-4', text: 'text-sm' },
    md: { container: 'w-12 h-12', icon: 'w-6 h-6', text: 'text-base' },
    lg: { container: 'w-20 h-20', icon: 'w-10 h-10', text: 'text-2xl' },
  };

  const LogoContainer = animated ? motion.div : 'div';
  const animationProps = animated
    ? {
        animate: {
          boxShadow: [
            '0 0 20px rgba(147, 51, 234, 0.3)',
            '0 0 40px rgba(59, 130, 246, 0.4)',
            '0 0 20px rgba(147, 51, 234, 0.3)',
          ],
        },
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }
    : {};

  return (
    <LogoContainer
      className={`relative ${sizes[size].container} rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-0.5`}
      {...animationProps}
    >
      <div className="relative size-full bg-gray-950 rounded-xl flex items-center justify-center overflow-hidden">
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Shield icon */}
        <motion.div
          className="relative z-10"
          animate={
            animated
              ? {
                  scale: [1, 1.1, 1],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Shield className={`${sizes[size].icon} text-blue-400`} strokeWidth={2.5} />
        </motion.div>

        {/* Zap accent */}
        <motion.div
          className="absolute"
          animate={
            animated
              ? {
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.2, 0.8],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          <Zap className={`${sizes[size].icon} text-yellow-400`} fill="currentColor" />
        </motion.div>
      </div>
    </LogoContainer>
  );
}
