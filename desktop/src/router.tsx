import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from '@/pages/Layouts/ProtectedLayout';
import AppLayout from './pages/Layouts/AppLayout';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import PublicLayout from './pages/Layouts/PublicLayout';
import NotFound from './pages/Layouts/NotFound';
import Consultar from './pages/Consultar';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route element={<PublicLayout />}>
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/consultar" element={<Consultar />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
