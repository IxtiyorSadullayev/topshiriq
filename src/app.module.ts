import { Module } from '@nestjs/common';
import { ContactModule } from './contact/contact.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Contact } from './contact/entities/contact.entity';

@Module({
  imports: [
    ContactModule, 
    TypeOrmModule.forRoot({
    type: "sqlite",
    database: 'contact.db',
    entities: [Contact],
    autoLoadEntities: true,
    synchronize: true
  }),
  JwtModule.register({
    global: true,
    secret: "mysecret",
    signOptions: {expiresIn: '1h'}
  }),
  ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads'
    }),
],
})
export class AppModule {}
