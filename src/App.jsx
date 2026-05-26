import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import TeachingLearning from './pages/TeachingLearning.jsx';
import CommunityEquity from './pages/CommunityEquity.jsx';
import TeachingPracticesDeck from './components/TeachingPracticesDeck.jsx';
import WashingtonProgram from './pages/WashingtonProgram.jsx';
import WashingtonProgramMap from './pages/WashingtonProgramMap.jsx';
import AI from './pages/AI.jsx';
import Resources from './pages/Resources.jsx';
import Newsletters from './pages/Newsletters.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/teaching-learning" element={<TeachingLearning />} />
        <Route path="/teaching-learning/practice-deck" element={<TeachingPracticesDeck />} />
        <Route path="/community-equity" element={<CommunityEquity />} />
        <Route path="/washington-program" element={<WashingtonProgram />} />
        <Route path="/washington-program/map" element={<WashingtonProgramMap />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/newsletters" element={<Newsletters />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
