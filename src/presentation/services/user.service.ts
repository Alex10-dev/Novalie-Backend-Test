import { info } from "console";
import { prisma } from "../../data";
import { CreateUserDTO } from "../../domain/dtos/create-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom.error";

export class UserService {

    constructor(){}

    async createUser( createUserDTO: CreateUserDTO ): Promise<UserEntity> {

        console.log('create user');

        try{
            const user = await prisma.user.create({
                data: {
                    name: createUserDTO.name,
                    surname: createUserDTO.surname,
                    username: createUserDTO.username,
                    password: createUserDTO.password,
                    email: createUserDTO.email,
                    gender: createUserDTO.gender,
                    createdAt: createUserDTO.createdAt,
                    isActive: createUserDTO.isActive,
                }
            });

            return UserEntity.fromObject( user );

        } catch( error ) {
            throw CustomError.internalServer(`${ error }`);
        }
    }

    async getUsers() {
        try {
            const users = await prisma.user.findMany();

            return  users.map( user => {
                const { password, ...info } = user;
                return { ...info };
            })

        } catch( error ) {
            throw CustomError.internalServer('Internal Server Error');
        }
    }

    async getUserByID( userID: number ) {
        try {
            const user = await prisma.user.findFirst({
                where: { id: userID }
            });

            if( !user ) throw CustomError.badRequest(`User with ID: ${ userID } doesn't exist`);

            return UserEntity.fromObject( user );

        } catch( error ) {
            throw error instanceof CustomError
            ? error
            : CustomError.internalServer('Internal Server Error');
            
        }
    }
}