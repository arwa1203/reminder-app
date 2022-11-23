import { Router } from "express";
import { User } from "../entity/User";

const router = Router();

router.post("/create-users", async (req, res) => {
    console.log(req.body);
    const user = await User.save(req.body);
    res.status(201).send(user);
});

router.get("/:id", async (req, res) => {
    //console.log(req.params.id);
    const user = await User.findOneBy({ id: +req.params.id });
    res.status(200).send(user);
});

export default router;
