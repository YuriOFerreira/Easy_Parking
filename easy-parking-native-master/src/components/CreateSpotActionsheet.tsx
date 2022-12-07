import React, { useEffect, useState } from 'react';
import { HStack, Icon, Select, Stack, Text } from 'native-base';
import { ActionsheetPrimitive } from './ActionsheetPrimitive';
import { Button } from './Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { api } from '@services/api';

interface Car {
  id?: number;
  plate: string;
  model: string;
  color: string;
}
interface Model {
  id: number;
  nome: string;
}
interface Spot {
  id: number;
  tipo_vaga: number;
  valor: number;
}
interface CreateSpotActionsheetProps {
  isOpen: boolean;
  onClose: () => void;
  onPress: (spot: { time: Date; car_id: string }) => void;
  loading: boolean;
  spot: Spot;
}

export function CreateSpotActionsheet({
  isOpen,
  onClose,
  spot,
  onPress,
  loading,
}: CreateSpotActionsheetProps) {
  const [date, setDate] = useState(new Date());
  const [models, setModels] = useState<Model[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [time, setTime] = useState(new Date(new Date().setHours(1, 0)));
  const [carId, setCarId] = useState('');

  useEffect(() => {
    async function getModels() {
      const { data } = await api.get('/car_model');
      setModels(data);
    }
    getModels();
  }, []);

  useEffect(() => {
    async function getCars() {
      const { data } = await api.get('/car');

      const newData = data.map((item: any) => {
        return {
          id: item.id,
          plate: item.placa,
          model: item.modelo_id,
          color: item.cor,
        };
      });

      setCars(newData);
    }

    if (isOpen) {
      getCars();
      setDate(new Date());
    }
  }, [isOpen]);

  async function handleCreateSpot() {
    onPress({
      time: time,
      car_id: carId,
    });
  }

  return (
    <ActionsheetPrimitive isOpen={isOpen} onClose={onClose}>
      <Text color="amber.400" fontWeight="black" fontSize="xl">
        Cadastrar Vaga
      </Text>

      <Stack w="full" px="6" mt="6" space="6">
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="xl" fontWeight="semibold">
            Entrada
          </Text>
          <Text>{date.toLocaleString()}</Text>
        </HStack>

        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="xl" fontWeight="semibold">
            Duração
          </Text>

          <DateTimePicker
            value={time}
            onChange={(_, selectedDate) => {
              setTime(selectedDate!);
            }}
            mode="time"
            themeVariant="light"
            is24Hour={true}
            minuteInterval={30}
          />
        </HStack>

        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="xl" fontWeight="semibold">
            Veículo
          </Text>

          <Select
            selectedValue={carId}
            onValueChange={setCarId}
            placeholder="Selecione um veículo"
            placeholderTextColor="gray.600"
            flex="1"
            dropdownIcon={<Icon />}
            minH="10"
            variant="filled"
            p="2"
            bg="white"
            borderWidth="none"
            borderColor="gray.400"
            textAlign="right"
            mx="0"
            px="0"
            _text={{
              color: 'gray.800',
            }}
          >
            {cars.map(car => (
              <Select.Item
                key={String(car.id)}
                label={`${
                  models.find(model => model.id === Number(car.model))?.nome
                } -> ${car.plate}`}
                value={String(car.id)}
              />
            ))}
          </Select>
        </HStack>
      </Stack>

      <HStack space="2" px="6" mt="6">
        <Button
          label="Cancelar"
          flex="1"
          variant="secondary"
          onPress={onClose}
        />
        <Button
          label={`Reservar por ${
            time.getHours() * spot?.valor
          } R$ por ${time.getHours()} hrs`}
          flex="1"
          onPress={handleCreateSpot}
          isLoading={loading}
        />
      </HStack>
    </ActionsheetPrimitive>
  );
}
