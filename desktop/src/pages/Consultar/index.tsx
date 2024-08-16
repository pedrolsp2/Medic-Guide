import { Label } from '@/components/ui/label';
import React from 'react';
import { Select } from './components/Select';

const regioes_do_corpo = [
  {
    label: 'Cabeça | Rosto',
  },
  {
    label: 'Membros superiores',
  },
  {
    label: 'Peito',
  },
  {
    label: 'Abdômen',
  },
  {
    label: 'Membros inferiores',
  },
  {
    label: 'Todo o corpo',
  },
  {
    label: 'Outros',
  },
];

const Consultar: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 py-4 h-container">
      <article className="flex flex-col gap-4 p-2">
        <div className="flex flex-col">
          <strong className="text-xl">Sintomas iniciais</strong>
          <span className="text-neutral-500">
            Colete sintomas do paciente, marque todos os sintomas nas seleções
            abaixo.
          </span>
        </div>
        <div className="flex flex-col gap-4 p-4 border rounded">
          {regioes_do_corpo.map((item, index) => (
            <div className="flex flex-col gap-1" key={index}>
              <Label>{item.label}</Label>
              <Select />
            </div>
          ))}
        </div>
      </article>
      <article className="p-2">
        <strong className="text-xl">Diagnóstico</strong>
      </article>
    </div>
  );
};

export default Consultar;
