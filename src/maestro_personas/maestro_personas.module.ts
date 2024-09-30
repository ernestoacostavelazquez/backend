import { Module } from '@nestjs/common';
import { MaestroPersonasService } from './maestro_personas.service';
import { MaestroPersonasController } from './maestro_personas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaestroPersona } from './entities/maestro_persona.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MaestroPersona])],
  controllers: [MaestroPersonasController],
  providers: [MaestroPersonasService],
})
export class MaestroPersonasModule {}
