import { Module } from '@nestjs/common';
import { ArmadorasService } from './armadoras.service';
import { ArmadorasController } from './armadoras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Armadora } from './entities/armadora.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Armadora])],
  controllers: [ArmadorasController],
  providers: [ArmadorasService],
})
export class ArmadorasModule {}
