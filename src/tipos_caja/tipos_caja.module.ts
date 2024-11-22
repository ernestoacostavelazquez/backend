import { Module } from '@nestjs/common';
import { TiposCajaService } from './tipos_caja.service';
import { TiposCajaController } from './tipos_caja.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposCaja } from './entities/tipos_caja.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TiposCaja])],
  controllers: [TiposCajaController],
  providers: [TiposCajaService],
})
export class TiposCajaModule {}
