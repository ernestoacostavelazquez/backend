import { Module } from '@nestjs/common';
import { PersonasFisicasService } from './personas_fisicas.service';
import { PersonasFisicasController } from './personas_fisicas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonasFisica } from './entities/personas_fisica.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PersonasFisica])],
  controllers: [PersonasFisicasController],
  providers: [PersonasFisicasService],
})
export class PersonasFisicasModule {}
