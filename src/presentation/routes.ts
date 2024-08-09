import { Router } from "express";

export class AppRoutes {

    public static get routes(): Router {

        const router = Router();

        // router.use('/api/default', routes);

        return router;
    }
}