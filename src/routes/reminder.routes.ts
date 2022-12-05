import { Request, Response, Router } from "express";
import { Reminder } from "../entity/Reminder";
import * as reminderController from "../controllers/reminder.controller";
import * as userController from "../controllers/user.controller";

import { isAuth } from "../middleware/isAuth";
import { asyncWrap } from "../middleware/asyncWrap";
import { sendNewReminderEmail } from "../utils/mail.service";

const router = Router();
router.post(
    "",
    isAuth,
    asyncWrap(async (req: Request, res: Response) => {
        const { userId, ...partialReminder } = req.body;
        const reminder = await Reminder.save({
            ...partialReminder,
            user: { id: userId },
        });

        const user = await userController.findById(reminder.user.id);
        if (user.subscription) {
            console.log(user.subscription);

            await sendNewReminderEmail(user.email, user.firstName, reminder);
        }
        res.status(201).send(reminder);
    })
);

router.delete("/:id", isAuth, async (req, res) => {
    const reminder = await reminderController.findById(+req.params.id);
    await Reminder.remove(reminder);
    res.status(204).send();
});

export default router;
