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

interface SidenavType {
  id: number;
  Icon: LucideIcon;
  name: string;
}

const sidenavItens: SidenavType[] = [
  {
    id: 1,
    Icon: UserRoundPlus,
    name: 'Cadastar paciente',
  },
  {
    id: 2,
    Icon: ClipboardPlus,
    name: 'Consultar',
  },
];

const Nav: React.FC = () => {
  const [openPatient, setNewPatient] = useState(false);
  return (
    <div className="flex flex-col">
      <NewPatient setState={setNewPatient} state={openPatient} />
      {sidenavItens.map((nav) => (
        <div
          key={nav.id}
          className="flex items-center w-full gap-2 p-2 rounded cursor-pointer hover:bg-neutral-50"
          onClick={() => setNewPatient(true)}
        >
          <nav.Icon className="text-primary-500" />
          <span>{nav.name}</span>
        </div>
      ))}
    </div>
  );
};

const Sidenav: React.FC = () => (
  <Sheet modal={false}>
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
      <Nav />
    </SheetContent>
  </Sheet>
);

export default Sidenav;
