export interface User {
    Celular: any;
    correo: string;
    direccion: string;
    empresa: number;
    foto: string;
    IdTipoDocumento: number;
    apellido1: string;
    apellido2: string;
    authy_id: any;
    country_code: any;
    documento: string;
    email: string;
    estado: number;
    f_crea_forense: any;
    fechaNacimiento: string;
    idusuario: number;
    name: string;
    nombre2: string;
    nombres1: string;
    password?: string;
    perfil: number;
    razon_social: string;
    telefono: any;
    telefono2: any;
    telefono3: any;
    verified: number;
    aceptaTerminos:number;
    genero: string;
    shortName:string;
    nDepto: string;
    nciudad: string;
}

export class Register {
    name: string;
    email: string;
    password: string;
    // tslint:disable-next-line: variable-name
    password_confirmation: string;
    idPerfil: number;
    
}
