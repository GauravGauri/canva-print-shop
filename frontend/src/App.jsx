import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import Editor from './pages/Editor';
import Proofing from './pages/Proofing';
import Checkout from './pages/Checkout';
import Tracking from './pages/Tracking';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/editor/:productId" element={<Editor />} />
          <Route path="/proofing" element={<Proofing />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/tracking" element={<Tracking />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
