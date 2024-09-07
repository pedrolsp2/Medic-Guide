/* eslint-disable @typescript-eslint/ban-ts-comment */
import { newUser } from '@/api/auth/user';
import ToastAlert from '@/components/ToastAlert';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React from 'react';

export const useNovoUser = ({
  setState,
}: {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: newUser,
    onSuccess(data) {
      setState(false);
      queryClient.invalidateQueries({ queryKey: ['USUARIO'] });
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
