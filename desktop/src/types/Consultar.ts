export interface ConsultarType {
  paciente: Paciente;
  doencas: Doenca[];
  outros: string;
}

export interface Paciente {
  id: number;
  nome: string;
}

export interface Doenca {
  id: string;
  sintomas: string[];
}
