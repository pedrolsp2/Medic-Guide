import NewPatient from '@/components/Header/components/Dialog/NewPatient';
import NewUser from '@/components/Header/components/Dialog/NewUser';
import { Store, useStoreBase } from '@/store';
import {
  ClipboardPlus,
  Stethoscope,
  Syringe,
  UserCog,
  UserRoundPlus,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const stateSelector = (state: Store) => ({
  user: state.usuario,
  politica: state.politica,
});

const widget = [
  {
    id: 1,
    Icon: UserRoundPlus,
    name: 'Cadastar paciente',
    privilegio: [1, 2],
  },
  {
    id: 1.1,
    Icon: UserCog,
    name: 'Gerenciar paciente',
    url: '/pacientes',
    privilegio: [1, 2],
  },
  {
    id: 3,
    Icon: ClipboardPlus,
    name: 'Consultar',
    url: '/consultar',
    privilegio: [1],
  },
  {
    id: 4,
    Icon: Stethoscope,
    name: 'Cadastar usuário',
    privilegio: [1, 2],
  },
  {
    id: 5,
    Icon: Syringe,
    name: 'Consultar usuário',
    url: '/usuarios',
    privilegio: [1, 2],
  },
];

const Home = () => {
  const { user, politica } = useStoreBase(stateSelector);
  const [openPatient, setNewPatient] = useState(false);
  const [openUser, setNewUser] = useState(false);
  const navigate = useNavigate();

  const handleClick = (id: number, url?: string) => {
    if (url) {
      navigate(url);
    } else {
      if (id === 1) {
        setNewPatient(true);
      } else {
        setNewUser(true);
      }
    }
  };

  const getSaudacao = () => {
    const horas = new Date().getHours();
    if (horas < 12) {
      return `Bom dia ${user}!`;
    } else if (horas < 18) {
      return `boa tarde ${user}!`;
    } else {
      return `Boa noite ${user}!`;
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-white h-container">
      <div className="w-full max-w-xl p-6 mb-8 text-center bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-primary-500">{getSaudacao()}</h1>
        <p className="mt-2 text-lg text-primary-400">
          Bem-vindo ao seu painel de controle!
        </p>
      </div>
      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
        <NewPatient setState={setNewPatient} state={openPatient} />
        <NewUser setState={setNewUser} state={openUser} />
        {widget
          .filter((item) => item.privilegio.includes(politica))
          .map((nav) => (
            <div
              key={nav.id}
              className="flex items-center w-full gap-2 p-2 border rounded cursor-pointer hover:bg-neutral-50 border-primary-200"
              onClick={() => handleClick(nav.id, nav.url)}
            >
              <nav.Icon className="text-primary-500" />
              <span>{nav.name}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
