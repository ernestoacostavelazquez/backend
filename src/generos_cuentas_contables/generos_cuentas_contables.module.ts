import { Module } from '@nestjs/common';
import { GenerosCuentasContablesService } from './generos_cuentas_contables.service';
import { GenerosCuentasContablesController } from './generos_cuentas_contables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenerosCuentasContable } from './entities/generos_cuentas_contable.entity';

@Module({
  imports:[TypeOrmModule.forFeature([GenerosCuentasContable])],
  controllers: [GenerosCuentasContablesController],
  providers: [GenerosCuentasContablesService],
})
export class GenerosCuentasContablesModule {}
