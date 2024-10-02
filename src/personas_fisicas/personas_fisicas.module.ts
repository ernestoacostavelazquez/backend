import { Module } from '@nestjs/common';
import { PersonasFisicasService } from './personas_fisicas.service';
import { PersonasFisicasController } from './personas_fisicas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonasFisica } from './entities/personas_fisica.entity';
import { MaestroPersona } from 'src/maestro_personas/entities/maestro_persona.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PersonasFisica]),
  TypeOrmModule.forFeature([MaestroPersona])],
  controllers: [PersonasFisicasController],
  providers: [PersonasFisicasService],
})
export class PersonasFisicasModule {}
