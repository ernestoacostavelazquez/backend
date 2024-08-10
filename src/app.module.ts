import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LineasModule } from './lineas/lineas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port:3306,
      username:'root',
      password:'',
      database:'sgedb',
      entities:[__dirname +'/**/*.entity{.ts,.js}'],
      synchronize:true
    }),
    UsersModule,
    LineasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
