import React from 'react';
import { HStack, Text } from 'native-base';
import { ActionsheetPrimitive } from './ActionsheetPrimitive';
import { Button } from './Button';
import DateTimePicker from '@react-native-community/datetimepicker';

interface UpdateSpotActionsheetProps {
  isOpen: boolean;
  onClose: () => void;
  onPress: () => void;
  loading: boolean;
}

export function UpdateSpotActionsheet({
  isOpen,
  onClose,
  onPress,
  loading,
}: UpdateSpotActionsheetProps) {
  return (
    <ActionsheetPrimitive isOpen={isOpen} onClose={onClose}>
      <Text color="amber.400" fontWeight="black" fontSize="xl">
        Sair da Vaga
      </Text>

      <HStack space="2" px="6" mt="6">
        <Button
          label="Cancelar"
          flex="1"
          variant="secondary"
          onPress={onClose}
        />
        <Button label="Sair" flex="1" onPress={onPress} isLoading={loading} />
      </HStack>
    </ActionsheetPrimitive>
  );
}
