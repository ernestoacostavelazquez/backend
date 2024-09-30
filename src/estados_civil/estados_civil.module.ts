import { Module } from '@nestjs/common';
import { EstadosCivilService } from './estados_civil.service';
import { EstadosCivilController } from './estados_civil.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadosCivil } from './entities/estados_civil.entity';

@Module({
  imports:[TypeOrmModule.forFeature([EstadosCivil])],
  controllers: [EstadosCivilController],
  providers: [EstadosCivilService],
})
export class EstadosCivilModule {}
