import { Module } from '@nestjs/common';
import { TiposCarteraService } from './tipos_cartera.service';
import { TiposCarteraController } from './tipos_cartera.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposCartera } from './entities/tipos_cartera.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TiposCartera])],
  controllers: [TiposCarteraController],
  providers: [TiposCarteraService],
})
export class TiposCarteraModule {}
