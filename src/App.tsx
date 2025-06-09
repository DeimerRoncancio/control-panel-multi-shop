import { Routes, Route } from 'react-router';
import Login from './auth/pages/Login';
import Register from './auth/pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
