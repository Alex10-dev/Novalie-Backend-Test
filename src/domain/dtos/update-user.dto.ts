import { Gender, ObjectData } from "../interfaces/types.interface";

interface ToValidateString {
    value: any,
    label: string
}

export class UpdateUserDTO {

    public readonly username?: string | null;
    public readonly email?: string | null;
    public readonly password?: string | null;
    public readonly name?: string | null;
    public readonly surname?: string | null;
    public readonly gender?: Gender | null;
    public readonly isActive?: boolean | null;
    public readonly updatedAt: Date;

    constructor( data: ObjectData ){

        this.username = data.username;
        this.email = data.email;
        // this.password = data.password;
        this.name = data.name;
        this.surname = data.surname;
        this.gender = data.gender;
        this.isActive = data.isActive;
        this.updatedAt = data.updatedAt;
    }

    public static create( data: ObjectData ): [string?, UpdateUserDTO?] {

        const { 
            username, 
            email, 
            // password, 
            name, 
            surname, 
            gender, 
            isActive,
            updatedAt, 
        } = data;

        const toValidate: ToValidateString[] = [
            { value: username, label: 'username'},
            { value: email, label: 'email'}, 
            { value: name, label: 'name'},
            { value: surname, label: 'surname'},
        ];

        for( const item of toValidate ) {
            let isValid = this.validateString( item.value, item.label );
            if( isValid != 'valid' ) return [isValid];
        }
        
        if( isActive != null ){
            if( typeof isActive !== 'boolean'  ) return ['isActive must be boolean'];
        }

        if( gender ) {
            if( !Object.values(Gender).includes(gender) ) return ['gender is not a valid value'];
        }

        let newUpdatedAt = null;
        if( updatedAt ) {
            newUpdatedAt = new Date( updatedAt );
            if( isNaN( newUpdatedAt.getTime() ) ) return ['updatedAt is not a valid date']
        } else {
            newUpdatedAt = new Date();
        }

        return [undefined, new UpdateUserDTO({
            username,
            email,
            name,
            surname,
            gender,
            isActive,
            updatedAt: newUpdatedAt,
        })]
    }

    public getDataToUpdate( ){
        return Object.fromEntries(
            Object.entries( this ).filter( ([_, value]) => value !== null && value !== undefined )
        );
    };

    private static validateString( value: any, label: string ): string{
        if( typeof value !== 'string' ) return `${ label } must be string`;
        if( value.length <= 3 ) return `${ label } is too short`;
        return 'valid'
    }

}