import { Module } from '@nestjs/common';
import { DomiciliosPersonaService } from './domicilios_persona.service';
import { DomiciliosPersonaController } from './domicilios_persona.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomiciliosPersona } from './entities/domicilios_persona.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DomiciliosPersona])],
  controllers: [DomiciliosPersonaController],
  providers: [DomiciliosPersonaService],
})
export class DomiciliosPersonaModule {}
