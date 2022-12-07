import React, { useEffect, useState } from 'react';
import { HStack, Stack, Text } from 'native-base';
import { ActionsheetPrimitive } from './ActionsheetPrimitive';
import { TextInput } from './TextInput';
import { Button } from './Button';
import { SelectPrimitive } from './SelectPrimitive';
import { api } from '@services/api';

interface Car {
  plate: string;
  model: string;
  color: string;
}
interface Model {
  id: number;
  nome: string;
}
interface CreateCarActionsheetProps {
  isOpen: boolean;
  onClose: () => void;
  onPress: (car: Car) => void;
  loading: boolean;
}

export function CreateCarActionsheet({
  isOpen,
  onClose,
  onPress,
  loading,
}: CreateCarActionsheetProps) {
  const [plate, setPlate] = useState('');
  const [color, setColor] = useState('');
  const [model, setModel] = useState('');
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    async function getModels() {
      const { data } = await api.get('/car_model');
      setModels(data);
    }
    getModels();
  }, []);

  function handleCreateCar() {
    onPress({
      plate,
      color,
      model,
    });
  }

  return (
    <ActionsheetPrimitive isOpen={isOpen} onClose={onClose}>
      <Text color="amber.400" fontWeight="black" fontSize="xl">
        Cadastrar veículo
      </Text>

      <Stack w="full" px="6" space="2">
        <TextInput
          label="Placa"
          value={plate}
          onChangeText={setPlate}
          placeholder="AAA0000"
          autoCapitalize="characters"
        />

        <TextInput
          label="Cor"
          value={color}
          onChangeText={setColor}
          placeholder="Branco"
        />

        <SelectPrimitive
          label="Model"
          selectedValue={model}
          data={models}
          onValueChange={setModel}
        />
      </Stack>

      <HStack space="2" px="6" mt="6">
        <Button
          label="Cancelar"
          flex="1"
          variant="secondary"
          onPress={onClose}
        />
        <Button
          label="Salvar"
          flex="1"
          onPress={handleCreateCar}
          isLoading={loading}
        />
      </HStack>
    </ActionsheetPrimitive>
  );
}
