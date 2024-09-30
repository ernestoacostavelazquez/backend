import { Module } from '@nestjs/common';
import { PartesAlmacenService } from './partes_almacen.service';
import { PartesAlmacenController } from './partes_almacen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartesAlmacen } from './entities/partes_almacen.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PartesAlmacen])],
  controllers: [PartesAlmacenController],
  providers: [PartesAlmacenService],
})
export class PartesAlmacenModule {}
