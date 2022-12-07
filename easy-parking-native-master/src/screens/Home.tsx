import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Heading,
  HStack,
  Icon,
  Pressable,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import { useAuth } from '@hooks/useAuth';
import { AntDesign } from '@expo/vector-icons';
import { CarImage } from '@components/CarImage';
import { api } from '@services/api';
import { CreateCarActionsheet } from '@components/CreateCarActionsheet';
import { CreateSpotActionsheet } from '@components/CreateSpotActionsheet';
import { useNavigation } from '@react-navigation/native';
import { Alert, RefreshControl } from 'react-native';
import { wait } from '@helpers/await';
import { UpdateSpotActionsheet } from '@components/UpdateSpotActionsheet';

interface Car {
  plate: string;
  model: string;
  color: string;
}

interface Parking {
  id: number;
  entrada: Date;
  saida: Date | null;
  valor: number;
  veiculo_id: number;
  vaga_id: number;
  veiculo: {
    usuario_id: number;
  };
}
interface GarageSpace {
  id: number;
  valor: number;
  tipo_vaga: number;
  estacionameto: Parking[];
}
export function Home() {
  const navigation = useNavigation<any>();
  const { user, onSignOut } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [garage_space, setGarageSpace] = useState<GarageSpace[]>([]);
  const [currentSpot, setCurrentSpot] = useState<GarageSpace>();
  const [loading, setLoading] = useState(false);
  const {
    isOpen: isOpenCreateCarModal,
    onOpen: onOpenCreateCarModal,
    onClose: onCloseCreateCarModal,
  } = useDisclose();
  const {
    isOpen: isOpenCreateSpotModal,
    onOpen: onOpenCreateSpotModal,
    onClose: onCloseCreateSpotModal,
  } = useDisclose();
  const {
    isOpen: isOpenUpdateSpotModal,
    onOpen: onOpenUpdateSpotModal,
    onClose: onCloseUpdateSpotModal,
  } = useDisclose();

  async function handleCreateCar(car: Car) {
    setLoading(true);
    try {
      await api.post('/car', {
        cor: car.color,
        placa: car.plate,
        modelo_id: Number(car.model),
        usuario_id: Number(user?.id),
      });
      onCloseCreateCarModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  async function handleUpdateSpot() {
    setLoading(true);
    try {
      await api.put(
        `/parking/${
          currentSpot?.estacionameto[currentSpot?.estacionameto.length - 1].id
        }`,
        {
          saida: new Date(),
        }
      );
      onCloseUpdateSpotModal();
      onRefresh();
      Alert.alert(
        `Total a pagar: R$ ${
          currentSpot?.estacionameto[currentSpot?.estacionameto.length - 1]
            .valor
        } `
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateSpot(spot: { time: Date; car_id: string }) {
    setLoading(true);
    try {
      await api.post('/parking', {
        vaga_id: currentSpot?.id,
        valor: currentSpot?.valor! * spot.time.getHours(),
        veiculo_id: Number(spot.car_id),
      });
      onCloseCreateSpotModal();
      onRefresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    onSignOut();
    navigation.reset({
      index: 0,
      routes: [{ name: 'SIGN_IN' }],
    });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/garage_space');
      setGarageSpace(data);
    })();
  }, [refreshing]);

  return (
    <VStack safeArea flex="1" px="4" bg="white">
      <HStack justifyContent="space-between" alignItems="center" mb="6">
        <Heading>
          Olá, <Text fontWeight="medium">{user?.name}</Text>
        </Heading>

        <HStack space="4" alignItems="center">
          <Pressable onPress={onOpenCreateCarModal}>
            <Icon as={AntDesign} name="plus" size="lg" color="amber.400" />
          </Pressable>
          <Pressable onPress={handleSignOut}>
            <Icon as={AntDesign} name="logout" size="md" color="black" />
          </Pressable>
        </HStack>
      </HStack>

      <FlatList
        data={garage_space}
        keyExtractor={item => String(item.id)}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => {
              setCurrentSpot(item);
              if (
                item?.estacionameto[item.estacionameto.length - 1]?.veiculo
                  ?.usuario_id === Number(user?.id)
              ) {
                onOpenUpdateSpotModal();
              } else {
                onOpenCreateSpotModal();
              }
            }}
            flex="1"
            alignItems="center"
            justifyContent="center"
            borderTopWidth="1"
            borderLeftWidth={index % 2 === 0 ? '0' : '1'}
            borderBottomWidth={
              index === garage_space.length - 1 ||
              index === garage_space.length - 2
                ? '1'
                : '0'
            }
            minH="24"
            _pressed={{ bg: 'amber.50' }}
            disabled={
              item?.estacionameto.length > 0 &&
              item?.estacionameto[item.estacionameto.length - 1]?.veiculo
                ?.usuario_id !== Number(user?.id)
            }
          >
            {item.estacionameto.length > 0 &&
            item.estacionameto.some(e => e.saida === null) ? (
              <CarImage
                isMine={
                  item?.estacionameto[item.estacionameto.length - 1]?.veiculo
                    ?.usuario_id === Number(user?.id)
                }
              />
            ) : (
              <Text>{index + 1}</Text>
            )}
          </Pressable>
        )}
        showsVerticalScrollIndicator={false}
      />

      <CreateCarActionsheet
        isOpen={isOpenCreateCarModal}
        onClose={onCloseCreateCarModal}
        onPress={handleCreateCar}
        loading={loading}
      />

      <CreateSpotActionsheet
        spot={currentSpot!}
        isOpen={isOpenCreateSpotModal}
        onClose={() => {
          onCloseCreateSpotModal();
          setCurrentSpot(undefined);
        }}
        onPress={handleCreateSpot}
        loading={loading}
      />

      <UpdateSpotActionsheet
        isOpen={isOpenUpdateSpotModal}
        onClose={() => {
          onCloseUpdateSpotModal();
          setCurrentSpot(undefined);
        }}
        onPress={handleUpdateSpot}
        loading={loading}
      />
    </VStack>
  );
}
