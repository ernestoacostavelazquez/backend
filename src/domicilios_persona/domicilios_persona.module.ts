import { Module } from '@nestjs/common';
import { DomiciliosPersonaService } from './domicilios_persona.service';
import { DomiciliosPersonaController } from './domicilios_persona.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomiciliosPersona } from './entities/domicilios_persona.entity';
import { MaestroPersona } from 'src/maestro_personas/entities/maestro_persona.entity';
import { CodigosPostal } from 'src/codigos_postales/entities/codigos_postale.entity';
import { TiposDomicilio } from 'src/tipos_domicilios/entities/tipos_domicilio.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DomiciliosPersona]),
  TypeOrmModule.forFeature([MaestroPersona]),
  TypeOrmModule.forFeature([CodigosPostal]),
  TypeOrmModule.forFeature([TiposDomicilio])],
  controllers: [DomiciliosPersonaController],
  providers: [DomiciliosPersonaService],
})
export class DomiciliosPersonaModule {}
