import { Module } from '@nestjs/common';
import { ColoresExterioresService } from './colores-exteriores.service';
import { ColoresExterioresController } from './colores-exteriores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColoresExteriore } from './entities/colores-exteriore.entity';
import { Colore } from 'src/colores/entities/colore.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ColoresExteriore, Colore])],
  controllers: [ColoresExterioresController],
  providers: [ColoresExterioresService],
})
export class ColoresExterioresModule {}
