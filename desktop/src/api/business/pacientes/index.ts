import { PacienteType } from '@/types/Paciente';
import instance from '..';

type NovoPacienteProps = Omit<PacienteType, 'id'>;

export const novoPaciente = async (props: NovoPacienteProps) => {
  const { data } = await instance.put('/paciente', { ...props });
  return data;
};

export const getPaciente = async () => {
  const { data } = await instance.get('/paciente');
  return data as PacienteType[];
};
