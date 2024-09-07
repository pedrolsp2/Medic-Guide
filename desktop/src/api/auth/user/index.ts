import instance from '..';
import { getHeaders } from '@/api/utils';
interface AuthenticateResponse {
  status: number;
  message: string;
  usuario: {
    SK_USUARIO: number;
    POLITICA: number;
    NM_USUARIO: string;
    EMAIL_USUARIO: string;
    DS_USUARIO: string;
  };
  token: string;
}

interface ValidateResponse {
  SK_USUARIO: number;
  NM_USUARIO: string;
  EMAIL_USUARIO: string;
  DS_USUARIO: string;
  POLITICA: number;
  iat: number;
  exp: number;
}

type NewUser = Omit<
  ValidateResponse,
  'SK_USUARIO' | 'iat' | 'exp' | 'POLITICA'
> & {
  SENHA_USUARIO: string;
  POLITICA: '1' | '2';
};

export const authenticateUser = async (user: string, password: string) => {
  const response = await instance.post<AuthenticateResponse>(
    '/auth',
    {
      DS_USUARIO: user,
      SENHA_USUARIO: password,
    },
    { headers: getHeaders() }
  );
  return response.data;
};

export const validateUserToken = async () => {
  const response = await instance.post<ValidateResponse>(
    '/tokenvalidation',
    {},
    {
      headers: {
        'x-funcionalidade': 'Carregamento inicial',
        'x-acao': 'Carregamento inicial',
        ...getHeaders(),
      },
    }
  );
  return response.data;
};

export const recoverPassword = async (email: string) => {
  const response = await instance.post('/restorepassword', {
    email,
  });

  return response.data;
};

export const changePassword = async (password: string) => {
  const response = await instance.post(
    '/changepassword',
    {
      password,
    },
    { headers: getHeaders() }
  );

  return response.data;
};

export const newUser = async (props: NewUser) => {
  const response = await instance.put(
    '/user',
    {
      ...props,
    },
    { headers: getHeaders() }
  );

  return response.data;
};

export const getUsuario = async () => {
  const response = await instance.get('/user');

  return response.data as [];
};
