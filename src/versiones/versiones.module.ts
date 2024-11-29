import { Module } from '@nestjs/common';
import { VersionesService } from './versiones.service';
import { VersionesController } from './versiones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Versione } from './entities/versione.entity';
import { Modelo } from 'src/modelos/entities/modelo.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Versione, Modelo])],
  controllers: [VersionesController],
  providers: [VersionesService],
})
export class VersionesModule {}
