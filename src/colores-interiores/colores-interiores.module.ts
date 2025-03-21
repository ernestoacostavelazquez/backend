import { Module } from '@nestjs/common';
import { ColoresInterioresService } from './colores-interiores.service';
import { ColoresInterioresController } from './colores-interiores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColoresExteriore } from 'src/colores-exteriores/entities/colores-exteriore.entity';
import { ColoresInteriore } from './entities/colores-interiore.entity';
import { Colore } from 'src/colores/entities/colore.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ColoresInteriore, Colore])],
  controllers: [ColoresInterioresController],
  providers: [ColoresInterioresService],
})
export class ColoresInterioresModule {}
