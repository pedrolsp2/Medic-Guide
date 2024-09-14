import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetPaciente } from '@/queries/Paciente';
import Loader from '@/components/Loader';
import { PacienteType } from '@/types/Paciente';
import { differenceInYears, parse } from 'date-fns';

interface PacienteProps {
  selectID: number;
  setSelectID: React.Dispatch<React.SetStateAction<number>>;
  setPaciente: React.Dispatch<
    React.SetStateAction<{
      id: number;
      nome: string;
    }>
  >;
}

const Paciente: React.FC<PacienteProps> = ({
  selectID,
  setSelectID,
  setPaciente,
}) => {
  const [pacienteData, setPacienteData] = useState<PacienteType[]>([]);

  const { data, isFetching } = useGetPaciente();

  const getAge = (age: string) => {
    const birthdate = parse(age, 'yyyyMMdd', new Date());
    return differenceInYears(new Date(), birthdate);
  };

  const filterPaciente = (id: number) => {
    return pacienteData.find((vlr) => vlr.id === id);
  };

  const handleSelect = (paciente: string) => {
    setSelectID(Number(paciente));
    const pacienteFiltrado = filterPaciente(Number(paciente));
    setPaciente({
      id: pacienteFiltrado?.id || 0,
      nome: pacienteFiltrado?.name || '',
    });
  };

  useEffect(() => {
    if (data) setPacienteData(data);
  }, [data]);

  return (
    <Select onValueChange={handleSelect} value={String(selectID)}>
      <SelectTrigger>
        <SelectValue
          placeholder={<Loader condition={isFetching} title="Selecione" />}
        />
      </SelectTrigger>
      <SelectContent>
        {pacienteData.map((item, index) => (
          <SelectItem key={index} value={String(item.id)}>
            {item.name} - {getAge(String(item.age))} anos
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Paciente;
