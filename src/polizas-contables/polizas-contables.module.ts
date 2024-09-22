import { Module } from '@nestjs/common';
import { PolizasContablesService } from './polizas-contables.service';
import { PolizasContablesController } from './polizas-contables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolizasContable } from './entities/polizas-contable.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PolizasContable])],
  controllers: [PolizasContablesController],
  providers: [PolizasContablesService],
})
export class PolizasContablesModule {}
