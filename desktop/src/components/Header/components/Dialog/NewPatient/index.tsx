import React from 'react';
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

interface NewPatientProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewPatient: React.FC<NewPatientProps> = ({ setState, state }) => {
  return (
    <Dialog open={state} onOpenChange={setState}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastro de paciente</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-1 mt-4">
          <Label>Nome</Label>
          <Input />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Idade</Label>
          <Input />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Sexo</Label>
          <RadioGroup defaultValue="male">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Masculino</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Feminino</Label>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button variant="outline">
            <DialogClose>Cancelar</DialogClose>
          </Button>
          <Button>Cadastrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewPatient;
