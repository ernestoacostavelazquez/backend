import { Module } from '@nestjs/common';
import { RolesPersonaService } from './roles_persona.service';
import { RolesPersonaController } from './roles_persona.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesPersona } from './entities/roles_persona.entity';
import { MaestroPersona } from 'src/maestro_personas/entities/maestro_persona.entity';
import { Rol } from 'src/roles/entities/role.entity';

@Module({
  imports:[TypeOrmModule.forFeature([RolesPersona]),
  TypeOrmModule.forFeature([MaestroPersona]),
  TypeOrmModule.forFeature([Rol])],
  controllers: [RolesPersonaController],
  providers: [RolesPersonaService],
})
export class RolesPersonaModule {}
