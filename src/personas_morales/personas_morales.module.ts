import { Module } from '@nestjs/common';
import { PersonasMoralesService } from './personas_morales.service';
import { PersonasMoralesController } from './personas_morales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonasMorales } from './entities/personas_morale.entity';
import { MaestroPersona } from 'src/maestro_personas/entities/maestro_persona.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PersonasMorales]),
  TypeOrmModule.forFeature([MaestroPersona])],
  controllers: [PersonasMoralesController],
  providers: [PersonasMoralesService],
})
export class PersonasMoralesModule {}
