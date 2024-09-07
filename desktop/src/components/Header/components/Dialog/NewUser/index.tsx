import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';
import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNovoUser } from './functions';

// Definindo o schema de validação com zod
const newUserSchema = z.object({
  NM_USUARIO: z.string().min(1, 'O nome é obrigatório'),
  DS_USUARIO: z.string().min(1, 'O nome de usuário é obrigatório'),
  EMAIL_USUARIO: z.string().email('E-mail inválido'),
  SENHA_USUARIO: z
    .string()
    .min(6, 'A senha precisa ter pelo menos 6 caracteres'),
  POLITICA: z.enum(['1', '2'], {
    required_error: 'Tipo de privilégios é obrigatório',
  }),
});

type NewUserFormValues = z.infer<typeof newUserSchema>;

interface NewUserProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewUser: React.FC<NewUserProps> = ({ setState, state }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<NewUserFormValues>({
    resolver: zodResolver(newUserSchema),
  });

  const { mutate } = useNovoUser({ setState });

  const onSubmit = (data: NewUserFormValues) => {
    mutate(data);
    reset();
  };

  return (
    <Dialog open={state} onOpenChange={setState}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastro de Usuário</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1 mt-4">
            <Label htmlFor="NM_USUARIO">Nome</Label>
            <Input id="NM_USUARIO" {...register('NM_USUARIO')} />
            {errors.NM_USUARIO && (
              <p className="text-red-500">{errors.NM_USUARIO.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <Label htmlFor="EMAIL_USUARIO">E-mail</Label>
            <Input id="EMAIL_USUARIO" {...register('EMAIL_USUARIO')} />
            {errors.EMAIL_USUARIO && (
              <p className="text-red-500">{errors.EMAIL_USUARIO.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <Label htmlFor="DS_USUARIO">Usuário</Label>
            <Input id="DS_USUARIO" {...register('DS_USUARIO')} />
            {errors.DS_USUARIO && (
              <p className="text-red-500">{errors.DS_USUARIO.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <Label htmlFor="SENHA_USUARIO">Senha</Label>
            <Input
              type="password"
              id="SENHA_USUARIO"
              {...register('SENHA_USUARIO')}
            />
            {errors.SENHA_USUARIO && (
              <p className="text-red-500">{errors.SENHA_USUARIO.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <Label htmlFor="POLITICA">Tipo</Label>
            <Controller
              control={control}
              name="POLITICA"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de privilégios" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Médico</SelectItem>
                    <SelectItem value="2">Enfermeiro</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.POLITICA && (
              <p className="text-red-500">{errors.POLITICA.message}</p>
            )}
          </div>

          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => {
                navigate('/usuarios');
                setState(false);
              }}
            >
              <Eye size={18} />
              Gerenciar
            </Button>
            <DialogClose asChild>
              <Button variant="destructive">Cancelar</Button>
            </DialogClose>
            <Button type="submit">
              <Loader condition={false} title="Cadastrar" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewUser;
