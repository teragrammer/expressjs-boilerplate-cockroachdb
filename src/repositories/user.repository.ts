import {UserModel} from "../models/user.model";
import {UserRole} from "../interfaces/user";
import {Knex} from "knex";

class UserRepository {
    private static instance: UserRepository;
    private readonly _PROFILE_COLUMN_COMPLETE = ["users.*", "roles.slug", "roles.is_public", "roles.is_bypass_authorization"];

    constructor() {
    }

    static getInstance(): UserRepository {
        if (!UserRepository.instance) UserRepository.instance = new UserRepository();
        return UserRepository.instance;
    }

    userRoleJoiner(): Knex.QueryBuilder {
        return UserModel().table()
            .select(this._PROFILE_COLUMN_COMPLETE)
            .leftJoin("roles", "users.role_id", "=", "roles.id");
    }

    byId(id: string): Promise<UserRole> {
        return this.userRoleJoiner()
            .where("users.id", id)
            .first();
    }

    byUsername(username: string): Promise<UserRole> {
        return this.userRoleJoiner()
            .where("users.username", username)
            .first();
    }

    byEmail(email: string): Promise<UserRole> {
        return this.userRoleJoiner()
            .where("users.email", email)
            .first();
    }

    byPhone(phone: string): Promise<UserRole> {
        return this.userRoleJoiner()
            .where("users.phone", phone)
            .first();
    }

    byContact(type: string, to: string): Promise<UserRole> | null {
        if (type === "email") return this.byEmail(to);
        if (type === "phone") return this.byPhone(to);

        return null;
    }
}

export default UserRepository.getInstance();