import React, { useState } from 'react';
import {
  Box,
  FormControl,
  Heading,
  HStack,
  Icon,
  Input,
  Pressable,
  Stack,
  Text,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import { Button } from '@components/Button';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { api } from '@services/api';
import { TextInput } from '@components/TextInput';

export function SignUp() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  async function handleCreateAccount() {
    setLoading(true);
    try {
      await api.post('/user', {
        nome: name,
        login: email,
        senha: password,
      });
      navigation.navigate('SIGN_IN');
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <VStack safeArea flex="1" alignItems="center" px="10" bg="white">
      <Box
        position="relative"
        mt="24"
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Heading size="2xl" color="amber.400">
          Cadastrar
        </Heading>

        <Pressable onPress={navigation.goBack} position="absolute" left="0">
          <Icon as={Entypo} name="chevron-left" color="amber.400" size="2xl" />
        </Pressable>
      </Box>

      <FormControl mt="10" mb="6" isRequired isInvalid={error}>
        <Stack space="4">
          <TextInput
            label="Nome"
            value={name}
            onChangeText={setName}
            placeholder="Jane Doe"
          />

          <TextInput
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            placeholder="janeDoe@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            label="Senha"
            value={password}
            onChangeText={setPassword}
            placeholder="*******"
            autoCapitalize="none"
            secureTextEntry
          >
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Email já cadastrado
            </FormControl.ErrorMessage>
          </TextInput>
        </Stack>
      </FormControl>

      <Button
        label="Cadastrar"
        onPress={handleCreateAccount}
        isLoading={loading}
      />
    </VStack>
  );
}
