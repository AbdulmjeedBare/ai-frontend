import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';
import { Header } from '../components/Header';
import { LoadingSpinner } from '../components/LoadingSpinner';

export default function ImageDetector() {
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [heatmap, setHeatmap] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: any) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    setError(null);
    setResult(null);
    setConfidence(null);
    setHeatmap(null);
    setShowHeatmap(false);
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleAnalyze = async () => {
    if (!image) {
      setError('الرجاء اختيار صورة أولاً.');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        'http://127.0.0.1:8000/predict-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setResult(response.data.result);
      setConfidence(response.data.confidence);
      setHeatmap(response.data.heatmap);
      setShowHeatmap(false);
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
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
              كشف الصور المزيفة
            </h1>
            <p className="text-gray-400">قم بتحميل صورة لتحليلها واكتشاف ما إذا كانت مزيفة.</p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 space-y-6 shadow-2xl shadow-purple-500/10"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-gray-300 font-medium">اختر صورة</label>
                <Button
                  onClick={() => {
                    // Load example - for now just clear
                    setImage(null);
                    setPreview(null);
                    setResult(null);
                    setConfidence(null);
                    setHeatmap(null);
                    setShowHeatmap(false);
                    setError(null);
                  }}
                  variant="ghost"
                  size="sm"
                  className="text-purple-400 hover:text-purple-300"
                >
                  <Sparkles className="w-4 h-4 ml-2" />
                  مثال توضيحي
                </Button>
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full rounded-2xl border border-gray-600 bg-gray-800/50 px-4 py-3 text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
              />
            </div>
          </motion.div>

          {preview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl border border-gray-700/70 bg-gray-900/50 p-6"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-300">الصورة الأصلية</h3>
              <img src={preview} className="mx-auto rounded-3xl border border-gray-700 max-w-full h-auto" />
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingSpinner />
              </motion.div>
            )}

            {!loading && (
              <motion.div className="flex gap-4" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleAnalyze}
                  disabled={!image}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
                  size="lg"
                >
                  <Sparkles className="w-5 h-5 ml-2" />
                  تحليل الصورة
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3"
            >
              {error}
            </motion.div>
          )}

          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-6 rounded-xl border-2 ${
                result === 'Fake' ? 'bg-red-950/30 border-red-500/50' : 'bg-green-950/30 border-green-500/50'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    النتيجة: <span className={result === 'Fake' ? 'text-red-400' : 'text-green-400'}>
                      {result === 'Fake' ? 'صورة مزيفة ⚠️' : 'صورة حقيقية ✅'}
                    </span>
                  </h2>
                  <p className="text-sm text-gray-400 mt-2">الثقة: {(confidence! * 100).toFixed(2)}%</p>
                </div>
                <Button
                  onClick={() => setShowHeatmap(!showHeatmap)}
                  variant="outline"
                  className="border-gray-600 hover:bg-gray-800 hover:border-purple-500/50 transition-all"
                >
                  {showHeatmap ? 'إخفاء التفسير' : 'عرض التفسير'}
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-gray-700/70 bg-gray-900/50 p-4">
                  <h3 className="text-lg font-semibold mb-3 text-gray-300">الصورة الأصلية</h3>
                  {preview ? (
                    <img
                      src={preview}
                      className="w-full rounded-3xl border border-gray-700 object-contain"
                      alt="Original upload"
                    />
                  ) : (
                    <p className="text-gray-400">لم يتم تحميل صورة.</p>
                  )}
                </div>

                <div className="rounded-3xl border border-gray-700/70 bg-gray-900/50 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-300">تفسير AI</h3>
                    <span className="text-xs uppercase tracking-[0.25em] text-gray-500">Grad-CAM</span>
                  </div>
                  {showHeatmap && heatmap ? (
                    <img
                      src={`data:image/jpeg;base64,${heatmap}`}
                      className="w-full rounded-3xl border border-gray-700 object-contain"
                      alt="Heatmap explanation"
                    />
                  ) : (
                    <p className="text-gray-400">اضغط الزر لعرض خريطة الحرارة.</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}