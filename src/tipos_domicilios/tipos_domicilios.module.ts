import { Module } from '@nestjs/common';
import { TiposDomiciliosService } from './tipos_domicilios.service';
import { TiposDomiciliosController } from './tipos_domicilios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposDomicilio } from './entities/tipos_domicilio.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TiposDomicilio])],
  controllers: [TiposDomiciliosController],
  providers: [TiposDomiciliosService],
})
export class TiposDomiciliosModule {}
