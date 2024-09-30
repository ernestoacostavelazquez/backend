import { Module } from '@nestjs/common';
import { SubdivisionCuentasContablesService } from './subdivision-cuentas-contables.service';
import { SubdivisionCuentasContablesController } from './subdivision-cuentas-contables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubdivisionCuentasContable } from './entities/subdivision-cuentas-contable.entity';
import { TiposCuentasContables } from 'src/tipos-cuentas-contables/entities/tipos-cuentas-contable.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SubdivisionCuentasContable]),
  TypeOrmModule.forFeature([TiposCuentasContables])],
  controllers: [SubdivisionCuentasContablesController],
  providers: [SubdivisionCuentasContablesService],
})
export class SubdivisionCuentasContablesModule {}
