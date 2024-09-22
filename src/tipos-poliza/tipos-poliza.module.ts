import { Module } from '@nestjs/common';
import { TiposPolizaService } from './tipos-poliza.service';
import { TiposPolizaController } from './tipos-poliza.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposPoliza } from './entities/tipos-poliza.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TiposPoliza])],
  controllers: [TiposPolizaController],
  providers: [TiposPolizaService],
})
export class TiposPolizaModule {}
