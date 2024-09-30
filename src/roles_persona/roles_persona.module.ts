import { Module } from '@nestjs/common';
import { RolesPersonaService } from './roles_persona.service';
import { RolesPersonaController } from './roles_persona.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesPersona } from './entities/roles_persona.entity';

@Module({
  imports:[TypeOrmModule.forFeature([RolesPersona])],
  controllers: [RolesPersonaController],
  providers: [RolesPersonaService],
})
export class RolesPersonaModule {}
