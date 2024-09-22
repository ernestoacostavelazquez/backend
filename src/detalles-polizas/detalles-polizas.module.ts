import { Module } from '@nestjs/common';
import { DetallesPolizasService } from './detalles-polizas.service';
import { DetallesPolizasController } from './detalles-polizas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallesPoliza } from './entities/detalles-poliza.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DetallesPoliza])],
  controllers: [DetallesPolizasController],
  providers: [DetallesPolizasService],
})
export class DetallesPolizasModule {}
