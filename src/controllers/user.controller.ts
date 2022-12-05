import { User } from "../entity/User";

export const findById = async (id: number) => {
    const user = await User.findOneBy({ id });
    if (!user) {
        throw new Error("Can't find user.");
    }
    return user;
};

export const findByEmail = async (email: string) => {
    const user = await User.findOneBy({ email: email.toLocaleLowerCase() });
    if (!user) {
        throw new Error("Can't find user.");
    }
    return user;
};
