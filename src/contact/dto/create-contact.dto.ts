import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class CreateContactDto {
    @ApiProperty()
    @IsString({})
    readonly name: string;
    @ApiProperty()
    @IsString()
    readonly fam: string;
    @ApiProperty()
    @IsPhoneNumber()
    readonly tel: string;
    @ApiProperty()
    @IsEmail()
    readonly email: string;
    @ApiProperty()
    @IsString()
    readonly about: string;
    @ApiProperty({ type: 'string', format: 'binary' })
    photo: any;
}
