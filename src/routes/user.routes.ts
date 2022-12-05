import { Router } from "express";
import { User } from "../entity/User";
import * as userController from "../controllers/user.controller";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { isAuth } from "../middleware/isAuth";
import { sendWelcomeEmail } from "../utils/mail.service";
const router = Router();

router.post("", async (req, res) => {
    //console.log(req.body);
    const { email, password, ...partialUser } = req.body;
    const hashPass = await bcrypt.hash(password, 8);
    const savedUser = await User.save({
        ...partialUser,
        password: hashPass,
        email: email.toLocaleLowerCase(),
    });
    const user = await userController.findById(savedUser.id);
    if (user.subscription) {
        sendWelcomeEmail(email, user.firstName + " " + user.lastName);
    }
    res.status(201).send(user);
});

router.get("/:id", async (req, res) => {
    //console.log(req.params.id);
    const user = await User.findOneBy({ id: +req.params.id });
    res.status(200).send(user);
});

router.delete("/:id", async (req, res) => {
    const user = await userController.findById(+req.params.id);
    await User.remove(user);
    res.status(204).send();
});

router.patch("/:id/update-password", isAuth, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const id = +req.params.id;
    const user = await User.findOne({
        where: { id },
        select: {
            id: true,
            password: true,
        },
    });
    if (user) {
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (isMatch) {
            const hashPass = await bcrypt.hash(newPassword, 8);
            await User.save({ id, password: hashPass });
            const userInfo = await userController.findById(id);
            res.status(200).send(userInfo);
        } else {
            res.status(400).send({ error: "Password doesn't match" });
        }
    } else {
        res.status(404).send({ error: "Couldn't find user:(" });
    }
});

router.patch("/:id/update-subscription", isAuth, async (req, res) => {
    const id = +req.params.id;
    const { subscription } = req.body;
    await User.save({ id, subscription });
    const user = await userController.findById(id);
    if (user) {
        res.status(200).send({ user });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: { email: email.toLocaleLowerCase() },
        select: {
            id: true,
            password: true,
        },
    });
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = await jwt.sign(
                { id: user.id },
                process.env["ACCESS_TOKEN_SECRET"]!,
                { expiresIn: process.env["ACCESS_TOKEN_SECRET_EXPIRES_IN"]! }
            );
            res.status(200).send({ token });
        } else {
            res.status(400).send({ error: "Password doesn't match" });
        }
    } else {
        res.status(404).send({ error: "Couldn't find that email." });
    }
});

export default router;
