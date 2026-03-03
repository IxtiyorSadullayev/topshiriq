import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class ContactService {
  constructor(@InjectRepository(Contact) private contactRepo: Repository<Contact>,
  private jwtService: JwtService
){}
  async create(createContactDto: CreateContactDto, photo) {
    try {
      const condidate = await this.contactRepo.findOne({where: {email: createContactDto.email}})
      if (condidate){
        throw new HttpException("Ushbu foydalanuvchi oldin yaratilgan", HttpStatus.BAD_REQUEST)
      }
      console.log(createContactDto)
      const photopath = photo? photo.path: ""
      console.log(photopath)
      const newcontact = this.contactRepo.create({
        name: createContactDto.name,
        fam: createContactDto.fam,
        tel: createContactDto.tel,
        email: createContactDto.email,
        imgUrl: photopath,
        about: createContactDto.about,
        favorite: false
      })
      await this.contactRepo.save(newcontact)
      const payload = {id: newcontact.id, email: newcontact.email}
      return {
        token: await this.jwtService.signAsync(payload),
        message: "Foydalanuvchi yaratildi"
      }
    } catch (e) {
      throw new HttpException("Hatolik mavjud "+e, HttpStatus.BAD_REQUEST)
    }
    // return 'This action adds a new contact';
  }

  async findAll() {
    return await this.contactRepo.find()
  }

  async findOne(id: string) {
    return await this.contactRepo.findOne({where: {id: id}});
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    return await this.contactRepo.update(id, updateContactDto);
  }

  async remove(id: string) {
    return await this.contactRepo.delete(id);
  }
  async login(loginDto: LoginDto){
    try {
      const condidate = await this.contactRepo.findOne({where: {email: loginDto.email}})
      if (!condidate || condidate.tel != loginDto.tel){
        throw new HttpException("Email yoki Tel noto'g'ri", HttpStatus.NOT_FOUND)
      }
      const payload = {id: condidate.id, email: condidate.email}
      return {
        token: await this.jwtService.signAsync(payload),
        message: "Foydalanuvchi to'g'ri"
      }
    } catch (e) {
      throw new HttpException("Hatolik mavjud "+e, HttpStatus.BAD_REQUEST)
    }
  }
}
