import { useNavigate } from 'react-router-dom';
import { Image, MessageSquare, Shield, Zap, Eye, AlertTriangle, Lock, Cpu, Brain } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/button';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { FloatingParticles } from '../components/FloatingParticles';
import { Logo } from '../components/Logo';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <FloatingParticles />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Logo Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <Logo size="lg" animated={true} />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full backdrop-blur-sm hover:bg-purple-500/20 transition-all cursor-default"
          >
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm">نظام أمان ذكاء اصطناعي متقدم</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Cpu className="w-4 h-4 text-blue-400" />
            </motion.div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-7xl font-bold mb-6"
          >
            <motion.span
              className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              AI Security Platform
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl text-gray-300 mb-4 max-w-3xl mx-auto font-light"
          >
            Detect AI-generated images and phishing messages instantly
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            استخدم قوة الذكاء الاصطناعي لكشف الصور المزيفة ورسائل الاحتيال في ثوانٍ معدودة
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="group relative overflow-hidden bg-gradient-to-br from-blue-950/50 to-blue-900/30 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 cursor-pointer"
            onClick={() => navigate('/image-detector')}
          >
            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all" />

            <div className="relative">
              <motion.div
                className="mb-6 p-4 bg-blue-500/20 rounded-xl w-fit relative"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Image className="w-12 h-12 text-blue-400 relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-blue-400/20 rounded-xl blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </motion.div>

              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                كشف الصور المزيفة
              </h2>

              <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                تحليل متقدم للصور باستخدام الشبكات العصبية العميقة لكشف التزييف بدقة عالية
              </p>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
                size="lg"
              >
                <Image className="w-5 h-5 ml-2" />
                تحليل صورة
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="group relative overflow-hidden bg-gradient-to-br from-purple-950/50 to-purple-900/30 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 cursor-pointer"
            onClick={() => navigate('/phishing-detector')}
          >
            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all" />

            <div className="relative">
              <motion.div
                className="mb-6 p-4 bg-purple-500/20 rounded-xl w-fit relative"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <MessageSquare className="w-12 h-12 text-purple-400 relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-purple-400/20 rounded-xl blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.5,
                  }}
                />
              </motion.div>

              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                كشف رسائل الاحتيال
              </h2>

              <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                تحليل نصي ذكي لكشف محاولات التصيد الاحتيالي وحماية بياناتك الشخصية
              </p>

              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
                size="lg"
              >
                <MessageSquare className="w-5 h-5 ml-2" />
                تحليل رسالة
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="group text-center p-6 bg-gray-900/40 backdrop-blur-sm border border-gray-700/30 rounded-xl hover:border-yellow-500/30 transition-all relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <motion.div
              className="relative"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            </motion.div>
            <h3 className="text-white font-semibold mb-2 relative">سريع ودقيق</h3>
            <p className="text-gray-400 text-sm relative">نتائج فورية بدقة تصل إلى 95%</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="group text-center p-6 bg-gray-900/40 backdrop-blur-sm border border-gray-700/30 rounded-xl hover:border-green-500/30 transition-all relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <motion.div
              className="relative"
              whileHover={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              <Brain className="w-8 h-8 text-green-400 mx-auto mb-3" />
            </motion.div>
            <h3 className="text-white font-semibold mb-2 relative">تحليل متقدم</h3>
            <p className="text-gray-400 text-sm relative">تقنيات Deep Learning حديثة</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="group text-center p-6 bg-gray-900/40 backdrop-blur-sm border border-gray-700/30 rounded-xl hover:border-red-500/30 transition-all relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <motion.div
              className="relative"
              whileHover={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Lock className="w-8 h-8 text-red-400 mx-auto mb-3" />
            </motion.div>
            <h3 className="text-white font-semibold mb-2 relative">كشف ذكي</h3>
            <p className="text-gray-400 text-sm relative">تحديد نقاط الضعف والتهديدات</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
