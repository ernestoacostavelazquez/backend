import { Module } from '@nestjs/common';
import { DetallesPolizasService } from './detalles-polizas.service';
import { DetallesPolizasController } from './detalles-polizas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallesPoliza } from './entities/detalles-poliza.entity';
import { PolizasContable } from 'src/polizas-contables/entities/polizas-contable.entity';
import { CuentasContable } from 'src/cuentas-contables/entities/cuentas-contable.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DetallesPoliza]),
  TypeOrmModule.forFeature([PolizasContable]),
  TypeOrmModule.forFeature([CuentasContable])],
  controllers: [DetallesPolizasController],
  providers: [DetallesPolizasService],
})
export class DetallesPolizasModule {}
