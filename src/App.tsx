import { Routes, Route } from 'react-router';
import Login from './auth/pages/Login';
import Dashboard from './feactures/dashboard/pages/Dashboard';
import Layout from './feactures/Layout';
import Products from './feactures/products/pages/Products';
import Users from './feactures/users/pages/Users';
import Admins from './feactures/admins/pages/Admins';
import Categories from './feactures/categories/pages/Categories';
import { ProductId } from './feactures/products/pages/Product-id';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductId />} />
        <Route path="/users" element={<Users />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/admins" element={<Admins />} />
      </Route>
    </Routes>
  );
}

export default App;
