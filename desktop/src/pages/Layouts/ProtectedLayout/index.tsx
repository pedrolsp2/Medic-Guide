import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useStore } from '@/store';
import { getItem } from '@/utils/storage';
import Header from '@/components/Header';

const ProtectedLayout = () => {
  console.count('ProtectedLayout');
  const user = useStore.use.usuario();

  const token = getItem(localStorage, 'token');
  const location = useLocation();

  if (!user && !token) {
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }

  return (
    <div className="w-full overflow-y-auto">
      <Header />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
