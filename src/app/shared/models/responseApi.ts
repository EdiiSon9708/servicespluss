export class ResponseApiContent {
    data: any[];
    links?: Link;
    meta?: Meta;
    msn: string;
    status: number;
}

export interface Link {
    first: string;
    last: string;
    next: string;
    prev: string;
}

export interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}
