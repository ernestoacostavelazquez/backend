import { Module } from '@nestjs/common';
import { BancosService } from './bancos.service';
import { BancosController } from './bancos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banco } from './entities/banco.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Banco])],
  controllers: [BancosController],
  providers: [BancosService],
})
export class BancosModule {}
