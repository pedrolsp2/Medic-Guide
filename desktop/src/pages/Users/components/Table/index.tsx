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
import { Usuario } from '@/types/Authentication';

interface TableProps {
  props: Usuario[];
}

const Table: React.FC<TableProps> = ({ props }) => {
  return (
    <Tabela>
      <TableCaption>Usuarios cadastrados</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead className="w-[500px]">Nome</TableHead>
          <TableHead className="w-[250px]">Email</TableHead>
          <TableHead className="w-[200px]">Usuario</TableHead>
          <TableHead className="w-[100px]">Politica</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.map((usuario, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{usuario.SK_USUARIO}</TableCell>
            <TableCell>{usuario.NM_USUARIO}</TableCell>
            <TableCell>{usuario.EMAIL_USUARIO}</TableCell>
            <TableCell>{usuario.DS_USUARIO}</TableCell>
            <TableCell>{usuario.POLITICA}</TableCell>
            <TableCell className="flex items-center gap-2"></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Tabela>
  );
};

export default Table;
