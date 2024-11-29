import { Module } from '@nestjs/common';
import { CarterasService } from './carteras.service';
import { CarterasController } from './carteras.controller';
import { Cartera } from './entities/cartera.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposCartera } from 'src/tipos_cartera/entities/tipos_cartera.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Cartera,TiposCartera])],
  controllers: [CarterasController],
  providers: [CarterasService],
})
export class CarterasModule {}
