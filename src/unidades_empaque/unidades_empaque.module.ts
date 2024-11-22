import { Module } from '@nestjs/common';
import { UnidadesEmpaqueService } from './unidades_empaque.service';
import { UnidadesEmpaqueController } from './unidades_empaque.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadesEmpaque } from './entities/unidades_empaque.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UnidadesEmpaque])],
  controllers: [UnidadesEmpaqueController],
  providers: [UnidadesEmpaqueService],
})
export class UnidadesEmpaqueModule {}
