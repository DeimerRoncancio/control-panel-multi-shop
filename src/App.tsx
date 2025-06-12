import { Routes, Route } from 'react-router';
import Login from './auth/pages/Login';
import Register from './auth/pages/Register';
import ProtectAuth from './auth/guards/ProtectAuth';
import Dashboard from './dashboard/pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectAuth />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
