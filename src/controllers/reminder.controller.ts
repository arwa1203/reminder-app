import { Reminder } from "../entity/Reminder";

export const findById = async (reminderId: number) => {
    const reminder = await Reminder.findOneBy({ reminderId });
    if (!reminder) {
        throw new Error("Can't find user.");
    }
    return reminder;
};
