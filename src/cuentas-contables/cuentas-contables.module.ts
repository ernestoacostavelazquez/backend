import { Module } from '@nestjs/common';
import { CuentasContablesService } from './cuentas-contables.service';
import { CuentasContablesController } from './cuentas-contables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuentasContable } from './entities/cuentas-contable.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CuentasContable])],
  controllers: [CuentasContablesController],
  providers: [CuentasContablesService],
})
export class CuentasContablesModule {}
