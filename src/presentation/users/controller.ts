import { Request, Response } from "express";
import { CreateUserDTO } from "../../domain/dtos/create-user.dto";
import { UserService } from "../services/user.service";
import { CustomError } from "../../domain/errors/custom.error";
import { PaginationDTO } from "../../domain/dtos/pagination.dto";
import { UpdateUserDTO } from "../../domain/dtos/update-user.dto";

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

    public getUsers = ( req: Request, res: Response ) => {

        const {page = 1, limit = 10} = req.query;
        const [error, paginationDTO] = PaginationDTO.create( Number(page), Number(limit) );
        if( error ) return res.status(400).json({ error });

        this.userService.getUsers( paginationDTO! )
            .then( users => res.status(200).json( users ))
            .catch( error => CustomError.handleError( error, res ));
    }

    public getUserByID = ( req: Request, res: Response ) => {
        const { id } = req.params;

        this.userService.getUserByID( Number(id) )
            .then( user => {
                const { password, ...userInfo } = user;
                return res.status(200).json( userInfo );
            })
            .catch( error => CustomError.handleError( error, res ));
    }

    public updateUser = ( req: Request, res: Response ) => {

        const {id} = req.params;

        const [ error, updateUserDTO ] = UpdateUserDTO.create( req.body );
        if( error ) return res.status(400).json({ error });

        this.userService.updateUser( Number(id), updateUserDTO! )
            .then( updatedUser => res.status(200).json( updatedUser ))
            .catch( error => CustomError.handleError( error, res ));

    }

    public deleteUser = ( req: Request, res: Response ) => {

        const { id } = req.params;
        this.userService.deleteUser( Number(id) )
            .then( deletedUser => res.status(200).json( deletedUser ))
            .catch( error => CustomError.handleError( error, res ));

    }
}
