export interface ContentPage {
    content_pgc: string;
    desc_pgc: string;
    est_pgc: number;
    id_pgc: number;
    order_pgc: number;
}

export interface CategoryPage {
    desc_catg: string;
    est_catg: number;
    id_catg: number;
    img_catg: string;
    nombre_catg: string;
    ord_catg: number;
    parent_catg: number;
    vergl_catg?: number;
}

export interface SubCategoryPage {
    desc_scatg: string;
    est_scatg: number;
    id_scatg: number;
    img_scatg: string;
    nombre_scatg: string;
    ord_scatg: number;
    parent_scatg: number;
    vergl_scatg?: number;
}

export interface ProfessionalQuotation {
    idProfessional: number;
    name: string;
    city: string;
    departament: string;
    photo: string;
}

export interface DepartamentAdmin {
    IdDepartamento: number;
    IdPais: number;
    Nombre: string;
    indicativo: number;
}

export interface CityAdmin {
    IdCiudad: number;
    IdDepartamento?: number;
    IdPais: number;
    Nombre: string;
    indicativo: number;
}

export interface Parameter {
    conse_param: number;
    desc_param: string;
    est_param: number;
    flaticon_param: string;
    id_param: number;
    link_param: string;
    mail_param: string;
}

export interface CommentProfessional {
    id_bg: number;
    usr_bg: number;
    fecha_bg: string;
    prof_bg: string;
    comentario_bg: string;
    est_bg: number;
}

export interface FaqPage {
    id_fq: number;
    usr_fq: number;
    titulo_fq: string;
    fecha_fq: string;
    texto_fq: string;
    est_fq: number;
    ord_fq: number;
}

export interface ReviewsPage {
    calification: string;
    foto: string;
    nombre: string;
    reviews: number;
    fullStars: number[];
    emptyStars: number[];
}

export interface ProfessionalPage {
    IdProfessional: number;
    Pais: string;
    calification: number;
    descripcion: string;
    estadoProfesional: number;
    fotoProfesional: string;
    idCiudad: number;
    nombreProfessional: string;
    dataTestimonio: Comments[];
    dataCiudad: CityAdmin[];
    fullStars: number[];
    emptyStars: number[];
    FCreaProfessional: string;
    totServicios: number;
    categoria: any[];
    fotosProtafolio: Portafolio[];
}

export interface Portafolio {
    est_fpf: number;
    fecha_fpf: string;
    hora_fpf: string;
    id_fpf: number;
    id_prof_fpf: number;
    img_fpf: string;
    usr_fpf: number;
}

export interface Comments {
    comentario_bg: string;
    estrellas: number;
    fecha_bg: string;
    nombreTestimonio: string;
    fotoTestimonio: string;
    fullStars: number;
    emptyStars: number;
}

export interface Service {
    direccion: string;
    description_srv: string;
    estado: number;
    fecha: string;
    categoria: string;
    subCategoria: string;
    id_srv: number;
    latitude_srv: string;
    longitude_srv: string;
    NombreProfesionales: string;
    idEstado: number;
    totalCotizaciones:number;
    totalFotosCotizaciones:number;
    totalFotosServicios:number;
    totalPagos:number;


}

export interface Analitic {
    contestadas: number;
    descargas: number;
    enviadas: number;
}

export interface ThereAreTestimonial {
    msn: string;
    status: number;
    data: number;
}

export interface Quotation {
    idEstadoServicio: number;
    idServicio: number;
    quotation_services: QuotationInformation[];
}

export interface QuotationInformation {
    address_srvq: string;
    description_srvq: string;
    est_srvq: number;
    fecha_srvq: string;
    idCategoryq: number;
    idServicioq: number;
    idSubCategoryq: number;
    id_srvq: number;
    latitude_srvq: string;
    longitude_srvq: string;
    profesional_srvq: number;
    professional_quotation: DataProfessional;
    tittleq: string;
    usr_srvq: number;
    vlr_srvq: number;
}

export interface DataProfessional {
    calification_pfr: number;
    ciudad_pfr: number;
    descripcion_pfr: string;
    est_pfr: number;
    fcrea_pfr: string;
    foto_pfr: string;
    id_pfr: number;
    id_usr_pfr: number;
    nombre_pfr: string;
    pais_pfr: number;
}
