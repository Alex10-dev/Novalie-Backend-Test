import { CustomError } from "../errors/custom.error";
import { Gender, ObjectData } from "../interfaces/types.interface";

export class UserEntity {

    public id: number;
    public name: string;
    public surname?: string | null;
    public username: string;
    public email: string;
    public password: string;
    public gender?: Gender | null;
    public isActive: boolean;
    public createdAt: Date;
    public updatedAt?: Date | null;

    constructor( data: ObjectData ){
        
        this.id = data.id;
        this.name = data.name;
        this.surname = data.surname;
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
        this.gender = data.gender;
        this.isActive = data.isActive;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;

    }

    public static fromObject( object: ObjectData ) {

        const { 
            id, 
            name, 
            surname, 
            username, 
            email, 
            password, 
            gender, 
            isActive, 
            createdAt, 
            updatedAt,
        } = object;

        if( !id ) throw CustomError.badRequest('Missing id');
        if( !name ) throw CustomError.badRequest('Missing name');
        if( !password ) throw CustomError.badRequest('Missing password');
      
        if( !email ) throw CustomError.badRequest('Missing email');
       
        if( !isActive ) throw CustomError.badRequest('Missing isActive');
        if( !createdAt ) throw CustomError.badRequest('Missing createdAt');

        if( surname && typeof surname !== 'string' ) throw CustomError.badRequest('Surname must be string');

        let newCreatedAt = new Date( createdAt );
        if( isNaN( newCreatedAt.getTime() ) ){
            throw CustomError.badRequest('CompletedAt is not a valid date');
        }

        let newUpdatedAt = null;
        if( updatedAt ) {
            newUpdatedAt = new Date( updatedAt );
            if( isNaN( newUpdatedAt.getTime() ) ){
                throw CustomError.badRequest('UpdatedAt is not a valid date');
            }
        }

        let newGender = null;
        if( gender ) {
            if( !Object.values(Gender).includes(gender) ) {
                throw CustomError.badRequest('Gender value is not valid, it must be [Male, Female, Unspecified]');
            }
            newGender = gender;
        } else {
            newGender = Gender.Unspecified;
        }

        return new UserEntity({
            id,
            name,
            username,
            password,
            surname,
            email,
            gender: newGender,
            isActive,
            createdAt: newCreatedAt,
            updatedAt: newUpdatedAt,
        })
    }
}