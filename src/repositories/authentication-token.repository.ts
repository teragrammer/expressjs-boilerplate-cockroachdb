import {AuthenticationTokenModel} from "../models/authentication-token.model";
import {DateUtil} from "../utilities/date.util";

class AuthenticationTokenRepository {
    private static instance: AuthenticationTokenRepository;

    constructor() {
    }

    static getInstance(): AuthenticationTokenRepository {
        if (!AuthenticationTokenRepository.instance) AuthenticationTokenRepository.instance = new AuthenticationTokenRepository();
        return AuthenticationTokenRepository.instance;
    }

    async insert(data: any): Promise<string[]> {
        const rows = await AuthenticationTokenModel().table().insert(data).returning("id");
        return rows.map(row => row.id);
    }

    deleteExpiredByUserId(userId: string) {
        return AuthenticationTokenModel().table()
            .where("user_id", userId)
            .where("expired_at", "<", DateUtil().sql())
            .delete();
    }

    deleteAllByUserId(userId: string) {
        return AuthenticationTokenModel().table()
            .where("user_id", userId)
            .delete();
    }
}

export default AuthenticationTokenRepository.getInstance();