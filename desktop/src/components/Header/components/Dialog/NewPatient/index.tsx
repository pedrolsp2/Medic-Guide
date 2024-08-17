import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { useNovoPaciente } from './functions';
import Loader from '@/components/Loader';

// Definindo o schema de validação com zod
const newPatientSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  sex: z.enum(['Masculino', 'Feminino']),
});

type NewPatientFormValues = z.infer<typeof newPatientSchema>;

interface NewPatientProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewPatient: React.FC<NewPatientProps> = ({ setState, state }) => {
  const [date, setDate] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewPatientFormValues>({
    resolver: zodResolver(newPatientSchema),
  });

  const { mutate, isPending } = useNovoPaciente();

  const onSubmit = (data: NewPatientFormValues) => {
    const age = date.replace(/-/g, '');
    mutate({ ...data, age });
    reset();
  };

  return (
    <Dialog open={state} onOpenChange={setState}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastro de paciente</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1 mt-4">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" {...register('name')} />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <Label htmlFor="age">Idade</Label>
            <Input
              required
              value={date}
              type="date"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <Label>Sexo</Label>
            <RadioGroup defaultValue="Masculino">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Masculino"
                  id="Masculino"
                  {...register('sex')}
                />
                <Label htmlFor="Masculino">Masculino</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Feminino"
                  id="Feminino"
                  {...register('sex')}
                />
                <Label htmlFor="Feminino">Feminino</Label>
              </div>
            </RadioGroup>
            {errors.sex && <p className="text-red-500">{errors.sex.message}</p>}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">
              <Loader condition={isPending} title="Cadastrar" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewPatient;
