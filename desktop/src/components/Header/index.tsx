import { Stethoscope } from 'lucide-react';
import React from 'react';
import ProfileMenu from './components/ProfileMenu';
import Sidenav from './components/Sidenav';

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between w-full p-2 bg-primary-500 h-14">
      <div className="flex items-center gap-1 text-white">
        <Sidenav />
        <Stethoscope /> Medic Guide
      </div>
      <ProfileMenu />
    </div>
  );
};

export default Header;
