import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { LoginDto } from './dto/login.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) { }

  @Post()
  @UseInterceptors(FileInterceptor('photo', {
    storage: diskStorage({
      destination: "./uploads",
      filename: (req, file, callback) => {
        const name = file.originalname.split('.')[0];
        const fileExtname = extname(file.originalname);
        const randomName = `${name}-${Date.now()}${fileExtname}`;
        callback(null, randomName);
      },
    })
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: "Contact property",
    type: CreateContactDto,
  })
  create(@Body() createContactDto: CreateContactDto, @UploadedFile() photo: Express.Multer.File) {
    return this.contactService.create(createContactDto, photo);
  }

  @Post('login')
  loginUser(@Body() loginDto: LoginDto){
    
    return this.contactService.login(loginDto)
  }

  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(id, updateContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
