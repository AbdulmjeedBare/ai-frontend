import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-12 px-4">
      <div className="max-w-3xl mx-auto bg-slate-900/80 border border-slate-700/80 rounded-3xl shadow-2xl shadow-black/50 p-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-2">كشف الصور المزيفة</h2>
            <p className="text-gray-400">قم بتحميل صورة لتحليلها واكتشاف ما إذا كانت مزيفة.</p>
          </div>
          <button
            className="rounded-full border border-slate-600 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800/80"
            onClick={() => navigate('/')}
          >
            العودة للرئيسية
          </button>
        </div>

        <div className="space-y-6 text-center">
          <div className="rounded-3xl border border-slate-700/80 bg-slate-950/70 p-6">
            <label className="block text-left text-sm text-gray-400 mb-2">اختر صورة</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white"
            />
          </div>

          {preview && (
            <div className="rounded-3xl border border-slate-700/80 bg-slate-950/70 p-6">
              <h3 className="text-xl font-semibold mb-4">الصورة الأصلية</h3>
              <img src={preview} className="mx-auto rounded-3xl border border-slate-700" width="300" />
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading || !image}
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-white disabled:cursor-not-allowed disabled:bg-slate-700 hover:bg-blue-500 transition-colors"
          >
            تحليل الصورة
          </button>

          {error && (
            <p className="mt-4 text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3">
              {error}
            </p>
          )}

          {loading && <p className="text-gray-300">جاري التحليل...</p>}

          {result && (
            <div className="rounded-3xl border border-slate-700/80 bg-slate-950/70 p-6 mt-6 text-left transition-all duration-300 ease-out">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">النتيجة: <span className="text-blue-300">{result}</span></h2>
                  <p className="text-sm text-gray-400 mt-2">الثقة: {(confidence! * 100).toFixed(2)}%</p>
                </div>
                <button
                  onClick={() => setShowHeatmap(!showHeatmap)}
                  className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-100 hover:bg-slate-800/80"
                >
                  {showHeatmap ? 'إخفاء التفسير' : 'عرض التفسير'}
                </button>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-slate-700/70 bg-slate-950/80 p-4">
                  <h3 className="text-lg font-semibold mb-3">الصورة الأصلية</h3>
                  {preview ? (
                    <img
                      src={preview}
                      className="w-full rounded-3xl border border-slate-700 object-contain"
                      alt="Original upload"
                    />
                  ) : (
                    <p className="text-gray-400">لم يتم تحميل صورة.</p>
                  )}
                </div>

                <div className="rounded-3xl border border-slate-700/70 bg-slate-950/80 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">تفسير AI</h3>
                    <span className="text-xs uppercase tracking-[0.25em] text-gray-500">Grad-CAM</span>
                  </div>
                  {showHeatmap && heatmap ? (
                    <img
                      src={`data:image/jpeg;base64,${heatmap}`}
                      className="w-full rounded-3xl border border-slate-700 object-contain"
                      alt="Heatmap explanation"
                    />
                  ) : (
                    <p className="text-gray-400">اضغط الزر لعرض خريطة الحرارة.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}