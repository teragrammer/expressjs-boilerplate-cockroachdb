import {UserModel} from "../models/user.model";
import {UserInterface} from "../interfaces/user.interface";

class UserRepository {
    private static instance: UserRepository;
    private readonly _PROFILE_COLUMN_COMPLETE = ["users.*", "roles.slug AS role_slug", "roles.is_public AS role_is_public", "roles.is_bypass_authorization AS role_is_bypass_authorization"];

    constructor() {
    }

    static getInstance(): UserRepository {
        if (!UserRepository.instance) UserRepository.instance = new UserRepository();
        return UserRepository.instance;
    }

    userRoleJoiner() {
        return UserModel().table()
            .select(this._PROFILE_COLUMN_COMPLETE)
            .leftJoin("roles", "users.role_id", "=", "roles.id");
    }

    byId(id: string): Promise<UserInterface> {
        return this.userRoleJoiner()
            .where("users.id", id)
            .first();
    }

    byUsername(username: string): Promise<UserInterface> {
        return this.userRoleJoiner()
            .where("users.username", username)
            .first();
    }

    byEmail(email: string): Promise<UserInterface> {
        return this.userRoleJoiner()
            .where("users.email", email)
            .first();
    }

    byPhone(phone: string): Promise<UserInterface> {
        return this.userRoleJoiner()
            .where("users.phone", phone)
            .first();
    }

    byContact(type: string, to: string): Promise<UserInterface> | null {
        if (type === "email") return this.byEmail(to);
        if (type === "phone") return this.byPhone(to);

        return null;
    }
}

export default UserRepository.getInstance();