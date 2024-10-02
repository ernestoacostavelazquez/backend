import { Module } from '@nestjs/common';
import { PartesAlmacenService } from './partes_almacen.service';
import { PartesAlmacenController } from './partes_almacen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartesAlmacen } from './entities/partes_almacen.entity';
import { Almacen } from 'src/almacenes/entities/almacene.entity';
import { MaestroParte } from 'src/maestro_partes/entities/maestro_parte.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PartesAlmacen]),
  TypeOrmModule.forFeature([Almacen]),
  TypeOrmModule.forFeature([MaestroParte])],
  controllers: [PartesAlmacenController],
  providers: [PartesAlmacenService],
})
export class PartesAlmacenModule {}
