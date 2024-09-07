import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  AlignJustify,
  ClipboardPlus,
  LucideIcon,
  Stethoscope,
  UserRoundPlus,
} from 'lucide-react';
import NewPatient from '../Dialog/NewPatient';
import { useNavigate } from 'react-router-dom';
import { Store, useStoreBase } from '@/store';
import NewUser from '../Dialog/NewUser';

const stateSelector = (state: Store) => ({
  politica: state.politica,
});
interface NavProps {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SidenavType {
  id: number;
  Icon: LucideIcon;
  name: string;
  url?: string;
  privilegio: number[];
}

const sidenavItens: SidenavType[] = [
  {
    id: 1,
    Icon: UserRoundPlus,
    name: 'Cadastar paciente',
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
];

const Nav: React.FC<NavProps> = ({ setState }) => {
  const { politica } = useStoreBase(stateSelector);
  const [openPatient, setNewPatient] = useState(false);
  const [openUser, setNewUser] = useState(false);
  const navigate = useNavigate();

  const handleClick = (id: number, url?: string) => {
    if (url) {
      navigate(url);
      setState(false);
    } else {
      if (id === 1) {
        setNewPatient(true);
      } else {
        setNewUser(true);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <NewPatient setState={setNewPatient} state={openPatient} />
      <NewUser setState={setNewUser} state={openUser} />
      {sidenavItens
        .filter((item) => item.privilegio.includes(politica))
        .map((nav) => (
          <div
            key={nav.id}
            className="flex items-center w-full gap-2 p-2 rounded cursor-pointer hover:bg-neutral-50"
            onClick={() => handleClick(nav.id, nav.url)}
          >
            <nav.Icon className="text-primary-500" />
            <span>{nav.name}</span>
          </div>
        ))}
    </div>
  );
};

const Sidenav: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet modal={false} open={open} onOpenChange={setOpen}>
      <SheetTrigger className="mr-2">
        <AlignJustify />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-primary-500">
            <Stethoscope /> Medic Guide
          </SheetTitle>
        </SheetHeader>
        <div className="my-10 border border-neutral-100" />
        <Nav setState={setOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default Sidenav;
