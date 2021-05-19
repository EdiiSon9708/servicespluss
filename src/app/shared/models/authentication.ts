import { User } from '@shared/models/user';

export interface ResponseApi {
    msn: string;
    status: number;
    data?: DataAccessUser;
    statusWeb: number;
}

export interface DataAccessUser {
    access_token: string;
    token_type: string;
    expires_in: any;
    user: User;
}
