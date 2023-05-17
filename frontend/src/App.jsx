import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Organizations from './components/Organizations';
import Events from './components/Events';
import Biotopes from './components/Biotopes';
import UserDashboard from './components/UserDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthContextProvider } from './context/AuthContext';

const AuthRoutes = ({ isAuthenticated, element: Element, ...props }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Element {...props} />;
};

const App = () => {
  const isAuthenticated = true; // Replace with your actual authentication logic

  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={<AuthRoutes isAuthenticated={isAuthenticated} element={<UserDashboard />} />}
          />
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
