import { Module } from '@nestjs/common';
import { GruposGenerosCuentasService } from './grupos_generos_cuentas.service';
import { GruposGenerosCuentasController } from './grupos_generos_cuentas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GruposGenerosCuenta } from './entities/grupos_generos_cuenta.entity';
import { GenerosCuentasContable } from 'src/generos_cuentas_contables/entities/generos_cuentas_contable.entity';

@Module({
  imports:[TypeOrmModule.forFeature([GruposGenerosCuenta]),
  TypeOrmModule.forFeature([GenerosCuentasContable])],
  controllers: [GruposGenerosCuentasController],
  providers: [GruposGenerosCuentasService],
})
export class GruposGenerosCuentasModule {}
