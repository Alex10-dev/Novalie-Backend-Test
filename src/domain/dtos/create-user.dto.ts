import { Gender, ObjectData } from "../interfaces/types.interface";


export class CreateUserDTO {

    public readonly username: string;
    public readonly email: string;
    public readonly password: string;
    public readonly name: string;
    public readonly surname?: string | null;
    public readonly gender?: Gender | null;
    public readonly isActive: boolean;
    public readonly createdAt: Date;

    constructor( data: ObjectData ){

        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
        this.name = data.name;
        this.surname = data.surname;
        this.gender = data.gender;
        this.isActive = data.isActive;
        this.createdAt = data.createdAt;
    }

    public static create( data: ObjectData ): [string?, CreateUserDTO?] {

        const { 
            username, 
            email, 
            password, 
            name, 
            surname, 
            gender, 
            isActive, 
            createdAt 
        } = data;

        if( !username ) return ['username is required'];
        if( typeof username !== 'string' ) return ['username must be string'];

        if( !email ) return ['email is required'];
        if( typeof email !== 'string' ) return ['email must be string'];

        if( !password ) return ['password is required'];
        if( typeof password !== 'string' ) return ['password must be string'];

        if( !name ) return ['name is required'];
        if( typeof name !== 'string' ) return ['name must be string'];

        if( surname && typeof surname !== 'string' ) return ['surname must be string'];
        
        if( isActive != null && typeof isActive !== 'boolean'  ) return ['isActive must be boolean'];
       
        let newIsActive = isActive;
        if( newIsActive == null ) {
            newIsActive = true;
        }

        let newGender = null
        if( gender ) {
            if( !Object.values(Gender).includes(gender) ) return ['gender is not a valid value']
            newGender = gender;
        } else {
            newGender = Gender.Unspecified;
        }

        let newCreatedAt = null;
        if( createdAt ) {
            newCreatedAt = new Date( createdAt );
            if( isNaN( newCreatedAt.getTime() ) ) return ['createdAt is not a valid date']
        } else {
            newCreatedAt = new Date();
        }

        return [undefined, new CreateUserDTO({
            username,
            email,
            password,
            name,
            surname,
            gender: newGender,
            isActive: newIsActive,
            createdAt: newCreatedAt,
        })]


    }

}