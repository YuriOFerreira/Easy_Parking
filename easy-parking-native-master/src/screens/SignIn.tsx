import React, { useState } from 'react';
import {
  Box,
  FormControl,
  Heading,
  Input,
  Pressable,
  Stack,
  Text,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@components/Button';
import { useAuth } from '@hooks/useAuth';
import { TextInput } from '@components/TextInput';

export function SignIn() {
  const navigation = useNavigation<any>();
  const { onSignIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  function handleNavigateToSignUp() {
    navigation.navigate('SIGN_UP');
  }

  async function handleCreateSession() {
    setLoading(true);
    try {
      await onSignIn({ email, password });

      navigation.reset({
        index: 0,
        routes: [{ name: 'HOME' }],
      });
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <VStack safeArea flex="1" alignItems="center" px="10" bg="white">
      <Heading size="2xl" mt="24" color="amber.400">
        Easy Parking
      </Heading>

      <FormControl mt="10" isRequired isInvalid={error}>
        <Stack space="4">
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
              Email ou senha inválidos
            </FormControl.ErrorMessage>
          </TextInput>
        </Stack>
      </FormControl>

      <Box w="full" mt="4" mb="6">
        <Text>
          Não possui uma conta?
          <Pressable onPress={handleNavigateToSignUp}>
            <Text textDecorationLine="underline">cadastrar-se</Text>
          </Pressable>
        </Text>
      </Box>

      <Button
        label="Entrar"
        onPress={handleCreateSession}
        isLoading={loading}
      />
    </VStack>
  );
}
