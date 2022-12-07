import React, { ReactNode } from 'react';
import { FormControl, IInputProps, Input, Stack } from 'native-base';

interface TextInputProps extends IInputProps {
  label: string;
  children?: ReactNode;
}

export function TextInput({ label, children, ...rest }: TextInputProps) {
  return (
    <Stack>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        minH="10"
        variant="filled"
        p="2"
        bg="white"
        borderColor="gray.400"
        _focus={{ borderColor: 'amber.400', bgColor: 'white' }}
        {...rest}
      />
      {children}
    </Stack>
  );
}
