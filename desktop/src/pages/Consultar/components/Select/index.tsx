/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type SelectData = { label: string; value: string };

interface SelectProps {
  data: SelectData[];
  setState: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        sintomas: string[];
      }[]
    >
  >;
  id: string;
}

export function Select({ data, setState, id }: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const handleSelect = (currentValue: string) => {
    setSelectedValues((prevValues) => {
      let updatedValues;
      if (prevValues.includes(currentValue)) {
        updatedValues = prevValues.filter((value) => value !== currentValue);
      } else {
        updatedValues = [...prevValues, currentValue];
      }

      //@ts-ignore
      setState((prevState) => {
        const existingEntryIndex = prevState.findIndex(
          //@ts-ignore
          (entry) => entry.id === id
        );

        if (existingEntryIndex !== -1) {
          const updatedState = [...prevState];
          //@ts-ignore
          updatedState[existingEntryIndex] = {
            id: id,
            sintomas: updatedValues,
          };
          return updatedState;
        } else {
          return [...prevState, { id: id, sintomas: updatedValues }];
        }
      });

      return updatedValues;
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {selectedValues.length > 0 ? (
            selectedValues
              .map(
                (value) => data.find((doenca) => doenca.label === value)?.label
              )
              .join(', ')
          ) : (
            <span className="text-neutral-300">Selecione os sintomas</span>
          )}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 mr-auto">
        <Command className="mr-auto">
          <CommandInput placeholder="Buscar..." />
          <CommandList>
            <CommandEmpty>Não há esta doença</CommandEmpty>
            <CommandGroup>
              {data.map((doencas) => (
                <CommandItem
                  key={doencas.value}
                  value={doencas.value}
                  onSelect={() => handleSelect(doencas.label)}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedValues.includes(doencas.value)
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {doencas.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
