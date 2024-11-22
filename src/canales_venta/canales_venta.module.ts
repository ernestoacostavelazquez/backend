import { Module } from '@nestjs/common';
import { CanalesVentaService } from './canales_venta.service';
import { CanalesVentaController } from './canales_venta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CanalesVenta } from './entities/canales_venta.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CanalesVenta])],
  controllers: [CanalesVentaController],
  providers: [CanalesVentaService],
})
export class CanalesVentaModule {}
