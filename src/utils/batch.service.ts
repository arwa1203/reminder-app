import { CronJob } from "cron";
import { Reminder } from "../entity/Reminder";
//import { User } from "../entity/User";
import { sendReminderEmail } from "./mail.service";

const grabEvents = async () => {
    const d = new Date();
    console.log("Beginning database search at ", d);
    const reminder = await queryForActiveReminders();
    console.log(reminder);
    reminder.forEach(function (r) {
        sendReminderEmail(r);
    });
};
// for every record in reminder,send a reminder email.

const queryForActiveReminders = async () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    console.log(d);
    const reminder = await Reminder.createQueryBuilder("reminder")
        .leftJoinAndSelect("reminder.user", "user")
        .where("DATE_TRUNC('day',reminder.deadline) >= :currentDate", {
            currentDate: d,
        })
        .andWhere(
            "current_date +  reminder.alertQuantity = date_trunc('day',reminder.deadline)"
        )
        .getMany();
    //.andWhere("reminder.deadline - reminder.alertQuantity = ", {})
    return reminder;
};

export const createBatchJob = () => {
    const cronJob = new CronJob(
        "* */1 * * * ",
        grabEvents,
        null,
        true,
        "America/Chicago"
    );
    cronJob.start();
};
