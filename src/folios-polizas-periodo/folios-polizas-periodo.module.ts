import { Module } from '@nestjs/common';
import { FoliosPolizasPeriodoService } from './folios-polizas-periodo.service';
import { FoliosPolizasPeriodoController } from './folios-polizas-periodo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoliosPolizasPeriodo } from './entities/folios-polizas-periodo.entity';
import { TiposPoliza } from 'src/tipos-poliza/entities/tipos-poliza.entity';
import { PeriodosContable } from 'src/periodos-contables/entities/periodos-contable.entity';

@Module({
  imports:[TypeOrmModule.forFeature([FoliosPolizasPeriodo]),
  TypeOrmModule.forFeature([TiposPoliza]),
  TypeOrmModule.forFeature([PeriodosContable])],
  controllers: [FoliosPolizasPeriodoController],
  providers: [FoliosPolizasPeriodoService],
})
export class FoliosPolizasPeriodoModule {}
