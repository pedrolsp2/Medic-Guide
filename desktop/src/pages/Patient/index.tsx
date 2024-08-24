import LoadingScreen from '@/pages/LoadingScreen';
import { useGetPaciente } from '@/queries/Paciente';
import { PacienteType } from '@/types/Paciente';
import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import NewPatient from '@/components/Header/components/Dialog/NewPatient';

const Patient: React.FC = () => {
  const [pacientes, setPacientes] = useState<PacienteType[]>([]);
  const [open, setOpen] = useState(false);
  const { data, status } = useGetPaciente();

  useEffect(() => {
    if (data) {
      setPacientes(data);
    }
  }, [data]);

  if (status === 'pending') return <LoadingScreen />;
  return (
    <div className="w-full pt-8 h-container">
      <div className="flex flex-col max-w-[80rem] mx-auto gap-2">
        <div className="flex items-center justify-between">
          <strong>Pacientes ({pacientes.length}) totais</strong>
          <Button
            className="flex items-center gap-2"
            onClick={() => setOpen(true)}
          >
            <UserPlus /> Novo
          </Button>
        </div>
        <Table props={pacientes} />
      </div>
      <NewPatient setState={setOpen} state={open} />
    </div>
  );
};

export default Patient;
