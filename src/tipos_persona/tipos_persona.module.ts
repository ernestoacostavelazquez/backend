import { Module } from '@nestjs/common';
import { TiposPersonaService } from './tipos_persona.service';
import { TiposPersonaController } from './tipos_persona.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposPersona } from './entities/tipos_persona.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TiposPersona])],
  controllers: [TiposPersonaController],
  providers: [TiposPersonaService],
})
export class TiposPersonaModule {}
