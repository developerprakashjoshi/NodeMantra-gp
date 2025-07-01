import { UserInput, User } from "@graphschema/user.schema";
export declare class UsersResolver {
    private users;
    getUsers(): Promise<User[]>;
    getUser(id: number): Promise<User | undefined>;
    createUser(input: UserInput): Promise<User>;
    updateUser(id: number, input: UserInput): Promise<User>;
}
//# sourceMappingURL=user.service.d.ts.map