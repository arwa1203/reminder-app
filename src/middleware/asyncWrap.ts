import { NextFunction, Request, Response } from "express";

export const asyncWrap = (fn: Function) =>
    function asyncUtilWrap(
        req: Request,
        res: Response,
        next: NextFunction,
        ...args: unknown[]
    ) {
        (async () => {
            try {
                await fn(req, res, next, ...args);
                next();
            } catch (err) {
                next(err);
            }
        })();
    };
