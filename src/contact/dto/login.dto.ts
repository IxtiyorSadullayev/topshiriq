import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber } from "class-validator";

export class LoginDto{
    @ApiProperty()
    @IsEmail()
    readonly email: string;
    @ApiProperty()
    @IsPhoneNumber()
    readonly tel: string;
}