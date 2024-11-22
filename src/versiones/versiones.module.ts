import { Module } from '@nestjs/common';
import { VersionesService } from './versiones.service';
import { VersionesController } from './versiones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Versione } from './entities/versione.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Versione])],
  controllers: [VersionesController],
  providers: [VersionesService],
})
export class VersionesModule {}
