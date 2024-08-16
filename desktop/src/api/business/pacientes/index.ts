import instance from '..';

interface NovoPacienteProps {
  name: string;
  age: number;
  sex: string;
}

export const novoPaciente = async (props: NovoPacienteProps) => {
  const { data } = await instance.put('/paciente', { ...props });
  return data;
};
