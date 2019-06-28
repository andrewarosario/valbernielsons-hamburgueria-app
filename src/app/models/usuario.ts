export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  permissoes: string[];
}

export interface NovoUsuario {
  email: string;
  nome: string;
  senha: string;
}

export interface LoginUsuario {
  nome: string;
  senha: string;
}
