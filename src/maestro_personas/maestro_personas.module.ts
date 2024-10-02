import { Module } from '@nestjs/common';
import { MaestroPersonasService } from './maestro_personas.service';
import { MaestroPersonasController } from './maestro_personas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaestroPersona } from './entities/maestro_persona.entity';
import { Genero } from 'src/generos/entities/genero.entity';
import { TiposPersona } from 'src/tipos_persona/entities/tipos_persona.entity';
import { EstadosCivil } from 'src/estados_civil/entities/estados_civil.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MaestroPersona]),
  TypeOrmModule.forFeature([Genero]),
  TypeOrmModule.forFeature([TiposPersona]),
  TypeOrmModule.forFeature([EstadosCivil])],
  controllers: [MaestroPersonasController],
  providers: [MaestroPersonasService],
})
export class MaestroPersonasModule {}
