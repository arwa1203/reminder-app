import "reflect-metadata";
import { DataSource } from "typeorm";
import { Reminder } from "./entity/Reminders";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345678",
    database: "ReminderDB",
    synchronize: true,
    logging: false,
    entities: [User, Reminder],
    migrations: [],
    subscribers: [],
});
