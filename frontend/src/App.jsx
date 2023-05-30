import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Organizations from './components/Organizations';
import Events from './components/Events';
import Biotopes from './components/Biotopes';
import UserDashboard from './components/UserDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthContextProvider } from './context/AuthContext';
import { useAuthContext } from './hooks/useAuthContext';

const AuthRoutes = ({ Component, ...props }) => {
  const { user } = useAuthContext();  // Assuming user object has an 'id' property
  const isAuthenticated = user != null;
  return isAuthenticated ? <Component userId={user.id} {...props} /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<AuthRoutes Component={UserDashboard} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/organizations/:category" element={<Organizations />} />
          <Route path="/events" element={<Events />} />
          <Route path="/biotopes" element={<Biotopes />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
};

export default App;