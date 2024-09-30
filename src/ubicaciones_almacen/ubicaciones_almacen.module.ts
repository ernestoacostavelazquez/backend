import { Module } from '@nestjs/common';
import { UbicacionesAlmacenService } from './ubicaciones_almacen.service';
import { UbicacionesAlmacenController } from './ubicaciones_almacen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UbicacionesAlmacen } from './entities/ubicaciones_almacen.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UbicacionesAlmacen])],
  controllers: [UbicacionesAlmacenController],
  providers: [UbicacionesAlmacenService],
})
export class UbicacionesAlmacenModule {}
