import { novaConsulta } from '@/api/business/consultar';
import { useMutation } from '@tanstack/react-query';

interface Props {
  setDiagnostico: React.Dispatch<React.SetStateAction<string>>;
}

export const useConsultar = ({ setDiagnostico }: Props) => {
  const { mutate, isPending } = useMutation({
    mutationFn: novaConsulta,
    onSuccess(data) {
      setDiagnostico(data);
    },
    onError(data) {
      console.log(data);
    },
  });
  return { mutate, isPending };
};
