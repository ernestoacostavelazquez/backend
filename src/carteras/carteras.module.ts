import { Module } from '@nestjs/common';
import { CarterasService } from './carteras.service';
import { CarterasController } from './carteras.controller';
import { Cartera } from './entities/cartera.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Cartera])],
  controllers: [CarterasController],
  providers: [CarterasService],
})
export class CarterasModule {}
