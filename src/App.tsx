
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/toaster';
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SignupProfessional from './pages/SignupProfessional';
import SignupCaretaker from './pages/SignupCaretaker';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="jeghealth-ui-theme">
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/professional" element={<SignupProfessional />} />
            <Route path="/signup/caretaker" element={<SignupCaretaker />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
