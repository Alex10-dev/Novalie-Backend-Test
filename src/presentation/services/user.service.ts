
import { prisma } from "../../data";
import { CreateUserDTO } from "../../domain/dtos/create-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { CustomError } from "../../domain/errors/custom.error";
import { PaginationDTO } from "../../domain/dtos/pagination.dto";
import { userInfo } from "os";
import { UpdateUserDTO } from "../../domain/dtos/update-user.dto";

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

    async getUsers( pagination: PaginationDTO ) {

        const skip = (pagination.page - 1) * (pagination.limit);
        try {

            const [total, users] = await Promise.all([
                await prisma.user.count(),
                await prisma.user.findMany({
                    skip: skip,
                    take: pagination.limit,
                }),
            ]);

            return {
                page: pagination.page,
                limit: pagination.limit,
                total,
                users: users.map( user => {
                    const { password, ...userInfo } = UserEntity.fromObject( user );
                    return { ...userInfo };
                })
            }

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

    async updateUser( userID: number, updateUserDTO: UpdateUserDTO ){

        await this.getUserByID( userID );

        try{
            const updatedUser = await prisma.user.update({
                where: { id: userID },
                data: { ...updateUserDTO.getDataToUpdate() }
            })

            return UserEntity.fromObject( updatedUser );

        } catch( error ){
            throw CustomError.internalServer('Internal Server Erorr');
        }
    }
}