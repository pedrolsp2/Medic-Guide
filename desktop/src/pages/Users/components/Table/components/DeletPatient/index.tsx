import { PacienteType } from '@/types/Paciente';
import React, { useState } from 'react';
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
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';
import { useDeletUser } from '../functions/useActionPatient';

interface DeletPatientProps {
  props: PacienteType;
}

const DeletPatient: React.FC<DeletPatientProps> = ({ props }) => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useDeletUser({ setState: setOpen });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger title={`Apagar ${props.name}`}>
        <Trash2 className="text-red-600" size={20} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Tem certeza que deseja apagar o usuario {props.name}?
          </DialogTitle>
          <DialogDescription>Confirme sua ação</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" onClick={() => mutate(props.id)}>
            <Loader condition={isPending} title="Apagar" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletPatient;
