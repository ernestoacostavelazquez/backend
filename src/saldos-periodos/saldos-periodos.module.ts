import { Module } from '@nestjs/common';
import { SaldosPeriodosService } from './saldos-periodos.service';
import { SaldosPeriodosController } from './saldos-periodos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaldosPeriodo } from './entities/saldos-periodo.entity';
import { PeriodosContable } from 'src/periodos-contables/entities/periodos-contable.entity';
import { CuentasContable } from 'src/cuentas-contables/entities/cuentas-contable.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SaldosPeriodo]),
  TypeOrmModule.forFeature([PeriodosContable]),
  TypeOrmModule.forFeature([CuentasContable])],
  controllers: [SaldosPeriodosController],
  providers: [SaldosPeriodosService],
})
export class SaldosPeriodosModule {}
