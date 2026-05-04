import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, Info, Layers } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface HeatmapViewerProps {
  originalImage: string;
  heatmapImage: string;
  isFake: boolean;
}

type ViewMode = 'original' | 'heatmap' | 'overlay';

export function HeatmapViewer({ originalImage, heatmapImage, isFake }: HeatmapViewerProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('original');
  const [opacity, setOpacity] = useState([70]);

  return (
    <div className="space-y-4">
      {/* Image Container */}
      <div className="relative rounded-xl overflow-hidden bg-gray-800 border border-gray-700">
        <div className="relative w-full" style={{ minHeight: '400px' }}>
          <AnimatePresence mode="wait">
            {viewMode === 'original' && (
              <motion.img
                key="original"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={originalImage}
                alt="Original"
                className="w-full h-auto object-contain"
              />
            )}

            {viewMode === 'heatmap' && (
              <motion.img
                key="heatmap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={`data:image/jpeg;base64,${heatmapImage}`}
                alt="Heatmap"
                className="w-full h-auto object-contain"
              />
            )}

            {viewMode === 'overlay' && (
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <img
                  src={originalImage}
                  alt="Original"
                  className="w-full h-auto object-contain"
                />
                <img
                  src={`data:image/jpeg;base64,${heatmapImage}`}
                  alt="Heatmap Overlay"
                  className="absolute inset-0 w-full h-full object-contain"
                  style={{ opacity: opacity[0] / 100 }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Badge showing current view */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm border border-white/10 rounded-lg"
          >
            <p className="text-xs text-white font-medium">
              {viewMode === 'original' && '📸 الصورة الأصلية'}
              {viewMode === 'heatmap' && '🔥 خريطة الحرارة AI'}
              {viewMode === 'overlay' && '🔀 عرض مدمج'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* View Mode Buttons */}
        <div className="flex gap-2">
          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => setViewMode('original')}
              variant={viewMode === 'original' ? 'default' : 'outline'}
              className={`w-full ${
                viewMode === 'original'
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30'
                  : 'border-gray-600 hover:bg-gray-800'
              }`}
            >
              <Eye className="w-4 h-4 ml-2" />
              الصورة الأصلية
            </Button>
          </motion.div>

          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => setViewMode('heatmap')}
              variant={viewMode === 'heatmap' ? 'default' : 'outline'}
              className={`w-full ${
                viewMode === 'heatmap'
                  ? 'bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-500/30'
                  : 'border-gray-600 hover:bg-gray-800'
              }`}
            >
              <Info className="w-4 h-4 ml-2" />
              شرح الذكاء الاصطناعي
            </Button>
          </motion.div>

          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => setViewMode('overlay')}
              variant={viewMode === 'overlay' ? 'default' : 'outline'}
              className={`w-full ${
                viewMode === 'overlay'
                  ? 'bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/30'
                  : 'border-gray-600 hover:bg-gray-800'
              }`}
            >
              <Layers className="w-4 h-4 ml-2" />
              عرض مدمج
            </Button>
          </motion.div>
        </div>

        {/* Opacity Slider (only show in overlay mode) */}
        <AnimatePresence>
          {viewMode === 'overlay' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-gray-900/50 border border-gray-700/50 rounded-xl space-y-3"
            >
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-300 font-medium">
                  شفافية خريطة الحرارة
                </label>
                <span className="text-sm text-blue-400 font-bold">{opacity[0]}%</span>
              </div>
              <Slider
                value={opacity}
                onValueChange={setOpacity}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-4 rounded-xl border ${
            isFake
              ? 'bg-orange-950/30 border-orange-500/30'
              : 'bg-blue-950/30 border-blue-500/30'
          }`}
        >
          <div className="flex items-start gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className={`w-5 h-5 mt-0.5 ${isFake ? 'text-orange-400' : 'text-blue-400'}`} />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="text-sm">
                    خريطة الحرارة توضح المناطق التي ركز عليها الذكاء الاصطناعي في التحليل
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex-1">
              <h4 className={`font-semibold mb-1 ${isFake ? 'text-orange-300' : 'text-blue-300'}`}>
                كيف يعمل شرح الذكاء الاصطناعي؟
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                {isFake ? (
                  <>
                    المناطق <span className="text-red-400 font-semibold">الحمراء والصفراء</span> تُظهر الأجزاء التي اعتمد عليها الذكاء الاصطناعي لتحديد أن الصورة مزيفة.
                    كلما كان اللون أكثر سخونة، زادت أهمية تلك المنطقة في القرار.
                  </>
                ) : (
                  <>
                    المناطق <span className="text-blue-400 font-semibold">الملونة</span> تُظهر نقاط التركيز في التحليل.
                    الذكاء الاصطناعي فحص هذه المناطق وحدد أن الصورة أصلية وغير مزيفة.
                  </>
                )}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
