import { Module } from '@nestjs/common';
import { MaestroPartesService } from './maestro_partes.service';
import { MaestroPartesController } from './maestro_partes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaestroParte } from './entities/maestro_parte.entity';
import { UnidadMedida } from 'src/unidad_medida/entities/unidad_medida.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MaestroParte]),
  TypeOrmModule.forFeature([UnidadMedida]),
  TypeOrmModule.forFeature([Categoria])],
  controllers: [MaestroPartesController],
  providers: [MaestroPartesService],
})
export class MaestroPartesModule {}
