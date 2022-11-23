import { Router } from "express";
import { Reminder } from "../entity/Reminders";

const router = Router();
router.post("/create-reminder/:id", async (req, res) => {
    const reminder = await Reminder.save(req.body);
    res.status(201).send(reminder);
});

router.get("/get-all-reminders/:id", async (req, res) => {
    const reminder = await Reminder.findOneBy({
        user: { id: +req.params.id },
    });
    res.status(201).send(reminder);
});

export default router;
