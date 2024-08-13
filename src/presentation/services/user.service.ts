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
}