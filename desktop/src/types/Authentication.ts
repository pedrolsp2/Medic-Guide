export interface Token {
  usuario: string | null;
  token: string | null;
  politica: number;
}

export interface Usuario {
  SK_USUARIO: number;
  NM_USUARIO: string;
  EMAIL_USUARIO: string;
  DS_USUARIO: string;
  POLITICA: number;
}
