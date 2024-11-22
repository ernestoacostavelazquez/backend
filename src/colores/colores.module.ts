import { Module } from '@nestjs/common';
import { ColoresService } from './colores.service';
import { ColoresController } from './colores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colore } from './entities/colore.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Colore])],
  controllers: [ColoresController],
  providers: [ColoresService],
})
export class ColoresModule {}
