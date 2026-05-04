# 🛡️ AI Security Platform

منصة ذكاء اصطناعي متقدمة لكشف الصور المزيفة (Deepfake) ورسائل الاحتيال (Phishing)

![AI Security Platform](https://img.shields.io/badge/AI-Security%20Platform-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-cyan?style=for-the-badge&logo=tailwindcss)

---

##  المميزات

###  كشف الصور المزيفة (Deepfake Detection)
- رفع وتحليل الصور
- نتائج فورية بنسبة دقة عالية
- عرض نسبة التزييف بشكل واضح
- واجهة تفاعلية مع Preview للصورة

###  كشف رسائل الاحتيال (Phishing Detection)
- تحليل نصي ذكي
- كشف الكلمات المشبوهة وإبرازها
- تقييم مستوى الخطر
- نتائج مفصلة مع توصيات

###  التصميم
- Dark Mode احترافي
- تصميم Cyber Security حديث
- ألوان تقنية (Blue, Purple, Pink gradients)
- Animations سلسة باستخدام Framer Motion
- Responsive Design

---

## 🚀 المكونات الرئيسية

```
src/
├── app/
│   ├── components/
│   │   ├── Header.tsx          # Header مشترك
│   │   ├── LoadingSpinner.tsx  # Loading animation
│   │   └── ui/                 # UI Components library
│   ├── pages/
│   │   ├── Home.tsx            # الصفحة الرئيسية
│   │   ├── ImageDetector.tsx   # كشف الصور
│   │   └── PhishingDetector.tsx # كشف الاحتيال
│   └── App.tsx                 # Main App + Routing
└── styles/
    ├── index.css
    ├── theme.css
    └── fonts.css
```

##  التقنيات المستخدمة

- **React 18** - مكتبة UI
- **TypeScript** - لغة البرمجة
- **React Router** - التنقل بين الصفحات
- **Tailwind CSS v4** - التصميم
- **Framer Motion** - Animations
- **Axios** - HTTP Requests
- **Lucide React** - Icons
- **Radix UI** - UI Components


**Endpoints المطلوبة:**

1. `POST /predict-image` - تحليل الصور
2. `POST /predict-text` - تحليل النص
## الاستخدام

### الصفحة الرئيسية
- عرض احترافي للمنصة
- بطاقتين رئيسيتين للانتقال
- معلومات عن المميزات

### تحليل الصور
1. اضغط "تحليل صورة" من الصفحة الرئيسية
2. ارفع صورة أو جرب المثال
3. اضغط "تحليل الصورة"
4. شاهد النتائج الفورية
5. **جديد! ** اضغط "شرح الذكاء الاصطناعي" لرؤية Heatmap
6. بدّل بين الأوضاع المختلفة واضبط الشفافية

### تحليل النصوص
1. اضغط "تحليل رسالة" من الصفحة الرئيسية
2. أدخل النص أو جرب المثال
3. اضغط "تحليل النص"
4. شاهد النتائج مع الكلمات المشبوهة المُبرزة

##  نظام الألوان

| اللون | الاستخدام |
|-------|-----------|
| Blue (`#3b82f6`) | Deepfake Detection |
| Purple (`#9333ea`) | Phishing Detection |
| Green (`#22c55e`) | Safe/Real |
| Red (`#ef4444`) | Fake/Phishing |
| Gray (`#030213`) | Background |

## مميزات إضافية

- ✅ **Heatmap Visualization (Grad-CAM)** - شرح قرارات الذكاء الاصطناعي بصرياً
- ✅ **3 أوضاع عرض** - أصلي، Heatmap، مدمج
- ✅ **Opacity Slider** - تحكم في شفافية الـ overlay
- ✅ Loading Animations سلسة
- ✅ Fallback للتجربة بدون Backend
- ✅ Progress Bars تفاعلية
- ✅ Responsive Design
- ✅ Error Handling
- ✅ Toast Notifications (جاهز للاستخدام)
- ✅ Dark Mode مدمج
- ✅ RTL Support للعربية


## Demo للمعرض

المنصة جاهزة للعرض المباشر في المعرض:
- زر "مثال توضيحي" في كل صفحة
- تجربة سريعة وسلسة
- لا يحتاج اتصال إنترنت للعرض التوضيحي

## التطوير المستقبلي


- [ ] Dashboard لعرض الإحصائيات
- [ ] تاريخ التحليلات
- [ ] Side-by-side comparison view
- [ ] Zoom & Pan للصور
- [ ] Download Heatmap
- [ ] API Key Management
- [ ] Multi-language Support
- [ ] Export Results (PDF/JSON)


