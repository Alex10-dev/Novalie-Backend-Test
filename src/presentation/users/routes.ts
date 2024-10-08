import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "../services/user.service";

export class UserRoutes {

    public static get routes(): Router {

        const router = Router();
        const userService = new UserService();
        const userController = new UserController( userService );

        router.post('/', userController.createUser);
        router.get('/', userController.getUsers);
        router.get('/:id', userController.getUserByID);
        router.put('/:id', userController.updateUser);
        router.delete('/:id', userController.deleteUser);
        
        return router;
    }
}