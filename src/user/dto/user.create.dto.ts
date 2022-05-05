import {ApiProperty} from "@nestjs/swagger";

export class UserCreateDTO {
    @ApiProperty({example: 'user@gmail.com', description: 'User email'})
    readonly email: string;

    @ApiProperty({example: 'John', description: 'User name'})
    readonly userName: string;

    @ApiProperty({example: 'password2010', description: 'User password'})
    readonly password: string;
}