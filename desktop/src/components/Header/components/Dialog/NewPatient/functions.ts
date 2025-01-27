/* eslint-disable @typescript-eslint/ban-ts-comment */
import { novoPaciente } from '@/api/business/pacientes';
import ToastAlert from '@/components/ToastAlert';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useNovoPaciente = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: novoPaciente,
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['PACIENTE'] });
      ToastAlert({ type: 'success', content: data.message });
    },
    onError(data) {
      const error = data as AxiosError;
      //@ts-ignore
      ToastAlert({ type: 'warning', content: error.response?.data.message });
    },
  });
  return { mutate, isPending };
};
