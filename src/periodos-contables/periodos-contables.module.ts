import { Module } from '@nestjs/common';
import { PeriodosContablesService } from './periodos-contables.service';
import { PeriodosContablesController } from './periodos-contables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeriodosContable } from './entities/periodos-contable.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PeriodosContable])],
  controllers: [PeriodosContablesController],
  providers: [PeriodosContablesService],
})
export class PeriodosContablesModule {}
