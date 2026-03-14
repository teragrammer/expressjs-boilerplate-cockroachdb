import {UserInterface, UserRoleInterface} from "../../interfaces/user.interface";
import {AuthenticationTokenInterface} from "../../interfaces/authentication-token.interface";
import {JwtExtendedPayload} from "../../models/authentication-token.model";

export interface RequestCredentials {
    jwt: JwtExtendedPayload;
    user: () => Promise<UserRoleInterface>;
    authentication: () => Promise<AuthenticationTokenInterface>;
}

export interface RequestSanitize {
    body: {
        get: (key: string, defaults?: any) => any;
        only: (keys: string[], defaults?: Record<string, any> | undefined) => Record<string, any>;
        numeric: (key: string, defaults?: any) => any;
    },
    query: {
        get: (key: string, defaults?: any) => any;
        only: (keys: string[], defaults?: Record<string, any> | undefined) => Record<string, any>;
        numeric: (key: string, defaults?: any) => any;
    },
    data?: any,
}

export interface ResponseFailed {
    message: (status: number, message?: string, code?: string) => any;
    fields: (status: number, errors: any) => any;
}

declare global {
    namespace Express {
        interface Request {
            credentials: RequestCredentials;
            sanitize: RequestSanitize;
        }

        interface Response {
            failed: ResponseFailed;
        }
    }
}