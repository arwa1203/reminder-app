import * as jwt from "jsonwebtoken";
import "dotenv/config";
import { Request, Response } from "express";
import { asyncWrap } from "./asyncWrap";

export const isAuth = asyncWrap(async (req: Request, _res: Response) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (token) {
            jwt.verify(token, process.env["ACCESS_TOKEN_SECRET"]!);
        } else {
            throw new Error("No token provided!");
        }
    } catch (e) {
        throw new Error("Authentication failed!");
    }
});
