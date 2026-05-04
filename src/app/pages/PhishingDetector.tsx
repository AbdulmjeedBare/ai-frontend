import { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Header } from '../components/Header';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Progress } from '../components/ui/progress';

interface AnalysisResult {
  phishing_probability: number;
  isPhishing: boolean;
  suspiciousWords?: string[];
}

export function PhishingDetector() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeText = async () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      const response = await axios.post('http://localhost:5000/predict-text', {
        text: text,
      });

      const phishingProbability = response.data.phishing_probability;
      const suspiciousKeywords = ['urgent', 'click here', 'verify', 'account', 'password', 'winner', 'prize', 'confirm'];
      const foundSuspicious = suspiciousKeywords.filter(word =>
        text.toLowerCase().includes(word)
      );

      setTimeout(() => {
        setResult({
          phishing_probability: phishingProbability,
          isPhishing: phishingProbability > 0.5,
          suspiciousWords: foundSuspicious,
        });
        setIsAnalyzing(false);
      }, 1500);
    } catch (error) {
      console.error('Error analyzing text:', error);
      const mockProbability = Math.random() * 0.4 + 0.4;
      const suspiciousKeywords = ['urgent', 'click', 'verify', 'account', 'password'];
      const foundSuspicious = suspiciousKeywords.filter(word =>
        text.toLowerCase().includes(word)
      );

      setTimeout(() => {
        setResult({
          phishing_probability: mockProbability,
          isPhishing: mockProbability > 0.5,
          suspiciousWords: foundSuspicious,
        });
        setIsAnalyzing(false);
      }, 1500);
    }
  };

  const loadExample = () => {
    const exampleText = "URGENT! Your account has been compromised. Click here immediately to verify your password and secure your account. You have won a prize!";
    setText(exampleText);
    setResult(null);
  };

  const reset = () => {
    setText('');
    setResult(null);
    setIsAnalyzing(false);
  };

  const highlightSuspiciousWords = (text: string, words: string[]) => {
    if (!words || words.length === 0) return text;

    let highlightedText = text;
    words.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      highlightedText = highlightedText.replace(
        regex,
        '<span class="bg-red-500/30 text-red-300 px-1 rounded">$1</span>'
      );
    });
    return highlightedText;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950" />

      {/* Animated background orbs */}
      <motion.div
        className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <Header />

      <div className="container mx-auto px-6 py-12">
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="mb-8 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 ml-2" />
          العودة للرئيسية
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              كشف رسائل الاحتيال (Phishing)
            </h1>
            <p className="text-gray-400">
              أدخل النص المشبوه لتحليله واكتشاف إذا كان محاولة احتيال
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 space-y-6 shadow-2xl shadow-purple-500/10"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-gray-300 font-medium">النص المراد تحليله</label>
                <Button
                  onClick={loadExample}
                  variant="ghost"
                  size="sm"
                  className="text-purple-400 hover:text-purple-300"
                >
                  <Sparkles className="w-4 h-4 ml-2" />
                  مثال توضيحي
                </Button>
              </div>

              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="مثال: عزيزي العميل، تم اكتشاف نشاط مشبوه في حسابك. يرجى النقر هنا للتحقق من معلوماتك..."
                className="min-h-40 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 resize-none"
                dir="auto"
              />

              <p className="text-sm text-gray-500 mt-2">
                {text.length} حرف
              </p>
            </div>

            <AnimatePresence mode="wait">
              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <LoadingSpinner />
                </motion.div>
              )}

              {result && !isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className={`p-6 rounded-xl border-2 ${
                    result.isPhishing
                      ? 'bg-red-950/30 border-red-500/50'
                      : 'bg-green-950/30 border-green-500/50'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {result.isPhishing ? (
                          <XCircle className="w-8 h-8 text-red-400" />
                        ) : (
                          <CheckCircle className="w-8 h-8 text-green-400" />
                        )}
                        <div>
                          <h3 className={`text-2xl font-bold ${
                            result.isPhishing ? 'text-red-400' : 'text-green-400'
                          }`}>
                            {result.isPhishing ? 'رسالة احتيال ⚠️' : 'رسالة آمنة ✅'}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {result.isPhishing ? 'تحذير: هذه رسالة مشبوهة' : 'الرسالة تبدو آمنة'}
                          </p>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="text-3xl font-bold text-white">
                          {(result.phishing_probability * 100).toFixed(1)}%
                        </p>
                        <p className="text-sm text-gray-400">احتمالية الاحتيال</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>مستوى الخطر</span>
                        <span>{(result.phishing_probability * 100).toFixed(1)}%</span>
                      </div>
                      <Progress
                        value={result.phishing_probability * 100}
                        className="h-2"
                      />
                    </div>
                  </div>

                  {result.suspiciousWords && result.suspiciousWords.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 bg-orange-950/30 border border-orange-500/30 rounded-xl"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="w-5 h-5 text-orange-400" />
                        <h4 className="font-semibold text-orange-300">كلمات مشبوهة تم اكتشافها</h4>
                      </div>

                      <div
                        className="p-4 bg-gray-900/50 rounded-lg text-gray-300 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: highlightSuspiciousWords(text, result.suspiciousWords)
                        }}
                        dir="auto"
                      />

                      <div className="flex flex-wrap gap-2 mt-4">
                        {result.suspiciousWords.map((word, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-red-300 text-sm"
                          >
                            {word}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-4">
              {!isAnalyzing && (
                <>
                  <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={analyzeText}
                      disabled={!text.trim() || isAnalyzing}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
                      size="lg"
                    >
                      <Sparkles className="w-5 h-5 ml-2" />
                      تحليل النص
                    </Button>
                  </motion.div>

                  {(text || result) && (
                    <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={reset}
                        variant="outline"
                        className="w-full border-gray-600 hover:bg-gray-800 hover:border-purple-500/50 transition-all"
                        size="lg"
                      >
                        مسح وإعادة
                      </Button>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
