import { IPressableProps, Pressable, Spinner, Text } from 'native-base';
import React from 'react';

interface ButtonProps extends IPressableProps {
  label: string;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
}

export function Button({
  label,
  isLoading,
  variant = 'primary',
  ...rest
}: ButtonProps) {
  return (
    <Pressable
      width="full"
      alignItems="center"
      justifyContent="center"
      bg={variant === 'primary' ? 'amber.400' : 'white'}
      minH="10"
      px="4"
      py="2"
      rounded="md"
      _pressed={{
        bg: variant === 'primary' ? 'amber.500' : 'gray.100',
      }}
      {...rest}
    >
      {isLoading ? (
        <Spinner color="white" />
      ) : (
        <Text
          textAlign="center"
          color={variant === 'primary' ? 'white' : 'gray.400'}
          fontWeight="bold"
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
