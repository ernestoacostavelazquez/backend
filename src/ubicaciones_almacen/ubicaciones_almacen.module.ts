import { Module } from '@nestjs/common';
import { UbicacionesAlmacenService } from './ubicaciones_almacen.service';
import { UbicacionesAlmacenController } from './ubicaciones_almacen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UbicacionesAlmacen } from './entities/ubicaciones_almacen.entity';
import { Almacen } from 'src/almacenes/entities/almacene.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UbicacionesAlmacen]),
  TypeOrmModule.forFeature([Almacen])],
  controllers: [UbicacionesAlmacenController],
  providers: [UbicacionesAlmacenService],
})
export class UbicacionesAlmacenModule {}
