import { Module } from '@nestjs/common';
import { CodigosPostalesService } from './codigos_postales.service';
import { CodigosPostalesController } from './codigos_postales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodigosPostal } from './entities/codigos_postale.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CodigosPostal])],
  controllers: [CodigosPostalesController],
  providers: [CodigosPostalesService],
})
export class CodigosPostalesModule {}
