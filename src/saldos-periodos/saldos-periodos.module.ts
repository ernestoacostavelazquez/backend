import { Module } from '@nestjs/common';
import { SaldosPeriodosService } from './saldos-periodos.service';
import { SaldosPeriodosController } from './saldos-periodos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaldosPeriodo } from './entities/saldos-periodo.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SaldosPeriodo])],
  controllers: [SaldosPeriodosController],
  providers: [SaldosPeriodosService],
})
export class SaldosPeriodosModule {}
