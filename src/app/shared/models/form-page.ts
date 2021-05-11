export class CreateQuotation {
    idCategory: number;
    idSubCategory: number;
    tittle: string;
    description: string;
    infoUbicationAndQuotations: InfoUbicationAndQuotations;
    picture: any;
}

export class InfoUbicationAndQuotations {
    address: string;
    latitude: number;
    longitude: number;
    complemento:string;
}

export class Comments {
    idProfessional: string;
    message: string;
    calification: number;
}

export class Question {
    fullName: string;
    email: string;
    subject: string;
    message: string;
}

export class Review {
    reviews: string;
    calification: string;
}
