import { Module } from '@nestjs/common';
import { MaestroPartesService } from './maestro_partes.service';
import { MaestroPartesController } from './maestro_partes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaestroParte } from './entities/maestro_parte.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MaestroParte])],
  controllers: [MaestroPartesController],
  providers: [MaestroPartesService],
})
export class MaestroPartesModule {}
