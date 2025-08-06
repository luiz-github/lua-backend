import { IsNotEmpty, IsEmail, MinLength, IsString } from 'class-validator'

export class UserDTO {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty({ message: 'password is not empty' })
    @MinLength(8)
    password: string
}