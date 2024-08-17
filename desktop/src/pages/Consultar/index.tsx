import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { Select } from './components/Select';
import Paciente from './components/Paciente';
import {
  sintomasAbdomen,
  sintomasCabecaRosto,
  sintomasMembrosInferiores,
  sintomasMembrosSuperiores,
  sintomasPeito,
  sintomasTodoCorpo,
} from './doencas';
import { Button } from '@/components/ui/button';

const regioes_do_corpo = [
  {
    label: 'Cabeça | Rosto',
    slug: 'cabecaRosto',
    data: sintomasCabecaRosto,
  },
  {
    label: 'Membros superiores',
    slug: 'membrosSuperiores',
    data: sintomasMembrosSuperiores,
  },
  {
    label: 'Peito',
    slug: 'peito',
    data: sintomasPeito,
  },
  {
    label: 'Abdômen',
    slug: 'abdomen',
    data: sintomasAbdomen,
  },
  {
    label: 'Membros inferiores',
    slug: 'membrosInferiores',
    data: sintomasMembrosInferiores,
  },
  {
    label: 'Todo o corpo',
    slug: 'todoCorpo',
    data: sintomasTodoCorpo,
  },
  {
    label: 'Outros',
    slug: 'outros',
    data: [],
  },
];

const Consultar: React.FC = () => {
  const [selectID, setSelectID] = useState<number>(0);
  const [paciente, setPaciente] = useState<string>('');
  const [doencas, setDoencas] = useState<string[]>([]);

  const itensPaciente = { selectID, setSelectID, setPaciente };

  const handleClick = () => {
    console.log({ paciente, doencas });
  };

  return (
    <div className="grid grid-cols-2 gap-4 py-4 h-container max-md:flex max-md:flex-col">
      <article className="flex flex-col gap-4 p-2">
        <div className="flex flex-col">
          <strong className="text-xl">Sintomas iniciais</strong>
          <span className="text-neutral-500">
            Colete sintomas do paciente selecionado, marque todos os sintomas
            nas seleções abaixo.
          </span>
        </div>
        <div className="flex flex-col gap-4 p-4 border rounded border-neutral-100">
          <div className="flex flex-col gap-1">
            <Label className="font-semibold text-primary-800">Paciente</Label>
            <Paciente {...itensPaciente} />
          </div>
          <div className="w-full border border-neutral-100" />
          <div className="flex flex-col gap-8 ">
            {regioes_do_corpo.map((item, index) => (
              <div className="flex flex-col gap-1" key={index}>
                <Label className="font-semibold text-primary-800">
                  {item.label}
                </Label>
                <Select data={item.data} setState={setDoencas} id={item.slug} />
              </div>
            ))}
          </div>
        </div>
        <Button onClick={handleClick} className="ml-auto w-fit">
          Diagnosticar
        </Button>
      </article>
      <article className="p-2">
        <strong className="text-xl">Diagnóstico</strong>
        <span>{JSON.stringify({ paciente, doencas })}</span>
      </article>
    </div>
  );
};

export default Consultar;
