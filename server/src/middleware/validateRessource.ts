import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const validateRessource = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (e: any) {
        return res.status(400).send(e.errors);
    }
};

export default validateRessource;