/* eslint-disable @typescript-eslint/ban-ts-comment */
import { editPacient, deletPacient } from '@/api/business/pacientes';
import ToastAlert from '@/components/ToastAlert';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { format, parse } from 'date-fns';

interface Props {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useEditUser = ({ setState }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: editPacient,
    onSuccess(data) {
      setState(false);
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

export const useDeletUser = ({ setState }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deletPacient,
    onSuccess(data) {
      setState(false);
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

export const formatAge = (age: string) => {
  const ageDate = parse(age.toString(), 'yyyyMMdd', new Date());
  return format(ageDate, 'dd/MM/yyyy');
};
