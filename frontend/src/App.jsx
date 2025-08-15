import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import ChatWindow from "./components/ChatWindow";
import LandingPage from "./components/LandingPage";

// NEW: Create a wrapper component to apply the key
function ChatWindowWrapper() {
  const { persona } = useParams();
  // The key prop is the crucial fix. When the URL changes from /hitesh to /piyush,
  // the key changes, forcing React to destroy the old ChatWindow and mount a new one.
  return <ChatWindow key={persona} />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat/:persona" element={<ChatWindowWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
