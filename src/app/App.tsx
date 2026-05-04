import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import ImageDetector from './pages/ImageDetector';
import { PhishingDetector } from './pages/PhishingDetector';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image-detector" element={<ImageDetector />} />
        <Route path="/phishing-detector" element={<PhishingDetector />} />
      </Routes>
    </BrowserRouter>
  );
}