import { Module } from '@nestjs/common';
import { FoliosPolizasPeriodoService } from './folios-polizas-periodo.service';
import { FoliosPolizasPeriodoController } from './folios-polizas-periodo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoliosPolizasPeriodo } from './entities/folios-polizas-periodo.entity';

@Module({
  imports:[TypeOrmModule.forFeature([FoliosPolizasPeriodo])],
  controllers: [FoliosPolizasPeriodoController],
  providers: [FoliosPolizasPeriodoService],
})
export class FoliosPolizasPeriodoModule {}
