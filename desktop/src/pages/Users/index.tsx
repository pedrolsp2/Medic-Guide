import LoadingScreen from '@/pages/LoadingScreen';
import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import { Button } from '@/components/ui/button';
import { RefreshCcw, UserPlus } from 'lucide-react';
import NewUser from '@/components/Header/components/Dialog/NewUser';
import { Usuario } from '@/types/Authentication';
import { useGetUsuario } from '@/queries/Usuario';
import { useQueryClient } from '@tanstack/react-query';

const Users: React.FC = () => {
  const queryClient = useQueryClient();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [open, setOpen] = useState(false);
  const { data, status } = useGetUsuario();

  useEffect(() => {
    if (data) {
      setUsuarios(data);
    }
  }, [data]);

  if (status === 'pending') return <LoadingScreen />;
  return (
    <div className="w-full pt-8 h-container">
      <div className="flex flex-col max-w-[80rem] mx-auto gap-2">
        <div className="flex items-center justify-between">
          <strong>Usuarios ({usuarios.length}) totais</strong>
          <div className="flex items-center gap-2">
            <Button
              className="flex items-center gap-2"
              onClick={() => setOpen(true)}
            >
              <UserPlus /> Novo
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() =>
                queryClient.invalidateQueries({ queryKey: ['USUARIO'] })
              }
            >
              <RefreshCcw />
            </Button>
          </div>
        </div>
        <Table props={usuarios} />
      </div>
      <NewUser setState={setOpen} state={open} />
    </div>
  );
};

export default Users;
