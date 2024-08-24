import { PacienteType } from '@/types/Paciente';
import {
  Table as Tabela,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import React from 'react';
import EditPatient from './components/EditPatient';
import { formatAge } from './components/functions/useActionPatient';
import DeletPatient from './components/DeletPatient';

interface TableProps {
  props: PacienteType[];
}

const Table: React.FC<TableProps> = ({ props }) => {
  return (
    <Tabela>
      <TableCaption>Pacientes cadastrados</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead className="w-[500px]">Nome</TableHead>
          <TableHead className="w-[100px]">Idade</TableHead>
          <TableHead className="w-[100px]">Sexo</TableHead>
          <TableHead className="w-[100px]">Ação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.map((paciente, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{paciente.id}</TableCell>
            <TableCell>{paciente.name}</TableCell>
            <TableCell>{formatAge(paciente.age)}</TableCell>
            <TableCell>{paciente.sex}</TableCell>
            <TableCell className="flex items-center gap-2">
              <EditPatient props={paciente} />
              <DeletPatient props={paciente} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Tabela>
  );
};

export default Table;
