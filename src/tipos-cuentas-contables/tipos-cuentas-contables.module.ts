import { Module } from '@nestjs/common';
import { TiposCuentasContablesService } from './tipos-cuentas-contables.service';
import { TiposCuentasContablesController } from './tipos-cuentas-contables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposCuentasContables } from './entities/tipos-cuentas-contable.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TiposCuentasContables])],
  controllers: [TiposCuentasContablesController],
  providers: [TiposCuentasContablesService],
})
export class TiposCuentasContablesModule {}
