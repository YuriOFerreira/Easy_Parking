import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '@services/api';

type ProviderProps = {
  children: ReactNode;
};

type signIn = {
  email: string;
  password: string;
};

type User = {
  id: string;
  name: string;
  email: string;
};

type UserContextProps = {
  user: User | null;
  onSignIn: (data: signIn) => Promise<void>;
  onSignOut: () => Promise<void>;
};
const AuthContext = createContext<UserContextProps | null>(null);

export const AuthContextProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser({
      id: '1',
      name: 'John Doe',
      email: 'jonedone@teste.com',
    });
  }, []);

  const onSignIn = useCallback(async ({ email, password }: signIn) => {
    const response = await api.post('/login', {
      login: email,
      senha: password,
    });

    const { user, token } = response.data;
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setUser({
      id: user.id,
      name: user.nome,
      email: user.login,
    });
  }, []);

  const onSignOut = useCallback(async () => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, onSignIn, onSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
