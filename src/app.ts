import express from "express";
import userRouter from "./routes/user.routes";
import reminderRouter from "./routes/reminder.routes";
import { AppDataSource } from "./data-source";
import { createBatchJob } from "./utils/batch.service";
const main = async () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    const port = 3000;
    await AppDataSource.initialize();

    app.use("/users", userRouter);
    app.use("/reminders", reminderRouter);

    app.listen(port, () => {
        console.log(`App listening to on port ${port}`);
    });

    createBatchJob();
};

main();
