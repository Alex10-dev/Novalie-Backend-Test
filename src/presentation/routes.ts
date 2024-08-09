import { Router } from "express";
import { UserRoutes } from "./users/routes";

export class AppRoutes {

    public static get routes(): Router {

        const router = Router();

        router.use('/api/users', UserRoutes.routes);

        return router;
    }
}