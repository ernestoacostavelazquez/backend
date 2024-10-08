import { Module } from '@nestjs/common';
import { CuentasContablesService } from './cuentas-contables.service';
import { CuentasContablesController } from './cuentas-contables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuentasContable } from './entities/cuentas-contable.entity';
import { GruposGenerosCuenta } from 'src/grupos_generos_cuentas/entities/grupos_generos_cuenta.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CuentasContable]),
  TypeOrmModule.forFeature([GruposGenerosCuenta])],
  controllers: [CuentasContablesController],
  providers: [CuentasContablesService],
})
export class CuentasContablesModule {}
