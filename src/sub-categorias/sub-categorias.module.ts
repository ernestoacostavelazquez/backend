import { Module } from '@nestjs/common';
import { SubCategoriasService } from './sub-categorias.service';
import { SubCategoriasController } from './sub-categorias.controller';
import { SubCategoria } from './entities/sub-categoria.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from 'src/categorias/entities/categoria.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SubCategoria, Categoria])],
  controllers: [SubCategoriasController],
  providers: [SubCategoriasService],
})
export class SubCategoriasModule {}
