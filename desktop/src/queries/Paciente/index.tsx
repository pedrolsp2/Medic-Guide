import { getPaciente } from '@/api/business/pacientes';
import { useQuery } from '@tanstack/react-query';

export const useGetPaciente = () => {
  return useQuery({
    queryFn: getPaciente,
    queryKey: ['PACIENTE'],
  });
};
