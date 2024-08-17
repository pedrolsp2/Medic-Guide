import { Stethoscope } from 'lucide-react';
import React from 'react';
import ProfileMenu from './components/ProfileMenu';
import Sidenav from './components/Sidenav';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 flex items-center justify-between w-full p-2 bg-primary-500 h-14">
      <div className="flex items-center gap-1 text-white">
        <Sidenav />
        <button
          className="flex items-center gap-1"
          aria-label="Ir para o Inicio"
          onClick={() => navigate('/')}
        >
          <Stethoscope /> Medic Guide
        </button>
      </div>
      <ProfileMenu />
    </div>
  );
};

export default Header;
