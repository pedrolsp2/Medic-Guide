import { ConsultarType } from '@/types/Consultar';
import instance from '..';

export const novaConsulta = async (props: ConsultarType) => {
  const { data } = await instance.put('/consultar', { ...props });
  return data;
};
