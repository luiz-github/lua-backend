import { IsNotEmpty, IsEmail, MinLength } from 'class-validator'

export class SignInDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty({ message: 'password is not empty' })
  @MinLength(8)
  password: string
}
