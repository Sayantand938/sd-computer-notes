import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NoteView from './pages/NoteView';
import StudyGuide from './pages/StudyGuide';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/note/:noteId" element={<NoteView />} />
        <Route path="/study/:guideId" element={<StudyGuide />} />
      </Routes>
    </Router>
  );
}

export default App;