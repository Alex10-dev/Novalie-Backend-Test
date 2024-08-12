import { Request, Response } from "express";
import { CreateUserDTO } from "../../domain/dtos/create-user.dto";
import { UserService } from "../services/user.service";
import { CustomError } from "../../domain/errors/custom.error";

export class UserController {

    constructor(
        private readonly userService: UserService,
    ){};

    public createUser = ( req: Request, res: Response ) => {
        const [error, createUserDTO] = CreateUserDTO.create( req.body );
        if( error ) return res.status(400).json({ error });
        
        this.userService.createUser( createUserDTO! )
            .then( user => {
                const { password, ...createdUser } = user;
                return res.status(200).json( createdUser );
            })
            .catch( error => CustomError.handleError( error, res ));
    };
}
