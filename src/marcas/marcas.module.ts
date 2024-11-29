import { Module } from '@nestjs/common';
import { MarcasService } from './marcas.service';
import { MarcasController } from './marcas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marca } from './entities/marca.entity';
import { Armadora } from 'src/armadoras/entities/armadora.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Marca,Armadora])],
  controllers: [MarcasController],
  providers: [MarcasService],
})
export class MarcasModule {}
