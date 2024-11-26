import { Module } from '@nestjs/common';
import { FamiliasService } from './familias.service';
import { FamiliasController } from './familias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Familia } from './entities/familia.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Familia])],
  controllers: [FamiliasController],
  providers: [FamiliasService],
})
export class FamiliasModule {}
