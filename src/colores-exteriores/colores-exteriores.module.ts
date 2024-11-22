import { Module } from '@nestjs/common';
import { ColoresExterioresService } from './colores-exteriores.service';
import { ColoresExterioresController } from './colores-exteriores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColoresExteriore } from './entities/colores-exteriore.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ColoresExteriore])],
  controllers: [ColoresExterioresController],
  providers: [ColoresExterioresService],
})
export class ColoresExterioresModule {}
