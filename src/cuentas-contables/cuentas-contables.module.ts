import { Module } from '@nestjs/common';
import { CuentasContablesService } from './cuentas-contables.service';
import { CuentasContablesController } from './cuentas-contables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuentasContable } from './entities/cuentas-contable.entity';
import { SubdivisionCuentasContable } from 'src/subdivision-cuentas-contables/entities/subdivision-cuentas-contable.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CuentasContable]),
  TypeOrmModule.forFeature([SubdivisionCuentasContable])],
  controllers: [CuentasContablesController],
  providers: [CuentasContablesService],
})
export class CuentasContablesModule {}
