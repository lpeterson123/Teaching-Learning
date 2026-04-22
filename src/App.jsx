import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import TeachingLearning from './pages/TeachingLearning.jsx';
import CommunityEquity from './pages/CommunityEquity.jsx';
import PortraitOfGraduate from './pages/PortraitOfGraduate.jsx';
import AI from './pages/AI.jsx';
import Resources from './pages/Resources.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/teaching-learning" element={<TeachingLearning />} />
        <Route path="/community-equity" element={<CommunityEquity />} />
        <Route path="/portrait-of-a-graduate" element={<PortraitOfGraduate />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
