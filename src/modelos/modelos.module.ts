import { Module } from '@nestjs/common';
import { ModelosService } from './modelos.service';
import { ModelosController } from './modelos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modelo } from './entities/modelo.entity';
import { Familia } from 'src/familias/entities/familia.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Modelo,Familia])],
  controllers: [ModelosController],
  providers: [ModelosService],
})
export class ModelosModule {}
