export class User {
    id: string;
    usuario: string;
    senha: string;
    email: string;
    nome: string;
    multPais: boolean;
    pais?: string;
    perfil: string;
    token?: string;
}