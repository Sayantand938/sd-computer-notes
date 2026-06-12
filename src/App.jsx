import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NoteView from './pages/NoteView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/note/:noteId" element={<NoteView />} />
      </Routes>
    </Router>
  );
}

export default App;