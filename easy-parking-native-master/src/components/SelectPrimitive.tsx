import {
  CheckIcon,
  ChevronDownIcon,
  FormControl,
  ISelectProps,
  Select,
  Stack,
} from 'native-base';
import React from 'react';

interface Model {
  id: number;
  nome: string;
}

interface SelectPrimitiveProps extends ISelectProps {
  label: string;
  data: Model[];
}

export function SelectPrimitive({
  label,
  data,
  ...rest
}: SelectPrimitiveProps) {
  return (
    <Stack>
      <FormControl.Label>{label}</FormControl.Label>

      <Select
        minH="10"
        variant="filled"
        p="2"
        bg="white"
        borderColor="gray.400"
        dropdownIcon={<ChevronDownIcon size="sm" mr="2" />}
        {...rest}
      >
        {data.map(item => (
          <Select.Item
            key={String(item.id)}
            label={item.nome}
            value={String(item.id)}
          />
        ))}
      </Select>
    </Stack>
  );
}
