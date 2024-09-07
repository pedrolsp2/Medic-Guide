import React from 'react';
import { Store, useStoreBase } from '@/store';
import { Avatar, AvatarFallback } from '../../../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getInitials } from '@/utils/stringFormatter';
import { LogOut } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const stateSelector = (state: Store) => ({
  name: state.usuario,
  logout: state.logout,
});

const Profile: React.FC = () => {
  const { name } = useStoreBase(stateSelector);
  return (
    <div className="flex items-center gap-1">
      <Avatar>
        <AvatarFallback className="font-semibold bg-white text-primary-500">
          {getInitials(name || '')}
        </AvatarFallback>
      </Avatar>
      <span className="text-white">{name}</span>
    </div>
  );
};

const ProfileMenu: React.FC = () => {
  const { logout } = useStoreBase(stateSelector);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(queryClient);
    navigate('/login');
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Profile />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-1 cursor-pointer text-primary-600"
          onClick={handleLogout}
        >
          <LogOut size={16} /> Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
