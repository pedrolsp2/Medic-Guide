import { getUsuario } from '@/api/auth/user';
import { useQuery } from '@tanstack/react-query';

export const useGetUsuario = () => {
  return useQuery({
    queryFn: getUsuario,
    queryKey: ['USUARIO'],
  });
};
