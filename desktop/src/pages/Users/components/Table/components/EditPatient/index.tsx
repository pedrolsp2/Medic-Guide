import { PacienteType } from '@/types/Paciente';
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UserPen } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEditUser } from '../functions/useActionPatient';
import { format, parse } from 'date-fns';

interface EditPatientProps {
  props: PacienteType;
}

type Sex = 'Masculino' | 'Feminino';
// Definindo o schema de validação com zod
const newPatientSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  sex: z.enum(['Masculino', 'Feminino']),
});

type NewPatientFormValues = z.infer<typeof newPatientSchema>;

const EditPatient: React.FC<EditPatientProps> = ({ props }) => {
  const age = parse(props.age.toString(), 'yyyyMMdd', new Date());
  const ageDate = format(age, 'yyyy-MM-dd');

  const [date, setDate] = useState(ageDate);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewPatientFormValues>({
    resolver: zodResolver(newPatientSchema),
  });
  const { mutate, isPending } = useEditUser({ setState: setOpen });

  const onSubmit = (data: NewPatientFormValues) => {
    const age = date.replace(/-/g, '');
    mutate({ ...data, age, id: props.id });
    reset();
  };

  useEffect(() => {
    const sex = props.sex as Sex;
    reset({ name: props.name, sex });
  }, [props, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger title={`Editar ${props.name}`}>
        <UserPen className="text-neutral-600" size={20} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edição de paciente</DialogTitle>
          <DialogDescription>
            Edite as informações do paciente {props.name}
          </DialogDescription>
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
              <Loader condition={isPending} title="Alterar" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPatient;
