import { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, Sparkles, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Header } from '../components/Header';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Progress } from '../components/ui/progress';

interface UrlAnalysis {
  url: string;
  risk_score: number;
  is_suspicious: boolean;
  reasons: string[];
}

interface AnalysisResult {
  result: string;
  confidence: number;
  is_phishing: boolean;
  urls_analysis?: UrlAnalysis[];
  error?: string;
}

export function PhishingDetector() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getRiskColor = (riskScore: number): string => {
    if (riskScore <= 30) return 'bg-green-500';
    if (riskScore <= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getRiskProgressColor = (riskScore: number): string => {
    if (riskScore <= 30) return 'accent-green-500';
    if (riskScore <= 60) return 'accent-yellow-500';
    return 'accent-red-500';
  };

  const analyzeText = async () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setResult(null);
    setError(null);

    try {
      const response = await axios.post('http://127.0.0.1:8000/predict-text', {
        text: text,
      });

      setResult({
        result: response.data.result,
        confidence: response.data.confidence,
        is_phishing: response.data.is_phishing,
        urls_analysis: response.data.urls_analysis || [],
      });
    } catch (err) {
      console.error('Error analyzing text:', err);
      setError('حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadExample = () => {
    const exampleText = "عزيزي العميل، تم اكتشاف نشاط مشبوه في حسابك! يرجى النقر على الرابط http://paypal-verify.xyz/login فوراً للتحقق من معلوماتك والتأكد من أمان حسابك.";
    setText(exampleText);
    setResult(null);
    setError(null);
  };

  const reset = () => {
    setText('');
    setResult(null);
    setError(null);
    setIsAnalyzing(false);
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

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3"
                >
                  {error}
                </motion.div>
              )}

              {result && !isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  {/* النتيجة الرئيسية */}
                  <div className={`p-6 rounded-xl border-2 ${
                    result.is_phishing
                      ? 'bg-red-950/30 border-red-500/50'
                      : 'bg-green-950/30 border-green-500/50'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {result.is_phishing ? (
                          <XCircle className="w-8 h-8 text-red-400" />
                        ) : (
                          <CheckCircle className="w-8 h-8 text-green-400" />
                        )}
                        <div>
                          <h3 className={`text-2xl font-bold ${
                            result.is_phishing ? 'text-red-400' : 'text-green-400'
                          }`}>
                            {result.result}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {result.is_phishing ? 'تحذير: هذا نص مشبوه' : 'النص يبدو آمناً'}
                          </p>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="text-3xl font-bold text-white">
                          {result.confidence.toFixed(1)}%
                        </p>
                        <p className="text-sm text-gray-400">نسبة الثقة</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>مستوى الثقة</span>
                        <span>{result.confidence.toFixed(1)}%</span>
                      </div>
                      <Progress
                        value={result.confidence}
                        className="h-2"
                      />
                    </div>
                  </div>

                  {/* قسم تحليل الروابط */}
                  {result.urls_analysis && result.urls_analysis.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="w-5 h-5 text-orange-400" />
                        <h4 className="font-semibold text-orange-300">تحليل الروابط المكتشفة</h4>
                      </div>

                      <div className="grid gap-4">
                        {result.urls_analysis.map((urlData, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-4 rounded-lg border ${
                              urlData.is_suspicious
                                ? 'bg-red-950/20 border-red-500/30'
                                : 'bg-green-950/20 border-green-500/30'
                            }`}
                          >
                            {/* الرابط */}
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <a
                                  href={urlData.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 break-all text-sm truncate"
                                  title={urlData.url}
                                >
                                  {urlData.url}
                                </a>
                              </div>
                              {urlData.is_suspicious && (
                                <span className="ml-2 px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-full flex-shrink-0">
                                  مشبوه
                                </span>
                              )}
                            </div>

                            {/* درجة الخطورة مع شريط التقدم */}
                            <div className="mb-3">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-400">درجة الخطورة</span>
                                <span className={`text-lg font-bold ${
                                  urlData.risk_score <= 30 ? 'text-green-400' :
                                  urlData.risk_score <= 60 ? 'text-yellow-400' :
                                  'text-red-400'
                                }`}>
                                  {urlData.risk_score.toFixed(1)}%
                                </span>
                              </div>
                              <div className={`w-full h-2 bg-gray-800 rounded-full overflow-hidden`}>
                                <div
                                  className={`h-full transition-all duration-500 ${getRiskColor(urlData.risk_score)}`}
                                  style={{ width: `${urlData.risk_score}%` }}
                                />
                              </div>
                            </div>

                            {/* الأسباب */}
                            {urlData.reasons && urlData.reasons.length > 0 && (
                              <div className="pt-3 border-t border-gray-700/50">
                                <p className="text-sm text-gray-400 mb-2">الأسباب:</p>
                                <ul className="space-y-1">
                                  {urlData.reasons.map((reason, reasonIndex) => (
                                    <li key={reasonIndex} className="flex items-start gap-2 text-sm text-gray-300">
                                      <span className="text-orange-400 mt-1">•</span>
                                      <span>{reason}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </motion.div>
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
